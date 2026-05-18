'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    naver?: { maps: typeof naver.maps };
  }
}

interface NaverMapProps {
  width?: string;
  height?: string;
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{ lat: number; lng: number; title?: string }>;
}

const EMPTY_MARKERS: NonNullable<NaverMapProps['markers']> = [];

export default function NaverMap({
  width = '100%',
  height = '400px',
  center,
  zoom = 15,
  markers = EMPTY_MARKERS,
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const overlaysRef = useRef<naver.maps.OverlayView[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const cleanup = () => {
      overlaysRef.current.forEach((o) => o.setMap(null));
      overlaysRef.current = [];
      mapInstanceRef.current?.destroy();
      mapInstanceRef.current = null;
    };

    const initializeMap = () => {
      if (!window.naver || !mapRef.current) return;

      cleanup();

      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(center.lat, center.lng),
        zoom,
        zoomControl: false,
        scaleControl: false,
      });
      mapInstanceRef.current = map;

      // 뭉치장 커스텀 마커 + 레이블 생성
      markers.forEach((marker) => {
        const position = new naver.maps.LatLng(marker.lat, marker.lng);

        const overlayDiv = document.createElement('div');
        overlayDiv.style.position = 'absolute';
        overlayDiv.style.transform = 'translate(-50%, -100%)';
        overlayDiv.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <img src="/icons/map-marker.svg" alt="marker" style="width: 40px; height: 40px;" />
            <div class="marker-label" style="
              background: transparent;
              font-size: 14px;
              font-weight: 700;
              white-space: nowrap;
              color: #111114;
              -webkit-text-stroke: 0.2px #ffffff;
            "></div>
          </div>
        `;
        const label = overlayDiv.querySelector('.marker-label') as HTMLElement;
        if (label) label.textContent = marker.title || '';

        const overlay = new naver.maps.OverlayView();

        overlay.onAdd = function () {
          this.getPanes().overlayLayer.appendChild(overlayDiv);
        };

        overlay.draw = function () {
          const pixelPosition =
            this.getProjection().fromCoordToOffset(position);
          overlayDiv.style.left = `${pixelPosition.x}px`;
          overlayDiv.style.top = `${pixelPosition.y}px`;
        };

        overlay.onRemove = function () {
          overlayDiv.parentNode?.removeChild(overlayDiv);
        };

        overlay.setMap(map);
        overlaysRef.current.push(overlay);
      });

      setIsLoading(false);
    };

    // 이미 로드되어 있으면 바로 초기화
    if (window.naver?.maps) {
      initializeMap();
      return cleanup;
    }

    // 스크립트가 이미 있는지 확인
    const existingScript = document.querySelector(
      'script[src*="openapi.map.naver.com"]',
    );

    if (existingScript) {
      existingScript.addEventListener('load', initializeMap);
      return () => {
        existingScript.removeEventListener('load', initializeMap);
        cleanup();
      };
    }

    // 새로 스크립트 추가
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return cleanup;
  }, [center.lat, center.lng, zoom, markers]);

  return (
    <div style={{ width, height }} className="relative">
      <div ref={mapRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

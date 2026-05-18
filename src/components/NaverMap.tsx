'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: {
      maps: {
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (element: HTMLElement, options: unknown) => unknown;
        Marker: new (options: unknown) => unknown;
        OverlayView: new () => {
          setMap: (map: unknown) => void;
          draw: () => void;
          getPanes: () => { overlayLayer: HTMLElement };
          getProjection: () => {
            fromCoordToOffset: (coord: unknown) => { x: number; y: number };
          };
          onAdd?: () => void;
          onRemove?: () => void;
        };
        Size: new (width: number, height: number) => unknown;
        Point: new (x: number, y: number) => unknown;
        Position: {
          TOP_RIGHT: unknown;
        };
      };
    };
  }
}

interface NaverMapProps {
  width?: string;
  height?: string;
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{ lat: number; lng: number; title?: string }>;
}

export default function NaverMap({
  width = '100%',
  height = '400px',
  center,
  zoom = 15,
  markers = [],
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!window.naver || !mapRef.current) return;

      const mapOptions = {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
        zoom,
        zoomControl: false,
      };

      const map = new window.naver.maps.Map(mapRef.current, mapOptions);

      // 뭉치장 커스텀 마커 + 레이블 생성
      markers.forEach((marker) => {
        const position = new window.naver.maps.LatLng(marker.lat, marker.lng);

        // HTML 오버레이 생성
        const overlayDiv = document.createElement('div');
        overlayDiv.style.position = 'absolute';
        overlayDiv.style.transform = 'translate(-50%, -100%)';
        overlayDiv.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <img src="/icons/map-marker.svg" alt="marker" style="width: 40px; height: 40px;" />
            <div style="
              background: transparent;
              font-size: 14px;
              font-weight: 700;
              white-space: nowrap;
              color: #111114;
              -webkit-text-stroke: 0.2px #ffffff;
            ">${marker.title || ''}</div>
          </div>
        `;

        // 오버레이 객체 생성
        const overlay = new window.naver.maps.OverlayView();

        overlay.onAdd = function () {
          const panes = this.getPanes();
          panes.overlayLayer.appendChild(overlayDiv);
        };

        overlay.draw = function () {
          const projection = this.getProjection();
          const pixelPosition = projection.fromCoordToOffset(position);
          overlayDiv.style.left = `${pixelPosition.x}px`;
          overlayDiv.style.top = `${pixelPosition.y}px`;
        };

        overlay.onRemove = function () {
          if (overlayDiv.parentNode) {
            overlayDiv.parentNode.removeChild(overlayDiv);
          }
        };

        overlay.setMap(map);
      });
    };

    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [center, zoom, markers]);

  return <div ref={mapRef} style={{ width, height }} />;
}

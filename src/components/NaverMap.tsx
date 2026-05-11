'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: {
      maps: {
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (element: HTMLElement, options: unknown) => unknown;
        Marker: new (options: unknown) => unknown;
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

      // 마커 찍기
      markers.forEach((marker) => {
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(marker.lat, marker.lng),
          map,
          title: marker.title,
        });
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

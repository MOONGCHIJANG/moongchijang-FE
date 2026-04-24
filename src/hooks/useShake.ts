'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// iOS 13+ Safari에서 요구하는 권한 요청 인터페이스 확장
interface DeviceMotionEventWithPermission extends DeviceMotionEvent {
  requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
}

export const useShake = (onShake: () => void) => {
  const [isSupported, setIsSupported] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // 쿨타임 관리를 위한 ref (리렌더링을 유발하지 않음)
  const lastShakeTimeRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 초기 상태 확인 및 설정을 비동기로 처리하여 린트 에러 방지
    Promise.resolve().then(() => {
      if (typeof window.DeviceMotionEvent === 'undefined') {
        setIsSupported(false);
      }

      const saved = localStorage.getItem('shake_to_qr_enabled');
      if (saved === 'true') {
        setIsEnabled(true);
        const MotionEvent =
          DeviceMotionEvent as unknown as DeviceMotionEventWithPermission;
        if (typeof MotionEvent.requestPermission !== 'function') {
          setPermissionGranted(true);
        }
      }
    });
  }, []);

  const toggleShake = useCallback(async () => {
    if (isEnabled) {
      setIsEnabled(false);
      setPermissionGranted(false);
      localStorage.setItem('shake_to_qr_enabled', 'false');
      return;
    }

    const MotionEvent =
      DeviceMotionEvent as unknown as DeviceMotionEventWithPermission;
    if (typeof MotionEvent.requestPermission === 'function') {
      try {
        const permissionState = await MotionEvent.requestPermission();
        if (permissionState === 'granted') {
          setPermissionGranted(true);
          setIsEnabled(true);
          localStorage.setItem('shake_to_qr_enabled', 'true');
        } else {
          alert('기기 모션 권한이 필요합니다.');
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    } else {
      setPermissionGranted(true);
      setIsEnabled(true);
      localStorage.setItem('shake_to_qr_enabled', 'true');
    }
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled || !permissionGranted) return;

    let lastX = 0,
      lastY = 0,
      lastZ = 0;
    let lastUpdate = 0;
    const SHAKE_THRESHOLD = 15;
    const COOLDOWN = 1500; // 1.5초간 중복 감지 방지

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity;
      if (!current) return;

      const currentTime = Date.now();
      if (currentTime - lastUpdate > 100) {
        const diffTime = currentTime - lastUpdate;
        lastUpdate = currentTime;

        const { x, y, z } = current;
        if (x === null || y === null || z === null) return;

        const speed =
          (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;

        if (speed > SHAKE_THRESHOLD) {
          const now = Date.now();
          // 쿨타임 확인: 마지막 흔들림으로부터 1.5초가 지났을 때만 호출
          if (now - lastShakeTimeRef.current > COOLDOWN) {
            lastShakeTimeRef.current = now;
            onShake();
          }
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => window.removeEventListener('devicemotion', handleDeviceMotion);
  }, [isEnabled, permissionGranted, onShake]);

  return { isSupported, isEnabled, toggleShake };
};

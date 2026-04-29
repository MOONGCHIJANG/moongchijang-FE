import { useState, useEffect, useCallback, useRef } from 'react';

interface DeviceMotionEventWithPermission extends DeviceMotionEvent {
  requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
}

export const useShake = (onShake: () => void) => {
  const [isSupported, setIsSupported] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const onShakeRef = useRef(onShake);
  const lastShakeTimeRef = useRef(0);

  useEffect(() => {
    onShakeRef.current = onShake;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const MotionEvent =
      DeviceMotionEvent as unknown as DeviceMotionEventWithPermission;
    let touchHandler: (() => void) | null = null;

    const timer = setTimeout(() => {
      if (typeof window.DeviceMotionEvent === 'undefined') {
        setIsSupported(false);
        return;
      }

      const saved = localStorage.getItem('shake_to_qr_enabled');
      if (saved !== 'true') return;

      setIsEnabled(true);

      if (typeof MotionEvent.requestPermission !== 'function') {
        setPermissionGranted(true);
      } else {
        // iOS: 첫 터치 시 자동으로 권한 재요청
        touchHandler = async () => {
          try {
            const state = await MotionEvent.requestPermission!();
            if (state === 'granted') setPermissionGranted(true);
          } catch {}
        };
        window.addEventListener('touchstart', touchHandler, { once: true });
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      if (touchHandler) window.removeEventListener('touchstart', touchHandler);
    };
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
          alert(
            '기기 모션 권한이 필요합니다. 브라우저 설정에서 센서 접근 권한을 허용해주세요.',
          );
        }
      } catch (error) {
        console.error('Error requesting device motion permission:', error);
        alert('권한 요청 중 오류가 발생했습니다. 버튼을 다시 눌러주세요.');
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
    const SHAKE_THRESHOLD = 1500;

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity;
      if (!current) return;

      const currentTime = Date.now();
      if (currentTime - lastUpdate <= 100) return;

      const diffTime = currentTime - lastUpdate;
      lastUpdate = currentTime;

      const { x, y, z } = current;
      if (x === null || y === null || z === null) return;

      const speed =
        (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;
      if (speed > SHAKE_THRESHOLD) {
        const now = Date.now();
        if (now - lastShakeTimeRef.current > 3000) {
          lastShakeTimeRef.current = now;
          onShakeRef.current();
        }
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => window.removeEventListener('devicemotion', handleDeviceMotion);
  }, [isEnabled, permissionGranted]);

  return { isSupported, isEnabled, toggleShake };
};

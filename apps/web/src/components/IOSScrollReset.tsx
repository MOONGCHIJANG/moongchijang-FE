'use client';

import { useEffect } from 'react';

const IOSScrollReset = () => {
  useEffect(() => {
    const handle = () => {
      requestAnimationFrame(() => {
        const a = document.activeElement;
        if (
          !a ||
          (a.tagName !== 'INPUT' &&
            a.tagName !== 'TEXTAREA' &&
            a.tagName !== 'SELECT')
        ) {
          window.scrollTo(0, 0);
        }
      });
    };
    window.addEventListener('focusout', handle);
    return () => window.removeEventListener('focusout', handle);
  }, []);

  return null;
};

export default IOSScrollReset;

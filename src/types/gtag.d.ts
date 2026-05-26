interface Window {
  gtag: (
    command: 'event' | 'config' | 'set' | 'js',
    targetId: string,
    params?: Record<string, unknown>,
  ) => void;
}

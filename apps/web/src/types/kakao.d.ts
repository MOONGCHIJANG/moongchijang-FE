interface KakaoShareLink {
  webUrl: string;
  mobileWebUrl: string;
}

interface KakaoShareContent {
  title: string;
  description: string;
  imageUrl: string;
  link: KakaoShareLink;
}

interface KakaoShareButton {
  title: string;
  link: KakaoShareLink;
}

interface KakaoShareDefaultSettings {
  objectType: 'feed';
  content: KakaoShareContent;
  buttons?: KakaoShareButton[];
}

interface KakaoStatic {
  init(key: string): void;
  isInitialized(): boolean;
  Share: {
    sendDefault(settings: KakaoShareDefaultSettings): void;
  };
}

interface Window {
  Kakao?: KakaoStatic;
}

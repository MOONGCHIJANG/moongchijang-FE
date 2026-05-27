import Image from 'next/image';
import { useState } from 'react';

const SLIDES = [
  {
    image: '/images/onboarding-1.png',
    title: '웨이팅없이 픽업하는 핫한 디저트',
    description:
      '피드에서 공구 진행 중인 디저트를 확인하고\n공구에 참여해보세요',
  },
  {
    image: '/images/onboarding-2.png',
    title: '먹고 싶은 디저트 공구가 없으면?',
    description:
      '공구가 열리지 않은 디저트가 먹고싶다면\n직접 공구를 열 수 있어요',
  },
  {
    image: '/images/onboarding-3.png',
    title: '미달성 시 100% 자동환불',
    description:
      '달성 전에는 언제든 취소 가능해요\n단, 달성 확정 이후와 픽업 미수령 시 환불이 어려워요',
  },
  {
    image: '/images/onboarding-4.png',
    title: 'QR코드로 바로 픽업 가능',
    description: 'QR코드 스캔으로\n간편하게 상품을 픽업할 수 있어요',
  },
];

export const OnboardingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (endX: number) => {
    if (startX === null) return;
    const diff = startX - endX;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) setCurrentIndex((i) => Math.min(i + 1, SLIDES.length - 1));
    else setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const handleTouchStart = (e: React.TouchEvent) =>
    setStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    handleDragEnd(e.changedTouches[0].clientX);
    setStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleDragEnd(e.clientX);
    setStartX(null);
    setIsDragging(false);
  };
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleDragEnd(e.clientX);
    setStartX(null);
    setIsDragging(false);
  };

  return (
    <div
      className={`flex flex-col bg-background-white-muted select-none  ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative w-full overflow-hidden bg-surface-inverse`}
        style={{ height: 'min(95vw, 440px)' }}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <div key={i} className="relative w-full min-w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-contain"
                priority={i === 0}
                onDragStart={(e) => e.preventDefault()}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 텍스트 + 페이지네이션 */}
      <div className="flex flex-col items-center gap-g7 pt-g6">
        <div className="flex flex-col items-center gap-g2 text-center px-4">
          <p className="heading-lg-bold text-text-subtle">
            {SLIDES[currentIndex].title}
          </p>
          <p className="body-lg-medium text-text-tertiary whitespace-pre-line">
            {SLIDES[currentIndex].description}
          </p>
        </div>
        <div className="flex gap-g2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-4.75 bg-button-natural'
                  : 'w-1.5 bg-surface-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

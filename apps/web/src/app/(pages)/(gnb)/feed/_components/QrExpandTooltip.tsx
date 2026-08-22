export const QrExpandTooltip = () => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-0 h-0"
        style={{
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderBottom: '8px solid var(--color-surface-inverse)',
        }}
      />
      <div className="bg-surface-inverse rounded-medium px-3 py-1 inline-flex justify-center items-center">
        <span className="caption-sm-medium font-pretendard text-text-basic-inverse whitespace-nowrap">
          QR코드를 클릭하면 크게 볼 수 있어요
        </span>
      </div>
    </div>
  );
};

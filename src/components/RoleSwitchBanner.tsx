interface RoleSwitchBannerProps {
  label: string;
  onClick: () => void;
  isOn?: boolean;
  disabled?: boolean;
}

export function RoleSwitchBanner({
  label,
  onClick,
  isOn = false,
  disabled,
}: RoleSwitchBannerProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex w-full items-center justify-between bg-surface-brand-lighter px-p6 py-p5"
    >
      <span className="body-md-semibold text-text-brand">{label}</span>
      <div
        className={`flex h-[26px] w-[50px] items-center rounded-full px-[2px] transition-all ${
          isOn
            ? 'justify-end bg-button-primary-fill'
            : 'justify-start bg-border-default'
        }`}
      >
        <div className="h-[22px] w-[22px] rounded-full bg-white" />
      </div>
    </button>
  );
}

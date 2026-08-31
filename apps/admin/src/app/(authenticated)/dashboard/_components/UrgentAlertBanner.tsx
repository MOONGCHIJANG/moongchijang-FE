interface UrgentAlertBannerProps {
  title: string;
  description: string;
}

export function UrgentAlertBanner({
  title,
  description,
}: UrgentAlertBannerProps) {
  return (
    <div className="flex items-start gap-g6 rounded-large bg-primary-50 p-p6">
      <svg
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
        className="mt-0.5 shrink-0"
        aria-hidden="true"
      >
        <mask
          id="urgent-alert-mask"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="21"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 1L1 20H23L12 1Z"
            fill="white"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 16V16.5M12 8L12.004 13"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </mask>
        <g mask="url(#urgent-alert-mask)">
          <path d="M0 -1.5H24V22.5H0V-1.5Z" fill="#FF002B" />
        </g>
      </svg>
      <div className="flex flex-col gap-g2">
        <h2 className="heading-lg-semibold text-accent-red-500">{title}</h2>
        <p className="heading-sm-medium text-accent-red-500">{description}</p>
      </div>
    </div>
  );
}

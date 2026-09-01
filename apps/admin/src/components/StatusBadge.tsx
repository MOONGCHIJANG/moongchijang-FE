interface StatusBadgeProps {
  label: string;
}

export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center justify-center gap-g3 rounded-medium bg-primary-400 px-[7px] py-[5px] body-sm-bold text-bg-white">
      {label}
    </span>
  );
}

import { Icon } from '@iconify/react';

interface ToastToolTipProps {
  text: string;
}

const ToastToolTip = ({ text }: ToastToolTipProps) => {
  return (
    <div
      className="inline-flex flex-col items-center"
      style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.20))' }}
    >
      <div className="px-3 py-2 bg-surface-white rounded-full flex items-center gap-0.5">
        <Icon
          icon="material-symbols-light:bolt-rounded"
          className="w-6 h-6 text-icon-primary"
        />
        <span className="text-text-subtle caption-sm-medium">{text}</span>
      </div>
      <div
        className="w-3.5 h-2 bg-surface-white"
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
      />
    </div>
  );
};

export default ToastToolTip;

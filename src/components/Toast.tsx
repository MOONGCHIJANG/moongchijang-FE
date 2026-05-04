type Props = {
  children: React.ReactNode;
};

const Toast = ({ children }: Props) => {
  return (
    <div className="px-p5 py-p3 border border-border-brand rounded-full bg-surface-brand-lighter text-text-brand">
      {children}
    </div>
  );
};

export default Toast;

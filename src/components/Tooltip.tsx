import React from 'react';

type TooltipProps = {
  text: string;
};

const Tooltip = ({ text }: TooltipProps) => {
  return (
    <div className="absolute top-full mt-1 z-50 -right-3 flex flex-col items-end">
      <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-surface-brand mr-12" />
      <div className="bg-surface-brand px-3 py-1 rounded-md">
        <p className="text-text-basic-inverse text-xs font-medium leading-4 whitespace-nowrap">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Tooltip;

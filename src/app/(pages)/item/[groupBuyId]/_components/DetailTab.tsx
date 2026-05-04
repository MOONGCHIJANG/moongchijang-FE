'use client';

type DetailTabProps = {
  activeTab: 'description' | 'guidelines';
  onTabClick: (tab: 'description' | 'guidelines') => void;
};

const DetailTab = ({ activeTab, onTabClick }: DetailTabProps) => {
  return (
    <div className="flex sticky top-0 z-5 bg-bg-white">
      <button
        className={`flex-1 text-center pt-p6 pb-p5 cursor-pointer transition-colors duration-150 font-medium text-base ${
          activeTab === 'description'
            ? 'text-text-basic border-b-2 border-button-natural body-md-bold'
            : 'text-text-tertiary body-md-regular'
        }`}
        onClick={() => onTabClick('description')}
        tabIndex={0}
        type="button"
      >
        상품 설명
      </button>
      <button
        className={`flex-1 text-center pt-p6 pb-p5 cursor-pointer transition-colors duration-150 font-medium text-base ${
          activeTab === 'guidelines'
            ? 'text-text-basic border-b-2 border-button-natural body-md-bold'
            : 'text-text-tertiary body-md-regular'
        }`}
        onClick={() => onTabClick('guidelines')}
        tabIndex={0}
        type="button"
      >
        유의 사항
      </button>
    </div>
  );
};

export default DetailTab;

import React from 'react';

const DetailTab = () => {
  return (
    <div className="flex">
      <button className="flex-1 text-center pt-p6 pb-p5 text-text-basic border-b-2 border-button-natural cursor-pointer">
        상품 설명
      </button>
      <button className="flex-1 text-center pt-p6 pb-p5 text-text-tertiary cursor-pointer">
        유의 사항
      </button>
    </div>
  );
};

export default DetailTab;

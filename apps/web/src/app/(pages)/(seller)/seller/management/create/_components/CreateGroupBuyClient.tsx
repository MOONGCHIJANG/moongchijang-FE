'use client';

// TODO(함께사기): 11.1 상품 설정(단가·최소/최대 수량·준비기간·픽업 시간대·휴무일)은
// 어드민에서 관리하며, 사장님은 상품을 직접 등록하지 않음

export function CreateGroupBuyClient() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-5 py-20">
      <p className="heading-md-bold text-text-basic">공구 개설</p>
      <p className="body-sm-regular text-text-tertiary text-center">
        준비 중인 화면이에요
      </p>
    </div>
  );
}

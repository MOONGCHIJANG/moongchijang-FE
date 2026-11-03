'use client';

// TODO(함께사기): 11.2.1 사장님 화면을 픽업일·시간대별 확정 주문 목록 중심으로 전면 교체
// - 승인대기 상세, 기간 연장, 조기마감(공구 마감) 플로우는 신규 명세에서 삭제됨
// - 참여자 개별 명단(이름·연락처)은 총대 정보만 노출하는 구조로 대체됨

type Props = {
  groupBuyId: number;
  unitPrice?: number;
  status?: string;
  requestId?: number;
};

export function ManageDetailClient(props: Props) {
  void props;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 bg-bg-white-muted px-5 py-20">
      <p className="heading-md-bold text-text-basic">공구 상세</p>
      <p className="body-sm-regular text-text-tertiary text-center">
        준비 중인 화면이에요
      </p>
    </div>
  );
}

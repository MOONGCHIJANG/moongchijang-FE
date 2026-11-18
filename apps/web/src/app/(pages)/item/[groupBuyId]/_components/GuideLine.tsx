import type { ReactNode } from 'react';

interface GuideSection {
  title: string;
  items: ReactNode[];
}

const GUIDE_SECTIONS: GuideSection[] = [
  {
    title: '주문과 결제',
    items: [
      <>
        최소 수량이 모이기 전에는 <b>아무도 결제하지 않아요</b>. 모이지 않으면
        방이 닫히고 나가는 돈도 없어요.
      </>,
      <>
        최소 수량이 모이면 참여자 확약을 받고,{' '}
        <b>총대(대표 구매자) 1명이 매장에 전체 금액을 결제해요.</b>
      </>,
      '결제가 끝나면 매장이 바로 제작을 시작해서 취소·환불은 매장 정책에 따라요.',
    ],
  },
  {
    title: '정산',
    items: [
      <>
        참여자는 총대에게 <b>계좌이체로 각자 몫을 보내요</b>. 금액은 뭉치장이
        계산해서 고정해요.
      </>,
      <>
        뭉치장은 <b>어떤 대금도 받지 않아요.</b> 이용자 간 송금에 관여하지 않고
        환불·중재도 하지 않아요.
      </>,
      <>
        정산 마감은 <b>픽업 24시간 전</b>이에요. 그때까지 보내지 않으면 그
        수량은 총대 몫이 돼요.
      </>,
    ],
  },
  {
    title: '픽업',
    items: [
      <>
        픽업은 <b>총대 1명이 QR</b>로 받아요. 참여자는 총대에게 나눠 받아요.
      </>,
      '픽업 시간 안에 방문하지 않으면 매장 정책에 따라요.',
      <>
        받은 상품을 <b>되팔거나 다시 나눠 파는 것은 금지</b>돼 있어요.
      </>,
    ],
  },
];

const GuideLine = () => {
  return (
    <div className="flex flex-col gap-3.5 px-p6 pt-3.5 pb-p10 bg-bg-white">
      {/* TODO: 임시 제목 — 디자인 확정 시 문구·스타일 변경 가능 */}
      <p className="heading-md-bold">뭉치장 유의사항</p>

      {GUIDE_SECTIONS.map(({ title, items }) => (
        <section key={title} className="flex flex-col">
          <p className="body-sm-bold text-text-basic">{title}</p>
          <ul className="flex flex-col pt-1.5 body-sm-medium text-text-tertiary [&_b]:font-bold">
            {items.map((item, index) => (
              <li key={index} className="relative pl-2.5">
                <span
                  aria-hidden
                  className="absolute left-0 font-bold text-text-subtle"
                >
                  ·
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="pt-2.5 border-t border-border-default caption-xs-medium text-text-subtle-inverse">
        <p>
          뭉치장은 통신판매중개자이며 판매 당사자가 아닙니다. 판매자는 각
          매장이며 상품 대금은 매장 계좌로 직접 정산됩니다. 상품의
          품질·픽업·환불 책임은 매장과 총대에게 있습니다.
        </p>
        {/* TODO: 통신판매업 신고번호 확정 시 교체 */}
        <p>
          뭉치장 · 사업자등록번호 104-30-52578 · 통신판매업 신고 [번호] ·
          중개수수료 0원
        </p>
      </div>
    </div>
  );
};

export default GuideLine;

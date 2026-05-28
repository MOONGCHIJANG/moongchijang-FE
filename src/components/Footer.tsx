'use client';

const Footer = () => {
  const handleCSClick = () => {
    window.open('https://pf.kakao.com/_MdICX', '_blank');
  };
  const handleDocClick = () => {
    window.open(
      'https://extreme-moonstone-8ae.notion.site/357b0b17e91680a5b347ec201facc3e8',
      '_blank',
    );
  };
  const handleRegInfoClick = () => {
    // 추후 링크 연결
  };

  const handleBizNumClick = () => {
    window.open('https://www.ftc.go.kr/www/bizContents.do?key=253', '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:moongchijang@gmail.com';
  };

  return (
    <footer className="px-g6 pt-g6 pb-32 flex flex-col gap-3 text-text-subtle caption-sm-medium">
      <div className="flex gap-p6 items-center">
        <button onClick={handleCSClick}>고객센터</button>
        <div className="border-l border-text-subtle h-4" />
        <button onClick={handleDocClick}>이용약관</button>
        <div className="border-l border-text-subtle h-4" />
        <button onClick={handleDocClick}>개인정보처리방침</button>
        <div className="border-l border-text-subtle h-4" />
        <button>안전거래센터</button>
      </div>
      <div className="whitespace-pre-line">
        {`뭉치장에서 운영하는 단체구매는 각 매장(판매자)과 소비자를 연결하는 중개 서비스입니다. 뭉치장은 통신판매중개업자로서 통신판매의 당사자가 아니며, 상품의 제조·품질 및 픽업 운영 등과 관련한 의무와 책임은 각 매장에 있습니다.

          © 뭉치장
          대표이사 유자인 | 경기도 안양시 동안구 시민대로 327번길 11-41 안양창업지원센터 동안청년오피스 3973호
          사업자등록번호 104-30-52578 `}
        <span
          role="button"
          tabIndex={0}
          onClick={handleRegInfoClick}
          className="underline cursor-pointer inline-block"
        >
          등록정보확인
        </span>
        {`
          통신판매업신고번호 `}
        <span
          role="button"
          tabIndex={0}
          onClick={handleBizNumClick}
          className="underline cursor-pointer inline-block"
        >
          제0000-[지역]-0000호
        </span>
        {`
          호스팅서비스사업자 AWS
          구매안전서비스 토스 페이먼츠
          이메일`}
        <span
          role="button"
          tabIndex={0}
          onClick={handleEmailClick}
          className="underline cursor-pointer inline-block"
        >
          moongchijang@gmail.com
        </span>
        {`
          고객센터 050-6123-3207
          상담가능시간: 평일 10:00-18:00 (※ 점심시간 12:00- 13:00)
        `}
      </div>
    </footer>
  );
};

export default Footer;

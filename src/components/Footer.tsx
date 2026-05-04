const Footer = () => {
  return (
    <footer className="px-g6 pt-g6 pb-32 flex flex-col gap-g4 text-text-subtle">
      <div className="flex gap-p6 items-center">
        <button>고객센터</button>
        <div className="w-px h-4 bg-text-subtle" />
        <button>이용약관</button>
        <div className="w-px h-4 bg-text-subtle" />
        <button>개인정보처리방침</button>
        <div className="w-px h-4 bg-text-subtle" />
        <button>안전거래센터</button>
      </div>
      <div className="whitespace-pre-line">
        {`
          뭉치장에서 운영하는 단체구매는 각 매장(판매자)과 소비자를 연결하는 중개 서비스입니다. 뭉치장은 통신판매중개업자로서 통신판매의 당사자가 아니며, 상품의 제조·품질 및 픽업 운영 등과 관련한 의무와 책임은 각 매장에 있습니다.

          © 뭉치장
          대표이사[이름]
          주소[사업자 주소]
          사업자등록번호[000-00-00000] 
          등록정보확인통신판매업신고번호 제0000-[지역]-0000호
          호스팅서비스사업자 [AWS / NCP 등]
          구매안전서비스 [에스크로 은행] 
          이메일[cs@도메인.com]
          고객센터 [전화번호]
          상담가능시간: 평일 10:0018:00 (※ 점심시간 12:00- 13:00)
        `}
      </div>
    </footer>
  );
};

export default Footer;

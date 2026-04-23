export interface Region {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  regions: Region[];
}

export const REGIONS_DATA: City[] = [
  {
    id: 'national',
    name: '전국',
    regions: [{ id: 'national-all', name: '전국' }],
  },
  {
    id: 'seoul',
    name: '서울',
    regions: [
      { id: 'seoul-all', name: '서울 전체' },
      { id: 'gangnam', name: '강남 | 역삼 | 삼성' },
      { id: 'sinsa', name: '신사 | 압구정 | 청담' },
      { id: 'seocho', name: '서초 | 방배 | 교대' },
      { id: 'jamsil', name: '잠실 | 신천 | 송파' },
      { id: 'jongno', name: '종로 | 중구 | 을지로 | 명동' },
      { id: 'hongdae', name: '홍대 | 합정 | 상수 | 마포' },
      { id: 'seongsu', name: '성수 | 건대 | 자양' },
      { id: 'magok', name: '마곡 | 강서 | 화곡' },
      { id: 'yeongdeungpo', name: '영등포 | 여의도' },
      { id: 'nowon', name: '노원 | 도봉 | 강북' },
      { id: 'other-seoul', name: '기타 서울 지역' },
    ],
  },
  {
    id: 'gyeonggi',
    name: '경기',
    regions: [
      { id: 'gyeonggi-all', name: '경기 전체' },
      { id: 'suwon', name: '수원 | 영통 | 광교' },
      { id: 'hanam', name: '하남 | 미사 | 판교' },
      { id: 'guri', name: '구리 | 남양주' },
      { id: 'yongin', name: '용인 | 수지 | 기흥' },
      { id: 'bucheon', name: '부천 | 광명 | 시흥' },
      { id: 'ansan', name: '안산 | 안양 | 군포' },
      { id: 'namyangju', name: '남양주 | 다산 | 별내' },
      { id: 'paju', name: '안성 | 평택 | 오산' },
      { id: 'hwasung', name: '화성 | 동탄' },
      { id: 'paju-unjeong', name: '파주 | 운정' },
      { id: 'other-gyeonggi', name: '기타 경기 지역' },
    ],
  },
  {
    id: 'incheon',
    name: '인천',
    regions: [
      { id: 'incheon-all', name: '인천 전체' },
      { id: 'songdo', name: '송도 | 연수' },
      { id: 'guwol', name: '구월 | 남동' },
      { id: 'bupyeong', name: '부평 | 계양' },
      { id: 'cheongna', name: '청라 | 서구' },
      { id: 'juwan', name: '주안 | 미추홀' },
      { id: 'yeongjong', name: '영종도 | 중구' },
    ],
  },
  {
    id: 'gangwon',
    name: '강원',
    regions: [
      { id: 'gangwon-all', name: '강원 전체' },
      { id: 'chuncheon', name: '춘천' },
      { id: 'wonju', name: '원주' },
      { id: 'gangneung', name: '강릉' },
      { id: 'sokcho', name: '속초 | 양양' },
      { id: 'donghae', name: '동해 | 삼척' },
      { id: 'other-gangwon', name: '기타 강원 지역' },
    ],
  },
  {
    id: 'daejeon',
    name: '대전',
    regions: [
      { id: 'daejeon-all', name: '대전 전체' },
      { id: 'dunsan', name: '둔산 | 서구' },
      { id: 'eunhaeng', name: '은행 | 대흥 | 중구' },
      { id: 'yuseong', name: '유성 | 도안' },
      { id: 'daedeok', name: '대덕' },
      { id: 'donggu', name: '동구' },
    ],
  },
  {
    id: 'sejong',
    name: '세종',
    regions: [{ id: 'sejong-all', name: '세종 전체' }],
  },
  {
    id: 'chungnam',
    name: '충남',
    regions: [
      { id: 'chungnam-all', name: '충남 전체' },
      { id: 'cheonan', name: '천안 | 신부 | 두정' },
      { id: 'asan', name: '아산 | 배방' },
      { id: 'dangjin', name: '당진' },
      { id: 'seosan', name: '서산' },
      { id: 'gyeryong', name: '계룡 | 논산' },
      { id: 'other-chungnam', name: '기타 충남 지역' },
    ],
  },
  {
    id: 'chungbuk',
    name: '충북',
    regions: [
      { id: 'chungbuk-all', name: '충북 전체' },
      { id: 'cheongju', name: '청주 | 성안 | 복대' },
      { id: 'chungju', name: '충주' },
      { id: 'jecheon', name: '제천' },
      { id: 'other-chungbuk', name: '기타 충북 지역' },
    ],
  },
  {
    id: 'busan',
    name: '부산',
    regions: [
      { id: 'busan-all', name: '부산 전체' },
      { id: 'seomyeon', name: '서면 | 전포 | 범구' },
      { id: 'haeundae', name: '해운대 | 센텀 | 마린시티' },
      { id: 'gwangan', name: '광안리 | 수영 | 남천' },
      { id: 'nampo', name: '남포 | 중앙 | 영도' },
      { id: 'dongrae', name: '동래 | 연산 | 부산대' },
      { id: 'sasang', name: '사상 | 하단' },
      { id: 'other-busan', name: '기타 부산 지역' },
    ],
  },
  {
    id: 'ulsan',
    name: '울산',
    regions: [
      { id: 'ulsan-all', name: '울산 전체' },
      { id: 'sam-san', name: '삼산 | 달동 | 남구' },
      { id: 'seongnam-ulsan', name: '성남 | 중구' },
      { id: 'donggu-ulsan', name: '동구' },
      { id: 'bukgu-ulsan', name: '북구' },
      { id: 'ulju', name: '울주' },
    ],
  },
  {
    id: 'gyeongnam',
    name: '경남',
    regions: [
      { id: 'gyeongnam-all', name: '경남 전체' },
      { id: 'changwon', name: '창원 | 상남 | 마산' },
      { id: 'gimhae', name: '김해' },
      { id: 'yangsan', name: '양산' },
      { id: 'jinju', name: '진주' },
      { id: 'geoje', name: '거제 | 통영' },
      { id: 'other-gyeongnam', name: '기타 경남 지역' },
    ],
  },
  {
    id: 'gyeongbuk',
    name: '경북',
    regions: [
      { id: 'gyeongbuk-all', name: '경북 전체' },
      { id: 'pohang', name: '포항' },
      { id: 'gyeongju', name: '경주 | 황리단길' },
      { id: 'gumi', name: '구미' },
      { id: 'gyeongsan', name: '경산' },
      { id: 'andong', name: '안동' },
      { id: 'other-gyeongbuk', name: '기타 경북 지역' },
    ],
  },
  {
    id: 'daegu',
    name: '대구',
    regions: [
      { id: 'daegu-all', name: '대구 전체' },
      { id: 'dongseongro', name: '동성로 | 중구' },
      { id: 'suseong', name: '수성구 | 범어' },
      { id: 'sangin', name: '상인 | 달서구' },
      { id: 'chil-gok', name: '칠곡 | 북구' },
      { id: 'donggu-daegu', name: '동구' },
      { id: 'other-daegu', name: '기타 대구 지역' },
    ],
  },
  {
    id: 'gwangju',
    name: '광주',
    regions: [
      { id: 'gwangju-all', name: '광주 전체' },
      { id: 'sangmu', name: '상무지구 | 치평 | 서구' },
      { id: 'chungjang', name: '충장로 | 동명 | 동구' },
      { id: 'suwan', name: '수완 | 첨단 | 광산구' },
      { id: 'bongseon', name: '봉선 | 남구' },
      { id: 'bukgu-gwangju', name: '북구' },
    ],
  },
  {
    id: 'jeonnam',
    name: '전남',
    regions: [
      { id: 'jeonnam-all', name: '전남 전체' },
      { id: 'yeosu', name: '여수' },
      { id: 'suncheon', name: '순천' },
      { id: 'mokpo', name: '목포 | 남악' },
      { id: 'naju', name: '나주' },
      { id: 'other-jeonnam', name: '기타 전남 지역' },
    ],
  },
  {
    id: 'jeonbuk',
    name: '전북',
    regions: [
      { id: 'jeonbuk-all', name: '전북 전체' },
      { id: 'jeonju', name: '전주 | 객리단길 | 효자' },
      { id: 'iksan', name: '익산' },
      { id: 'gunsan', name: '군산' },
      { id: 'other-jeonbuk', name: '기타 전북 지역' },
    ],
  },
  {
    id: 'jeju',
    name: '제주',
    regions: [
      { id: 'jeju-all', name: '제주 전체' },
      { id: 'jeju-si', name: '제주시' },
      { id: 'yeondong', name: '제원 | 연동' },
      { id: 'nohyeong', name: '노형 | 구제주' },
      { id: 'seogwipo', name: '서귀포시' },
      { id: 'jungmun', name: '중문 | 안덕' },
      { id: 'sungsan', name: '성산 | 표선' },
    ],
  },
];

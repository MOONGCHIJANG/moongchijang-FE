import { DistrictType, RegionType } from '@/api/generated/api.schemas';

export interface Region {
  districtType: DistrictType;
  name: string;
}

export interface City {
  regionType: RegionType;
  name: string;
  regions: Region[];
}

export const REGIONS_DATA: City[] = [
  {
    regionType: 'NATIONWIDE',
    name: '전국',
    regions: [{ districtType: 'NATIONWIDE', name: '전국' }],
  },
  {
    regionType: 'SEOUL',
    name: '서울',
    regions: [
      { districtType: 'SEOUL_ALL', name: '서울 전체' },
      {
        districtType: 'SEOUL_GANGNAM_YEOKSAM_SAMSEONG',
        name: '강남 | 역삼 | 삼성',
      },
      {
        districtType: 'SEOUL_SINSA_APGUJEONG_CHEONGDAM',
        name: '신사 | 압구정 | 청담',
      },
      {
        districtType: 'SEOUL_SEOCHO_BANGBAE_GYODAE',
        name: '서초 | 방배 | 교대',
      },
      {
        districtType: 'SEOUL_JAMSIL_SINCHEON_SONGPA',
        name: '잠실 | 신천 | 송파',
      },
      {
        districtType: 'SEOUL_JONGNO_JUNGGU_EULJIRO_MYEONGDONG',
        name: '종로 | 중구 | 을지로 | 명동',
      },
      {
        districtType: 'SEOUL_HONGDAE_HAPJEONG_SANGSU_MAPO',
        name: '홍대 | 합정 | 상수 | 마포',
      },
      {
        districtType: 'SEOUL_SEONGSU_GEONDAE_GWANGJIN',
        name: '성수 | 건대 | 광진',
      },
      {
        districtType: 'SEOUL_ITAEWON_HANNAM_YONGSAN',
        name: '이태원 | 한남 | 용산',
      },
      { districtType: 'SEOUL_YEONGDEUNGPO_YEOUIDO', name: '영등포 | 여의도' },
      {
        districtType: 'SEOUL_NOWON_DOBONG_GANGBUK',
        name: '노원 | 도봉 | 강북',
      },
      { districtType: 'SEOUL_ETC', name: '기타 서울 지역' },
    ],
  },
  {
    regionType: 'GYEONGGI',
    name: '경기',
    regions: [
      { districtType: 'GYEONGGI_ALL', name: '경기 전체' },
      {
        districtType: 'GYEONGGI_SUWON_YEONGTONG_PALDAL',
        name: '수원 | 영통 | 팔달',
      },
      {
        districtType: 'GYEONGGI_SEONGNAM_BUNDANG_PANGYO',
        name: '성남 | 분당 | 판교',
      },
      { districtType: 'GYEONGGI_GOYANG_ILSAN', name: '고양 | 일산' },
      {
        districtType: 'GYEONGGI_YONGIN_SUJI_GIHEUNG',
        name: '용인 | 수지 | 기흥',
      },
      {
        districtType: 'GYEONGGI_BUCHEON_JUNGDONG_SANGDONG',
        name: '부천 | 중동 | 상동',
      },
      {
        districtType: 'GYEONGGI_ANSAN_DANWON_SANGROK',
        name: '안산 | 단원 | 상록',
      },
      {
        districtType: 'GYEONGGI_NAMYANGJU_DASAN_BYEOLNAE',
        name: '남양주 | 다산 | 별내',
      },
      {
        districtType: 'GYEONGGI_ANYANG_PYEONGCHON_BEOMGYE',
        name: '안양 | 평촌 | 범계',
      },
      { districtType: 'GYEONGGI_HWASEONG_DONGTAN', name: '화성 | 동탄' },
      { districtType: 'GYEONGGI_PAJU_UNJEONG', name: '파주 | 운정' },
      { districtType: 'GYEONGGI_ETC', name: '기타 경기 지역' },
    ],
  },
  {
    regionType: 'INCHEON',
    name: '인천',
    regions: [
      { districtType: 'INCHEON_ALL', name: '인천 전체' },
      { districtType: 'INCHEON_SONGDO_YEONSU', name: '송도 | 연수' },
      { districtType: 'INCHEON_GUWOL_NAMDONG', name: '구월 | 남동' },
      { districtType: 'INCHEON_BUPYEONG_GYEYANG', name: '부평 | 계양' },
      { districtType: 'INCHEON_CHEONGNA_SEOGU', name: '청라 | 서구' },
      { districtType: 'INCHEON_JUAN_MICHUHOL', name: '주안 | 미추홀' },
      { districtType: 'INCHEON_YEONGJONGDO_JUNGGU', name: '영종도 | 중구' },
    ],
  },
  {
    regionType: 'GANGWON',
    name: '강원',
    regions: [
      { districtType: 'GANGWON_ALL', name: '강원 전체' },
      { districtType: 'GANGWON_CHUNCHEON', name: '춘천' },
      { districtType: 'GANGWON_WONJU', name: '원주' },
      { districtType: 'GANGWON_GANGNEUNG', name: '강릉' },
      { districtType: 'GANGWON_SOKCHO_YANGYANG', name: '속초 | 양양' },
      { districtType: 'GANGWON_DONGHAE_SAMCHEOK', name: '동해 | 삼척' },
      { districtType: 'GANGWON_ETC', name: '기타 강원 지역' },
    ],
  },
  {
    regionType: 'DAEJEON',
    name: '대전',
    regions: [
      { districtType: 'DAEJEON_ALL', name: '대전 전체' },
      { districtType: 'DAEJEON_DUNSAN_SEOGU', name: '둔산 | 서구' },
      {
        districtType: 'DAEJEON_EUNHAENG_DAEHEUNG_JUNGGU',
        name: '은행 | 대흥 | 중구',
      },
      { districtType: 'DAEJEON_YUSEONG_DOAN', name: '유성 | 도안' },
      { districtType: 'DAEJEON_DONGGU', name: '동구' },
      { districtType: 'DAEJEON_DAEDEOK', name: '대덕' },
    ],
  },
  {
    regionType: 'SEJONG',
    name: '세종',
    regions: [{ districtType: 'SEJONG_ALL', name: '세종 전체' }],
  },
  {
    regionType: 'CHUNGNAM',
    name: '충남',
    regions: [
      { districtType: 'CHUNGNAM_ALL', name: '충남 전체' },
      {
        districtType: 'CHUNGNAM_CHEONAN_SINBU_DUJEONG',
        name: '천안 | 신부 | 두정',
      },
      { districtType: 'CHUNGNAM_ASAN_TANGJEONG', name: '아산 | 탕정' },
      { districtType: 'CHUNGNAM_DANGJIN', name: '당진' },
      { districtType: 'CHUNGNAM_SEOSAN', name: '서산' },
      { districtType: 'CHUNGNAM_GYERYONG_NONSAN', name: '계룡 | 논산' },
      { districtType: 'CHUNGNAM_ETC', name: '기타 충남 지역' },
    ],
  },
  {
    regionType: 'CHUNGBUK',
    name: '충북',
    regions: [
      { districtType: 'CHUNGBUK_ALL', name: '충북 전체' },
      {
        districtType: 'CHUNGBUK_CHEONGJU_SANGDANG_HEUNGDEOK',
        name: '청주 | 상당 | 흥덕',
      },
      { districtType: 'CHUNGBUK_CHUNGJU', name: '충주' },
      { districtType: 'CHUNGBUK_JECHEON', name: '제천' },
      { districtType: 'CHUNGBUK_EUMSEONG_JINCHEON', name: '음성 | 진천' },
      { districtType: 'CHUNGBUK_ETC', name: '기타 충북 지역' },
    ],
  },
  {
    regionType: 'BUSAN',
    name: '부산',
    regions: [
      { districtType: 'BUSAN_ALL', name: '부산 전체' },
      {
        districtType: 'BUSAN_SEOMYEON_JEONPO_JINGU',
        name: '서면 | 전포 | 진구',
      },
      {
        districtType: 'BUSAN_HAEUNDAE_CENTUM_MARINE_CITY',
        name: '해운대 | 센텀 | 마린시티',
      },
      {
        districtType: 'BUSAN_GWANGALLI_SUYEONG_NAMCHEON',
        name: '광안리 | 수영 | 남천',
      },
      {
        districtType: 'BUSAN_NAMPO_JUNGGU_YEONGDO',
        name: '남포 | 중구 | 영도',
      },
      {
        districtType: 'BUSAN_DONGRAE_YEONSAN_BUSANDAE',
        name: '동래 | 연산 | 부산대',
      },
      { districtType: 'BUSAN_SAHA_HADAN', name: '사하 | 하단' },
      { districtType: 'BUSAN_ETC', name: '기타 부산 지역' },
    ],
  },
  {
    regionType: 'ULSAN',
    name: '울산',
    regions: [
      { districtType: 'ULSAN_ALL', name: '울산 전체' },
      {
        districtType: 'ULSAN_SAMSAN_DALDONG_NAMGU',
        name: '삼산 | 달동 | 남구',
      },
      { districtType: 'ULSAN_SEONGNAM_JUNGGU', name: '성남 | 중구' },
      { districtType: 'ULSAN_DONGGU', name: '동구' },
      { districtType: 'ULSAN_BUKGU', name: '북구' },
      { districtType: 'ULSAN_ULJU', name: '울주' },
    ],
  },
  {
    regionType: 'GYEONGNAM',
    name: '경남',
    regions: [
      { districtType: 'GYEONGNAM_ALL', name: '경남 전체' },
      {
        districtType: 'GYEONGNAM_CHANGWON_SANGNAM_UICHANG',
        name: '창원 | 상남 | 의창',
      },
      { districtType: 'GYEONGNAM_GIMHAE', name: '김해' },
      { districtType: 'GYEONGNAM_YANGSAN', name: '양산' },
      { districtType: 'GYEONGNAM_JINJU', name: '진주' },
      { districtType: 'GYEONGNAM_GEOJE_TONGYEONG', name: '거제 | 통영' },
      { districtType: 'GYEONGNAM_ETC', name: '기타 경남 지역' },
    ],
  },
  {
    regionType: 'GYEONGBUK',
    name: '경북',
    regions: [
      { districtType: 'GYEONGBUK_ALL', name: '경북 전체' },
      { districtType: 'GYEONGBUK_POHANG', name: '포항' },
      {
        districtType: 'GYEONGBUK_GYEONGJU_HWANGRIDAN_GIL',
        name: '경주 | 황리단길',
      },
      { districtType: 'GYEONGBUK_GUMI', name: '구미' },
      { districtType: 'GYEONGBUK_GYEONGSAN', name: '경산' },
      { districtType: 'GYEONGBUK_ANDONG', name: '안동' },
      { districtType: 'GYEONGBUK_ETC', name: '기타 경북 지역' },
    ],
  },
  {
    regionType: 'DAEGU',
    name: '대구',
    regions: [
      { districtType: 'DAEGU_ALL', name: '대구 전체' },
      { districtType: 'DAEGU_DONGSEONGNO_JUNGGU', name: '동성로 | 중구' },
      { districtType: 'DAEGU_SUSEONGGU_BEOMEO', name: '수성구 | 범어' },
      { districtType: 'DAEGU_SANGIN_DALSEO', name: '상인 | 달서' },
      { districtType: 'DAEGU_CHILGOK_BUKGU', name: '칠곡 | 북구' },
      { districtType: 'DAEGU_DONGGU', name: '동구' },
      { districtType: 'DAEGU_ETC', name: '기타 대구 지역' },
    ],
  },
  {
    regionType: 'GWANGJU',
    name: '광주',
    regions: [
      { districtType: 'GWANGJU_ALL', name: '광주 전체' },
      {
        districtType: 'GWANGJU_SANGMU_JIGYEONG_SEOGU',
        name: '상무지구 | 치평 | 서구',
      },
      {
        districtType: 'GWANGJU_DONGMYEONGDONG_CHUNGJANGRO_DONGGU',
        name: '동명동 | 충장로 | 동구',
      },
      {
        districtType: 'GWANGJU_SUWAN_CHEOMDAN_GWANGSANGU',
        name: '수완 | 첨단 | 광산구',
      },
      { districtType: 'GWANGJU_BONGSEON_NAMGU', name: '봉선 | 남구' },
      { districtType: 'GWANGJU_BUKGU', name: '북구' },
    ],
  },
  {
    regionType: 'JEONNAM',
    name: '전남',
    regions: [
      { districtType: 'JEONNAM_ALL', name: '전남 전체' },
      { districtType: 'JEONNAM_YEOSU', name: '여수' },
      { districtType: 'JEONNAM_SUNCHEON', name: '순천' },
      { districtType: 'JEONNAM_MOKPO_NAMAK', name: '목포 | 남악' },
      { districtType: 'JEONNAM_NAJU', name: '나주' },
      { districtType: 'JEONNAM_ETC', name: '기타 전남 지역' },
    ],
  },
  {
    regionType: 'JEONBUK',
    name: '전북',
    regions: [
      { districtType: 'JEONBUK_ALL', name: '전북 전체' },
      {
        districtType: 'JEONBUK_JEONJU_GAEKRIDANGIL_WANSAN',
        name: '전주 | 객리단길 | 완산',
      },
      { districtType: 'JEONBUK_IKSAN', name: '익산' },
      { districtType: 'JEONBUK_GUNSAN', name: '군산' },
      { districtType: 'JEONBUK_ETC', name: '기타 전북 지역' },
    ],
  },
  {
    regionType: 'JEJU',
    name: '제주',
    regions: [
      { districtType: 'JEJU_ALL', name: '제주 전체' },
      { districtType: 'JEJU_JEJU_SI', name: '제주시' },
      { districtType: 'JEJU_AEWOL_HALLIM', name: '애월 | 한림' },
      { districtType: 'JEJU_JOCHEON_GUJWA', name: '조천 | 구좌' },
      { districtType: 'JEJU_SEOGWIPO_SI', name: '서귀포시' },
      { districtType: 'JEJU_JUNGMUN_ANDEOK', name: '중문 | 안덕' },
      { districtType: 'JEJU_SEONGSAN_PYOSEON', name: '성산 | 표선' },
    ],
  },
];

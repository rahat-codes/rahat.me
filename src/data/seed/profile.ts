import { ProfileData } from '@/types/portfolio';

export const seedProfile: ProfileData = {
  name: {
    en: 'Rahat Md Mahadi Hasan',
    ko: '라하트 마하디 하산',
    bn: 'রাহাত মো. মেহেদী হাসান',
  },
  title: {
    en: 'AI & Computer Engineering Student',
    ko: 'AI 및 컴퓨터공학 전공생',
    bn: 'এআই ও কম্পিউটার ইঞ্জিনিয়ারিং শিক্ষার্থী',
  },
  location: {
    en: 'Busan, South Korea',
    ko: '대한민국 부산',
    bn: 'বুসান, দক্ষিণ কোরিয়া',
  },
  email: 'rahatmdmahadihasan@gmail.com',
  github: 'https://github.com/rahat-codes',
  linkedin: 'https://www.linkedin.com/in/rahat-md-mahadi-hasan',
  tagline: {
    en: 'Building reliable AI systems and the apps around them.',
    ko: '신뢰할 수 있는 AI 시스템과 이를 둘러싼 애플리케이션을 구축합니다.',
    bn: 'নির্ভরযোগ্য এআই সিস্টেম এবং তার চারপাশের অ্যাপ্লিকেশন তৈরি করছি।',
  },
  heroRoles: [
    {
      en: 'AI Engineer',
      ko: 'AI 엔지니어',
      bn: 'এআই ইঞ্জিনিয়ার',
    },
    {
      en: 'Computer Vision',
      ko: '컴퓨터 비전',
      bn: 'কম্পিউটার ভিশন',
    },
    {
      en: 'Full-Stack Developer',
      ko: '풀스택 개발자',
      bn: 'ফুল-স্ট্যাক ডেভেলপার',
    },
  ],
  currentlyChip: {
    en: 'President @ Den of Builders · Busan, KR',
    ko: 'Den of Builders 대표 · 부산',
    bn: 'প্রেসিডেন্ট @ ডেন অফ বিল্ডার্স · বুসান, কেআর',
  },
  bio: [
    {
      en: 'AI & Computer Engineering student at Tongmyong University in Busan, South Korea. Passionate about computer vision, machine learning reproducibility, and production-ready full-stack software.',
      ko: '부산 동명대학교에서 AI 및 컴퓨터공학을 전공하고 있습니다. 컴퓨터 비전, 머신러닝 재현성 검증 및 실무형 풀스택 소프트웨어 개발에 몰두하고 있습니다.',
      bn: 'দক্ষিণ কোরিয়ার বুসানে টংমিয়ং বিশ্ববিদ্যালয়ে এআই ও কম্পিউটার ইঞ্জিনিয়ারিং শিক্ষার্থী। কম্পিউটার ভিশন, মেশিন লার্নিং পুনরুৎপাদনযোগ্যতা এবং বাস্তবমুখী ফুল-স্ট্যাক সফটওয়্যার নির্মাণে আগ্রহী।',
    },
    {
      en: 'I bridge foundational AI research with resilient software systems—ensuring algorithms hold up beyond single-split illusions into real-world deployments.',
      ko: '기초 AI 연구와 견고한 소프트웨어 시스템 사이를 연결하며, 단일 데이터 분할의 착시를 넘어 실제 환경에서 신뢰할 수 있는 알고리즘을 지향합니다.',
      bn: 'তাত্ত্বিক এআই গবেষণা এবং নির্ভরযোগ্য সফটওয়্যার সিস্টেমের মধ্যে সেতুবন্ধন তৈরি করি, যাতে অ্যালগরিদমগুলো বাস্তব ব্যবহারে কার্যকর প্রমাণিত হয়।',
    },
  ],
  education: {
    institution: {
      en: 'Tongmyong University',
      ko: '동명대학교',
      bn: 'টংমিয়ং বিশ্ববিদ্যালয়',
    },
    degree: {
      en: 'AI and Computer Engineering',
      ko: 'AI융합대학 AI·컴퓨터공학과',
      bn: 'এআই ও কম্পিউটার ইঞ্জিনিয়ারিং',
    },
    period: {
      en: 'Mar 2024 – Present',
      ko: '2024년 3월 – 현재',
      bn: 'মার্চ ২০২৪ – বর্তমান',
    },
    semester: 6,
  },
  languages: [
    {
      language: { en: 'English', ko: '영어', bn: 'ইংরেজি' },
      level: { en: 'Advanced', ko: '유창함 (Advanced)', bn: 'উন্নত (Advanced)' },
    },
    {
      language: { en: 'Korean', ko: '한국어', bn: 'কোরিয়ান' },
      level: { en: 'Intermediate', ko: '중급 (TOPIK II 목표: 2027.01)', bn: 'মধ্যম (টপিক ২ লক্ষ্য: ২০২৭)' },
      note: {
        en: 'Preparing for TOPIK II, planned by January 2027',
        ko: '2027년 1월 TOPIK II 응시 준비 중',
        bn: 'জানুয়ারি ২০২৭ এর মধ্যে টপিক ২ এর প্রস্তুতি চলছে',
      },
    },
    {
      language: { en: 'Bengali', ko: '벵골어', bn: 'বাংলা' },
      level: { en: 'Native', ko: '모국어', bn: 'মাতৃভাষা' },
    },
  ],
  interests: [
    { en: 'Computer Vision', ko: '컴퓨터 비전', bn: 'কম্পিউটার ভিশন' },
    { en: 'Statistical Learning', ko: '통계적 머신러닝', bn: 'পরিসংখ্যানভিত্তিক লার্নিং' },
    { en: 'Offline-First Architectures', ko: '오프라인 우선 아키텍처', bn: 'অফলাইন-ফার্স্ট আর্কিটেকচার' },
    { en: 'Embedded Systems', ko: '임베디드 시스템', bn: 'এমবেডেড সিস্টেম' },
  ],
};

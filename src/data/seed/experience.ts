import { ExperienceItem } from '@/types/portfolio';

export const seedExperience: ExperienceItem[] = [
  {
    id: 'exp-dob',
    order: 1,
    status: 'published',
    createdAt: '2026-06-01T00:00:00Z',
    updatedAt: '2026-06-01T00:00:00Z',
    role: {
      en: 'President & Co-Founder',
      ko: '대표 및 공동 설립자',
      bn: 'প্রেসিডেন্ট ও কো-ফাউন্ডার',
    },
    organization: {
      en: 'Den of Builders (DOB)',
      ko: 'Den of Builders (DOB)',
      bn: 'ডেন অফ বিল্ডার্স (ডিওবি)',
    },
    period: {
      en: 'Jun 2026 – Present',
      ko: '2026년 6월 – 현재',
      bn: 'জুন ২০২৬ – বর্তমান',
    },
    description: {
      en: 'Leads a student-run technology community at Tongmyong University.',
      ko: '동명대학교 학생 중심 기술 커뮤니티를 총괄 운영 및 리드하고 있습니다.',
      bn: 'টংমিয়ং বিশ্ববিদ্যালয়ে শিক্ষার্থী-পরিচালিত প্রযুক্তি কমিউনিটির নেতৃত্ব দিচ্ছি।',
    },
    bulletPoints: [
      {
        en: 'Organizes tech events, workshops, and hackathons for engineering students.',
        ko: '공학도들을 위한 기술 세미나, 워크숍 및 해커톤 기획 및 주최.',
        bn: 'ইঞ্জিনিয়ারিং শিক্ষার্থীদের জন্য প্রযুক্তি ইভেন্ট, কর্মশালা ও হ্যাকাথন আয়োজন।',
      },
      {
        en: 'Manages collaborative software and AI projects from scoping to deployment.',
        ko: '기획부터 배포까지 소프트웨어 및 AI 협업 프로젝트 총괄 관리.',
        bn: 'পরিকল্পনা থেকে ডিপ্লয়মেন্ট পর্যন্ত সফটওয়্যার ও এআই সহযোগী প্রজেক্ট পরিচালনা।',
      },
      {
        en: 'Mentors active members on practical software development and machine learning.',
        ko: '소프트웨어 엔지니어링 및 머신러닝 실무 역량 멘토링 제공.',
        bn: 'সফটওয়্যার ডেভেলপমেন্ট ও মেশিন লার্নিংয়ে সদস্যদের সরাসরি মেন্টরিং।',
      },
    ],
    isRestaurantJob: false,
    showOnPublicSite: true,
  },
  {
    id: 'exp-bic',
    order: 2,
    status: 'published',
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z',
    role: {
      en: 'Student Counselor / Apprentice',
      ko: '학생 상담원 / 견습 멘토',
      bn: 'স্টুডেন্ট কাউন্সেলর / শিক্ষানবিস',
    },
    organization: {
      en: 'Busan International College (BIC), Tongmyong University',
      ko: '동명대학교 부산국제대학 (BIC)',
      bn: 'বুসান ইন্টারন্যাশনাল কলেজ (বিআইসি), টংমিয়ং বিশ্ববিদ্যালয়',
    },
    period: {
      en: 'Sep 2024 – Present',
      ko: '2024년 9월 – 현재',
      bn: 'সেপ্টেম্বর ২০২৪ – বর্তমান',
    },
    description: {
      en: 'Peer counseling, academic guidance, and welfare support for students.',
      ko: '외국인 및 국내 학생들을 위한 또래 상담, 학업 지도 및 복지 지원.',
      bn: 'দেশি ও বিদেশি শিক্ষার্থীদের একাডেমিক দিকনির্দেশনা ও কল্যাণমূলক সহায়তা।',
    },
    bulletPoints: [
      {
        en: 'Delivered peer counseling and adaptation guidance for international and domestic students.',
        ko: '외국인 및 국내 신입생을 위한 대학 생활 적응 지원 및 1:1 또래 상담 수행.',
        bn: 'আন্তর্জাতিক ও স্থানীয় শিক্ষার্থীদের একাডেমিক অভিযোজন ও ব্যক্তিগত পরামর্শ প্রদান।',
      },
      {
        en: 'Coordinated bilingual academic orientation sessions and administrative welfare procedures.',
        ko: '이중 언어 학사 오리엔테이션 및 학생 복지 행정 절차 조율 지원.',
        bn: 'দ্বিভাষিক একাডেমিক ওরিয়েন্টেশন এবং প্রশাসনিক কল্যাণমূলক কার্যক্রমে সমন্বয়।',
      },
    ],
    isRestaurantJob: false,
    showOnPublicSite: true,
  },
  {
    id: 'exp-restaurant',
    order: 3,
    status: 'published',
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2025-09-01T00:00:00Z',
    role: {
      en: 'Part-time Operations & Customer Service',
      ko: '매장 운영 및 고객 서비스 (파트타임)',
      bn: 'পার্ট-টাইম অপারেশন ও কাস্টমার সার্ভিস',
    },
    organization: {
      en: '부마뚝닭갈비 (Buma Dakgalbi)',
      ko: '부마뚝닭갈비',
      bn: 'বুমা তুকদাকগালবি',
    },
    period: {
      en: 'Sep 2025 – Present',
      ko: '2025년 9월 – 현재',
      bn: 'সেপ্টেম্বর ২০২৫ – বর্তমান',
    },
    description: {
      en: 'Customer service, order processing, and store operations fully conducted in Korean.',
      ko: '한국어로 100% 진행되는 실시간 고객 응대, 주문 처리 및 매장 운영 전반 담당.',
      bn: 'সম্পূর্ণ কোরিয়ান ভাষায় রিয়েল-টাইম কাস্টমার সার্ভিস, অর্ডার প্রসেসিং ও শপ অপারেশন।',
    },
    bulletPoints: [
      {
        en: 'Handled high-volume peak-hour operations and direct customer communication entirely in Korean.',
        ko: '피크 시간대 고객 응대 및 현장 소통을 전적으로 한국어로 능숙하게 수행.',
        bn: 'ব্যস্ততম সময়ে কোরিয়ান ভাষায় গ্রাহক যোগাযোগ ও প্রত্যক্ষ অর্ডার ব্যবস্থাপনা।',
      },
      {
        en: 'Demonstrated fast-paced team coordination, situational adaptability, and real-world Korean fluency.',
        ko: '신속한 팀워크 조율과 실전 한국어 커뮤니케이션 역량 발휘.',
        bn: 'দ্রুত কর্মপরিবেশে দলগত সমন্বয় এবং বাস্তবমুখী কোরিয়ান ভাষা প্রয়োগ।',
      },
    ],
    isRestaurantJob: true,
    showOnPublicSite: true, // Configurable from admin
  },
];


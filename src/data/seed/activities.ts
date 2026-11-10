import { ActivityItem } from '@/types/portfolio';

export const seedActivities: ActivityItem[] = [
  {
    id: 'act-bix-2026',
    order: 1,
    status: 'published',
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
    title: {
      en: '2026 Busan Innovation Exchange (BIX 2026)',
      ko: '2026 부산 이노베이션 익스체인지 (BIX 2026)',
      bn: '২০২৬ বুসান ইনোভেশন এক্সচেঞ্জ (বিআইএক্স ২০২৬)',
    },
    role: {
      en: 'Inter-University Engineering Lead',
      ko: '연합 대학 공학 엔지니어링 리드',
      bn: 'আন্তঃবিশ্ববিদ্যালয় ইঞ্জিনিয়ারিং টিম সদস্য',
    },
    organization: {
      en: 'Tongmyong Univ. · Pukyong National Univ. · Kyungsung Univ.',
      ko: '동명대학교 · 국립부경대학교 · 경성대학교 연합',
      bn: 'টংমিয়ং বিশ্ববিদ্যালয় · বুকিয়ং জাতীয় বিশ্ববিদ্যালয় · কিয়ংসুং বিশ্ববিদ্যালয়',
    },
    period: {
      en: '2026 – Present',
      ko: '2026년 – 현재',
      bn: '২০২৬ – বর্তমান',
    },
    description: {
      en: 'Problem-based learning initiative across three Busan universities solving acute challenges of local small businesses using applied software and AI solutions.',
      ko: '부산 3개 대학이 협력하는 문제 해결형(PBL) 프로젝트로, 부산 지역 소상공인과 중소기업의 실제 비즈니스 병목 현상을 실용 기술로 해결합니다.',
      bn: 'বুসানের তিনটি বিশ্ববিদ্যালয়ের যৌথ সমস্যা-সমাধান প্রজেক্ট, যা স্থানীয় ক্ষুদ্র ব্যবসার বাস্তব সমস্যা প্রযুক্তির মাধ্যমে সমাধান করে।',
    },
    url: 'https://2026bix.com',
    activityStatus: 'ongoing',
  },
  {
    id: 'act-dob-community',
    order: 2,
    status: 'published',
    createdAt: '2026-06-01T00:00:00Z',
    updatedAt: '2026-06-01T00:00:00Z',
    title: {
      en: 'Den of Builders (DOB) Tech Community',
      ko: 'Den of Builders (DOB) 개발자 커뮤니티',
      bn: 'ডেন অফ বিল্ডার্স প্রযুক্তি কমিউনিটি',
    },
    role: {
      en: 'President & Founder',
      ko: '설립자 및 대표',
      bn: 'প্রতিষ্ঠাতা ও সভাপতি',
    },
    organization: {
      en: 'Tongmyong University',
      ko: '동명대학교',
      bn: 'টংমিয়ং বিশ্ববিদ্যালয়',
    },
    period: {
      en: 'Jun 2026 – Present',
      ko: '2026년 6월 – 현재',
      bn: 'জুন ২০২৬ – বর্তমান',
    },
    description: {
      en: 'Built an active student developer ecosystem fostering open-source software building, paper study groups, and hands-on AI model deployment.',
      ko: '오픈소스 소프트웨어 제작, 최신 AI 논문 스터디 및 실제 모델 배포를 장려하는 학생 개발자 생태계를 구축 및 운영하고 있습니다.',
      bn: 'ওপেন-সোর্স সফটওয়্যার নির্মাণ, গবেষণা পত্র পাঠ এবং এআই মডেল ব্যবহারের লক্ষ্যে সক্রিয় ছাত্র ডেভেলপার ইকোসিস্টেম গড়ে তুলেছি।',
    },
    url: 'https://dob-hub.vercel.app',
    activityStatus: 'ongoing',
  },
];

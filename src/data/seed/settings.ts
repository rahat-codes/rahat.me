import { SiteSettings } from '@/types/portfolio';

export const seedSettings: SiteSettings = {
  accentColor: '#F59E0B',
  hudStatusLines: [
    {
      en: 'Busan, KR (KST / UTC+9)',
      ko: '대한민국 부산 (KST / UTC+9)',
      bn: 'বুসান, দক্ষিণ কোরিয়া (কেএসটি / ইউটিসি+৯)',
    },
    {
      en: 'Open to AI & Full-Stack Internships',
      ko: 'AI 및 풀스택 인턴십 포지션 오픈',
      bn: 'এআই ও ফুল-স্ট্যাক ইন্টার্নশিপের জন্য প্রস্তুত',
    },
    {
      en: 'Building DOB Attendance Hub',
      ko: 'DOB 출석 허브 개발 진행 중',
      bn: 'ডিওবি অ্যাটেনডেন্স হাব তৈরি করছি',
    },
    {
      en: 'Tongmyong University · AI & CE (6th Sem)',
      ko: '동명대학교 AI·컴퓨터공학과 (6학기)',
      bn: 'টংমিয়ং বিশ্ববিদ্যালয় · এআই ও সিই (৬ষ্ঠ সেমিস্টার)',
    },
  ],
  location: {
    addressText: {
      en: 'Tongmyong University, 428 Sinseon-ro, Nam-gu, Busan 48520, South Korea',
      ko: '부산광역시 남구 신선로 428 (용당동) 동명대학교 48520',
      bn: 'টংমিয়ং বিশ্ববিদ্যালয়, ৪২৮ সিনসন-রো, নাম-গু, বুসান ৪৮৫২০, দক্ষিণ কোরিয়া',
    },
    keyword: '동명대학교',
    lat: 35.127814,
    lng: 129.088828,
  },
  cvDownloads: {
    enUrl: '/resume/rahat-md-mahadi-hasan-resume-en.pdf',
    koUrl: '',
    bnUrl: '',
  },
  enable3dModel: true,
  modelUrl: '/models/hero.glb',
};

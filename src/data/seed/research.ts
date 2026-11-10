import { ResearchItem } from '@/types/portfolio';

export const seedResearch: ResearchItem[] = [
  {
    id: 'research-single-split',
    order: 1,
    status: 'published',
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z',
    title: {
      en: 'Single-Split Illusions: A Rigorous, Cross-Dataset Re-Evaluation of Classifier Ranking for Automotive Vehicle-Type Prediction',
      ko: '단일 분할의 착시: 차량 차종 분류기 순위에 대한 엄밀한 교차 데이터셋 재평가',
      bn: 'সিঙ্গেল-স্প্লিট ইলিউশন: অটোমোটিভ ভেহিকল-টাইপ ক্লাসিফায়ারের ক্রস-ডাটাবেস পুনর্মূল্যায়ন',
    },
    authors: ['Rahat Md Mahadi Hasan', 'Jun-Mo Jo (Tongmyong University)'],
    abstract: {
      en: 'Demonstrated that a reported 97% accuracy for an L1 nearest-centroid classifier on a single train/test split was non-representative due to an unseeded, unscaled evaluation protocol and subtle data leakage. Employing 50-fold repeated nested cross-validation, preprocessing corrections (recovering n=153 records), and external validation on the UCI Statlog Vehicle Silhouettes benchmark (n=813, 3 classes), we established that tuned SVM, k-NN, and decision tree architectures statistically outperform centroid baselines under Nadeau-Bengio corrected tests with Holm-Bonferroni control.',
      ko: '선행 연구에서 보고된 L1 최근접 중심 분류기의 97% 정확도가 비시드 분할, 스케일링 누락 및 데이터 누수로 인한 비대표적 결과임을 입증했습니다. 50회 반복 중첩 교차 검증, n=153개 데이터 전처리 수정 및 UCI Statlog Vehicle Silhouettes (n=813, 3개 클래스) 외부 벤치마크 검증을 통해, Holm-Bonferroni 보정 및 Nadeau-Bengio 보정 t-검정 하에서 튜닝된 SVM, k-NN, 의사결정나무 모델이 중심점 분류기를 유의미하게 능가함을 통계적으로 증명했습니다.',
      bn: 'একটি পূর্ববর্তী গবেষণায় এল১ নিয়াররেস্ট-সেন্ট্রয়েড ক্লাসিফায়ারের ৯৭% নির্ভুলতা যে ত্রুটিপূর্ণ ও ডাটা লিকেজের কারণে কৃত্রিমভাবে বৃদ্ধি পেয়েছিল তা প্রমাণ করেছি। ৫০-ফোল্ড নেস্টেড ক্রস-ভ্যালিডেশন, n=153 রেকর্ড পুনরুদ্ধার এবং ইউসিআই স্ট্যাটলগ বেঞ্চমার্কে বাহ্যিক মূল্যায়নের মাধ্যমে নাদেও-বেঙ্গিও ও হোম-বনফেরোনি পরীক্ষায় প্রমাণিত হয়েছে যে টিউন করা এসভিএম, কে-এনএন এবং ডিসিশন ট্রি সেন্ট্রয়েড পদ্ধতির তুলনায় পরিসংখ্যানগতভাবে শ্রেষ্ঠ।',
    },
    methods: [
      {
        en: '50-fold repeated nested cross-validation eliminating split selection bias.',
        ko: '단일 분할 편향을 제거한 50회 반복 중첩 교차 검증 (Repeated Nested CV).',
        bn: '৫০-ফোল্ড পুনরাবৃত্তিমূলক নেস্টেড ক্রস-ভ্যালিডেশন।',
      },
      {
        en: 'Data recovery correcting preprocessing errors and recovering n=153 valid samples.',
        ko: '전처리 오류를 바로잡고 n=153개 유효 샘플 복원.',
        bn: 'ভুল সংশোধন করে n=153 ভ্যালিড স্যাম্পল পুনরুদ্ধার।',
      },
      {
        en: 'Rigorous external validation on UCI Statlog Vehicle Silhouettes benchmark (n=813, 3 classes).',
        ko: 'UCI Statlog Vehicle Silhouettes (n=813, 3개 클래스) 외부 벤치마크 검증.',
        bn: 'ইউসিআই স্ট্যাটলগ বেঞ্চমার্কে বাহ্যিক ক্রস-ভ্যালিডেশন।',
      },
      {
        en: 'Nadeau-Bengio corrected t-tests with Holm-Bonferroni family-wise error rate control.',
        ko: 'Holm-Bonferroni 가설 보정이 적용된 Nadeau-Bengio 보정 t-검정 통계 분석.',
        bn: 'হোম-বনফেরোনি সংশোধিত নাদেও-বেঙ্গিও টি-টেস্ট পরিসংখ্যান বিশ্লেষণ।',
      },
    ],
    keyFindings: [
      {
        en: 'The previously published 97% accuracy was an artifact of data leakage and unrepresentative splitting.',
        ko: '기존 발표된 97% 정확도는 데이터 누수와 비대표적 단일 분할이 초래한 착시였습니다.',
        bn: 'পূর্বে প্রকাশিত ৯৭% নির্ভুলতা ডাটা লিকেজের ফলাফল ছিল।',
      },
      {
        en: 'Tuned SVM, k-NN, and Decision Trees consistently and significantly outperform centroid methods on larger external datasets.',
        ko: '대규모 외부 데이터셋에서 튜닝된 SVM, k-NN 및 의사결정나무가 중심점 방식을 일관되고 유의미하게 능가했습니다.',
        bn: 'বড় বাহ্যিক ডাটাবেসে এসভিএম, কে-এনএন এবং ডিসিশন ট্রি পদ্ধতি ধারাবাহিকভাবে সেন্ট্রয়েড মেথডের চেয়ে শ্রেষ্ঠ।',
      },
    ],
    researchStatus: 'published',
    venue: '[Admin placeholder: Target Journal / Conference]',
    pdfUrl: '',
    repoUrl: 'https://github.com/rahat-codes/automotive-classification-reproducible-project',
  },
  {
    id: 'research-vehicle-price',
    order: 2,
    status: 'published',
    createdAt: '2026-03-01T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
    title: {
      en: 'Context-Aware Preprocessing Framework for Vehicle Price Prediction',
      ko: '차량 가격 예측을 위한 문맥 인식 전처리 프레임워크',
      bn: 'গাড়ির দাম পূর্বাভাসের জন্য কনটেক্সট-সচেতন প্রি-প্রসেসিং ফ্রেমওয়ার্ক',
    },
    authors: ['Rahat Md Mahadi Hasan'],
    abstract: {
      en: 'Investigating how high-cardinality categorical features and temporal price volatility can be stabilized through contextual embedding preprocessors without leakage into downstream regressors.',
      ko: '고차수 범주형 특성과 시계열 가격 변동성이 하위 회귀 모델로의 누수 없이 문맥 임베딩 전처리기를 통해 안정화될 수 있는 메커니즘을 연구하고 있습니다.',
      bn: 'উচ্চ মাত্রার ক্যাটাগরিক্যাল ফিচার এবং সময়ের সাথে মূল্যের ওঠানামা কীভাবে ডাটা লিকেজ ছাড়া স্থিতিশীল করা যায় তা নিয়ে গবেষণা চলছে।',
    },
    methods: [
      {
        en: 'Target encoding with internal fold regularization.',
        ko: '폴드 내부 정규화를 적용한 타깃 인코딩 기법.',
        bn: 'রেগুলারাইজড টার্গেট এনকোডিং কৌশল।',
      },
      {
        en: 'Time-windowed cross-validation without lookahead bias.',
        ko: '시간 창 기반 미래 정보 누수 방지 교차 검증.',
        bn: 'সময়ভিত্তিক টাইম-উইন্ডোড ক্রস-ভ্যালিডেশন।',
      },
    ],
    keyFindings: [
      {
        en: 'In progress — no claims made prior to peer verification.',
        ko: '진행 중인 연구로, 사전 동료 평가 검증 전까지 수치 주장을 유보합니다.',
        bn: 'গবেষণা চলমান — কোনো অপ্রতিষ্ঠিত ফলাফল দাবি করা হয়নি।',
      },
    ],
    researchStatus: 'in_progress',
    venue: 'In Progress / Tongmyong University',
  },
];

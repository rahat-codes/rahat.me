export type SupportedLanguage = 'en' | 'ko' | 'bn';

export interface LocalizedString {
  en: string;
  ko?: string;
  bn?: string;
  reviewed?: {
    ko?: boolean;
    bn?: boolean;
  };
}

export type ContentStatus = 'draft' | 'published';

export interface BaseDoc {
  id: string;
  order: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileData {
  name: LocalizedString;
  title: LocalizedString;
  location: LocalizedString;
  email: string;
  github: string;
  linkedin: string;
  tagline: LocalizedString;
  heroRoles: LocalizedString[];
  currentlyChip: LocalizedString;
  bio: LocalizedString[];
  education: {
    institution: LocalizedString;
    degree: LocalizedString;
    period: LocalizedString;
    semester: number;
  };
  languages: {
    language: LocalizedString;
    level: LocalizedString;
    note?: LocalizedString;
  }[];
  interests: LocalizedString[];
}

export interface SkillItem extends BaseDoc {
  name: string;
  category: 'ai_ml' | 'cv' | 'backend' | 'frontend' | 'mobile' | 'embedded' | 'devops_tools';
  categoryLabel: LocalizedString;
  proficiency: number; // 1 to 5
}

export interface ExperienceItem extends BaseDoc {
  role: LocalizedString;
  organization: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
  bulletPoints: LocalizedString[];
  isRestaurantJob?: boolean;
  showOnPublicSite: boolean;
}

export interface ProjectItem extends BaseDoc {
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  category: 'ai_ml' | 'web' | 'mobile' | 'embedded';
  tags: string[];
  problem: LocalizedString;
  approach: LocalizedString;
  role: LocalizedString;
  stack: string[];
  features: LocalizedString[];
  outcomeMetric?: LocalizedString;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  coverImage?: string;
}

export interface ResearchItem extends BaseDoc {
  title: LocalizedString;
  authors: string[];
  abstract: LocalizedString;
  methods: LocalizedString[];
  keyFindings: LocalizedString[];
  researchStatus: 'published' | 'in_progress';
  venue?: string;
  pdfUrl?: string;
  repoUrl?: string;
}

export interface CertificationItem extends BaseDoc {
  title: LocalizedString;
  issuer: string;
  issueDate: string; // YYYY-MM
  type: 'certification' | 'academic_award';
  credentialUrl?: string;
  score?: string;
}

export interface ActivityItem extends BaseDoc {
  title: LocalizedString;
  role: LocalizedString;
  period: LocalizedString;
  organization: LocalizedString;
  description: LocalizedString;
  url?: string;
  activityStatus: 'ongoing' | 'completed';
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  hp?: string;
}

export interface SiteSettings {
  accentColor: string;
  hudStatusLines: LocalizedString[];
  location: {
    addressText: LocalizedString;
    keyword: string;
    lat: number;
    lng: number;
  };
  cvDownloads: {
    enUrl?: string;
    koUrl?: string;
    bnUrl?: string;
  };
  enable3dModel: boolean;
  modelUrl?: string;
}

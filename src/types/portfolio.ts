export type ProjectCategory = 'client' | 'sample';

export type DisciplineId =
  | 'meta-ads'
  | 'social-media'
  | 'seo'
  | 'email-marketing'
  | 'instagram-automation';

export type GalleryCategory =
  | 'Posters'
  | 'Promotional Videos'
  | 'Reels'
  | 'AI Creatives'
  | 'Campaign Screenshots';

export interface HeroConfig {
  kicker: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  portraitUrl: string;
  portraitCaption: string;
  highlights: {
    label: string;
    value: string;
  }[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  bullets: string[];
}

export interface AboutConfig {
  sectionTitle: string;
  summary: string;
  location: string;
  visaStatus: string;
  availability: string;
  workPreference: string;
  languages: string[];
  portraitUrl?: string;
  logoUrl?: string;
  experience: ExperienceEntry[];
}

export interface SkillCategory {
  id: string;
  title: string;
  items: string[];
}

export interface DisciplineDetail {
  id: DisciplineId;
  number: string;
  title: string;
  shortLabel: string;
  experienceLevel: 'Client-Tested' | 'Working Knowledge & Planning';
  overview: string;
  keyWorkflows: string[];
  tools: string[];
  deliverables: string[];
  sampleMediaCaption: string;
  sampleMediaUrl: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  clientLabel: string;
  discipline: string;
  timeframe: string;
  summary: string;
  objective: string;
  strategy: string[];
  tools: string[];
  deliverables: string[];
  resultsNote: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  mediaCaption: string;
}

export interface GalleryAsset {
  id: string;
  title: string;
  category: GalleryCategory;
  projectType: ProjectCategory;
  collectionLabel?: string;
  description: string;
  tools: string[];
  aspectRatio: '3:4' | '9:16' | '16:9' | '4:3' | '1:1';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  createdNote: string;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  year: string;
  note: string;
  proofUrl?: string;
  proofType?: 'image' | 'pdf';
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
}

export interface ContactInfo {
  fullName: string;
  title: string;
  city: string;
  uaePhone: string;
  whatsappNumber: string;
  whatsappLink: string;
  email: string;
  linkedinDisplay: string;
  linkedinUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  cvFilePath: string;
  cvFileName: string;
}

export interface PortfolioData {
  hero: HeroConfig;
  about: AboutConfig;
  skillCategories: SkillCategory[];
  disciplines: DisciplineDetail[];
  projects: ProjectCaseStudy[];
  gallery: GalleryAsset[];
  certifications: CertificationEntry[];
  education: EducationEntry[];
  contact: ContactInfo;
}

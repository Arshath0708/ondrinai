export interface NavItem {
  label: string;
  path: string;
}

export interface SocialLink {
  label: string;
  url: string;
  handle: string;
  icon: 'instagram' | 'facebook' | 'youtube' | 'linkedin';
}

export interface ActivityPhoto {
  url: string;
  alt: string;
}

export interface ActivityVideo {
  type: 'youtube' | 'instagram';
  url: string;
}

export interface ActivityImpact {
  label: string;
  value: string;
}

export interface Activity {
  id: string;
  number: string;
  slug: string;
  category: 'FEED' | 'PLANT' | 'BUILD';
  title: string;
  shortDescription: string;
  description: string;
  date?: string;
  location?: string;
  purpose: string;
  whatHappened: string;
  impacts: ActivityImpact[];
  cost?: string;
  fundsReceived?: string;
  expenditureDetails?: string;
  materialsContributed?: string;
  collaborators?: string[];
  reflection?: string;
  photos: ActivityPhoto[];
  video?: ActivityVideo | null;
  status: 'completed';
}

export interface InvolvementPath {
  id: string;
  label: string;
  description: string;
  icon: 'footprints' | 'hand-coins' | 'package' | 'sparkles';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TransparencyEntry {
  activityNumber: string;
  title: string;
  date?: string;
  location?: string;
  cost?: string;
  fundsReceived?: string;
  expenditureDetails?: string;
  materialsContributed?: string;
  outcome: string;
  hasPhotos: boolean;
}

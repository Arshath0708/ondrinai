export type ActivityCategory = 'FEED' | 'PLANT' | 'BUILD' | 'RESPOND';

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
  category: ActivityCategory;
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
  reelUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
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
  status?: 'completed' | 'planned' | 'in-progress';
}

export interface ContributionCause {
  id: string;
  title: string;
  category: ActivityCategory;
  amount: number;
  unitLabel: string;
  description: string;
  disclaimer?: string;
}

export interface ActivitySponsorship {
  id: string;
  title: string;
  category: ActivityCategory;
  shortDescription: string;
  status: 'planned' | 'in-progress' | 'completed';
  targetAmount?: number;
  targetDescription?: string;
  plannedDate?: string;
  image?: string;
  activitySlug?: string;
  fundingNotes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: ActivityCategory;
  image: string;
  alt: string;
  date?: string;
  location?: string;
  activitySlug?: string;
  description?: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  type: 'collaborator' | 'community' | 'partner';
  description: string;
  collaborationDetail?: string;
  activitySlug?: string;
}

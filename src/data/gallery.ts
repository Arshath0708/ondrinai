import type { GalleryItem } from '@/types';
import { ASSETS } from '@/config/site';

/**
 * Authentic ONDRINAI activity photographs for the dedicated Gallery page.
 * Uses genuine local assets stored under /public/assets/.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-001',
    title: 'Food Distribution to People in Need',
    category: 'FEED',
    image: ASSETS.activity1,
    alt: 'ONDRINAI volunteers during Activity 001 distributing freshly prepared idli meals in Madurai',
    date: 'Activity 001',
    location: 'Madurai, Tamil Nadu',
    activitySlug: 'activity-001',
    description:
      'Our very first initiative — volunteers distributed fresh idli meals directly to 25 people on the ground in Madurai with an overall cost of ₹1,350.',
  },
  {
    id: 'gallery-002',
    title: '2,000 Panai Seeds Sowing Initiative',
    category: 'PLANT',
    image: ASSETS.activity2,
    alt: 'ONDRINAI volunteers and youth collaborators planting 2,000 Panai seeds near Madurai-Chennai highway',
    date: 'Activity 002',
    location: 'Near Madurai–Chennai Highway, around Meenakshi Mission Hospital',
    activitySlug: 'activity-002',
    description:
      'Joined hands with Ilam Makkal Iyakkam to plant 2,000 native Panai (palmyra) seeds along roadside embankments for long-term ecological conservation.',
  },
  {
    id: 'gallery-003',
    title: 'Old-Age Home Lunch & Companionship',
    category: 'FEED',
    image: ASSETS.activity3,
    alt: 'ONDRINAI volunteers spending time and sharing a lunch meal with elderly residents in Madurai',
    date: 'Activity 003',
    location: 'Madurai, Tamil Nadu',
    activitySlug: 'activity-003',
    description:
      'Sharing a meal and spending meaningful time with elderly residents in Madurai, reminding us that care is about human warmth and companionship.',
  },
];

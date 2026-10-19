import type { Activity, TransparencyEntry } from '@/types';
import { ASSETS } from '@/config/site';

/**
 * Activity data for ONDRINAI.
 * Uses authentic local assets and canonical Instagram Reel links.
 */
export const activities: Activity[] = [
  {
    id: 'activity-001',
    number: '001',
    slug: 'activity-001',
    category: 'FEED',
    title: 'A meal shared with care.',
    shortDescription:
      "ONDRINAI's first activity focused on sharing food with people in need. The team distributed idli to 25 people, with an overall activity cost of ₹1,350.",
    description:
      "ONDRINAI's first activity focused on sharing food with people in need. The team distributed idli to 25 people, with an overall activity cost of ₹1,350.",
    purpose:
      'To begin ONDRINAI\u2019s community work by sharing food with people in need, and to take the first practical step toward collective, meaningful action.',
    whatHappened:
      'The team prepared and distributed idli to 25 people in need in Madurai. The activity was carried out directly by ONDRINAI volunteers on the ground, keeping costs minimal while ensuring food reached people who could benefit from it with care and dignity.',
    impacts: [
      { label: 'People fed', value: '25' },
      { label: 'Total activity cost', value: '\u20B91,350' },
    ],
    cost: '\u20B91,350',
    reflection:
      'This first activity showed that even a small, well-organized effort can reach people directly. It set the tone for ONDRINAI\u2019s approach: practical, honest, and community-driven.',
    photos: [
      {
        url: ASSETS.activity1,
        alt: 'ONDRINAI volunteers during Activity 001 distributing idli to 25 people in Madurai',
      },
    ],
    video: {
      type: 'instagram',
      url: 'https://www.instagram.com/reel/DcjDeSazK4K/',
    },
    reelUrl: 'https://www.instagram.com/reel/DcjDeSazK4K/',
    status: 'completed',
  },
  {
    id: 'activity-002',
    number: '002',
    slug: 'activity-002',
    category: 'PLANT',
    title: '2,000 Panai seeds. One shared mission.',
    shortDescription:
      'ONDRINAI joined hands with Ilam Makkal Iyakkam for a Panai seed planting initiative near the Madurai\u2013Chennai Highway, around Meenakshi Mission Hospital.',
    description:
      'ONDRINAI joined hands with Ilam Makkal Iyakkam for a Panai seed planting initiative near the Madurai\u2013Chennai Highway, around Meenakshi Mission Hospital.',
    location: 'Near Madurai\u2013Chennai Highway, around Meenakshi Mission Hospital',
    purpose:
      'To take collective environmental action by planting Panai (palmyra) seeds, and to collaborate with another community organization working toward similar environmental goals.',
    whatHappened:
      'ONDRINAI volunteers joined hands with Ilam Makkal Iyakkam to plant 2,000 Panai seeds along the Madurai\u2013Chennai Highway near Meenakshi Mission Hospital. The initiative was a collaborative effort focused on environmental action and youth teamwork.',
    impacts: [
      { label: 'Panai seeds planted', value: '2,000' },
      { label: 'Collaboration', value: 'ONDRINAI \u00D7 Ilam Makkal Iyakkam' },
    ],
    collaborators: ['Ilam Makkal Iyakkam'],
    reflection:
      'Working alongside Ilam Makkal Iyakkam demonstrated the power of collaboration. Environmental action is more effective when communities come together with a shared purpose.',
    photos: [
      {
        url: ASSETS.activity2,
        alt: 'ONDRINAI volunteers and collaborators planting 2,000 Panai seeds near Madurai-Chennai Highway during Activity 002',
      },
    ],
    video: {
      type: 'instagram',
      url: 'https://www.instagram.com/reel/DdQpoC6PGTG/',
    },
    reelUrl: 'https://www.instagram.com/reel/DdQpoC6PGTG/',
    status: 'completed',
  },
  {
    id: 'activity-003',
    number: '003',
    slug: 'activity-003',
    category: 'FEED',
    title: 'Sharing a meal. Sharing our time.',
    shortDescription:
      'ONDRINAI visited an old-age home and provided lunch, bringing the team together to share time, care, and a meal with the residents.',
    description:
      'ONDRINAI visited an old-age home and provided lunch, bringing the team together to share time, care, and a meal with the residents.',
    location: 'Madurai, Tamil Nadu',
    purpose:
      'To share a meal and meaningful time with elderly residents, bringing care, warmth, and companionship alongside food.',
    whatHappened:
      'The ONDRINAI team visited an old-age home in Madurai and provided lunch for the residents. Volunteers and contributors helped make the activity possible. Beyond the meal, the team spent time with the residents, sharing conversations and companionship.',
    impacts: [
      { label: 'Activity completed', value: 'Old-age home lunch visit' },
      { label: 'Supported by', value: 'Volunteers & contributors' },
    ],
    reflection:
      'Sharing a meal with elderly residents reminded us that care is not only about material support. Time and presence matter just as much.',
    photos: [
      {
        url: ASSETS.activity3,
        alt: 'ONDRINAI volunteers sharing a meal and spending time at an old-age home in Madurai during Activity 003',
      },
    ],
    video: {
      type: 'instagram',
      url: 'https://www.instagram.com/reel/DeEdKhkPRw_/ ',
    },
    reelUrl: 'https://www.instagram.com/reel/DeEdKhkPRw_/',
    status: 'completed',
  },
];

export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}

export const transparencyEntries: TransparencyEntry[] = [
  {
    activityNumber: '001',
    title: 'Food Distribution',
    cost: '\u20B91,350',
    location: 'Madurai, Tamil Nadu',
    outcome: 'Distributed idli to 25 people directly by ONDRINAI volunteers. Total activity cost: \u20B91,350.',
    hasPhotos: true,
  },
  {
    activityNumber: '002',
    title: 'Panai Seed Planting',
    location: 'Near Madurai\u2013Chennai Highway, around Meenakshi Mission Hospital',
    outcome:
      '2,000 Panai seeds planted in collaboration with Ilam Makkal Iyakkam. Activity costs not yet documented.',
    hasPhotos: true,
  },
  {
    activityNumber: '003',
    title: 'Old-Age Home Lunch',
    location: 'Madurai, Tamil Nadu',
    outcome:
      'Lunch provided at an old-age home with support from volunteers and contributors. Detailed costs and funds information have not yet been published.',
    hasPhotos: true,
  },
];

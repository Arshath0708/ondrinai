import type { Activity, TransparencyEntry } from '@/types';

/**
 * Activity data for ONDRINAI.
 *
 * To add a new activity, copy an existing entry and update the fields.
 * All activities are stored here so they can be displayed across the site
 * without duplicating content in individual components.
 *
 * Photos: Replace the placeholder Pexels URLs with authentic ONDRINAI
 * activity photographs when they become available.
 * Videos: Set the video field to an object with type and url, or null.
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
      'The team prepared and distributed idli to 25 people in need. The activity was carried out directly by ONDRINAI volunteers on the ground, keeping costs minimal while ensuring food reached people who could benefit from it.',
    impacts: [
      { label: 'People fed', value: '25' },
      { label: 'Activity cost', value: '\u20B91,350' },
    ],
    cost: '\u20B91,350',
    reflection:
      'This first activity showed that even a small, well-organized effort can reach people directly. It set the tone for ONDRINAI\u2019s approach: practical, honest, and community-driven.',
    photos: [
      {
        url: 'https://images.pexels.com/photos/20422128/pexels-photo-20422128.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'South Indian idli served with chutneys and sambar, representing the food distributed during Activity 001',
      },
      {
        url: 'https://images.pexels.com/photos/5909876/pexels-photo-5909876.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Documentary photograph representing food distribution to people in need',
      },
    ],
    video: null,
    status: 'completed',
  },
  {
    id: 'activity-002',
    number: '002',
    slug: 'activity-002',
    category: 'PLANT',
    title: '2,000 Panai seeds. One shared mission.',
    shortDescription:
      'ONDRINAI joined hands with Ilam Makkal Iyakkam for a Panai seed planting initiative near the Madurai\u2013Chennai Highway, around Meenakshi Mission Hospital. The activity focused on collective environmental action and teamwork.',
    description:
      'ONDRINAI joined hands with Ilam Makkal Iyakkam for a Panai seed planting initiative near the Madurai\u2013Chennai Highway, around Meenakshi Mission Hospital. The activity focused on collective environmental action and teamwork.',
    location: 'Near Madurai\u2013Chennai Highway, around Meenakshi Mission Hospital',
    purpose:
      'To take collective environmental action by planting Panai (palmyra) seeds, and to collaborate with another community organization working toward similar goals.',
    whatHappened:
      'ONDRINAI volunteers joined Ilam Makkal Iyakkam to plant 2,000 Panai seeds along the Madurai\u2013Chennai Highway near Meenakshi Mission Hospital. The initiative was a collaborative effort focused on environmental action and community teamwork.',
    impacts: [
      { label: 'Panai seeds planted', value: '2,000' },
      { label: 'Collaboration', value: 'ONDRINAI \u00D7 Ilam Makkal Iyakkam' },
    ],
    collaborators: ['Ilam Makkal Iyakkam'],
    reflection:
      'Working alongside Ilam Makkal Iyakkam demonstrated the power of collaboration. Environmental action is more effective when communities come together with a shared purpose.',
    photos: [
      {
        url: 'https://images.pexels.com/photos/36185282/pexels-photo-36185282.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Hands holding a small plant seedling, representing the Panai seed planting initiative',
      },
      {
        url: 'https://images.pexels.com/photos/4105767/pexels-photo-4105767.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Close-up of palm seeds, representing the Panai seeds planted during Activity 002',
      },
      {
        url: 'https://images.pexels.com/photos/18943896/pexels-photo-18943896.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Hands nurturing a young seedling in soil, representing environmental action',
      },
    ],
    video: null,
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
    purpose:
      'To share a meal and meaningful time with elderly residents, bringing care and companionship alongside food.',
    whatHappened:
      'The ONDRINAI team visited an old-age home and provided lunch for the residents. Beyond the meal, the team spent time with the residents, sharing conversations and companionship.',
    impacts: [
      { label: 'Activity completed', value: 'Community food initiative' },
    ],
    reflection:
      'Sharing a meal with elderly residents reminded us that care is not only about material support. Time and presence matter just as much.',
    photos: [
      {
        url: 'https://images.pexels.com/photos/18459204/pexels-photo-18459204.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Seniors enjoying a meal together in a care home dining room, representing the old-age home lunch activity',
      },
      {
        url: 'https://images.pexels.com/photos/18429571/pexels-photo-18429571.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'A caregiver providing care in a retirement home setting, representing the community visit',
      },
    ],
    video: null,
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
    outcome: '25 people fed. Idli distributed directly by ONDRINAI volunteers.',
    hasPhotos: true,
  },
  {
    activityNumber: '002',
    title: 'Panai Seed Planting',
    location: 'Near Madurai\u2013Chennai Highway, around Meenakshi Mission Hospital',
    outcome:
      '2,000 Panai seeds planted in collaboration with Ilam Makkal Iyakkam. Cost not yet documented.',
    hasPhotos: true,
  },
  {
    activityNumber: '003',
    title: 'Old-Age Home Lunch',
    outcome:
      'Lunch provided at an old-age home. Detailed costs and funds information will be published once verified records are available.',
    hasPhotos: true,
  },
];

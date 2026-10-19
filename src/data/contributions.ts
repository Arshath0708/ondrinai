import type { ContributionCause, ActivitySponsorship } from '@/types';
import { ASSETS } from '@/config/site';

/**
 * Fixed proposed contribution amounts.
 * 
 * Note: These are ONDRINAI's proposed contribution benchmarks based on local ground
 * experience in Madurai, not independently verified or audited actual costs.
 */
export const contributionCauses: ContributionCause[] = [
  {
    id: 'breakfast-person',
    title: 'Breakfast for one person',
    category: 'FEED',
    amount: 30,
    unitLabel: 'per person',
    description:
      'Provides a fresh morning breakfast (such as warm idlis, chutney, and sambar) prepared and shared with care for someone in need.',
    disclaimer:
      'Proposed contribution amount based on our local community food drives in Madurai. Actual costs may vary slightly depending on seasonal ingredients and bulk preparation.',
  },
  {
    id: 'lunch-person',
    title: 'Lunch for one person',
    category: 'FEED',
    amount: 60,
    unitLabel: 'per person',
    description:
      'Supports a nutritious midday meal provided to residents at an elder care home or distributed to individuals requiring food support.',
    disclaimer:
      'Proposed contribution amount based on community lunch visits. Ingredients are purchased locally to ensure dignity and freshness.',
  },
  {
    id: 'dinner-person',
    title: 'Dinner for one person',
    category: 'FEED',
    amount: 30,
    unitLabel: 'per person',
    description:
      'Provides a warm evening meal distributed directly by volunteers on the ground to individuals without stable shelter or food.',
    disclaimer:
      'Proposed contribution benchmark. Food is distributed by volunteers on the ground without overhead deduction.',
  },
  {
    id: 'stray-animal-food',
    title: 'Food for one stray dog',
    category: 'RESPOND',
    amount: 20,
    unitLabel: 'per animal',
    description:
      'Provides nutritious food or biscuits during responsible street animal welfare and feeding rounds in Madurai neighborhoods.',
    disclaimer:
      'Communicates responsible community feeding in designated local areas. Does not imply continuous care for a specific named animal unless documented.',
  },
  {
    id: 'clothing-person',
    title: 'Clothing for one person',
    category: 'BUILD',
    amount: 250,
    unitLabel: 'per person',
    description:
      'Helps procure essential, dignified clothing items (such as comfortable everyday wear or seasonal garments) for distribution.',
    disclaimer:
      'Proposed contribution amount. Garments are sourced locally according to confirmed community needs and weather requirements.',
  },
  {
    id: 'plant-tree',
    title: 'Plant one tree',
    category: 'PLANT',
    amount: 70,
    unitLabel: 'per sapling',
    description:
      'Supports procuring a native sapling or seed preparation for organized environmental planting initiatives in Madurai.',
    disclaimer:
      'Procuring a sapling alone does not guarantee tree survival. Planting depends on confirmed site permissions, seasonal rainfall, and volunteer aftercare.',
  },
];

/**
 * Activity Sponsorship Opportunities.
 * 
 * Allows individuals or groups to support or sponsor a complete community activity.
 */
export const activitySponsorships: ActivitySponsorship[] = [
  {
    id: 'sponsor-food-drive',
    title: 'Community Food Distribution (50 Meals)',
    category: 'FEED',
    shortDescription:
      'Fund a complete morning or afternoon food distribution drive providing freshly prepared meals directly to 50 individuals in need in Madurai.',
    status: 'planned',
    targetAmount: 2700,
    targetDescription:
      'Includes food provisions, preparation supplies, eco-friendly leaf packaging, and on-ground logistics for 50 people.',
    plannedDate: 'Scheduled periodically based on ground readiness',
    image: ASSETS.activity1,
    activitySlug: 'activity-001',
    fundingNotes:
      'If contributions exceed the single-drive target, surplus funds are allocated to the subsequent scheduled food drive. If a drive is delayed due to weather, it is rescheduled to the earliest viable date.',
  },
  {
    id: 'sponsor-panai-planting',
    title: 'Panai (Palmyra) Seed Sowing Initiative',
    category: 'PLANT',
    shortDescription:
      'Support sourcing and communal sowing of native Palmyra (Panai) seeds along roadside embankments and water bodies in collaboration with youth volunteers.',
    status: 'planned',
    targetAmount: 3500,
    targetDescription:
      'Covers sourcing verified native seeds, trench preparation tools, transportation, and volunteer safety refreshments.',
    plannedDate: 'Monsoon season alignment',
    image: ASSETS.activity2,
    activitySlug: 'activity-002',
    fundingNotes:
      'Seed planting is strictly seasonal. Funds received outside planting season are held in transparent reserve until the appropriate sowing period arrives.',
  },
  {
    id: 'sponsor-elder-care-lunch',
    title: 'Old-Age Home Lunch & Companionship Visit',
    category: 'FEED',
    shortDescription:
      'Sponsor a comprehensive lunch visit to an elderly home in Madurai, sharing a healthy festive meal and meaningful time with residents.',
    status: 'planned',
    targetAmount: 4200,
    targetDescription:
      'Includes full lunch preparation for all residents and caregivers, fruits, and safe distribution supplies.',
    plannedDate: 'Monthly rotation',
    image: ASSETS.activity3,
    activitySlug: 'activity-003',
    fundingNotes:
      'Coordinated in close alignment with home administrators. Menu choices are strictly tailored to residents dietary requirements.',
  },
  {
    id: 'sponsor-street-animal-drive',
    title: 'Madurai Street Animal Welfare & Feeding Round',
    category: 'RESPOND',
    shortDescription:
      'Support a dedicated community feeding and welfare round for community street animals in vulnerable neighborhood pockets.',
    status: 'planned',
    targetAmount: 1800,
    targetDescription:
      'Includes clean animal food, water distribution bowls, basic first-aid antiseptic spray for minor scratches, and logistics.',
    plannedDate: 'Weekend community rounds',
    fundingNotes:
      'Conducted responsibly in designated public spaces by animal-friendly volunteers during early morning or evening hours.',
  },
];

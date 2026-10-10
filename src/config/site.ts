import type { NavItem, SocialLink } from '@/types';

/**
 * Centralized site configuration for ONDRINAI.
 * Update these values to change brand details, social links, and form URLs.
 * Replace placeholder images by updating the image URLs in activityData.ts
 * and the hero/section images in page components.
 */

export const siteConfig = {
  brandName: 'ONDRINAI',
  tagline: 'Together, We Create a Better Tomorrow.',
  tamilTagline: 'ஒன்றிணைந்து, சிறந்த எதிர்காலத்தை உருவாக்குவோம்',
  philosophy: 'Not one person. Not one team. All of us, together.',
  coreMessage: 'Small actions. Shared responsibility. A better tomorrow.',
  announcement: 'Small actions. Shared responsibility. A better tomorrow.',
  email: 'ondrinaicommunity@gmail.com',
  location: 'Madurai, Tamil Nadu, India',
  description:
    'ONDRINAI is a student-led community initiative in Madurai, Tamil Nadu, bringing people together to care for communities, protect the environment, and create meaningful change through collective action.',
  foundedLocation: 'Madurai, Tamil Nadu',
};

/**
 * Volunteer registration form URL.
 * Replace VOLUNTEER_FORM_URL with the actual Google Form link when available.
 * Until then, the Get Involved page shows a mailto fallback.
 */
export const VOLUNTEER_FORM_URL = '';

/**
 * Social media profile URLs.
 * Replace these placeholders with the actual URLs when verified.
 */
export const socialLinks: SocialLink[] = [
  {
    label: 'Instagram',
    handle: '@ondrinai',
    url: '', // INSTAGRAM_URL
    icon: 'instagram',
  },
  {
    label: 'Facebook',
    handle: 'ONDRINAI',
    url: '', // FACEBOOK_URL
    icon: 'facebook',
  },
  {
    label: 'YouTube',
    handle: 'ONDRINAI',
    url: '', // YOUTUBE_URL
    icon: 'youtube',
  },
  {
    label: 'LinkedIn',
    handle: 'ONDRINAI',
    url: '', // LINKEDIN_URL
    icon: 'linkedin',
  },
];

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Our Work', path: '/activities' },
  { label: 'Get Involved', path: '/get-involved' },
  { label: 'Contact', path: '/contact' },
];

export const pillars = [
  {
    id: 'feed',
    name: 'FEED',
    title: 'Share food, care, and meaningful moments with people who need support.',
    description:
      'Food distribution initiatives that bring nourishment and dignity to people in need, while creating moments of genuine human connection.',
    image:
      'https://images.pexels.com/photos/6646952/pexels-photo-6646952.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Volunteers packing food and aid boxes during a community drive',
    link: '/activities?category=FEED',
    icon: 'heart',
  },
  {
    id: 'plant',
    name: 'PLANT',
    title: 'Take environmental action through tree planting, Panai seeds, and responsible community participation.',
    description:
      'Environmental initiatives focused on planting native seeds and trees, contributing to local ecosystems through collective, hands-on effort.',
    image:
      'https://images.pexels.com/photos/36185282/pexels-photo-36185282.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Hands holding a small plant seedling in soil',
    link: '/activities?category=PLANT',
    icon: 'sprout',
  },
  {
    id: 'build',
    name: 'BUILD',
    title: 'Bring people together through ideas, awareness, education, and initiatives that strengthen communities.',
    description:
      'Community development through awareness, education, and meaningful initiatives that build lasting connections and shared responsibility.',
    image:
      'https://images.pexels.com/photos/5029855/pexels-photo-5029855.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Group of volunteers working together outdoors',
    link: '/activities?category=BUILD',
    icon: 'users',
  },
] as const;

export const involvementPaths = [
  {
    id: 'ground-work',
    label: 'GROUND WORK',
    description:
      'Participate in food distribution, environmental activities, and community initiatives.',
    icon: 'footprints' as const,
  },
  {
    id: 'financial',
    label: 'FINANCIAL CONTRIBUTIONS',
    description:
      'Support specific activities through voluntary contributions, with clear communication about their intended use.',
    icon: 'hand-coins' as const,
  },
  {
    id: 'material',
    label: 'MATERIAL CONTRIBUTIONS',
    description:
      'Help with food, saplings, seeds, supplies, and other verified activity requirements.',
    icon: 'package' as const,
  },
  {
    id: 'skills',
    label: 'SKILLS & PARTNERSHIPS',
    description:
      'Contribute design, photography, communication, outreach, logistics, professional skills, or organizational partnerships.',
    icon: 'sparkles' as const,
  },
];

export const faqItems = [
  {
    question: 'Do I need to contribute money?',
    answer:
      'No. Your time, effort, skills, and willingness to help are just as valuable. Participation does not require a financial contribution.',
  },
  {
    question: 'Can I join if I have limited time?',
    answer:
      'Yes, subject to activity needs. We work with varying schedules and will communicate opportunities through our volunteer channels.',
  },
  {
    question: 'Where does ONDRINAI operate?',
    answer:
      'Madurai, Tamil Nadu. Any expansion to new locations will be announced when confirmed.',
  },
  {
    question: 'How will I hear about activities?',
    answer:
      'Through our official communication channels and volunteer group. Once you register, we will keep you informed about upcoming activities.',
  },
];

export const values = [
  {
    name: 'Humanity',
    description: 'Treat people with dignity.',
  },
  {
    name: 'Unity',
    description: 'Work across social, religious, and community differences.',
  },
  {
    name: 'Responsibility',
    description: 'Make honest commitments and follow through.',
  },
  {
    name: 'Transparency',
    description: 'Communicate what was done and how contributions were used.',
  },
  {
    name: 'Consistency',
    description: 'Prefer sustainable action over short-lived publicity.',
  },
  {
    name: 'Collaboration',
    description: 'Work with volunteers, local communities, and organizations.',
  },
];

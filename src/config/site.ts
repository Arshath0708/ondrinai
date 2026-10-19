import type { NavItem, SocialLink, InvolvementPath, FAQItem } from '@/types';

/**
 * Centralized asset registry for ONDRINAI.
 * Points to real local assets stored under /assets/.
 */
export const ASSETS = {
  logo: '/assets/ondrinai logo.jpeg',
  activity1: '/assets/Activity 1.jpeg',
  activity2: '/assets/Activity 2.jpeg',
  activity3: '/assets/Activity 3.png',
  founder: "/assets/Founder's image.jpeg",
} as const;

/**
 * Centralized site configuration for ONDRINAI.
 */
export const siteConfig = {
  brandName: 'ONDRINAI',
  tagline: 'Together, We Create a Better Tomorrow.',
  tamilTagline: 'ஒன்றிணைந்து, சிறந்த எதிர்காலத்தை உருவாக்குவோம்',
  philosophy: 'Not one person. Not one team. All of us, together.',
  coreMessage: 'Small actions. Shared responsibility. A better tomorrow.',
  announcement: 'Small actions. Shared responsibility. A better tomorrow.',
  email: 'ondrinaicommunity@gmail.com',
  founderEmail: 'a.arshathabdulla@gmail.com',
  founderPhone: '+91 84288 58856',
  founderPhoneTel: '+918428858856',
  founderName: 'Arshath Abdulla A',
  founderRole: 'Founder, ONDRINAI',
  location: 'Madurai, Tamil Nadu, India',
  foundedLocation: 'Madurai, Tamil Nadu',
  description:
    'ONDRINAI is a community-led social initiative in Madurai bringing people together to care for communities, protect our environment, and create meaningful change through collective action.',
  volunteerExplanation:
    'Join our volunteer community to hear about activities, share ideas, and participate when you can.',
};

/**
 * Primary volunteer conversion path: Official ONDRINAI WhatsApp volunteer community invitation.
 */
export const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/E0eAFqETwUuHU41EH1ijZ9';
export const VOLUNTEER_COMMUNITY_URL = WHATSAPP_COMMUNITY_URL;
export const VOLUNTEER_FORM_URL = WHATSAPP_COMMUNITY_URL;

/**
 * Payment & Direct UPI Contribution Configuration.
 * 
 * IMPORTANT: To activate live UPI payments, enter the verified ONDRINAI UPI VPA / Merchant ID
 * below and set isEnabled to true. When isEnabled is false or upiId is blank, direct payment
 * buttons will remain gracefully disabled with clear instructions to coordinate directly.
 */
export const paymentConfig = {
  isEnabled: false, // Set to true once verified official UPI details are confirmed
  upiId: '', // e.g., 'ondrinai@upi' or verified merchant VPA
  recipientName: 'ONDRINAI Community Initiative',
  merchantCode: '',
  transactionNotePrefix: 'Contribution for ONDRINAI',
  notice:
    'Official direct UPI payments are currently being configured with our receiving account. You can review contribution amounts below and coordinate directly with our team.',
};

/**
 * Social media links.
 */
export const socialLinks: SocialLink[] = [
  {
    label: 'Instagram',
    handle: '@ondrinai',
    url: 'https://www.instagram.com/reel/DcjDeSazK4K/',
    icon: 'instagram',
  },
  {
    label: 'WhatsApp',
    handle: 'Volunteer Community',
    url: WHATSAPP_COMMUNITY_URL,
    icon: 'facebook',
  },
];

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Our Work', path: '/activities' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Transparency', path: '/transparency' },
  { label: 'Get Involved', path: '/get-involved' },
  { label: 'Contribute', path: '/donate' },
  { label: 'Contact', path: '/contact' },
];

export const pillars = [
  {
    id: 'feed',
    name: 'FEED',
    title: 'Food, care, and community support.',
    description:
      'Sharing meals, providing nourishment, and spending meaningful time with people and animals who need care and companionship.',
    image: ASSETS.activity1,
    imageAlt: 'ONDRINAI volunteers during Activity 001 food distribution',
    link: '/activities?category=FEED',
    icon: 'heart',
  },
  {
    id: 'plant',
    name: 'PLANT',
    title: 'Environmental action, native trees, and Panai seed planting.',
    description:
      'Environmental initiatives focused on planting native seeds and trees to restore local ecosystems through collective hands-on action.',
    image: ASSETS.activity2,
    imageAlt: 'ONDRINAI volunteers planting Panai seeds during Activity 002',
    link: '/activities?category=PLANT',
    icon: 'sprout',
  },
  {
    id: 'build',
    name: 'BUILD',
    title: 'Community development, education, awareness, and meaningful initiatives.',
    description:
      'Strengthening communities through shared initiatives, educational awareness, and long-term collective responsibility.',
    image: ASSETS.activity3,
    imageAlt: 'ONDRINAI volunteers caring for community during Activity 003',
    link: '/activities?category=BUILD',
    icon: 'users',
  },
  {
    id: 'respond',
    name: 'RESPOND',
    title: 'Timely community support, animal welfare, and grassroots action.',
    description:
      'Stepping forward during local community emergencies, responsible street animal feeding, and rapid ground support where immediate help is required.',
    image: ASSETS.activity1,
    imageAlt: 'Community response and grassroots aid in Madurai',
    link: '/activities?category=RESPOND',
    icon: 'shield-alert',
  },
] as const;

export const involvementPaths: InvolvementPath[] = [
  {
    id: 'ground-work',
    label: 'GROUND WORK',
    description:
      'Participate on the ground in food distribution, environmental seed planting, and direct community care activities in Madurai.',
    icon: 'footprints',
  },
  {
    id: 'financial',
    label: 'FINANCIAL CONTRIBUTIONS',
    description:
      'Voluntarily support specific, documented activity requirements with clear transparency on how funds are utilized. Contributions are not tax-deductible.',
    icon: 'hand-coins',
  },
  {
    id: 'material',
    label: 'MATERIAL CONTRIBUTIONS',
    description:
      'Contribute food provisions, seeds, saplings, packaging, logistics tools, and other confirmed supplies needed for an upcoming initiative.',
    icon: 'package',
  },
  {
    id: 'skills',
    label: 'SKILLS & PARTNERSHIPS',
    description:
      'Contribute design, photography, video editing, community outreach, coordination, documentation, or collaborate as an organization.',
    icon: 'sparkles',
  },
];

export const faqItems: FAQItem[] = [
  {
    question: 'Do I need to contribute money to participate?',
    answer:
      'No. You do not need to contribute money to make a difference. Your time, energy, skills, and presence on the ground are equally valuable.',
  },
  {
    question: 'How do I join as a volunteer?',
    answer:
      'You can join our official WhatsApp volunteer group through the link on this website. That is where we announce upcoming activities and coordinate with everyone.',
  },
  {
    question: 'Where does ONDRINAI operate?',
    answer:
      'ONDRINAI is based in Madurai, Tamil Nadu, India. Activities are currently organized locally across Madurai and surrounding areas.',
  },
  {
    question: 'Who runs ONDRINAI?',
    answer:
      'ONDRINAI was founded by Arshath Abdulla A as a student-led community initiative in Madurai. It operates on the shared philosophy: "Not one person. Not one team. All of us, together."',
  },
  {
    question: 'Are financial contributions tax-exempt or certified?',
    answer:
      'No. ONDRINAI is an independent, community-led social initiative and does not claim registered charitable status, 80G tax exemptions, or audited financial certifications. All activity expenses are reported transparently in our public ledger.',
  },
  {
    question: 'How are contributions used?',
    answer:
      'Contributions are utilized directly toward the verified ground costs of our activities (such as food provisions, native seeds, and essential supplies). We maintain an open activity ledger on our Transparency page.',
  },
];

export const values = [
  {
    name: 'Humanity',
    description: 'Treat every individual with genuine dignity, compassion, and respect.',
  },
  {
    name: 'Unity',
    description: 'Bring diverse people together across all backgrounds for shared positive action.',
  },
  {
    name: 'Responsibility',
    description: 'Make honest commitments, follow through diligently, and act with integrity.',
  },
  {
    name: 'Transparency',
    description: 'Report what was done and account for all activity costs openly and truthfully.',
  },
  {
    name: 'Consistency',
    description: 'Focus on steady, sustainable ground efforts over short-lived publicity.',
  },
  {
    name: 'Collaboration',
    description: 'Partner with volunteers, grassroots movements, and community organizations.',
  },
];

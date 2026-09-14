import type { SectionCopy } from './types';

export const COUPLE = {
  name1: 'Ethan',
  name2: 'Jordan',
  last1: '',
  last2: '',
  formalTitle: 'Mr & Mrs Poulsen',
} as const;

export const WEDDING = {
  date: '2027-07-17',
  dateDisplay: '07 · 17 · 2027',
  venue: 'Bay Pointe Golf Club',
  address: '4001 Haggerty Rd, West Bloomfield Township, MI 48323',
  mapUrl:
    'https://maps.google.com/?q=' +
    encodeURIComponent('Bay Pointe Golf Club, 4001 Haggerty Rd, West Bloomfield Township, MI 48323'),
} as const;

export const CONTACT = {
  email: 'hello@example.com',
  phone: '',
} as const;

export const LINKS: {
  rsvp: string;
  rsvpOpen: boolean;
} = {
  rsvp: 'https://example.com/rsvp',
  rsvpOpen: false,
};

export type HoneymoonFundMethod = {
  name: string;
  handle: string;
  note?: string;
  url?: string;
};

export type HoneymoonFundContact = {
  name: string;
  phone: string;
};

export const HONEYMOON_FUND: {
  methods: HoneymoonFundMethod[];
  contacts: HoneymoonFundContact[];
} = {
  methods: [
    { name: 'Venmo', handle: '@jordann088', url: 'https://venmo.com/u/jordann088' },
    { name: 'Zelle', handle: '(586) 241-8651', note: 'Jordan Sparks' },
    { name: 'Cash App', handle: '$jordann088', url: 'https://cash.app/$jordann088' },
    { name: 'Apple Pay', handle: '(586) 241-8651' },
    { name: 'PayPal', handle: '' },
  ],
  contacts: [
    { name: 'Jordan', phone: '(586) 241-8651' },
    { name: 'Ethan', phone: '(586) 350-4609' },
  ],
};

export const SECTIONS: SectionCopy[] = [
  {
    label: 'Our Story',
    title: 'Where two paths\nbecame one',
    body: 'Every love story is beautiful, but ours is my favourite. It began with a glance across a crowded room and grew into a lifetime of adventure, laughter, and belonging.',
    accent: 'coral',
    bg: 'cream',
    textSide: 'right',
  },
  {
    label: 'The Journey',
    title: 'A thousand\nlittle moments',
    body: 'From quiet mornings to golden evenings, from shared meals to shared dreams — every moment weaves a thread in the tapestry we are building together.',
    accent: 'berry',
    bg: 'creamDeep',
    textSide: 'left',
  },
  {
    label: 'Forever',
    title: 'And so our\ngarden grows',
    body: 'Like the vine that blooms as it climbs, love deepens with time. We are rooted in each other, reaching upward, flowering in every season.',
    accent: 'sage',
    bg: 'cream',
    textSide: 'right',
  },
];

export type ScheduleItem = {
  time: string;
  label: string;
  detail?: string;
  confirmed: boolean;
};

export const SCHEDULE: ScheduleItem[] = [
  {
    time: '5:00 PM',
    label: 'Wedding Ceremony',
    confirmed: true,
  },
  {
    time: '5:30 – 6:30 PM',
    label: 'Cocktail Hour',
    confirmed: true,
  },
  {
    time: '6:45 PM',
    label: 'Reception Entrance',
    confirmed: true,
  },
  {
    time: '7:00 PM',
    label: 'Dinner',
    detail: 'Menu and meal options to be announced.',
    confirmed: true,
  },
  {
    time: '8:00 PM',
    label: 'Speeches & Toasts',
    confirmed: true,
  },
  {
    time: '8:30 PM',
    label: 'Dance Floor Opens',
    confirmed: true,
  },
  {
    time: '9:30 PM',
    label: 'Cake Cutting & Taco Bar Buffet',
    confirmed: true,
  },
  {
    time: '11:00 PM',
    label: 'Grand Exit',
    confirmed: true,
  },
];

export type WeddingPartyMember = {
  slug: string;
  name: string;
  role: string;
};

export const GROOMSMEN: WeddingPartyMember[] = [
  { slug: 'ian', name: 'Ian', role: 'Best Man' },
  { slug: 'tyler', name: 'Tyler', role: 'Groomsman' },
  { slug: 'mark', name: 'Mark', role: 'Groomsman' },
  { slug: 'dylan', name: 'Dylan', role: 'Groomsman' },
  { slug: 'lucas', name: 'Lucas', role: 'Groomsman' },
];

export const BRIDESMAIDS: WeddingPartyMember[] = [
  { slug: 'libby', name: 'Libby', role: 'Maid of Honor' },
  { slug: 'camryn', name: 'Camryn', role: 'Bridesmaid' },
  { slug: 'kenzi', name: 'Kenzi', role: 'Bridesmaid' },
  { slug: 'sara', name: 'Sara', role: 'Bridesmaid' },
  { slug: 'alivia', name: 'Alivia', role: 'Bridesmaid' },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ: FaqItem[] = [
  {
    question: 'Am I able to bring a plus-one?',
    answer:
      'To keep our celebration intimate, we\'re only able to welcome the guests named on your invitation. Thank you for understanding!',
  },
  {
    question: 'Is this an adults-only celebration?',
    answer:
      'As much as we adore your little ones, our wedding will be an adults-only affair — consider it a night off!',
  },
  {
    question: "What's on the menu?",
    answer: 'Our menu is still being finalized, and we\'ll share the full details, including meal options, as soon as they\'re confirmed.',
  },
  {
    question: 'Will there be a bar?',
    answer: 'Absolutely — we\'ll have an open bar throughout the reception, so come ready to celebrate with us!',
  },
  {
    question: 'Will the celebration be indoors or outdoors?',
    answer:
      'Our ceremony will be held outdoors, followed immediately by an indoor reception.',
  },
  {
    question: 'Where should I park?',
    answer:
      'Bay Pointe Golf Club has a parking lot right next to the clubhouse, so you\'ll be just steps from the entrance. Self-parking is complimentary, and valet parking is also available if you\'d like to skip the walk.',
  },
];

export type Hotel = {
  name: string;
  address: string;
  mapUrl: string;
};

export const HOTELS: Hotel[] = [
  {
    name: 'Hampton Inn Commerce/Novi',
    address: '169 Loop Rd, Commerce Township, MI 48390',
    mapUrl:
      'https://maps.google.com/?q=' +
      encodeURIComponent('Hampton Inn Commerce Novi, 169 Loop Rd, Commerce Township, MI 48390'),
  },
  {
    name: 'TownePlace Suites by Marriott Detroit Commerce',
    address: '199 Loop Rd, Commerce Township, MI 48390',
    mapUrl:
      'https://maps.google.com/?q=' +
      encodeURIComponent(
        'TownePlace Suites by Marriott Detroit Commerce, 199 Loop Rd, Commerce Township, MI 48390',
      ),
  },
];

export const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/schedule', label: 'Schedule', end: false },
  { to: '/registry', label: 'Registry', end: false },
  { to: '/wedding-party', label: 'Wedding Party', end: false },
  { to: '/theme', label: 'Theme', end: false },
  { to: '/faq', label: 'FAQ', end: false },
] as const;

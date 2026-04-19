import type { SectionCopy } from './types';

export type RegistryLink = {
  name: string;
  url: string;
  description: string;
};

export const COUPLE = {
  name1: 'Ethan',
  name2: 'Jordan',
  last1: '',
  last2: '',
} as const;

export const WEDDING = {
  date: '2027-07-23',
  dateDisplay: '07 · 23 · 2027',
  venue: 'To be announced',
  city: '',
} as const;

export const CONTACT = {
  email: 'hello@example.com',
  phone: '',
} as const;

export const LINKS: {
  rsvp: string;
  registries: RegistryLink[];
} = {
  rsvp: 'https://example.com/rsvp',
  registries: [],
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

export const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/schedule', label: 'Schedule', end: false },
  { to: '/registry', label: 'Registry', end: false },
  { to: '/wedding-party', label: 'Wedding Party', end: false },
  { to: '/faq', label: 'FAQ', end: false },
] as const;

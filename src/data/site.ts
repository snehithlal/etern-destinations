export const site = {
  name: 'Etern Destinations',
  tagline: 'A slower kind of stay.',
  region: 'Wayanad, Kerala',
  description: 'Discover Etern Destinations, a cottage retreat in Wayanad, Kerala. Explore the stay, find inspiration for your visit, and get in touch.',
  // Replace null with owner-verified values. Missing channels are hidden.
  phone: null as string | null, // International format, e.g. +91 followed by 10 digits.
  whatsapp: null as string | null, // Digits only, including country code.
  email: null as string | null,
  address: null as string | null,
  mapUrl: null as string | null,
  bookingUrl: null as string | null, // Phase 2: hosted booking engine URL.
  instagramUrl: null as string | null,
  live: import.meta.env.PUBLIC_SITE_LIVE === 'true',
};

export const nav = [
  { label: 'The cottage', path: '/cottage/' },
  { label: 'Gallery', path: '/gallery/' },
  { label: 'Explore Wayanad', path: '/explore/' },
];

export function href(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

export const contactLinks = [
  ...(site.whatsapp ? [{ label: 'WhatsApp us', url: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hello! I would like to enquire about a stay at Etern Destinations.')}` }] : []),
  ...(site.phone ? [{ label: 'Call us', url: `tel:${site.phone}` }] : []),
  ...(site.email ? [{ label: 'Email us', url: `mailto:${site.email}` }] : []),
];

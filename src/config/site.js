// Site Configuration - Central source of truth for SEO, branding, and settings
// This makes the site CMS-ready by centralizing all configurable content

export const siteConfig = {
  // Brand Identity
  name: 'High Tide Studios',
  tagline: 'Greystones',
  fullName: 'High Tide Studios Greystones',
  description:
    'Broadcast-ready podcast and video studio in Greystones, Wicklow. Professional audio recording and content creation.',

  // URLs
  url: 'https://hightidestudios.ie',

  // Contact (consolidated)
  contact: {
    email: 'colmhayesradio@gmail.com',
    phone: '087 256 2643',
    phoneRaw: '+353872562643',
    location: 'Greystones, Wicklow',
    address: 'Unit 11, Watson Johnson, Church Road, Greystones',
  },

  // Social Media
  social: {
    instagram: 'https://instagram.com/high_tidestudios',
    youtube: 'https://www.youtube.com/@HighTideGreystones',
  },

  // Business Hours
  hours: {
    weekday: '9am – 6pm',
    weekend: 'By appointment',
  },

  // SEO Defaults
  seo: {
    title: 'High Tide Studios — Podcast & Video Production',
    titleTemplate: '%s | High Tide Studios',
    description:
      'Broadcast-ready podcast and video studio in Greystones, Wicklow. Professional audio recording, video production, and content creation.',
    keywords: [
      'podcast studio',
      'video production',
      'Greystones',
      'Wicklow',
      'Ireland',
      'audio recording',
      'content creation',
      'podcast production',
      'video podcast',
      'broadcast studio',
    ],
    ogImage: '/og-image.jpg',
    twitterHandle: '@hightidestudios',
  },
};

// Page-specific SEO metadata
export const pageSEO = {
  home: {
    title: 'High Tide Studios — Podcast & Video Production',
    description:
      'Broadcast-ready podcast and video studio in Greystones, Wicklow. Professional packages from €299.',
    keywords: [
      'podcast studio Greystones',
      'video production Wicklow',
      'podcast packages Ireland',
    ],
  },
  about: {
    title: 'About Us',
    description:
      'Meet the team behind High Tide Studios. Professional podcasters, broadcasters, and content creators in Greystones.',
    keywords: ['podcast team', 'Greystones studio', 'professional podcasters'],
  },
  clients: {
    title: 'Our Clients',
    description:
      'See our work. Featured podcasts and video productions from High Tide Studios Greystones.',
    keywords: ['podcast portfolio', 'video production samples', 'client work'],
  },
  contact: {
    title: 'Contact Us',
    description:
      'Get in touch with High Tide Studios. Book your podcast session in Greystones, Wicklow.',
    keywords: [
      'book podcast session',
      'contact High Tide Studios',
      'Greystones studio booking',
    ],
  },
};

// Structured Data (JSON-LD) for SEO
export const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://hightidestudios.ie',
    name: 'High Tide Studios',
    description:
      'Broadcast-ready podcast and video studio in Greystones, Wicklow.',
    url: 'https://hightidestudios.ie',
    telephone: '+353872562643',
    email: 'colmhayesradio@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 11, Watson Johnson, Church Road',
      addressLocality: 'Greystones',
      addressRegion: 'Wicklow',
      addressCountry: 'IE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.1459,
      longitude: -6.0631,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '€€',
    image: 'https://hightidestudios.ie/og-image.jpg',
    sameAs: [
      'https://instagram.com/high_tidestudios',
      'https://www.youtube.com/@HighTideGreystones',
    ],
  },

  // Service schema for packages
  getServiceSchema: (pkg) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${pkg.title} - ${pkg.subtitle}`,
    description: pkg.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'High Tide Studios',
    },
    offers: {
      '@type': 'Offer',
      price: pkg.price.replace('€', ''),
      priceCurrency: 'EUR',
    },
  }),
};

export default siteConfig;

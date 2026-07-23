// Site Configuration — Central source of truth for SEO, branding, and settings

import { packages, businessPackages } from '../data/packages';

const allPackages = [...packages, ...businessPackages];

const getOfferCatalogItem = (pkg) => ({
  '@type': 'Offer',
  itemOffered: {
    '@type': 'Service',
    name: `${pkg.title} — ${pkg.subtitle}`,
    description: pkg.description,
  },
  price: pkg.price.replace('€', ''),
  priceCurrency: 'EUR',
});

export const siteConfig = {
  name: 'High Tide Studios',
  locationSuffix: 'Greystones',
  fullName: 'High Tide Studios Greystones',
  description:
    'Broadcast-ready podcast and video studio in Greystones, Wicklow. Professional audio recording and content creation.',

  url: 'https://hightidestudios.ie',

  contact: {
    email: 'hightidestudios@icloud.com',
    phone: '087 165 7108',
    phoneRaw: '+353871657108',
    location: 'Greystones, Wicklow',
    address: 'Unit 11, Watson Johnson, Church Road, Greystones',
  },

  social: {
    studioInstagram:
      'https://www.instagram.com/high_tidestudios?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    justinInstagram:
      'https://www.instagram.com/justin.caffrey?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    youtube: 'https://www.youtube.com/@HighTideGreystones',
  },

  hours: {
    weekday: '9am – 6pm',
    weekend: 'By appointment',
  },

  seo: {
    title: 'High Tide Studios — Podcast & Video Production Greystones',
    titleTemplate: '%s | High Tide Studios',
    description:
      'Broadcast-ready podcast and video studio in Greystones, Wicklow. Professional audio recording, video production, and content creation from €299.',
    keywords: [
      'podcast studio',
      'podcast studio Ireland',
      'podcast studio Greystones',
      'podcast studio Wicklow',
      'podcast studio Dublin',
      'video production Ireland',
      'video production Wicklow',
      'video podcast studio',
      'audio recording studio',
      'content creation Ireland',
      'broadcast studio Wicklow',
      'podcast production packages',
      'High Tide Studios',
      'corporate podcast production Ireland',
      'corporate video production Wicklow',
      'business podcast studio Dublin',
      'corporate content production Ireland',
      'employer branding video Ireland',
    ],
    ogImage: '/og-image.jpg',
  },
};

// Page-specific SEO metadata
export const pageSEO = {
  home: {
    title: 'High Tide Studios — Podcast & Video Production Greystones',
    description:
      'Broadcast-ready podcast and video studio in Greystones, Wicklow. Professional packages from €299. You turn up. We do the rest.',
    keywords: [
      'podcast studio Greystones',
      'video production Wicklow',
      'podcast packages Ireland',
      'broadcast studio',
    ],
  },
  about: {
    title: 'About High Tide Studios',
    description:
      'Meet Justin Caffrey and Terry Loughran, the team behind High Tide Studios in Greystones, Wicklow.',
    keywords: [
      'about High Tide Studios',
      'podcast team Ireland',
      'Greystones studio team',
      'Terry Loughran',
      'Justin Caffrey',
    ],
  },
  clients: {
    title: 'Our Clients & Shows',
    description:
      'Podcasts and video productions created at High Tide Studios Greystones. See our client work and featured shows.',
    keywords: [
      'podcast portfolio Ireland',
      'video production clients',
      'podcast shows Greystones',
    ],
  },
  services: {
    title: 'Podcast & Video Production Packages',
    description:
      'Podcast and video production packages for individuals, creators, and businesses. From €299 for self-serve audio to full corporate production. Professional studio in Greystones, Wicklow.',
    keywords: [
      'podcast packages Ireland',
      'podcast studio prices',
      'video production packages',
      'podcast recording price',
      'corporate podcast production Ireland',
      'corporate video production Wicklow',
      'business podcast studio Dublin',
      'corporate content production Ireland',
      'employer branding video Ireland',
    ],
  },
  contact: {
    title: 'Book a Session — High Tide Studios',
    description:
      'Get in touch with High Tide Studios. Book your podcast or video recording session in Greystones, Wicklow.',
    keywords: [
      'book podcast session',
      'contact High Tide Studios',
      'Greystones studio booking',
      'podcast studio enquiry',
    ],
  },
  booking: {
    title: 'Book Your Session — High Tide Studios',
    description:
      'Reserve your podcast or video production session at High Tide Studios Greystones. Secure your slot with a 10% deposit.',
    keywords: [
      'book podcast studio',
      'podcast session booking',
      'studio booking Greystones',
    ],
  },
  voices: {
    title: 'Voices of Greystones | Community Stories | High Tide Studios',
    description:
      'Voices of Greystones is a community storytelling project preserving the voices, memories and conversations of people across Greystones. Produced by High Tide Studios.',
    keywords: [
      'Voices of Greystones',
      'community podcast Greystones',
      'Greystones stories podcast',
      'Wicklow podcast studio',
    ],
  },
  privacy: {
    title: 'Privacy & Cookie Policy — High Tide Studios',
    description:
      'Privacy and cookie information for High Tide Studios, including contact forms, booking enquiries, essential storage, and optional embedded media.',
    keywords: [
      'High Tide Studios privacy',
      'High Tide Studios cookies',
      'studio privacy policy',
    ],
  },
};

export const routeLabels = {
  '/': 'Home',
  '/about': 'About',
  '/services': 'Services',
  '/clients': 'Clients',
  '/voices': 'Voices',
  '/booking': 'Booking',
  '/contact': 'Contact',
  '/privacy': 'Privacy Policy',
};

// Structured Data (JSON-LD)
export const structuredData = {
  // Used on most pages — rich LocalBusiness
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': 'https://hightidestudios.ie/#business',
    name: 'High Tide Studios',
    alternateName: 'High Tide Studios Greystones',
    description:
      'Broadcast-ready podcast and video studio in Greystones, Wicklow. Professional audio recording, video production, and content creation.',
    url: 'https://hightidestudios.ie',
    telephone: '+353871657108',
    email: 'hightidestudios@icloud.com',
    foundingDate: '2025',
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, Invoice',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 11, Watson Johnson, Church Road',
      addressLocality: 'Greystones',
      addressRegion: 'County Wicklow',
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
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '16:00',
        description: 'By appointment only',
      },
    ],
    image: 'https://hightidestudios.ie/og-image.jpg',
    logo: 'https://hightidestudios.ie/images/main_logo.png',
    sameAs: [
      'https://instagram.com/high_tidestudios',
      'https://www.youtube.com/@HighTideGreystones',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Podcast & Video Production Packages',
      itemListElement: allPackages.map(getOfferCatalogItem),
    },
    areaServed: [
      { '@type': 'City', name: 'Greystones' },
      { '@type': 'AdministrativeArea', name: 'County Wicklow' },
      { '@type': 'AdministrativeArea', name: 'County Dublin' },
      { '@type': 'Country', name: 'Ireland' },
    ],
    knowsAbout: [
      'Podcast Production',
      'Video Production',
      'Audio Recording',
      'Content Creation',
      'Broadcast Media',
    ],
  },

  website: {
    '@type': 'WebSite',
    '@id': 'https://hightidestudios.ie/#website',
    url: 'https://hightidestudios.ie/',
    name: 'High Tide Studios',
    alternateName: 'High Tide Studios Greystones',
    inLanguage: 'en-IE',
    publisher: {
      '@id': 'https://hightidestudios.ie/#business',
    },
  },

  getOrganizationSchema: () => ({
    '@type': 'Organization',
    '@id': 'https://hightidestudios.ie/#organization',
    name: 'High Tide Studios',
    url: 'https://hightidestudios.ie/',
    logo: {
      '@type': 'ImageObject',
      url: 'https://hightidestudios.ie/images/main_logo.png',
      width: 1024,
      height: 1024,
    },
    sameAs: [
      'https://instagram.com/high_tidestudios',
      'https://www.youtube.com/@HighTideGreystones',
    ],
  }),

  getWebPageSchema: ({ title, description, url, path }) => ({
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'en-IE',
    isPartOf: {
      '@id': 'https://hightidestudios.ie/#website',
    },
    about: {
      '@id': 'https://hightidestudios.ie/#business',
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://hightidestudios.ie/og-image.jpg',
      width: 1200,
      height: 630,
    },
    breadcrumb: {
      '@id': `https://hightidestudios.ie${path}#breadcrumb`,
    },
  }),

  getBreadcrumbSchema: (path) => {
    const segments = path === '/' ? [] : path.split('/').filter(Boolean);
    const itemListElement = [
      {
        '@type': 'ListItem',
        position: 1,
        name: routeLabels['/'],
        item: 'https://hightidestudios.ie/',
      },
      ...segments.map((segment, index) => {
        const route = `/${segments.slice(0, index + 1).join('/')}`;
        return {
          '@type': 'ListItem',
          position: index + 2,
          name: routeLabels[route] || segment.replace(/-/g, ' '),
          item: `https://hightidestudios.ie${route}`,
        };
      }),
    ];

    return {
      '@type': 'BreadcrumbList',
      '@id': `https://hightidestudios.ie${path}#breadcrumb`,
      itemListElement,
    };
  },

  // Used on services page
  getServicesPageSchema: () => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': 'https://hightidestudios.ie/#business',
        name: 'High Tide Studios',
        url: 'https://hightidestudios.ie',
        telephone: '+353871657108',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Unit 11, Watson Johnson, Church Road',
          addressLocality: 'Greystones',
          addressRegion: 'County Wicklow',
          addressCountry: 'IE',
        },
      },
      ...allPackages.map((pkg) => structuredData.getServiceSchema(pkg)),
    ],
  }),

  // Dynamic service schema for individual package pages
  getServiceSchema: (pkg) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${pkg.title} — ${pkg.subtitle}`,
    description: pkg.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'High Tide Studios',
      '@id': 'https://hightidestudios.ie/#business',
    },
    offers: {
      '@type': 'Offer',
      price: pkg.price.replace('€', ''),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    areaServed: 'Ireland',
  }),

  // Self-hosted <video> promo schema (e.g. the Voices of Greystones teaser)
  getVideoSchema: (video) => ({
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: [`https://hightidestudios.ie${video.thumbnailUrl}`],
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: `https://hightidestudios.ie${video.contentUrl}`,
    publisher: {
      '@type': 'Organization',
      name: 'High Tide Studios',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hightidestudios.ie/images/main_logo.png',
      },
    },
  }),
};

export default siteConfig;

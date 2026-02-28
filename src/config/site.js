// Site Configuration — Central source of truth for SEO, branding, and settings

export const siteConfig = {
  name: 'High Tide Studios',
  tagline: 'Greystones',
  fullName: 'High Tide Studios Greystones',
  description:
    'Broadcast-ready podcast and video studio in Greystones, Wicklow. Professional audio recording and content creation.',

  url: 'https://hightidestudios.ie',

  contact: {
    email: 'colmhayesradio@gmail.com',
    phone: '087 246 2643',
    phoneRaw: '+353872462643',
    location: 'Greystones, Wicklow',
    address: 'Unit 11, Watson Johnson, Church Road, Greystones',
  },

  social: {
    instagram: 'https://instagram.com/high_tidestudios',
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
    ],
    ogImage: '/og-image.jpg',
    twitterHandle: '@hightidestudios',
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
      'Meet the team behind High Tide Studios — professional broadcasters and content creators based in Greystones, Wicklow.',
    keywords: [
      'about High Tide Studios',
      'podcast team Ireland',
      'Greystones studio team',
      'Colm Hayes',
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
      'Bronze, Silver and Gold podcast production packages from €299. Professional studio recording in Greystones, Wicklow.',
    keywords: [
      'podcast packages Ireland',
      'podcast studio prices',
      'video production packages',
      'podcast recording price',
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
    telephone: '+353872462643',
    email: 'colmhayesradio@gmail.com',
    foundingDate: '2023',
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
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
        opens: '00:00',
        closes: '00:00',
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
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bronze — Audio Foundation',
            description:
              'Multi-mic studio recording with professional EQ, mastering, and noise reduction.',
          },
          price: '299',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Silver — Video + Social Clips',
            description:
              'HD video podcast production with social media highlight reels.',
          },
          price: '399',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gold — Signature Broadcast',
            description:
              'End-to-end cinematic podcast production from recording to release.',
          },
          price: '749',
          priceCurrency: 'EUR',
        },
      ],
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

  // Used on services page
  servicesPage: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': 'https://hightidestudios.ie/#business',
        name: 'High Tide Studios',
        url: 'https://hightidestudios.ie',
        telephone: '+353872462643',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Unit 11, Watson Johnson, Church Road',
          addressLocality: 'Greystones',
          addressRegion: 'County Wicklow',
          addressCountry: 'IE',
        },
      },
      {
        '@type': 'Service',
        name: 'Bronze Podcast Package — Audio Foundation',
        description:
          'Multi-mic studio recording with professional EQ, mastering, and noise reduction. WAV and MP3 deliverables.',
        provider: {
          '@type': 'LocalBusiness',
          name: 'High Tide Studios',
          '@id': 'https://hightidestudios.ie/#business',
        },
        offers: {
          '@type': 'Offer',
          price: '299',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
        areaServed: 'Ireland',
      },
      {
        '@type': 'Service',
        name: 'Silver Podcast Package — Video + Social Clips',
        description:
          'HD video podcast production with 1–2 cameras and professionally edited social media clips for Instagram, LinkedIn, and TikTok.',
        provider: {
          '@type': 'LocalBusiness',
          name: 'High Tide Studios',
          '@id': 'https://hightidestudios.ie/#business',
        },
        offers: {
          '@type': 'Offer',
          price: '399',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
        areaServed: 'Ireland',
      },
      {
        '@type': 'Service',
        name: 'Gold Podcast Package — Signature Broadcast',
        description:
          'End-to-end cinematic podcast production: 3–5 camera filming, full editing, SEO show notes, distribution, and platform setup.',
        provider: {
          '@type': 'LocalBusiness',
          name: 'High Tide Studios',
          '@id': 'https://hightidestudios.ie/#business',
        },
        offers: {
          '@type': 'Offer',
          price: '749',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
        },
        areaServed: 'Ireland',
      },
    ],
  },

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
};

export default siteConfig;

/**
 * @typedef {Object} Package
 * @property {string} id - Unique identifier
 * @property {string} title - Package name
 * @property {string} subtitle - Short description
 * @property {string} price - Display price
 * @property {string} [priceNote] - Supporting price note
 * @property {string} [originalPrice] - Crossed-out original price
 * @property {string} description - Full description
 * @property {string[]} features - List of included features
 * @property {string} [note] - Additional note/disclaimer
 * @property {string} [badge] - Badge text (e.g., "Popular", "Best Value")
 * @property {string} [whoFor] - Intended audience
 * @property {string} [ctaLabel] - Custom CTA label
 * @property {string} [ctaLink] - Custom CTA link
 */

/** @type {Package[]} */
export const packages = Object.freeze([
  {
    id: 'bronze',
    title: 'BRONZE',
    subtitle: 'Audio Foundation',
    price: '€299',
    originalPrice: '€349',
    description:
      'Designed for interviews, narration, and voice-led storytelling. This package is intended for experienced podcasters who wish to self-operate. Studio access includes Rode audio equipment, Mac workstation, and full technical setup. No video in this package.',
    features: [
      'Multi-mic studio recording',
      'Professional EQ, mastering, and noise reduction',
      'WAV and MP3 deliverables',
    ],
    note: 'Engineer support (optional): €65 per hour',
    whoFor:
      'Ideal for experienced podcasters, voice artists, and interviewers who are comfortable self-operating and want a professional audio environment without production overhead.',
    badge: null,
  },
  {
    id: 'silver',
    title: 'SILVER',
    subtitle: 'Video + Social Clips',
    price: '€399',
    originalPrice: '€489',
    description:
      'A focused entry into video podcasting, designed to test your message and market without the cost of full broadcast production. Ideal for two-person, talking-head conversations.',
    features: [
      'Everything included in Bronze',
      '1–2 HD cameras',
      '30–90 second professionally edited highlight reels',
      'Optimised for Instagram, LinkedIn, and TikTok',
      'Up to 2 hours of engineer support',
    ],
    note: 'Additional studio time or engineer hours billed at €65 per hour',
    whoFor:
      'Designed for founders, advisors, and creators testing video podcasting for the first time, who want a credible on-camera presence and social clips without committing to full broadcast production.',
    badge: null,
  },
  {
    id: 'gold',
    title: 'GOLD',
    subtitle: 'Signature Broadcast',
    price: '€749',
    originalPrice: '€999',
    description:
      'End-to-end cinematic podcast production for leaders, founders, and creators who want full broadcast presence without managing the process. This is High Tide at its highest level. You turn up. We do the rest.',
    features: [
      '3–5 camera cinematic studio production',
      'Edited full-length video (up to 90 minutes)',
      '2–3 premium promotional reels',
      'Professional audio mastering and colour grading',
      'Optimised delivery for YouTube and Spotify Video Podcasts',
      'Podcast distribution and publishing',
      'SEO-optimised show notes and transcripts',
      'Scheduled release and platform setup',
      '5 hours of engineer and tech support included',
    ],
    note: 'From recording to release, every stage is handled with precision and restraint.',
    whoFor:
      'Built for serious podcast hosts, founders, executives, and brands who want a broadcast-ready presence and a complete production partner, not a DIY setup or piecemeal service.',
    badge: null,
  },
]);

/** @type {Package[]} */
export const businessPackages = Object.freeze([
  {
    id: 'leadership-voice',
    title: 'LEADERSHIP VOICE',
    subtitle: 'Internal & Leadership Podcasts',
    price: '€324',
    priceNote: 'ex VAT, per episode · Discounted price until 1st Oct',
    originalPrice: null,
    description:
      'Full-service internal comms and leadership podcast production for organisations who want their leadership to sound present, human, and consistent — without the self-op learning curve.',
    features: [
      'Full-service studio production — multi-mic audio, HD video, dedicated crew',
      'Producer/engineer support throughout the session',
      'Broadcast-quality edit of the full episode',
      'Short-form clips cut for Slack, Teams, or intranet distribution',
      'Full transcript for accessibility and internal search',
    ],
    note: 'Season package (4 episodes): €1,150 ex VAT',
    whoFor:
      'Heads of Internal Comms, People & Culture leads, and CEOs at mid-size organisations who want a consistent, human way to reach their own teams.',
    ctaLabel: 'Request a Consultation',
    ctaLink: '/contact?enquiry=leadership-voice',
  },
  {
    id: 'brand-signal',
    title: 'BRAND SIGNAL',
    subtitle: 'Marketing & Thought-Leadership Podcasts',
    price: '€609',
    priceNote: 'ex VAT, per episode · Discounted price until 1st Oct',
    originalPrice: null,
    description:
      'Cinematic marketing and thought-leadership podcast production built for brand credibility, not just content volume.',
    features: [
      'Cinematic multi-camera studio production (3–5 camera setup available)',
      'Professional audio mastering and colour grading',
      '2–3 premium promotional reels optimised for LinkedIn, Instagram, and TikTok',
      'SEO-optimised show notes and full transcript',
      'Distribution and publishing support for YouTube and Spotify',
      'Scheduled release setup',
    ],
    note: 'Full broadcast/season package: POA',
    whoFor:
      'Marketing Directors, Heads of Content, and agencies producing branded content for B2B clients.',
    ctaLabel: 'Request a Consultation',
    ctaLink: '/contact?enquiry=brand-signal',
  },
  {
    id: 'talent-story',
    title: 'TALENT STORY',
    subtitle: 'Employer Branding & Recruitment Video',
    price: '€324',
    priceNote: 'ex VAT, per session · Discounted price until 1st Oct',
    originalPrice: null,
    description:
      'Studio-based interview and testimonial video production for employer branding and recruitment campaigns.',
    features: [
      'Studio-based interview and testimonial video production',
      '1–2 HD camera setup with multi-mic professional audio',
      '30–90 second highlight reels cut for careers pages and social recruitment',
      'Full raw footage plus edited assets, reusable across campaigns',
    ],
    note: 'Multi-session campaign packages: custom quote',
    whoFor:
      'Heads of Talent Acquisition, HR Directors, and People Directors competing for candidates.',
    ctaLabel: 'Request a Consultation',
    ctaLink: '/contact?enquiry=talent-story',
  },
]);

/**
 * Find a package by ID
 * @param {string} id - Package ID to find
 * @returns {Package|undefined}
 */
export const findPackageById = (id) => packages.find((pkg) => pkg.id === id);

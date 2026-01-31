/**
 * @typedef {Object} Package
 * @property {string} id - Unique identifier
 * @property {string} title - Package name
 * @property {string} subtitle - Short description
 * @property {string} price - Display price
 * @property {string} [originalPrice] - Crossed-out original price
 * @property {string} description - Full description
 * @property {string[]} features - List of included features
 * @property {string} [note] - Additional note/disclaimer
 * @property {string} [badge] - Badge text (e.g., "Popular", "Best Value")
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

/**
 * Find a package by ID
 * @param {string} id - Package ID to find
 * @returns {Package|undefined}
 */
export const findPackageById = (id) => packages.find((pkg) => pkg.id === id);

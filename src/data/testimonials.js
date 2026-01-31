/**
 * @typedef {Object} Testimonial
 * @property {number} id - Unique identifier
 * @property {string} quote - The testimonial text
 * @property {string} author - Author's name
 * @property {string} role - Author's title/company
 * @property {number} rating - Star rating (1-5)
 */

/** @type {Testimonial[]} */
export const testimonials = Object.freeze([
  {
    id: 1,
    quote:
      'High Tide Studios gave us the professional environment we needed to launch our podcast. The team understood exactly what we were going for.',
    author: 'Sarah Mitchell',
    role: 'Founder, Leadership Talks Podcast',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'The quality of production exceeded our expectations. Colm and the team made us feel completely at ease behind the microphone.',
    author: "David O'Connor",
    role: 'CEO, TechStart Ireland',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Finally, a studio that takes audio seriously. No gimmicks, just broadcast-quality production from professionals who know their craft.',
    author: 'Emma Byrne',
    role: 'Author & Speaker',
    rating: 5,
  },
]);

/**
 * @typedef {Object} ClientLogo
 * @property {string} name - Client name
 * @property {string|null} logo - Logo URL or null
 */

/** @type {ClientLogo[]} */
export const clientLogos = Object.freeze([
  { name: 'Client 1', logo: null },
  { name: 'Client 2', logo: null },
  { name: 'Client 3', logo: null },
  { name: 'Client 4', logo: null },
]);

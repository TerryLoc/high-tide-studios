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
    quote: `We recorded Season 1 of Two Gas Tickets to Anywhere at High Tide Studios earlier this year. After exploring several recording studios, we felt that the intimacy and location of High Tide perfectly suited our needs. The team, led by Terry, provided outstanding guidance and expertise throughout the process. They also had all the right equipment to help us produce a highly professional first season. We couldn’t have asked for a better recording experience.`,
    author: 'April Drew',
    role: 'Host, Two Gas Tickets to Anywhere',
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Having spent decades in national radio, I'm probably a little particular when it comes to sound, acoustics and production. When we launched Not So Christian Brothers, we knew we needed a professional home for the show.\n\nFinding High Tide Studios in Greystones was a game-changer.\n\nWith broadcast-quality audio, multi-camera 4K video and professional lighting, the studio gives us everything we need to focus on what matters, the banter.\n\nThe best part is how easy the whole experience is. We turn up, settle in and present. High Tide takes care of the technical side, from recording and camera operation through to post-production and social clips.\n\nIf you're looking for a professional, relaxed studio for a podcast, video or commercial productions, High Tide Studios is the place.",
    author: 'Colm Hayes',
    role: 'Producer & Co-host, Not So Christian Brothers Podcast',
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

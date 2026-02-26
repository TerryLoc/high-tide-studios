/**
 * @typedef {Object} Episode
 * @property {string} title - Episode title
 * @property {string} youtubeId - YouTube video ID
 * @property {string} [spotifyId] - Spotify episode ID (if applicable)
 */

/**
 * @typedef {Object} Client
 * @property {string} name - Client/show name
 * @property {string} description - Show description
 * @property {string} [spotifyShowUrl] - Spotify show URL (optional)
 * @property {Episode[]} episodes - List of featured episodes
 */

/** @type {{ title: string, youtubeId: string }} */
export const studioPromo = Object.freeze({
  title: 'Inside High Tide Studios',
  youtubeId: 'YOUR_PROMO_VIDEO_ID', // TODO: Replace with actual video ID
});

/** @type {Client[]} */
export const clients = Object.freeze([
  {
    name: 'Not So Christian Brothers Podcast',
    description:
      'Meet Justin Caffrey and Colm Hayes — two brothers (Colm has a "stage" name) who could not be more different, yet share one mission: to take the sacred cows of modern life and give them a good old-fashioned grilling.',
    spotifyShowUrl: 'https://open.spotify.com/show/6rGJWNisg6vsGJeJcsqGOE', // TODO: Replace with actual Spotify show URL
    episodes: [
      {
        title:
          'Episode 37 – Crypto, Cash & Chaos: Is the World About to Snap? Why House Prices Are SO HIGH?',
        youtubeId: 'MzQoXEv_0d8',
      },
      {
        title:
          'Episode 53 – "I Was In Bed With Victoria Beckham" | The Truth About Posh Spice & The Wedding Feud',
        youtubeId: 'AvsL2VIIGzY',
      },
    ],
  },
  {
    name: 'Two Gas Tickets to Anywhere',
    description:
      'A weekly passport to the chaos, comedy, and the joy of travel. Hosted by Irish travel experts and best friends Aoife Birmingham and April Drew.',
    spotifyShowUrl: 'https://open.spotify.com/show/0toG2JzrAke9T5UOC1dN9t', // TODO: Replace with actual Spotify show URL
    episodes: [
      {
        title: 'Episode 3 – 3rd February 2026',
        youtubeId: 'uCagmyX6fNo',
      },
    ],
  },
]);

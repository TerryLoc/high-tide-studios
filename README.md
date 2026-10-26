# High Tide Studios

A professional website for **High Tide Studios** — a broadcast-ready podcast and video production studio in Greystones, Wicklow, Ireland.

## 🎙️ Features

- **Modern React 19** with functional components and hooks
- **Bootstrap 5** for responsive, mobile-first design
- **Framer Motion** animations for smooth page transitions
- **SEO optimized** with route-specific prerendered metadata, Open Graph, and JSON-LD structured data
- **HTTP 404 handling** for unknown routes on Netlify
- **Centralized configuration** in `src/config/site.js` for easy content management
- **Lazy-loaded YouTube embeds** for better performance
- **Booking system** with calendar, package selection, and 10% deposit calculation
- **Optimized images** in WebP format with lazy loading

## 🚀 Quick Start

Use Node.js 22.12 or newer.

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/           # Page components (Home, About, Contact, etc.)
├── config/          # Site configuration and SEO settings
├── data/            # Static data (packages, testimonials, team)
├── styles/          # Custom CSS
├── animations/      # Framer Motion animation configs
└── context/         # React context providers
```

## ⚙️ Configuration

All site settings are centralized in `src/config/site.js`:

- **Brand identity** (name, tagline, description)
- **Contact info** (email, phone, address)
- **Social links** (Instagram, YouTube)
- **SEO defaults** (meta descriptions, keywords)
- **Structured data** (JSON-LD for Google)

The production build prerenders every route listed in `public/sitemap.xml` and
generates a noindex `404.html` page. Keep the sitemap's URLs in sync with the
public routes in `src/App.jsx`.

## 📦 Packages & Services

Three production packages are offered:
- **Bronze** (€299) — Audio Foundation
- **Silver** (€399) — Video + Social Clips  
- **Gold** (€749) — Signature Broadcast

## 🎨 Tech Stack

| Technology     | Purpose            |
| -------------- | ------------------ |
| React 19       | UI framework       |
| React Router 7 | Navigation         |
| Bootstrap 5    | CSS framework      |
| Framer Motion  | Animations         |
| PropTypes      | Type checking      |
| Sharp          | Image optimization |

## 📝 License

© 2026 High Tide Studios. All rights reserved.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

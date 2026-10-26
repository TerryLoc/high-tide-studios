const fs = require('fs');
const http = require('http');
const path = require('path');
const puppeteer = require('puppeteer');

const buildDirectory = path.resolve(__dirname, '../build');
const sitemapPath = path.join(buildDirectory, 'sitemap.xml');
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function getRoutes() {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const siteOrigin = 'https://hightidestudios.ie';
  const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, location]) => {
      const url = new URL(location);
      if (url.origin !== siteOrigin) {
        throw new Error(`Sitemap URL is outside ${siteOrigin}: ${location}`);
      }
      return url.pathname;
    },
  );

  if (routes.length === 0) {
    throw new Error(`No routes found in ${sitemapPath}`);
  }

  return [...new Set(routes)];
}

function createStaticServer() {
  return http.createServer((request, response) => {
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(request.url, 'http://localhost').pathname,
      );
    } catch {
      response.writeHead(400).end('Bad request');
      return;
    }

    const requestedPath = path.resolve(buildDirectory, `.${pathname}`);
    if (
      requestedPath !== buildDirectory &&
      !requestedPath.startsWith(`${buildDirectory}${path.sep}`)
    ) {
      response.writeHead(400).end('Bad request');
      return;
    }

    const candidates = [
      requestedPath,
      path.join(requestedPath, 'index.html'),
      path.join(buildDirectory, 'index.html'),
    ];
    const filePath = candidates.find((candidate) => {
      try {
        return fs.statSync(candidate).isFile();
      } catch {
        return false;
      }
    });

    if (!filePath) {
      response.writeHead(404).end('Not found');
      return;
    }

    response.writeHead(200, {
      'Content-Type':
        contentTypes[path.extname(filePath)] || 'application/octet-stream',
    });
    fs.createReadStream(filePath).pipe(response);
  });
}

function createNotFoundPage(shellHtml) {
  const html = shellHtml
    .replace(
      /<title>[^<]*<\/title>/i,
      '<title>Page Not Found | High Tide Studios</title>',
    )
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/i,
      '<meta name="description" content="The page you are looking for could not be found."/>',
    )
    .replace(
      /<meta name="robots" content="[^"]*"\s*\/?>/i,
      '<meta name="robots" content="noindex, nofollow"/>',
    )
    .replace(
      /<meta name="googlebot" content="[^"]*"\s*\/?>/i,
      '<meta name="googlebot" content="noindex, nofollow"/>',
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/i,
      '<meta property="og:title" content="Page Not Found | High Tide Studios"/>',
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/i,
      '<meta property="og:description" content="The page you are looking for could not be found."/>',
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/i,
      '<meta name="twitter:title" content="Page Not Found | High Tide Studios"/>',
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/i,
      '<meta name="twitter:description" content="The page you are looking for could not be found."/>',
    )
    .replace(/<link rel="canonical"[^>]*\/?>/i, '')
    .replace(/<link rel="alternate"[^>]*\/?>/gi, '')
    .replace(/<meta property="og:url"[^>]*\/?>/i, '')
    .replace(
      '<div id="root"></div>',
      '<div id="root"><main><h1>Page not found</h1><p>The page you are looking for could not be found.</p><a href="/">Return to High Tide Studios</a></main></div>',
    );

  if (html === shellHtml) {
    throw new Error('Could not create the noindex 404 document.');
  }
  return html;
}

async function prerender() {
  if (!fs.existsSync(path.join(buildDirectory, 'index.html'))) {
    throw new Error('Production build not found. Run `npm run build` first.');
  }

  const shellHtml = fs.readFileSync(
    path.join(buildDirectory, 'index.html'),
    'utf8',
  );
  const routes = getRoutes();
  const server = createStaticServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  let browser;
  try {
    const { port } = server.address();
    const origin = `http://127.0.0.1:${port}`;
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (new URL(request.url()).origin === origin) {
        request.continue();
      } else {
        request.abort();
      }
    });

    await page.goto(`${origin}/`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      sessionStorage.setItem('ht_banner_dismissed', '1');
      sessionStorage.setItem('ht_intro_offer_seen', '1');
    });

    for (const route of routes) {
      await page.goto(new URL(route, origin).href, {
        waitUntil: 'networkidle0',
      });
      await page.waitForFunction(
        (expectedPath) => {
          const canonical = document.querySelector('link[rel="canonical"]');
          return (
            document.querySelector('script[data-seo="structured-data"]') &&
            canonical &&
            new URL(canonical.href).pathname.replace(/\/+$/, '') ===
              expectedPath.replace(/\/+$/, '')
          );
        },
        { timeout: 15000 },
        route,
      );

      const outputPath = path.join(
        buildDirectory,
        route.replace(/^\/+|\/+$/g, ''),
        'index.html',
      );
      if (route === '/') {
        fs.writeFileSync(
          path.join(buildDirectory, 'index.html'),
          await page.content(),
        );
      } else {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, await page.content());
      }
      console.log(`Prerendered ${route}`);
    }

    fs.writeFileSync(
      path.join(buildDirectory, '404.html'),
      createNotFoundPage(shellHtml),
    );
    console.log('Created noindex 404 page');
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

prerender().catch((error) => {
  console.error('SEO prerendering failed:', error);
  process.exitCode = 1;
});

import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig, pageSEO, structuredData } from '../config/site';

export default function SEO({
  page = 'home',
  title,
  description,
  keywords = [],
  noIndex = false,
  customTitle,
  customDescription,
  structuredDataType = null,
  structuredDataPayload = null,
}) {
  const location = useLocation();
  const pageData = pageSEO[page] || pageSEO.home;
  const finalTitle = customTitle || title || pageData.title;
  const finalDescription =
    customDescription || description || pageData.description;
  const brandedTitle = finalTitle.includes(siteConfig.name)
    ? finalTitle
    : `${finalTitle} | ${siteConfig.name}`;
  const cleanPath =
    location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '');
  const canonicalUrl = `${siteConfig.url}${cleanPath}`;
  const finalImage = `${siteConfig.url}${siteConfig.seo.ogImage}`;

  const finalKeywords = useMemo(
    () =>
      Array.from(
        new Set([
          ...(pageData.keywords || []),
          ...siteConfig.seo.keywords,
          ...keywords,
        ]),
      ),
    [pageData.keywords, keywords],
  );

  useEffect(() => {
    document.title = brandedTitle;

    const setMeta = (name, content, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel, href, attributes = {}) => {
      const selector = Object.entries(attributes).reduce(
        (acc, [key, value]) => `${acc}[${key}="${value}"]`,
        `link[rel="${rel}"]`,
      );
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        Object.entries(attributes).forEach(([key, value]) =>
          el.setAttribute(key, value),
        );
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta('description', finalDescription);
    setMeta('keywords', finalKeywords.join(', '));
    setMeta('author', siteConfig.fullName);
    setMeta(
      'robots',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    );

    setMeta('og:type', 'website', true);
    setMeta('og:site_name', siteConfig.fullName, true);
    setMeta('og:title', brandedTitle, true);
    setMeta('og:description', finalDescription, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', finalImage, true);
    setMeta('og:image:secure_url', finalImage, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta(
      'og:image:alt',
      `${siteConfig.name} — Professional Podcast & Video Studio`,
      true,
    );
    setMeta('og:locale', 'en_IE', true);

    setLink('canonical', canonicalUrl);
    setLink('alternate', canonicalUrl, { hreflang: 'en-IE' });
    setLink('alternate', canonicalUrl, { hreflang: 'x-default' });

    const existing = document.querySelector(
      'script[data-seo="structured-data"]',
    );
    if (existing) existing.remove();

    const graph = [
      structuredData.localBusiness,
      structuredData.website,
      structuredData.getWebPageSchema({
        title: brandedTitle,
        description: finalDescription,
        url: canonicalUrl,
        path: cleanPath,
      }),
      structuredData.getBreadcrumbSchema(cleanPath),
    ];

    if (structuredDataType === 'faq' && structuredDataPayload) {
      graph.push(structuredDataPayload);
    } else if (structuredDataType === 'service' && structuredDataPayload) {
      graph.push(structuredData.getServiceSchema(structuredDataPayload));
    } else if (page === 'services') {
      const servicesSchema = structuredData.getServicesPageSchema();
      graph.push(...servicesSchema['@graph']);
    } else {
      graph.push(structuredData.getOrganizationSchema());
    }

    const schema = { '@context': 'https://schema.org', '@graph': graph };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'structured-data');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const s = document.querySelector('script[data-seo="structured-data"]');
      if (s) s.remove();
    };
  }, [
    brandedTitle,
    finalDescription,
    finalKeywords,
    noIndex,
    structuredDataType,
    structuredDataPayload,
    finalImage,
    page,
    canonicalUrl,
    cleanPath,
  ]);

  return null;
}

export function PreloadResources() {
  useEffect(() => {
    const preloads = [
      { href: '/images/hero.webp', as: 'image', type: 'image/webp' },
    ];
    preloads.forEach(({ href, as, type }) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = as;
      link.href = href;
      if (type) link.type = type;
      document.head.appendChild(link);
    });
  }, []);
  return null;
}

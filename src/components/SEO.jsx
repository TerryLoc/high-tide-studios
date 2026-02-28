import { useEffect, useMemo } from 'react';
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
  const pageData = pageSEO[page] || pageSEO.home;
  const finalTitle = customTitle || title || pageData.title;
  const finalDescription = customDescription || description || pageData.description;
  const finalImage = `${siteConfig.url}${siteConfig.seo.ogImage}`;

  const finalKeywords = useMemo(
    () => [...(pageData.keywords || []), ...siteConfig.seo.keywords, ...keywords],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  useEffect(() => {
    document.title = finalTitle.includes('High Tide')
      ? finalTitle
      : `${finalTitle} | High Tide Studios`;

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

    setMeta('description', finalDescription);
    setMeta('keywords', finalKeywords.join(', '));
    setMeta('author', siteConfig.fullName);
    setMeta('robots', noIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    setMeta('og:type', 'website', true);
    setMeta('og:site_name', siteConfig.fullName, true);
    setMeta('og:title', finalTitle, true);
    setMeta('og:description', finalDescription, true);
    setMeta('og:url', `${siteConfig.url}${window.location.pathname}`, true);
    setMeta('og:image', finalImage, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:image:alt', `${siteConfig.name} — Professional Podcast & Video Studio`, true);
    setMeta('og:locale', 'en_IE', true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', siteConfig.seo.twitterHandle);
    setMeta('twitter:title', finalTitle);
    setMeta('twitter:description', finalDescription);
    setMeta('twitter:image', finalImage);
    setMeta('twitter:image:alt', `${siteConfig.name} — Professional Podcast & Video Studio`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${siteConfig.url}${window.location.pathname}`);

    const existing = document.querySelector('script[data-seo="structured-data"]');
    if (existing) existing.remove();

    let schema;
    if (structuredDataType === 'faq' && structuredDataPayload) {
      schema = { '@context': 'https://schema.org', '@graph': [structuredData.localBusiness, structuredDataPayload] };
    } else if (structuredDataType === 'service' && structuredDataPayload) {
      schema = structuredData.getServiceSchema(structuredDataPayload);
    } else if (page === 'services') {
      schema = structuredData.servicesPage;
    } else {
      schema = structuredData.localBusiness;
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'structured-data');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const s = document.querySelector('script[data-seo="structured-data"]');
      if (s) s.remove();
    };
  }, [finalTitle, finalDescription, finalKeywords, noIndex, structuredDataType, structuredDataPayload, finalImage, page]);

  return null;
}

export function PreloadResources() {
  useEffect(() => {
    const preloads = [{ href: '/images/hero.webp', as: 'image', type: 'image/webp' }];
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
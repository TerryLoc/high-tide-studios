import { useEffect, useMemo } from 'react';
import { siteConfig, pageSEO, structuredData } from '../config/site';

/**
 * SEO Component - Updates document head for each page
 * Works without external dependencies, compatible with React 19
 */
export default function SEO({ 
  page = 'home',
  title,
  description,
  keywords = [],
  noIndex = false,
  structuredDataType = null,
  structuredDataPayload = null,
}) {
  // Get page-specific SEO or use defaults
  const pageData = pageSEO[page] || pageSEO.home;
  
  const finalTitle = title || pageData.title;
  const finalDescription = description || pageData.description;
  
  // Memoize keywords to prevent useEffect re-running on every render
  const finalKeywords = useMemo(
    () => [...(pageData.keywords || []), ...keywords],
    [pageData.keywords, keywords]
  );

  useEffect(() => {
    // Update document title
    document.title = finalTitle.includes('High Tide') 
      ? finalTitle 
      : `${finalTitle} | High Tide Studios`;

    // Update meta tags
    const updateMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMeta('description', finalDescription);
    if (finalKeywords.length > 0) {
      updateMeta('keywords', finalKeywords.join(', '));
    }
    
    // Robots
    if (noIndex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow');
    }

    // Open Graph
    updateMeta('og:title', finalTitle, true);
    updateMeta('og:description', finalDescription, true);
    updateMeta('og:url', `${siteConfig.url}${window.location.pathname}`, true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:site_name', siteConfig.fullName, true);

    // Twitter
    updateMeta('twitter:title', finalTitle);
    updateMeta('twitter:description', finalDescription);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${siteConfig.url}${window.location.pathname}`);

    // Structured Data (JSON-LD)
    const existingScript = document.querySelector('script[data-seo="structured-data"]');
    if (existingScript) {
      existingScript.remove();
    }

    let schemaData = structuredData.organization;
    
    if (structuredDataType === 'service' && structuredDataPayload) {
      schemaData = structuredData.getServiceSchema(structuredDataPayload);
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'structured-data');
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const cleanupScript = document.querySelector('script[data-seo="structured-data"]');
      if (cleanupScript) {
        cleanupScript.remove();
      }
    };
  }, [finalTitle, finalDescription, finalKeywords, noIndex, structuredDataType, structuredDataPayload]);

  return null; // This component doesn't render anything
}

/**
 * Preload critical resources
 */
export function PreloadResources() {
  useEffect(() => {
    // Preload critical fonts
    const fontPreloads = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    ];

    fontPreloads.forEach(href => {
      const existing = document.querySelector(`link[href="${href}"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, []);

  return null;
}

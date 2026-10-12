import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { hasAllowedMarketingCookies } from './CookieConsent';
import {
  enableMetaPixel,
  disableMetaPixel,
  trackMetaPageView,
} from '../lib/metaPixel';

/**
 * Loads the Meta Pixel only after the visitor opts in to marketing cookies,
 * and fires a PageView on every route change.
 */
export default function MetaPixel() {
  const location = useLocation();
  const [allowed, setAllowed] = useState(hasAllowedMarketingCookies);

  useEffect(() => {
    const sync = () => setAllowed(hasAllowedMarketingCookies());
    window.addEventListener('hts:cookie-consent-updated', sync);
    return () => window.removeEventListener('hts:cookie-consent-updated', sync);
  }, []);

  useEffect(() => {
    if (!allowed) {
      disableMetaPixel();
      return;
    }
    enableMetaPixel();
    trackMetaPageView();
  }, [allowed, location.pathname]);

  return null;
}

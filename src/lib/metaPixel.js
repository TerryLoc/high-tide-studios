const PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID || '2351603935657795';

let loaded = false;

export const isMetaPixelConfigured = () => /^\d+$/.test(PIXEL_ID || '');

function loadScript() {
  if (window.fbq) return;
  const fbq = function (...args) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
}

export function enableMetaPixel() {
  if (!isMetaPixelConfigured()) return;
  if (!loaded) {
    loadScript();
    window.fbq('init', PIXEL_ID);
    loaded = true;
  }
  window.fbq('consent', 'grant');
}

export function disableMetaPixel() {
  if (loaded && window.fbq) window.fbq('consent', 'revoke');
}

export function trackMetaPageView() {
  if (loaded && window.fbq) window.fbq('track', 'PageView');
}

export function trackMetaEvent(name, params) {
  if (loaded && window.fbq) window.fbq('track', name, params);
}

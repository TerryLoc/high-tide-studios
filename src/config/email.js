// Centralized EmailJS configuration — single source of truth for service/template IDs.
// Previously these constants were duplicated separately inside Booking.jsx and
// Contact.jsx; keeping them here means updating a key in one place instead of two.

export const EMAILJS_SERVICE_ID = 'service_1udk87c';
export const EMAILJS_PUBLIC_KEY = 'e5A6FdMkGSbqfNHIj';

// Universal templates — used by BOTH the Booking form and the Contact form.
// Each template is just chrome (logo, header band, footer) plus a single
// {{{content_html}}} placeholder. All page-specific content (booking summary,
// message recap, etc.) is generated in src/utils/emailContent.js and passed
// in as the content_html variable — so one template serves both forms.
//
// Create these once in the EmailJS dashboard using the two universal template
// files provided, then paste the resulting IDs in below.
export const EMAILJS_CLIENT_TEMPLATE_ID = 'template_srp0l24';
export const EMAILJS_INTERNAL_TEMPLATE_ID = 'template_w4p9e5p';

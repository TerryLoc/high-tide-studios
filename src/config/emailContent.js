// Shared HTML content builders for transactional emails.
//
// Why this file exists: EmailJS templates can't do real conditional logic
// (no {{#if}}), so instead of maintaining four near-duplicate templates in
// the EmailJS dashboard, we maintain ONE universal "client confirmation"
// template and ONE universal "internal notification" template. Each is just
// header/footer chrome plus a single {{{content_html}}} placeholder. This
// file builds the actual page-specific inner HTML in code — where we CAN
// branch — and both Booking.jsx and Contact.jsx pass their result in as the
// content_html variable.
//
// All user-supplied values are escaped before being interpolated into HTML,
// since this content is built as a raw HTML string and injected via EmailJS's
// triple-brace {{{content_html}}} (unescaped). Without this, a client typing
// something like <b> or & into a name/message field could break the email
// layout — escaping prevents that.

export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// --- Low-level building blocks ---------------------------------------------

function row(label, value, { highlight = false } = {}) {
  const color = highlight ? '#c49648' : null;
  const labelStyle = `color:${color || 'rgba(255,255,255,0.5)'}; font-size:13px; padding:5px 0;${highlight ? ' font-weight:bold;' : ''}`;
  const valueStyle = `color:${color || '#ffffff'}; font-size:13px; padding:5px 0; text-align:right;${highlight ? ' font-weight:bold;' : ''}`;
  return `<tr><td style="${labelStyle}">${label}</td><td style="${valueStyle}">${value}</td></tr>`;
}

function box(innerRowsHtml) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#141414; border:1px solid rgba(196,150,72,0.25); border-radius:6px; margin:0 0 20px 0;">
      <tr><td style="padding:16px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${innerRowsHtml}</table>
      </td></tr>
    </table>`;
}

function textBox(html) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#141414; border:1px solid rgba(196,150,72,0.25); border-radius:6px; margin:0 0 20px 0;">
      <tr><td style="padding:16px 20px;">${html}</td></tr>
    </table>`;
}

function sectionLabel(text) {
  return `<p style="color:#c49648; font-size:12px; text-transform:uppercase; letter-spacing:1px; margin:0 0 8px 0;">${text}</p>`;
}

function paragraph(text) {
  return `<p style="color:rgba(255,255,255,0.85); font-size:15px; line-height:1.6; margin:0 0 20px 0;">${text}</p>`;
}

function greeting(name) {
  return `<p style="color:#ffffff; font-size:18px; font-family: Georgia, serif; margin:0 0 16px 0;">Hi ${escapeHtml(name)},</p>`;
}

function ctaButton(label, href) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px 0;">
      <tr><td style="background-color:#c49648; border-radius:4px;">
        <a href="${href}" style="display:inline-block; padding:12px 24px; color:#0a0a0a; font-size:13px; font-weight:bold; text-decoration:none; letter-spacing:0.5px; text-transform:uppercase; font-family: system-ui, Arial, sans-serif;">${escapeHtml(label)}</a>
      </td></tr>
    </table>`;
}

// --- Client confirmation content (sent to the customer) --------------------

export function buildBookingClientContent({
  fromName,
  packageTitle,
  preferredDates,
  packagePrice,
  depositAmount,
  balanceDue,
}) {
  return [
    greeting(fromName),
    paragraph(
      "Thanks for booking with High Tide Studios. We've received your request and will confirm availability for your preferred dates within 24 hours.",
    ),
    box(
      row('Package', escapeHtml(packageTitle)) +
        row('Preferred Dates', escapeHtml(preferredDates)) +
        row('Package Price', escapeHtml(packagePrice)) +
        row('Deposit Due', escapeHtml(depositAmount), { highlight: true }) +
        row('Balance (due 48h before session)', escapeHtml(balanceDue)),
    ),
    paragraph(
      "Once we confirm your date, we'll send deposit payment instructions to secure your session. If anything above needs changing, just reply to this email.",
    ),
    ctaButton('Visit Our Site', 'https://hightidestudios.ie'),
  ].join('\n');
}

export function buildContactClientContent({ fromName, message }) {
  return [
    greeting(fromName),
    paragraph(
      "Thanks for reaching out to High Tide Studios. We've received your message and will get back to you within 1–2 business days.",
    ),
    textBox(
      `<p style="color:rgba(255,255,255,0.5); font-size:12px; text-transform:uppercase; letter-spacing:0.5px; margin:0 0 8px 0;">Your message</p>
       <p style="color:rgba(255,255,255,0.85); font-size:14px; line-height:1.6; margin:0; font-style:italic;">"${escapeHtml(message)}"</p>`,
    ),
    paragraph(
      "In the meantime, feel free to browse our packages or reach us directly if anything's urgent.",
    ),
    ctaButton('View Our Packages', 'https://hightidestudios.ie/services'),
  ].join('\n');
}

// --- Internal notification content (sent to terry@hightidestudios.ie) ------

export function buildBookingInternalContent({
  fromName,
  fromEmail,
  phone,
  company,
  packageTitle,
  packagePrice,
  depositAmount,
  balanceDue,
  preferredDates,
  notes,
}) {
  return [
    `<p style="color:#ffffff; font-size:16px; margin:0 0 20px 0;">A new booking request has come in via the site.</p>`,
    sectionLabel('Client Details'),
    box(
      row('Name', escapeHtml(fromName)) +
        row(
          'Email',
          `<a href="mailto:${escapeHtml(fromEmail)}" style="color:#c49648; text-decoration:none;">${escapeHtml(fromEmail)}</a>`,
        ) +
        row('Phone', escapeHtml(phone)) +
        row('Company', escapeHtml(company || 'Not provided')),
    ),
    sectionLabel('Booking Details'),
    box(
      row('Package', escapeHtml(packageTitle)) +
        row('Price', escapeHtml(packagePrice)) +
        row('Deposit (10%)', escapeHtml(depositAmount), { highlight: true }) +
        row('Balance Due', escapeHtml(balanceDue)) +
        row('Preferred Dates', escapeHtml(preferredDates)),
    ),
    sectionLabel('Notes'),
    textBox(
      `<p style="color:rgba(255,255,255,0.85); font-size:13px; line-height:1.6; margin:0;">${escapeHtml(notes || 'None provided')}</p>`,
    ),
    ctaButton(`Reply to ${fromName}`, `mailto:${fromEmail}`),
  ].join('\n');
}

export function buildContactInternalContent({
  fromName,
  fromEmail,
  phone,
  serviceLabel,
  message,
}) {
  return [
    `<p style="color:#ffffff; font-size:16px; margin:0 0 20px 0;">A new message has come in via the contact form.</p>`,
    sectionLabel('Contact Details'),
    box(
      row('Name', escapeHtml(fromName)) +
        row(
          'Email',
          `<a href="mailto:${escapeHtml(fromEmail)}" style="color:#c49648; text-decoration:none;">${escapeHtml(fromEmail)}</a>`,
        ) +
        row('Phone', escapeHtml(phone || 'Not provided')) +
        row('Service Interest', escapeHtml(serviceLabel)),
    ),
    sectionLabel('Message'),
    textBox(
      `<p style="color:rgba(255,255,255,0.85); font-size:14px; line-height:1.6; margin:0;">${escapeHtml(message)}</p>`,
    ),
    ctaButton(`Reply to ${fromName}`, `mailto:${fromEmail}`),
  ].join('\n');
}

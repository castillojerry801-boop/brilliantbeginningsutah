import type { NextConfig } from "next";

const securityHeaders = [
  // Force HTTPS for 2 years, include subdomains
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevent the site from being embedded in iframes on other domains (clickjacking)
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Stop browsers from guessing content types
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Don't leak the full URL in Referer headers when navigating away
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Disable browser features this site doesn't use
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  // Content Security Policy — controls what the browser is allowed to load
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for its runtime scripts
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      // Supabase and Turnstile API calls
      "connect-src 'self' https://*.supabase.co https://challenges.cloudflare.com",
      // Turnstile renders inside an iframe
      "frame-src https://challenges.cloudflare.com",
      // Nobody can embed this site in an iframe
      "frame-ancestors 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

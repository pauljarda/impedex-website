import type { NextConfig } from "next";

// Security headers applied to every response.
//
// The CSP is deliberately permissive on styles/images (Tailwind injects inline
// styles, next/image emits blob: and data: URLs) but locks down what can be
// framed, where scripts may come from, and who may embed the site.
// 'unsafe-inline'/'unsafe-eval' on script-src are required by the Next.js dev
// overlay and its inline bootstrap; tighten with a nonce if that becomes a
// priority.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // api.pwnedpasswords.com: breached-password check at sign-up (see app/login/page.tsx)
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://cloudflareinsights.com https://api.pwnedpasswords.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Clickjacking protection for /login and /admin (frame-ancestors above
  // covers modern browsers; this is the legacy equivalent).
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

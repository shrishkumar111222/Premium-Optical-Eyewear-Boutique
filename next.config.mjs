/**
 * Static-export configuration.
 *
 * GitHub Pages (project site) needs a basePath. Set it at build time:
 *   NEXT_PUBLIC_BASE_PATH=/premium-optical-eyewear-boutique npm run build
 * Firebase Hosting / custom domains need no basePath — just `npm run build`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    // Required for `output: 'export'` — no image optimization server exists.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;

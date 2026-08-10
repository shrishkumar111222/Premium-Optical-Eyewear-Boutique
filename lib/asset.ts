/**
 * Prefixes a public-folder path with the deployment base path.
 *
 * Next.js rewrites `_next/*` URLs for `basePath` automatically, but files served
 * straight out of /public (and images rendered with `unoptimized`) keep the path
 * they were given. Without this helper every image 404s on a GitHub Pages project
 * site, which is served from /<repo-name>.
 *
 * Set the base path at build time:
 *   NEXT_PUBLIC_BASE_PATH=/my-repo npm run build
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  if (!basePath) return path;
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Absolute origin for canonical URLs, structured data and the sitemap.
 * Includes the base path so a project-page deployment still points at itself.
 */
export function siteOrigin(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, '')}${basePath}`;
}

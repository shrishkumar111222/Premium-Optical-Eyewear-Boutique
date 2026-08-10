# VISIONÉ — Premium Optical & Eyewear Boutique

A free, production-ready demo website for premium optical stores, designer eyewear
boutiques, luxury sunglasses retailers and high-end opticians.

Built to look like an international eyewear brand rather than a local optical shop:
editorial typography, a black / warm-white / gold palette, restrained motion, and a
conversion layer built around WhatsApp, calls and consultation bookings.

**Everything is static.** No backend, no database, no server-side rendering.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
```

Requires Node 18+.

---

## Make it yours

Almost every change a store owner needs lives in `/config`:

| File | What's in it |
| --- | --- |
| `config/business.ts` | **Start here.** Name, tagline, phone, WhatsApp, email, address, Google Maps links, opening hours, social profiles, statistics, and every prefilled WhatsApp message. |
| `config/products.ts` | The frame catalogue and price placeholders. |
| `config/collections.ts` | Eyeglasses / sunglasses / men's / women's / kids taxonomies. |
| `config/brands.ts` | Brand wall entries and the accompanying disclaimer. |
| `config/testimonials.ts` | Sample reviews (replace before publishing). |
| `config/faq.ts` | FAQ copy — also emitted as FAQPage structured data. |
| `config/content.ts` | Face shapes, lens options, store experience, style stories, gallery, why-choose-us, business-value copy. |
| `config/navigation.ts` | Header, footer and search entries. |
| `config/images.ts` | Every image slot on the site. |

Rebranding is a two-file job: change the name in `config/business.ts` and adjust
`components/Logo.tsx` if you want a logo image instead of a wordmark.

### Turning off the agency CTA

This demo doubles as a sales tool. Set `demoCta.enabled = false` in
`config/business.ts` to remove the "Get FREE Website Demo" banner and the entire
business-value section when handing the site to a client.

---

## Imagery

The site ships with generated vector artwork (`/public/images`) so there are no
external image dependencies — nothing can 404, nothing needs a CDN, and the whole
image set is under 600 KB. Regenerate it with:

```bash
node scripts/generate-images.mjs
```

To use real photography, drop your files into `/public/images` and update the paths
in `config/images.ts`, `config/products.ts` and `config/content.ts`. Use WebP or
AVIF at roughly 1600 px wide for full-bleed images and 1000 px for product shots.

---

## Deployment

The build produces a fully static `./out` directory.

### GitHub Pages

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. In the
repository settings, set **Pages → Source → GitHub Actions**. The workflow passes
`NEXT_PUBLIC_BASE_PATH=/<repo-name>` automatically, which a project page needs.

For a custom domain (or a `<user>.github.io` root site), remove that env var so the
site builds without a base path.

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

`firebase.json` already points at `out/`, sets long cache headers for hashed assets
and serves `404.html` for unknown paths.

### Anywhere else

Upload `./out` to Netlify, Vercel, Cloudflare Pages, S3 or any static host.

---

## What's inside

- **Next.js 14 (App Router)** with `output: 'export'` — TypeScript, Tailwind CSS,
  Framer Motion, Lucide icons.
- **Sections**: hero, trust bar, collection grid with filters and a product dialog,
  premium eyeglasses, designer sunglasses, men's / women's / kids collections, brand
  wall, interactive face shape guide, three-step frame finder, lens options,
  consultation + booking form, why choose us, horizontally-scrolling store gallery,
  testimonials, style stories, masonry gallery with lightbox, FAQ accordion, contact,
  map, business value, final CTA, footer.
- **Conversion layer**: floating WhatsApp button, sticky mobile action bar, back to
  top, scroll progress, contextual prefilled WhatsApp messages for every section.
- **SEO**: metadata, Open Graph, Twitter cards, `Optician` / `WebSite` / `FAQPage` /
  `BreadcrumbList` structured data, sitemap and robots.
- **Accessibility**: semantic landmarks, keyboard-navigable dialogs with focus
  trapping, visible focus rings, ARIA labelling, and full `prefers-reduced-motion`
  support.

---

## Content and compliance notes

This is a demonstration site for a fictional boutique. Before publishing it for a
real business:

1. Replace every value in `config/business.ts` with the store's real details.
2. Replace the sample testimonials with genuine, permissioned reviews.
3. Replace or remove the placeholder statistics (rating, review count, years,
   customers served) — do not publish numbers you cannot substantiate.
4. Only list brands the store actually carries, with whatever permission each brand
   requires. Listing a brand is not a claim of authorized dealership.
5. Keep the face shape guide and lens sections framed as style and product
   information. Nothing on the site should read as medical advice or promise a
   vision outcome.
6. Have the privacy policy and terms reviewed against the laws that apply to you.

---

## Licence

Provided as a free demo. Replace all placeholder content before commercial use.

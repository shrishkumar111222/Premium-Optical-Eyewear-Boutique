/**
 * Generates the boutique's editorial artwork as optimized SVG files in /public/images.
 *
 * Why vector art: the demo ships with zero external image dependencies, so nothing
 * can 404, nothing needs a CDN, and Lighthouse stays fast. Every slot is mapped in
 * `config/images.ts` — replace a path there with real photography whenever the
 * business has its own shoot.
 *
 * Run: node scripts/generate-images.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'images');
mkdirSync(OUT, { recursive: true });

/* ------------------------------------------------------------------ palettes */

const PALETTES = {
  onyx: { a: '#050505', b: '#1a1a1a', c: '#242424', glow: '#3a3a3a', key: 0.8, rim: 'gold', lens: 'dark' },
  charcoal: { a: '#151515', b: '#2b2b2b', c: '#383838', glow: '#4a4a4a', key: 0.75, rim: 'steel', lens: 'dark' },
  ivory: { a: '#FAFAF8', b: '#EFEBE3', c: '#E2DBCF', glow: '#FFFFFF', key: 0.3, rim: 'dark', lens: 'light' },
  sand: { a: '#F3EDE3', b: '#E4D9C6', c: '#D6C8AE', glow: '#FFFDF7', key: 0.32, rim: 'gold', lens: 'light' },
  smoke: { a: '#E8E8E8', b: '#D2D2D2', c: '#BEBEBE', glow: '#FFFFFF', key: 0.3, rim: 'dark', lens: 'light' },
  midnight: { a: '#08090C', b: '#14171E', c: '#1E222C', glow: '#2C3240', key: 0.85, rim: 'gold', lens: 'dark' },
};

const GOLD = '#C9A227';
const GOLD_LIGHT = '#E8D7A5';

/* --------------------------------------------------------------- lens shapes */

/** Rounded-rectangle path centred on the origin. */
function roundedRect(w, h, r) {
  const x = -w / 2;
  const y = -h / 2;
  const rr = Math.min(r, w / 2, h / 2);
  return [
    `M ${x + rr} ${y}`,
    `H ${x + w - rr}`,
    `Q ${x + w} ${y} ${x + w} ${y + rr}`,
    `V ${y + h - rr}`,
    `Q ${x + w} ${y + h} ${x + w - rr} ${y + h}`,
    `H ${x + rr}`,
    `Q ${x} ${y + h} ${x} ${y + h - rr}`,
    `V ${y + rr}`,
    `Q ${x} ${y} ${x + rr} ${y}`,
    'Z',
  ].join(' ');
}

/**
 * Lens outlines for the right-hand lens, centred on the origin.
 * The left lens is the same path mirrored, which keeps every frame symmetrical.
 * `w`/`h` are the lens bounding box.
 */
const LENS = {
  round: (w, h) => {
    const rx = w / 2;
    const ry = h / 2;
    return `M ${-rx} 0 A ${rx} ${ry} 0 1 1 ${rx} 0 A ${rx} ${ry} 0 1 1 ${-rx} 0 Z`;
  },
  square: (w, h) => roundedRect(w, h, Math.min(w, h) * 0.14),
  oversized: (w, h) => roundedRect(w, h, Math.min(w, h) * 0.3),
  rimless: (w, h) => roundedRect(w, h, Math.min(w, h) * 0.22),
  geometric: (w, h) => {
    const x = w / 2;
    const y = h / 2;
    return `M ${-x * 0.72} ${-y} H ${x * 0.86} L ${x} ${-y * 0.08} L ${x * 0.6} ${y} H ${-x * 0.5} L ${-x} ${-y * 0.2} Z`;
  },
  wayfarer: (w, h) => {
    const x = w / 2;
    const y = h / 2;
    // Wider at the brow, tapering to a softly rounded base.
    return [
      `M ${-x} ${-y + h * 0.1}`,
      `Q ${-x} ${-y} ${-x + w * 0.1} ${-y}`,
      `H ${x - w * 0.08}`,
      `Q ${x} ${-y} ${x} ${-y + h * 0.14}`,
      `L ${x - w * 0.06} ${y - h * 0.3}`,
      `Q ${x - w * 0.12} ${y} ${-x + w * 0.34} ${y}`,
      `Q ${-x + w * 0.02} ${y} ${-x} ${-y + h * 0.1}`,
      'Z',
    ].join(' ');
  },
  aviator: (w, h) => {
    const x = w / 2;
    const y = h / 2;
    // Flat brow line dropping into an offset teardrop.
    return [
      `M ${-x} ${-y + h * 0.06}`,
      `Q ${-x + w * 0.04} ${-y} ${-x + w * 0.16} ${-y}`,
      `H ${x - w * 0.06}`,
      `Q ${x} ${-y} ${x} ${-y + h * 0.16}`,
      `Q ${x - w * 0.02} ${y - h * 0.02} ${-x + w * 0.42} ${y}`,
      `Q ${-x + w * 0.08} ${y - h * 0.08} ${-x} ${-y + h * 0.06}`,
      'Z',
    ].join(' ');
  },
  cateye: (w, h) => {
    const x = w / 2;
    const y = h / 2;
    // Upswept outer brow — the tip lifts above the lens box.
    return [
      `M ${-x} ${-y + h * 0.22}`,
      `Q ${-x + w * 0.3} ${-y + h * 0.02} ${x - w * 0.24} ${-y * 1.12}`,
      `Q ${x + w * 0.03} ${-y * 1.24} ${x} ${-y + h * 0.24}`,
      `Q ${x - w * 0.02} ${y - h * 0.06} ${-x + w * 0.4} ${y}`,
      `Q ${-x + w * 0.04} ${y - h * 0.06} ${-x} ${-y + h * 0.22}`,
      'Z',
    ].join(' ');
  },
  browline: (w, h) => roundedRect(w, h, Math.min(w, h) * 0.18),
  sport: (w, h) => {
    const x = w / 2;
    const y = h / 2;
    return [
      `M ${-x} ${-y + h * 0.18}`,
      `Q ${-x + w * 0.2} ${-y} ${x - w * 0.12} ${-y + h * 0.04}`,
      `Q ${x} ${-y + h * 0.1} ${x} ${-y + h * 0.34}`,
      `Q ${x - w * 0.06} ${y} ${-x + w * 0.38} ${y}`,
      `Q ${-x + w * 0.04} ${y - h * 0.1} ${-x} ${-y + h * 0.18}`,
      'Z',
    ].join(' ');
  },
  panto: (w, h) => {
    const x = w / 2;
    const y = h / 2;
    return [
      `M ${-x} ${-y + h * 0.24}`,
      `Q ${-x + w * 0.06} ${-y} ${0} ${-y}`,
      `Q ${x - w * 0.04} ${-y} ${x} ${-y + h * 0.26}`,
      `Q ${x + w * 0.02} ${y} ${0} ${y}`,
      `Q ${-x - w * 0.02} ${y} ${-x} ${-y + h * 0.24}`,
      'Z',
    ].join(' ');
  },
};

const RIM_STROKES = {
  gold: { stroke: `url(#rimGold)`, width: 1 },
  steel: { stroke: `url(#rimSteel)`, width: 1 },
  dark: { stroke: `url(#rimDark)`, width: 1 },
};

/**
 * A complete pair of frames: lenses, bridge, temples, hinges and a cast shadow.
 * Drawn around the origin at unit-ish scale, then positioned by the caller.
 */
function frame({ shape = 'wayfarer', lensW = 200, lensH = 150, gap = 44, rim = 'gold', lens = 'dark', thickness = 9, rimless = false }) {
  const path = (LENS[shape] || LENS.wayfarer)(lensW, lensH);
  const cx = lensW / 2 + gap / 2;
  const rimStroke = RIM_STROKES[rim] || RIM_STROKES.gold;
  const lensFill = lens === 'dark' ? 'url(#lensDark)' : 'url(#lensLight)';
  const templeY = -lensH * 0.24;
  const templeLen = lensW * 0.5;
  const outer = cx + lensW / 2;

  const lensGroup = (sign) => `
    <g transform="translate(${sign * cx} 0) scale(${sign} 1)">
      <path d="${path}" fill="${lensFill}" />
      <path d="${path}" fill="url(#lensGloss)" opacity="0.55" />
      ${rimless ? '' : `<path d="${path}" fill="none" stroke="${rimStroke.stroke}" stroke-width="${thickness}" stroke-linejoin="round" />`}
      <path d="${path}" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1.5" transform="translate(0 ${-thickness * 0.3})" />
    </g>`;

  return `
  <g>
    <ellipse cx="0" cy="${lensH * 0.78}" rx="${outer * 0.98}" ry="${lensH * 0.12}" fill="url(#castShadow)" />
    ${lensGroup(1)}
    ${lensGroup(-1)}
    ${rimless
      ? `<path d="M ${-gap / 2 - lensW * 0.04} ${-lensH * 0.1} H ${gap / 2 + lensW * 0.04}"
              fill="none" stroke="${rimStroke.stroke}" stroke-width="${thickness}" stroke-linecap="round" />`
      : `<path d="M ${-gap / 2 - lensW * 0.06} ${-lensH * 0.16} Q 0 ${-lensH * 0.34} ${gap / 2 + lensW * 0.06} ${-lensH * 0.16}"
              fill="none" stroke="${rimStroke.stroke}" stroke-width="${thickness * 0.85}" stroke-linecap="round" />`}
    ${shape === 'browline'
      ? `<path d="M ${-outer} ${-lensH / 2 - thickness * 1.1} H ${outer}" stroke="${rimStroke.stroke}" stroke-width="${thickness * 3.6}" stroke-linecap="round" fill="none" />`
      : ''}
    <g stroke="${rimStroke.stroke}" stroke-width="${thickness * 0.8}" stroke-linecap="round" fill="none">
      <path d="M ${outer} ${templeY} Q ${outer + templeLen * 0.66} ${templeY + lensH * 0.02} ${outer + templeLen} ${templeY + lensH * 0.42}" />
      <path d="M ${-outer} ${templeY} Q ${-outer - templeLen * 0.66} ${templeY + lensH * 0.02} ${-outer - templeLen} ${templeY + lensH * 0.42}" />
    </g>
    <g fill="${rim === 'gold' ? GOLD_LIGHT : '#9a9a9a'}" opacity="0.9">
      <circle cx="${outer - thickness * 0.4}" cy="${templeY}" r="${thickness * 0.55}" />
      <circle cx="${-outer + thickness * 0.4}" cy="${templeY}" r="${thickness * 0.55}" />
    </g>
  </g>`;
}

/* ------------------------------------------------------------------- shared */

function defs(p) {
  return `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${p.a}" />
      <stop offset="55%" stop-color="${p.b}" />
      <stop offset="100%" stop-color="${p.c}" />
    </linearGradient>
    <radialGradient id="keyLight" cx="50%" cy="38%" r="62%">
      <stop offset="0%" stop-color="${p.glow}" stop-opacity="${p.key}" />
      <stop offset="100%" stop-color="${p.glow}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="rimGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GOLD_LIGHT}" />
      <stop offset="45%" stop-color="${GOLD}" />
      <stop offset="100%" stop-color="#8C6F16" />
    </linearGradient>
    <linearGradient id="rimSteel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F2F2F2" />
      <stop offset="50%" stop-color="#A8A8A8" />
      <stop offset="100%" stop-color="#5E5E5E" />
    </linearGradient>
    <linearGradient id="rimDark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4A4A4A" />
      <stop offset="50%" stop-color="#151515" />
      <stop offset="100%" stop-color="#000000" />
    </linearGradient>
    <linearGradient id="lensDark" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="#2A2A2A" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#080808" stop-opacity="0.98" />
    </linearGradient>
    <linearGradient id="lensLight" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#C9CDD2" stop-opacity="0.45" />
    </linearGradient>
    <linearGradient id="lensGloss" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.34" />
      <stop offset="38%" stop-color="#FFFFFF" stop-opacity="0.06" />
      <stop offset="52%" stop-color="#FFFFFF" stop-opacity="0.22" />
      <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0" />
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="45%" r="72%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.5" />
    </radialGradient>
    <radialGradient id="castShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.42" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="goldSweep" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0" />
      <stop offset="50%" stop-color="${GOLD_LIGHT}" stop-opacity="0.75" />
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0" />
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </defs>`;
}

function backdrop(w, h, p, { vignette = true } = {}) {
  return `
  <rect width="${w}" height="${h}" fill="url(#bg)" />
  <rect width="${w}" height="${h}" fill="url(#keyLight)" />
  ${vignette ? `<rect width="${w}" height="${h}" fill="url(#vignette)" />` : ''}
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.05" />`;
}

function svg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" preserveAspectRatio="xMidYMid slice">${body}</svg>\n`;
}

const files = [];
function emit(name, contents) {
  writeFileSync(join(OUT, name), contents);
  files.push(name);
}

/* ------------------------------------------------------------- compositions */

/** A single hero pair of frames on a studio sweep — used for products & categories. */
function studioShot({ w, h, palette, shape, scale = 1, label = true, sweep = false }) {
  const p = PALETTES[palette];
  const s = (Math.min(w, h) / 620) * scale;
  return svg(
    w,
    h,
    `${defs(p)}
    ${backdrop(w, h, p)}
    <ellipse cx="${w / 2}" cy="${h * 0.84}" rx="${w * 0.34}" ry="${h * 0.035}" fill="#000" opacity="0.1" />
    <g transform="translate(${w / 2} ${h * 0.5}) scale(${s})">
      ${frame({ shape, rim: p.rim, lens: p.lens, rimless: shape === 'rimless', thickness: shape === 'rimless' ? 5 : 9 })}
    </g>
    ${sweep ? `<rect x="0" y="${h * 0.3}" width="${w}" height="${h * 0.1}" fill="url(#goldSweep)" opacity="0.35" />` : ''}
    ${label ? `<rect x="${w * 0.06}" y="${h * 0.88}" width="${w * 0.1}" height="2" fill="${GOLD}" opacity="0.8" />` : ''}`
  );
}

/** Wide cinematic hero: the hero pair sits right of centre, clear of the copy. */
function heroShot(w, h) {
  const p = PALETTES.onyx;
  return svg(
    w,
    h,
    `${defs(p)}
    <rect width="${w}" height="${h}" fill="url(#bg)" />
    <radialGradient id="heroKey" cx="68%" cy="46%" r="52%">
      <stop offset="0%" stop-color="#6a6a6a" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#6a6a6a" stop-opacity="0" />
    </radialGradient>
    <rect width="${w}" height="${h}" fill="url(#heroKey)" />
    <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.05" />
    <g opacity="0.2" transform="translate(${w * 0.88} ${h * 0.2}) scale(${(h / 620) * 0.34}) rotate(-9)">
      ${frame({ shape: 'round', rim: 'steel', lens: 'dark' })}
    </g>
    <g opacity="0.24" transform="translate(${w * 0.52} ${h * 0.8}) scale(${(h / 620) * 0.3}) rotate(8)">
      ${frame({ shape: 'cateye', rim: 'steel', lens: 'dark' })}
    </g>
    <rect x="0" y="${h * 0.4}" width="${w}" height="${h * 0.18}" fill="url(#goldSweep)" opacity="0.3" />
    <g transform="translate(${w * 0.63} ${h * 0.47}) scale(${(h / 620) * 0.6})">
      ${frame({ shape: 'aviator', rim: 'gold', lens: 'dark', thickness: 8 })}
    </g>
    <rect x="${w * 0.63 - 60}" y="${h * 0.88}" width="120" height="2" fill="${GOLD}" opacity="0.6" />`
  );
}

/** Portrait hero for narrow viewports: frames sit high, copy sits underneath. */
function portraitHeroShot(w, h) {
  const p = PALETTES.onyx;
  return svg(
    w,
    h,
    `${defs(p)}
    <rect width="${w}" height="${h}" fill="url(#bg)" />
    <radialGradient id="heroKeyP" cx="50%" cy="32%" r="52%">
      <stop offset="0%" stop-color="#6a6a6a" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#6a6a6a" stop-opacity="0" />
    </radialGradient>
    <rect width="${w}" height="${h}" fill="url(#heroKeyP)" />
    <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.05" />
    <g opacity="0.2" transform="translate(${w * 0.22} ${h * 0.62}) scale(${(w / 620) * 0.34}) rotate(-8)">
      ${frame({ shape: 'round', rim: 'steel', lens: 'dark' })}
    </g>
    <rect x="0" y="${h * 0.26}" width="${w}" height="${h * 0.12}" fill="url(#goldSweep)" opacity="0.28" />
    <g transform="translate(${w * 0.5} ${h * 0.32}) scale(${(w / 620) * 0.62})">
      ${frame({ shape: 'aviator', rim: 'gold', lens: 'dark', thickness: 8 })}
    </g>
    <rect x="${w * 0.5 - 50}" y="${h * 0.5}" width="100" height="2" fill="${GOLD}" opacity="0.55" />`
  );
}

/** Showroom interiors: display walls, counters, seating — abstracted architecture. */
function interiorShot({ w, h, palette, variant }) {
  const p = PALETTES[palette];
  const wallY = h * 0.12;
  const wallH = h * 0.52;
  let scene = '';

  if (variant === 'wall') {
    const cols = 7;
    const rows = 3;
    const cw = (w * 0.78) / cols;
    const ch = wallH / rows;
    let cells = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = w * 0.11 + c * cw + cw / 2;
        const y = wallY + r * ch + ch / 2;
        const shapes = ['wayfarer', 'round', 'cateye', 'aviator', 'square', 'panto', 'geometric'];
        cells += `
        <rect x="${x - cw * 0.42}" y="${y - ch * 0.42}" width="${cw * 0.84}" height="${ch * 0.84}" rx="4"
              fill="#ffffff" fill-opacity="0.035" stroke="#ffffff" stroke-opacity="0.07" />
        <g transform="translate(${x} ${y}) scale(${(cw / 620) * 0.92})" opacity="0.85">
          ${frame({ shape: shapes[(r * cols + c) % shapes.length], rim: (r + c) % 3 === 0 ? 'gold' : 'steel', lens: p.lens, thickness: 10 })}
        </g>`;
      }
    }
    scene = `${cells}
      <rect x="${w * 0.09}" y="${wallY - 10}" width="${w * 0.82}" height="${wallH + 20}" fill="none" stroke="${GOLD}" stroke-opacity="0.28" />
      <rect x="0" y="${h * 0.72}" width="${w}" height="${h * 0.28}" fill="#000" opacity="0.28" />`;
  } else if (variant === 'counter') {
    scene = `
      <rect x="${w * 0.08}" y="${h * 0.56}" width="${w * 0.84}" height="${h * 0.3}" rx="6" fill="#000" opacity="0.35" />
      <rect x="${w * 0.08}" y="${h * 0.54}" width="${w * 0.84}" height="${h * 0.04}" fill="url(#rimGold)" opacity="0.45" />
      <g transform="translate(${w * 0.3} ${h * 0.4}) scale(${(w / 620) * 0.34})">${frame({ shape: 'panto', rim: 'gold', lens: p.lens })}</g>
      <g transform="translate(${w * 0.68} ${h * 0.4}) scale(${(w / 620) * 0.34})">${frame({ shape: 'square', rim: 'steel', lens: p.lens })}</g>
      <circle cx="${w * 0.5}" cy="${h * 0.3}" r="${h * 0.22}" fill="url(#keyLight)" opacity="0.5" />`;
  } else if (variant === 'consult') {
    scene = `
      <circle cx="${w * 0.5}" cy="${h * 0.44}" r="${h * 0.3}" fill="#ffffff" fill-opacity="0.04" stroke="${GOLD}" stroke-opacity="0.3" />
      <g transform="translate(${w * 0.5} ${h * 0.44}) scale(${(w / 620) * 0.46})">${frame({ shape: 'oversized', rim: 'gold', lens: p.lens })}</g>
      <rect x="${w * 0.2}" y="${h * 0.8}" width="${w * 0.6}" height="${h * 0.05}" rx="4" fill="#000" opacity="0.3" />`;
  } else {
    // 'lens' — stacked optical blanks on a bench, seen straight on.
    scene = `
      ${[0.42, 0.34, 0.26, 0.18]
        .map(
          (r, i) =>
            `<circle cx="${w * 0.5}" cy="${h * 0.46}" r="${h * r}" fill="none" stroke="${i % 2 ? GOLD : '#ffffff'}" stroke-opacity="${i % 2 ? 0.5 : 0.3}" stroke-width="${i % 2 ? 2 : 1.4}" />`
        )
        .join('')}
      <circle cx="${w * 0.5}" cy="${h * 0.46}" r="${h * 0.18}" fill="url(#lensLight)" opacity="0.4" />
      <circle cx="${w * 0.5}" cy="${h * 0.46}" r="${h * 0.18}" fill="url(#lensGloss)" opacity="0.8" />
      <g transform="translate(${w * 0.18} ${h * 0.72}) scale(${(w / 620) * 0.2})" opacity="0.7">${frame({ shape: 'round', rim: 'gold', lens: p.lens })}</g>
      <g transform="translate(${w * 0.82} ${h * 0.72}) scale(${(w / 620) * 0.2})" opacity="0.7">${frame({ shape: 'square', rim: 'steel', lens: p.lens })}</g>
      <path d="M ${w * 0.14} ${h * 0.16} L ${w * 0.86} ${h * 0.82}" stroke="url(#goldSweep)" stroke-width="${h * 0.035}" opacity="0.35" />`;
  }

  return svg(w, h, `${defs(p)}${backdrop(w, h, p)}${scene}`);
}

/** Editorial style-story plates: large type-free compositions with a single hero frame. */
function editorialShot({ w, h, palette, shape, rotate = -6 }) {
  const p = PALETTES[palette];
  return svg(
    w,
    h,
    `${defs(p)}
    ${backdrop(w, h, p)}
    <rect x="${w * 0.08}" y="${h * 0.08}" width="${w * 0.84}" height="${h * 0.84}" fill="none" stroke="#ffffff" stroke-opacity="0.09" />
    <g transform="translate(${w * 0.5} ${h * 0.5}) rotate(${rotate}) scale(${(Math.min(w, h) / 620) * 1.05})">
      ${frame({ shape, rim: p.rim, lens: p.lens })}
    </g>
    <rect x="${w * 0.08}" y="${h * 0.5}" width="${w * 0.84}" height="1" fill="${GOLD}" opacity="0.22" />`
  );
}

/* ------------------------------------------------------------------- emit */

// Hero + open graph
emit('hero.svg', heroShot(1920, 1080));
// Portrait crop for phones — the wide composition loses the frames on a narrow screen.
emit('hero-portrait.svg', portraitHeroShot(1000, 1500));
emit('og-cover.svg', heroShot(1200, 630));
emit('final-cta.svg', heroShot(1920, 900));

// Products — order matches config/products.ts
const products = [
  ['product-aviator-gold', 'aviator', 'onyx'],
  ['product-wayfarer-onyx', 'wayfarer', 'charcoal'],
  ['product-round-titanium', 'round', 'smoke'],
  ['product-cateye-amber', 'cateye', 'sand'],
  ['product-square-matte', 'square', 'onyx'],
  ['product-rimless-air', 'rimless', 'midnight'],
  ['product-oversized-noir', 'oversized', 'midnight'],
  ['product-browline-heritage', 'browline', 'smoke'],
  ['product-panto-atelier', 'panto', 'ivory'],
  ['product-geometric-edge', 'geometric', 'charcoal'],
  ['product-sport-velocity', 'sport', 'midnight'],
  ['product-kids-flex', 'round', 'sand'],
];
for (const [name, shape, palette] of products) {
  emit(`${name}.svg`, studioShot({ w: 1000, h: 1000, palette, shape, sweep: palette === 'onyx' }));
}

// Category / collection plates
const categories = [
  ['category-eyeglasses', 'panto', 'ivory', 1400, 1000],
  ['category-sunglasses', 'aviator', 'onyx', 1400, 1000],
  ['category-men', 'square', 'charcoal', 1200, 1500],
  ['category-women', 'cateye', 'sand', 1200, 1500],
  ['category-kids', 'round', 'smoke', 1400, 1000],
  ['category-lenses', 'rimless', 'charcoal', 1400, 1000],
];
for (const [name, shape, palette, w, h] of categories) {
  emit(`${name}.svg`, studioShot({ w, h, palette, shape, sweep: true }));
}

// Showroom / store experience
const interiors = [
  ['store-display-wall', 'onyx', 'wall', 1600, 1000],
  ['store-lens-counter', 'charcoal', 'counter', 1600, 1000],
  ['store-consultation', 'midnight', 'consult', 1600, 1000],
  ['store-frame-bar', 'ivory', 'wall', 1600, 1000],
  ['store-lens-bench', 'onyx', 'lens', 1600, 1000],
  ['store-interior', 'smoke', 'counter', 1600, 1000],
];
for (const [name, palette, variant, w, h] of interiors) {
  emit(`${name}.svg`, interiorShot({ w, h, palette, variant }));
}

// Gallery — mixed aspect ratios for the masonry grid
const gallery = [
  ['gallery-01', 'onyx', 'wall', 1200, 1500],
  ['gallery-02', 'sand', 'counter', 1200, 900],
  ['gallery-03', 'midnight', 'lens', 1200, 900],
  ['gallery-04', 'ivory', 'consult', 1200, 1500],
  ['gallery-05', 'charcoal', 'wall', 1200, 900],
  ['gallery-06', 'smoke', 'counter', 1200, 1400],
  ['gallery-07', 'onyx', 'lens', 1200, 1200],
  ['gallery-08', 'sand', 'wall', 1200, 900],
];
for (const [name, palette, variant, w, h] of gallery) {
  emit(`${name}.svg`, interiorShot({ w, h, palette, variant }));
}

// Style stories
const stories = [
  ['story-everyday', 'ivory', 'panto', -5],
  ['story-signature', 'onyx', 'browline', 4],
  ['story-minimal', 'onyx', 'rimless', -3],
  ['story-weekend', 'midnight', 'aviator', 6],
];
for (const [name, palette, shape, rotate] of stories) {
  emit(`${name}.svg`, editorialShot({ w: 1200, h: 900, palette, shape, rotate }));
}

// Favicon / brand mark
writeFileSync(
  join(ROOT, 'public', 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="12" fill="#000000"/>
  <g fill="none" stroke="#C9A227" stroke-width="3.4" stroke-linecap="round">
    <circle cx="21" cy="34" r="11"/>
    <circle cx="43" cy="34" r="11"/>
    <path d="M32 31c-1.6-2.2-4.4-2.2-6 0M10 28l4-4M54 28l-4-4"/>
  </g>
</svg>
`
);

console.log(`Generated ${files.length} images in public/images`);

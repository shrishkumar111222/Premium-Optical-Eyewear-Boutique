'use client';

/**
 * Tiny client-side wishlist. Demo-only: it lives in memory for the session and
 * broadcasts its size so the header badge can stay in sync. Swap this for real
 * persistence (localStorage, an account, a cart) when a backend exists.
 */
const saved = new Set<string>();

export function isSaved(id: string): boolean {
  return saved.has(id);
}

/** Adds or removes an id; returns the new saved state for that id. */
export function toggleSaved(id: string): boolean {
  if (saved.has(id)) saved.delete(id);
  else saved.add(id);

  window.dispatchEvent(
    new CustomEvent('visione:wishlist', { detail: { count: saved.size, id } })
  );
  return saved.has(id);
}

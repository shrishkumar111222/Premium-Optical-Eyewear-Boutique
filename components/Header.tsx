'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Heart, Menu, MessageCircle, Phone, Search, X } from 'lucide-react';
import { business, telLink, whatsappLink, whatsappMessages } from '@/config/business';
import { navItems, searchTargets } from '@/config/navigation';
import { cn } from '@/lib/utils';
import Logo from './Logo';

/**
 * Transparent over the hero, then a blurred solid bar once the page scrolls.
 * Holds the mobile drawer, the section search overlay and the wishlist counter.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [wishlist, setWishlist] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The wishlist is a local-only demo counter; ProductCard dispatches this event.
  useEffect(() => {
    const onWishlist = (event: Event) => {
      const detail = (event as CustomEvent<{ count: number }>).detail;
      setWishlist(detail?.count ?? 0);
    };
    window.addEventListener('visione:wishlist', onWishlist as EventListener);
    return () => window.removeEventListener('visione:wishlist', onWishlist as EventListener);
  }, []);

  // Lock scrolling behind any open overlay.
  useEffect(() => {
    const locked = menuOpen || searchOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return searchTargets.slice(0, 8);
    return searchTargets.filter((item) => item.label.toLowerCase().includes(term));
  }, [query]);

  const goTo = useCallback((href: string) => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery('');
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe',
          solid
            ? 'border-b border-ink/10 bg-paper-warm/85 py-3 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-5'
        )}
      >
        <div className="mx-auto flex w-full max-w-[1560px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              goTo('#top');
            }}
            aria-label={`${business.name} — back to top`}
          >
            <Logo tone={solid ? 'dark' : 'light'} />
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-5 2xl:gap-7">
              {navItems
                .filter((item) => item.href !== '#top')
                .map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(item.href);
                    }}
                    className={cn(
                      'group relative whitespace-nowrap text-[10px] uppercase tracking-[0.13em] transition-colors duration-300 2xl:text-[11px] 2xl:tracking-wide2',
                      solid ? 'text-ink/70 hover:text-ink' : 'text-paper/80 hover:text-paper'
                    )}
                  >
                    {item.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-luxe group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton
              label="Search sections"
              tone={solid ? 'dark' : 'light'}
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </IconButton>

            <IconButton
              label={`Wishlist — ${wishlist} ${wishlist === 1 ? 'frame' : 'frames'} saved`}
              tone={solid ? 'dark' : 'light'}
              onClick={() => goTo('#collection')}
              className="relative hidden sm:inline-flex"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.4} />
              {wishlist > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-ink">
                  {wishlist}
                </span>
              )}
            </IconButton>

            <IconButton
              label="Chat on WhatsApp"
              tone={solid ? 'dark' : 'light'}
              href={whatsappLink(whatsappMessages.general)}
              className="hidden sm:inline-flex"
            >
              <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </IconButton>

            <IconButton
              label={`Call ${business.phoneDisplay}`}
              tone={solid ? 'dark' : 'light'}
              href={telLink}
              className="hidden sm:inline-flex xl:hidden"
            >
              <Phone className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </IconButton>

            <a
              href="#consultation"
              onClick={(event) => {
                event.preventDefault();
                goTo('#consultation');
              }}
              className={cn(
                'btn ml-1 hidden h-11 min-h-0 lg:inline-flex',
                solid ? 'bg-ink text-paper hover:bg-gold hover:text-ink' : 'bg-gold text-ink hover:bg-paper'
              )}
            >
              <Calendar className="h-4 w-4" strokeWidth={1.6} />
              Book Consultation
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center transition-colors xl:hidden',
                solid ? 'text-ink' : 'text-paper'
              )}
            >
              {menuOpen ? <X className="h-5 w-5" strokeWidth={1.4} /> : <Menu className="h-5 w-5" strokeWidth={1.4} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-paper-warm pb-32 pt-24 xl:hidden"
          >
            <nav aria-label="Mobile" className="container-luxe">
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.4 }}
                  >
                    <a
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        goTo(item.href);
                      }}
                      className="flex items-center justify-between py-4 font-display text-2xl font-light text-ink"
                    >
                      {item.label}
                      <span className="text-[10px] uppercase tracking-luxe text-gold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 grid gap-3">
                <a href={whatsappLink(whatsappMessages.consultation)} className="btn-gold w-full">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
                  WhatsApp Inquiry
                </a>
                <a href={telLink} className="btn-outline w-full">
                  <Phone className="h-4 w-4" strokeWidth={1.6} />
                  {business.phoneDisplay}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search"
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-md"
          >
            <div className="container-luxe flex h-full flex-col pt-24">
              <div className="flex items-center gap-4 border-b border-paper/20 pb-4">
                <Search className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.4} />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search collections, guides, services…"
                  aria-label="Search collections, guides and services"
                  className="w-full bg-transparent font-display text-2xl font-light text-paper placeholder:text-paper/50 focus:outline-none sm:text-4xl"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-paper/70 hover:text-paper"
                >
                  <X className="h-5 w-5" strokeWidth={1.4} />
                </button>
              </div>

              <ul className="mt-8 grid max-h-[60vh] gap-1 overflow-y-auto pb-10 sm:grid-cols-2">
                {results.map((item) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => goTo(item.href)}
                      className="group flex w-full items-center justify-between border-b border-paper/10 py-4 text-left text-paper/80 transition-colors hover:text-gold"
                    >
                      <span className="text-sm uppercase tracking-wide2">{item.label}</span>
                      <span className="text-[10px] uppercase tracking-luxe text-paper/50 group-hover:text-gold">
                        Jump
                      </span>
                    </button>
                  </li>
                ))}
                {results.length === 0 && (
                  <li className="py-4 text-sm text-paper/50">
                    Nothing matched “{query}”. Try “sunglasses”, “lenses” or “consultation”.
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IconButton({
  children,
  label,
  tone,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  label: string;
  tone: 'dark' | 'light';
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const classes = cn(
    'inline-flex h-11 w-11 items-center justify-center transition-colors duration-300 hover:text-gold',
    tone === 'light' ? 'text-paper' : 'text-ink',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={label}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" aria-label={label} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { business } from '@/config/business';
import Footer from './Footer';
import Logo from './Logo';

/** Shared shell for the privacy and terms routes. */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-ink/10 bg-paper-warm">
        <div className="container-luxe flex items-center justify-between py-5">
          <Link href="/" aria-label={`${business.name} — home`}>
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wide2 text-ink/60 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
            Back to site
          </Link>
        </div>
      </header>

      <main id="main" className="bg-paper-warm py-16 sm:py-24">
        <div className="container-luxe max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="heading-lg mt-5">{title}</h1>
          <p className="mt-4 text-xs uppercase tracking-wide2 text-ink/55">Last updated {updated}</p>

          <div className="mt-12 space-y-10">{children}</div>
        </div>
      </main>

      <Footer />
    </>
  );
}

/** A single legal section — keeps the heading rhythm consistent. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-light text-ink">{heading}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink/65">{children}</div>
    </section>
  );
}

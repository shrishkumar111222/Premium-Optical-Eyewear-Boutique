import Link from 'next/link';
import { business } from '@/config/business';
import Logo from '@/components/Logo';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <Logo tone="light" className="items-center" />
      <p className="mt-14 font-display text-[clamp(4rem,14vw,9rem)] font-light leading-none text-gold/80">
        404
      </p>
      <h1 className="heading-md mt-6 text-paper">This page is out of frame</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/55">
        The page you were looking for does not exist. Everything at {business.name} lives on the
        main site.
      </p>
      <Link href="/" className="btn-gold mt-9">
        Back to Home
      </Link>
    </main>
  );
}

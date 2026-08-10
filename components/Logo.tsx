import { cn } from '@/lib/utils';
import { business } from '@/config/business';

/**
 * Wordmark. Swap the markup here (or drop in an <Image>) to rebrand the site —
 * nothing else references the logo directly.
 */
export default function Logo({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <span className={cn('flex flex-col leading-none', className)}>
      <span
        className={cn(
          'font-display text-xl font-normal tracking-[0.32em] sm:text-[22px]',
          tone === 'light' ? 'text-paper' : 'text-ink'
        )}
      >
        {business.name}
      </span>
      <span
        className={cn(
          'mt-1.5 text-[8px] uppercase tracking-luxe',
          tone === 'light' ? 'text-paper/55' : 'text-ink/60'
        )}
      >
        {business.nameSuffix}
      </span>
    </span>
  );
}

import { cn } from '@/lib/utils';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
  /** Heading level — keeps the document outline logical. */
  as?: 'h2' | 'h3';
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'dark',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'max-w-3xl',
        centered && 'mx-auto text-center',
        tone === 'light' && 'text-paper',
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn('eyebrow', tone === 'light' && 'eyebrow-light', centered && 'justify-center')}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <Tag className={cn('heading-lg mt-5', tone === 'light' ? 'text-paper' : 'text-ink')}>
          {title}
        </Tag>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'body-lg mt-5',
              tone === 'light' ? 'text-paper/70' : 'text-ink/65',
              centered && 'mx-auto'
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

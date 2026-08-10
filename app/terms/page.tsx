import type { Metadata } from 'next';
import LegalPage, { LegalSection } from '@/components/LegalPage';
import { business, mailLink } from '@/config/business';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `The terms that apply to the ${business.name} demonstration website.`,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="August 2026">
      <LegalSection heading="Demonstration website">
        <p>
          {business.name} is a fictional boutique created to demonstrate a website design. The
          business details, opening hours, statistics, pricing, testimonials and brand listings on
          this site are placeholder content and should not be relied upon as factual.
        </p>
      </LegalSection>

      <LegalSection heading="Not medical or optical advice">
        <p>
          The face shape guide, frame finder and lens descriptions are general style and product
          information. They are not medical advice, not a diagnosis, and not a substitute for an eye
          examination by a qualified professional. Consult an eye care professional about anything
          concerning your vision or eye health.
        </p>
      </LegalSection>

      <LegalSection heading="Products, pricing and availability">
        <p>
          Prices shown are indicative placeholders and do not constitute an offer. Frame
          availability changes constantly; the final price of a pair depends on the lenses and
          coatings selected. Please confirm current pricing and stock with the store.
        </p>
      </LegalSection>

      <LegalSection heading="Brand names">
        <p>
          Any brand names shown are the trademarks of their respective owners and appear only as
          configurable demo content. Their appearance here does not indicate a partnership,
          endorsement, authorized dealership or current stock.
        </p>
      </LegalSection>

      <LegalSection heading="The frame finder">
        <p>
          The frame finder produces suggestions from a small sample catalogue for demonstration
          purposes. It runs entirely in your browser and submits nothing.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms? Write to{' '}
          <a href={mailLink} className="text-ink underline decoration-gold underline-offset-4">
            {business.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}

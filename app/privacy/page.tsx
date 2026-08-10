import type { Metadata } from 'next';
import LegalPage, { LegalSection } from '@/components/LegalPage';
import { business, mailLink } from '@/config/business';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${business.name} handles the information you share through this website.`,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 2026">
      <LegalSection heading="About this template">
        <p>
          This is a demonstration website. The policy below is a starting template and is not legal
          advice — have it reviewed against the laws that apply to your business before publishing.
        </p>
      </LegalSection>

      <LegalSection heading="Information this website collects">
        <p>
          This site is a static website with no backend. The consultation form does not transmit or
          store anything: the details you type stay in your browser and are only used to compose a
          WhatsApp message that you choose whether to send.
        </p>
        <p>
          Web fonts are requested from Google Fonts and an embedded Google Map is loaded on the
          contact section. Those third parties may receive your IP address and standard request
          data under their own privacy policies.
        </p>
      </LegalSection>

      <LegalSection heading="Information you send us directly">
        <p>
          If you contact us by phone, email or WhatsApp, we receive whatever you choose to share —
          typically your name, contact number and what you are looking for. We use it to answer your
          enquiry and to arrange your appointment, and nothing else.
        </p>
      </LegalSection>

      <LegalSection heading="Sharing">
        <p>
          We do not sell your information. We share it only where necessary to fulfil your request
          or where the law requires it.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You can ask us what information we hold about you, ask us to correct it, or ask us to
          delete it. Write to{' '}
          <a href={mailLink} className="text-ink underline decoration-gold underline-offset-4">
            {business.email}
          </a>{' '}
          and we will respond.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          {business.name} · {business.phoneDisplay} ·{' '}
          <a href={mailLink} className="text-ink underline decoration-gold underline-offset-4">
            {business.email}
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}

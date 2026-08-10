/**
 * FAQ content — also emitted as FAQPage structured data.
 * Keep answers factual and free of medical or outcome claims.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'Do I need an appointment to visit the boutique?',
    answer:
      'Walk-ins are welcome during opening hours. Booking a consultation simply means a member of the team is set aside for you, which helps if you would like unhurried guidance on frame selection.',
  },
  {
    question: 'Can you make glasses using my existing prescription?',
    answer:
      'Yes. Bring your most recent prescription and we can discuss frame and lens options that work with it. If your prescription is out of date, we can talk through arranging an eye test.',
  },
  {
    question: 'How long does an order usually take?',
    answer:
      'It depends on the lens type. Straightforward single vision lenses are typically quicker than progressive or specially coated lenses. We confirm a timeline with you at the counter before placing the order.',
  },
  {
    question: 'How do I know which frame shape suits me?',
    answer:
      'Our face shape guide is a good starting point, and the frame finder narrows things down further. In store, we look at proportion, bridge fit and how the frame sits against your features — trying frames on is still the best test.',
  },
  {
    question: 'Do you adjust frames after purchase?',
    answer:
      'Yes. Frames settle with wear, so bring them back whenever the fit drifts and we will adjust them for you.',
  },
  {
    question: 'What lens options are available?',
    answer:
      'We stock single vision, progressive and a range of coatings including anti-reflective, blue-light filtering, photochromic and polarized options. We will walk you through what each one does so you can decide what fits your routine.',
  },
  {
    question: 'Do you have frames for children?',
    answer:
      'Yes. Our kids range is proportioned for smaller faces, using flexible and lightweight materials. We measure and adjust the fit on the child rather than estimating it.',
  },
  {
    question: 'Which brands do you stock?',
    answer:
      'Our range changes with each season. Message us on WhatsApp and we will tell you exactly which collections are on the wall right now.',
  },
];

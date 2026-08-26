import type { ContactIntent, FaqItem } from '@/types';

export const contactIntents: ContactIntent[] = [
  { id: 'job', labelKey: 'contact.intent.job' },
  { id: 'collab', labelKey: 'contact.intent.collab' },
  { id: 'opensource', labelKey: 'contact.intent.opensource' },
  { id: 'other', labelKey: 'contact.intent.other' },
];

export const contactFaqs: FaqItem[] = [
  { id: '1', questionKey: 'contact.faq.1.q', answerKey: 'contact.faq.1.a' },
  { id: '2', questionKey: 'contact.faq.2.q', answerKey: 'contact.faq.2.a' },
  { id: '3', questionKey: 'contact.faq.3.q', answerKey: 'contact.faq.3.a' },
  { id: '4', questionKey: 'contact.faq.4.q', answerKey: 'contact.faq.4.a' },
];

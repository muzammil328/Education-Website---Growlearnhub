'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Para } from '@muzammil328/ui';

const faqs = [
  {
    id: 'item-1',
    question: 'What is Growlearnhub?',
    answer:
      'Growlearnhub is an online educational platform that provides study materials, past papers, MCQs, online tests, and other learning resources for students from Class 9 to Class 12.',
  },
  {
    id: 'item-2',
    question: 'Is Growlearnhub free to use?',
    answer:
      'Yes, Growlearnhub is completely free to use. We believe in making quality education accessible to everyone.',
  },
  {
    id: 'item-3',
    question: 'What subjects do you cover?',
    answer:
      'We cover a wide range of subjects including Physics, Chemistry, Biology, Mathematics, English, Urdu, and more for all classes.',
  },
  {
    id: 'item-4',
    question: 'How can I access past papers?',
    answer:
      'You can browse past papers by selecting your class and subject from the navigation menu. All past papers are available for free download.',
  },
  {
    id: 'item-5',
    question: 'Do you offer online tests?',
    answer:
      'Yes, we offer online tests and quizzes that you can take to evaluate your knowledge and prepare for exams.',
  },
  {
    id: 'item-6',
    question: 'How can I report a bug or suggest a feature?',
    answer:
      'You can use our "Report a Bug" or "Request Feature" pages to submit feedback. We appreciate your input in improving our platform.',
  },
  {
    id: 'item-7',
    question: 'Can I download study materials?',
    answer:
      'Yes, most of our study materials including notes, past papers, and pairing schemes are available for free download.',
  },
  {
    id: 'item-8',
    question: 'How often do you update the content?',
    answer:
      'We regularly update our content to ensure it aligns with the latest curriculum and exam patterns.',
  },
];

export default function FAQContent() {
  return (
    <section className="mt-4">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(faq => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <Para className="">{faq.answer}</Para>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
    </section>
  );
}

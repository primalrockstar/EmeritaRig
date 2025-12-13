export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQItem[] = [
  // 1. Getting Started
  {
    id: 'gs-1',
    category: 'Getting Started',
    question: 'How do I sign up?',
    answer: 'You can sign up by clicking the "Get Started" button on the homepage. We offer a free tier that gives you immediate access to select chapters and features.'
  },
  {
    id: 'gs-2',
    category: 'Getting Started',
    question: 'How do I reset my password?',
    answer: 'If you need to reset your password, click on the "Forgot Password" link on the login page. Enter your email address, and we will send you instructions to reset it.'
  },
  {
    id: 'gs-3',
    category: 'Getting Started',
    question: "What's included in free vs premium?",
    answer: 'The Free tier includes access to the first 4 chapters, 100 flashcards, and 10 scenarios. Premium ($24.99/mo) unlocks all 41 chapters, 1,000+ flashcards, unlimited scenarios, the NREMT Simulator, and our Pass Guarantee.'
  },
  {
    id: 'gs-4',
    category: 'Getting Started',
    question: 'How do I upgrade to premium?',
    answer: 'You can upgrade at any time by going to your Dashboard or Settings page and clicking "Upgrade to Premium". We accept all major credit cards via Stripe.'
  },
  {
    id: 'gs-5',
    category: 'Getting Started',
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription in the Settings > Billing section. You will retain access until the end of your current billing period.'
  },

  // 2. Using The Platform
  {
    id: 'up-1',
    category: 'Using The Platform',
    question: 'How do flashcards work?',
    answer: 'Our flashcards use the Leitner System for spaced repetition. Cards you mark as "Incorrect" will appear more frequently, while "Correct" cards appear less often, optimizing your memory retention.'
  },
  {
    id: 'up-2',
    category: 'Using The Platform',
    question: "What's the NREMT simulator?",
    answer: 'The NREMT Simulator mimics the actual National Registry exam. It uses Computer Adaptive Testing (CAT) technology to adjust the difficulty of questions based on your performance, just like the real test.'
  },
  {
    id: 'up-3',
    category: 'Using The Platform',
    question: 'How does the CAT engine work?',
    answer: 'The Computer Adaptive Testing (CAT) engine starts with a medium-difficulty question. If you answer correctly, the next question is harder. If incorrect, it gets easier. The exam ends when the system is 95% confident in your pass/fail status or you reach the time/question limit.'
  },
  {
    id: 'up-4',
    category: 'Using The Platform',
    question: 'How do I track my progress?',
    answer: 'Visit the "Progress" tab in the dashboard. You can see your study streak, quiz averages, weak areas by category (e.g., Cardiology, Trauma), and overall readiness score.'
  },
  {
    id: 'up-5',
    category: 'Using The Platform',
    question: 'How do I report an error?',
    answer: 'We take accuracy seriously. Use the "Report Issue" button found on every question, flashcard, or chapter to submit a report. You can earn badges and rewards for helping us improve!'
  },

  // 3. Billing & Payments
  {
    id: 'bp-1',
    category: 'Billing & Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept Visa, Mastercard, American Express, Discover, and Apple Pay through our secure payment processor, Stripe.'
  },
  {
    id: 'bp-2',
    category: 'Billing & Payments',
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 7-day money-back guarantee if you are not satisfied with the Premium features. Contact support within 7 days of purchase to request a refund.'
  },
  {
    id: 'bp-3',
    category: 'Billing & Payments',
    question: 'How does the Pass Guarantee work?',
    answer: 'If you complete our program (all chapters, quizzes, and practice exams) and fail the NREMT within 30 days, we will refund your subscription 100%. See the Guarantee page for full details.'
  },
  {
    id: 'bp-4',
    category: 'Billing & Payments',
    question: 'Can I get a receipt?',
    answer: 'Yes, receipts are automatically emailed to you upon payment. You can also view and download past invoices in the Settings > Billing section.'
  },

  // 4. Technical Issues
  {
    id: 'ti-1',
    category: 'Technical Issues',
    question: "The platform won't load, what should I do?",
    answer: 'Try clearing your browser cache and cookies, or try accessing the site from a different browser. If the issue persists, check your internet connection or contact support.'
  },
  {
    id: 'ti-2',
    category: 'Technical Issues',
    question: "Videos won't play",
    answer: 'Ensure you have a stable internet connection. If you are on a mobile network, try switching to Wi-Fi. Also check that your browser allows video playback and is up to date.'
  },
  {
    id: 'ti-3',
    category: 'Technical Issues',
    question: "I can't submit my quiz answers",
    answer: 'This can happen if your session times out. Try refreshing the page (your progress should be saved locally) and submitting again. If it fails, take a screenshot and contact support.'
  },
  {
    id: 'ti-4',
    category: 'Technical Issues',
    question: 'Mobile app issues',
    answer: 'If you are using the PWA (installed to home screen), try removing it and re-adding it. Ensure your device operating system is up to date.'
  },

  // 5. Content Questions
  {
    id: 'cq-1',
    category: 'Content Questions',
    question: 'How often is content updated?',
    answer: 'We update our content continuously. Major protocol updates (like AHA guidelines) are integrated within weeks of release. Minor updates and fixes are deployed weekly.'
  },
  {
    id: 'cq-2',
    category: 'Content Questions',
    question: 'Are protocols current (NHTSA 2022)?',
    answer: 'Yes, all our content is aligned with the latest National EMS Education Standards and the 2022 NHTSA National Model EMS Clinical Guidelines.'
  },
  {
    id: 'cq-3',
    category: 'Content Questions',
    question: "What's the scope compliance badge?",
    answer: 'You will see Green (EMT), Yellow (AEMT), and Red (Paramedic) badges on medications and skills. These help you distinguish what is typically within the EMT-Basic scope versus advanced practice.'
  },
  {
    id: 'cq-4',
    category: 'Content Questions',
    question: 'Can I suggest content?',
    answer: 'Absolutely! We love feedback. Use the "Contact Support" form or the "Report Issue" feature to suggest new topics or improvements.'
  }
];

export const faqCategories = [
  'Getting Started',
  'Using The Platform',
  'Billing & Payments',
  'Technical Issues',
  'Content Questions'
];

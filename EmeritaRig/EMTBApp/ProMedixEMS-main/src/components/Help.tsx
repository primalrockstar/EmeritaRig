import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Mail, MessageCircle, BookOpen, CreditCard, AlertCircle, Zap, Users, Star } from 'lucide-react';

// Help Center Component
export const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // FAQ Data Structure
  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      faqs: [
        {
          question: 'How do I sign up for The Rig?',
          answer: 'Visit therig.netlify.app and click "Sign Up" in the top right corner. Create your account with a valid email address. You\'ll receive a confirmation email to verify your account before you can start using the platform.'
        },
        {
          question: 'What\'s included in the free tier?',
          answer: 'Free users get access to the first 4 chapters of study notes, 100 flashcards, 10 scenarios, basic calculators, and limited quiz questions. This gives you a taste of the platform to decide if you want to upgrade.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Go to the login page and click "Forgot Password?" below the login button. Enter your email address and check your inbox for a reset link. The link expires in 24 hours for security.'
        },
        {
          question: 'Can I use The Rig on multiple devices?',
          answer: 'Yes! Your progress syncs across devices. Sign in with the same account on your phone, tablet, or computer, and your flashcards, quiz scores, and study progress will be available everywhere.'
        },
        {
          question: 'Is The Rig available as a mobile app?',
          answer: 'Currently, The Rig is a progressive web app (PWA) that works perfectly on mobile devices. You can add it to your home screen for app-like functionality. Native iOS/Android apps are in development.'
        },
        {
          question: 'How do I navigate the platform?',
          answer: 'Use the sidebar menu to access different sections: Dashboard (overview), Study Notes (chapters), Flashcards (spaced repetition), Medications (scope-compliant reference), Calculators (clinical tools), Scenarios (practice cases), and Progress (your analytics).'
        }
      ]
    },
    {
      id: 'using-platform',
      title: 'Using The Platform',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      faqs: [
        {
          question: 'How do flashcards work?',
          answer: 'Flashcards use spaced repetition (Leitner system). Correct answers move cards to longer review intervals. Incorrect answers reset to daily review. This scientifically proven method helps you remember information longer with less study time.'
        },
        {
          question: 'What\'s the NREMT simulator?',
          answer: 'The NREMT simulator is a true Computer Adaptive Testing (CAT) engine that mimics the real exam. It starts with medium-difficulty questions and adjusts based on your answers. The exam ends when statistical confidence reaches 95% (typically 70-120 questions).'
        },
        {
          question: 'How do I track my progress?',
          answer: 'Visit the Progress Dashboard to see your study streak, quiz scores by domain, flashcard mastery rate, and NREMT readiness score. You can also export your data or clear it to start fresh.'
        },
        {
          question: 'What are the clinical calculators?',
          answer: 'The platform includes 6 evidence-based calculators: Glasgow Coma Scale, APGAR Score, Pediatric Dosing, IV Drip Rates, Rule of Nines, and Shock Index. Each includes step-by-step guidance and clinical interpretation.'
        },
        {
          question: 'How do scenarios work?',
          answer: 'Scenarios are interactive patient cases with FTO (Field Training Officer) coaching. You make decisions, get feedback, and learn from mistakes. They cover cardiac, respiratory, trauma, pediatric, and other emergency situations.'
        },
        {
          question: 'What\'s the PCR simulator?',
          answer: 'The PCR (Patient Care Report) simulator teaches documentation skills. Practice writing professional reports with templates, real-time feedback, and voice-to-text integration. This industry-first feature prepares you for real documentation requirements.'
        },
        {
          question: 'How does the CAT engine work?',
          answer: 'CAT (Computer Adaptive Testing) starts with medium questions. Correct answers = harder questions. Incorrect answers = easier questions. It finds your competency level and determines pass/fail probability with 95% statistical confidence.'
        },
        {
          question: 'Can I customize my study plan?',
          answer: 'The platform adapts automatically, but you can focus on weak areas. Use the dashboard to identify domains needing work, then prioritize those flashcards, quizzes, and scenarios in your study sessions.'
        }
      ]
    },
    {
      id: 'billing-payments',
      title: 'Billing & Payments',
      icon: <CreditCard className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) through our secure Stripe integration. We do not accept PayPal, checks, or other payment methods at this time.'
        },
        {
          question: 'What\'s the difference between Monthly and Semester plans?',
          answer: 'Monthly Premium is $24.99/month with flexible cancellation. Semester Pass is $79.99 one-time payment (saves $70+ vs. 4 months). Both include identical features - choose based on your study timeline and budget.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with the platform, contact support within 30 days of purchase for a full refund. We also have a "Pass or Your Money Back" guarantee for users who complete the study requirements.'
        },
        {
          question: 'How do I cancel my subscription?',
          answer: 'Go to your account settings and click "Manage Subscription." You can cancel anytime - you\'ll retain access until the end of your current billing period. No cancellation fees or penalties.'
        },
        {
          question: 'Can I get a receipt for my purchase?',
          answer: 'Yes! After purchase, you\'ll receive an email receipt from Stripe. You can also download receipts from your Stripe customer portal (link provided in confirmation email) or contact support for assistance.'
        },
        {
          question: 'What\'s the Pass Guarantee?',
          answer: 'Complete 41 chapters, score 75%+ on quizzes, and take 3 practice exams. If you fail the NREMT on your first attempt, we refund your subscription cost. This removes financial risk from your certification journey.'
        },
        {
          question: 'Do you offer student discounts?',
          answer: 'We offer competitive pricing designed for students. The Semester Pass saves significant money vs. monthly plans. Contact us for institutional pricing if your EMT program wants to provide access to multiple students.'
        }
      ]
    },
    {
      id: 'technical-issues',
      title: 'Technical Issues',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      faqs: [
        {
          question: 'The platform won\'t load - what should I do?',
          answer: 'Try refreshing the page (Ctrl+F5 or Cmd+Shift+R). Clear your browser cache and cookies. Ensure you\'re using a modern browser (Chrome, Firefox, Safari, Edge). If issues persist, try incognito/private mode or a different device.'
        },
        {
          question: 'Videos won\'t play - how do I fix this?',
          answer: 'Ensure your browser allows autoplay and has JavaScript enabled. Try a different browser or device. Check your internet connection. If using mobile, ensure you\'re not in low-data mode. Contact support if the issue continues.'
        },
        {
          question: 'I can\'t submit quiz answers - what\'s wrong?',
          answer: 'Ensure you\'re logged in and have a stable internet connection. Try refreshing the page and resubmitting. If using mobile, ensure you have sufficient storage space. Clear browser cache if the problem persists.'
        },
        {
          question: 'My progress isn\'t saving - help!',
          answer: 'Progress saves automatically when you\'re logged in. Check your internet connection. Try logging out and back in. If using incognito mode, switch to regular browsing. Contact support with your device/browser details.'
        },
        {
          question: 'The app is slow or freezing - what can I do?',
          answer: 'Close other browser tabs and applications. Clear browser cache and restart your browser. Ensure you have at least 2GB free RAM. Try a different device or browser. The platform is optimized for modern devices.'
        },
        {
          question: 'I\'m getting error messages - what do they mean?',
          answer: 'Common errors: "Network Error" (check internet), "Session Expired" (log in again), "Storage Full" (clear browser data). Most errors are temporary - refresh the page. If persistent, note the exact error message and contact support.'
        },
        {
          question: 'How do I clear my browser cache?',
          answer: 'Chrome: Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac) → select "Cached images and files" → Clear. Firefox: Ctrl+Shift+Delete → select "Cache" → Clear. Safari: Develop menu → Empty Caches. Then refresh the page.'
        },
        {
          question: 'Is The Rig compatible with my device/browser?',
          answer: 'Works on all modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+). Compatible with Windows, Mac, Linux, iOS, and Android. Requires JavaScript enabled and stable internet connection. Not compatible with Internet Explorer.'
        }
      ]
    },
    {
      id: 'content-questions',
      title: 'Content Questions',
      icon: <Star className="w-5 h-5" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      faqs: [
        {
          question: 'How often is content updated?',
          answer: 'Content is reviewed quarterly and updated annually to align with NHTSA guidelines. Major protocol changes (like 2022 updates) are implemented immediately. We monitor EMS literature and incorporate evidence-based changes as they become standard.'
        },
        {
          question: 'Are protocols current (NHTSA 2022)?',
          answer: 'Yes! All content is aligned with the 2022 National Model EMS Clinical Guidelines. We audited 407 official NHTSA protocol documents to ensure accuracy. The platform includes the latest evidence-based practices and treatment recommendations.'
        },
        {
          question: 'What\'s the scope compliance badge system?',
          answer: 'Green badges = EMT-B scope (your level). Yellow badges = AEMT scope (assist only). Red badges = Paramedic scope (educational only). This prevents confusion about what you can actually perform in practice.'
        },
        {
          question: 'Can I suggest content improvements?',
          answer: 'Absolutely! Use the "Report Issue" button on any content piece. We welcome suggestions for new scenarios, flashcards, or study materials. Your feedback helps improve the platform for all students.'
        },
        {
          question: 'Why do some questions seem "out of scope"?',
          answer: 'Some quiz questions and scenarios include advanced interventions to help you understand the full emergency response. These are clearly marked. Your scope is limited to EMT-B interventions - always follow your medical director\'s orders.'
        },
        {
          question: 'How do I report an error in the content?',
          answer: 'Click the "Report Issue" button on any quiz question, flashcard, scenario, or study note. Select the issue type (clinical error, typo, outdated info, unclear explanation, or other) and provide details. Critical errors are reviewed within 24 hours.'
        },
        {
          question: 'Are the medications up to date?',
          answer: 'Yes! Medication information includes current dosages, indications, contraindications, and administration routes. All medications are scope-compliant with color-coded badges. Always verify with your local protocols and medical director.'
        },
        {
          question: 'What if I disagree with an answer?',
          answer: 'Use the "Report Issue" button to submit your concern with references. Our content is based on NHTSA guidelines, but local protocols may vary. We review all submissions and update content when evidence supports changes.'
        }
      ]
    }
  ];

  // Filter FAQs based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <main className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4 text-blue-600 dark:text-blue-400">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Help Center</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find answers to common questions about The Rig. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <div key={category.id} className={`rounded-3xl border ${category.borderColor} overflow-hidden`}>
              {/* Category Header */}
              <div className={`${category.bgColor} px-6 py-4 border-b ${category.borderColor}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-white dark:bg-slate-800 ${category.color}`}>
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{category.title}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{category.faqs.length} articles</p>
                  </div>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {category.faqs.map((faq, index) => {
                  const globalIndex = filteredCategories.indexOf(category) * 100 + index;
                  const isExpanded = expandedFaq === globalIndex;

                  return (
                    <div key={index} className="bg-white dark:bg-slate-800">
                      <button
                        onClick={() => toggleFaq(globalIndex)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
                      >
                        <span className="text-slate-900 dark:text-white font-medium pr-4">{faq.question}</span>
                        <div className="flex-shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-6 pb-5">
                          <div className="text-slate-600 dark:text-slate-400 leading-relaxed prose prose-slate dark:prose-invert max-w-none">
                            {faq.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 border border-blue-200 dark:border-blue-800 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Still need help?</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help. We typically respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@emeritaclinical.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-blue-500/30"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </a>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <MessageCircle className="w-5 h-5" />
              Live Chat (Coming Soon)
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <a
            href="/disclaimer"
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors group"
          >
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium">Medical Disclaimer</span>
          </a>

          <a
            href="/privacy"
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors group"
          >
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium">Privacy Policy</span>
          </a>

          <a
            href="/contact"
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors group"
          >
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium">Contact Us</span>
          </a>
        </div>
      </div>
    </main>
  );
};
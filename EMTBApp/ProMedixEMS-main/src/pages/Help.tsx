import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, MessageCircle, HelpCircle, BookOpen } from 'lucide-react';
import { faqs, faqCategories, FAQItem } from '../data/faqs';

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQs = useMemo(() => {
    let filtered = faqs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    } else if (selectedCategory) {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            How can we help you?
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Search our knowledge base or browse frequently asked questions.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 bg-white dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 rounded-2xl shadow-lg text-slate-900 dark:text-white placeholder-slate-400 transition-all duration-200 outline-none"
              placeholder="Search for answers (e.g., 'password', 'refund', 'flashcards')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories (only show if not searching) */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              All Topics
            </button>
            {faqCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-700"
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-semibold text-slate-900 dark:text-white pr-8">
                    {faq.question}
                  </span>
                  {expandedId === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {expandedId === faq.id && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">
                No results found for "{searchQuery}". Try a different search term.
              </p>
            </div>
          )}
        </div>

        {/* Contact Fallback */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-blue-900/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-2xl font-bold">Still need help?</h3>
              <p className="text-blue-100 max-w-md">
                Can't find the answer you're looking for? Our support team is here to help you succeed.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:support@promedixems.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Support
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-blue-100">
            <span className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Response time: ~24 hours
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Check our extensive knowledge base
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HelpPage;

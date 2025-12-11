import React, { useState } from 'react';
import { X, Check, Sparkles, Zap, Clock } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config';
import { useAuth } from '../../auth/AuthContext';

interface UpgradeModalProps {
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async (priceType: 'premium' | 'semester') => {
    if (!user?.token) {
      setError('Please log in to continue');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${API_URL}/api/stripe/create-checkout-session?price_type=${priceType}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      // Redirect to Stripe checkout
      window.location.href = response.data.checkout_url;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create checkout session');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
        >
          <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Upgrade to Premium</h2>
          <p className="text-amber-100">Unlock your full EMT training potential</p>
        </div>

        {/* Pricing cards */}
        <div className="p-8 grid md:grid-cols-2 gap-6">
          {/* Premium Monthly */}
          <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-amber-500 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Premium Monthly</h3>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">$24.99</span>
              <span className="text-gray-600 dark:text-gray-400">/month</span>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">All 1,173 flashcards unlocked</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">28 clinical scenarios</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">Advanced clinical calculators</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">NREMT practice exams</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">Cancel anytime</span>
              </li>
            </ul>

            <button
              onClick={() => handleCheckout('premium')}
              disabled={loading}
              className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Start Monthly Plan'}
            </button>
          </div>

          {/* Semester Pass - Best Value */}
          <div className="border-2 border-amber-500 rounded-xl p-6 relative overflow-hidden">
            {/* Best value badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              BEST VALUE
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Semester Pass</h3>
            </div>
            
            <div className="mb-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">$79.99</span>
              <span className="text-gray-600 dark:text-gray-400"> one-time</span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mb-6 font-semibold">
              Save $70 • Just $13.33/month for 6 months
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300 font-semibold">Everything in Premium</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">6 months of full access</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">One-time payment (no recurring charges)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">Perfect for EMT course duration</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">Best value for certification prep</span>
              </li>
            </ul>

            <button
              onClick={() => handleCheckout('semester')}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Processing...' : 'Get Semester Pass'}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="px-8 pb-4">
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 px-8 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Secure payment powered by Stripe • Cancel or pause anytime • No hidden fees</p>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;

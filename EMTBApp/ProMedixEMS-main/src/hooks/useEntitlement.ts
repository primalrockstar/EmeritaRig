import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';
import { API_URL } from '../config';

export interface SubscriptionStatus {
  is_premium: boolean;
  plan_type: 'free' | 'premium' | 'semester' | 'lifetime' | 'expired_semester';
  plan_expiration: string | null;
  stripe_customer_id: string | null;
}

export function useEntitlement() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.token) {
      fetchSubscriptionStatus();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stripe/subscription-status`, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      setSubscription(response.data);
    } catch (error) {
      console.error('Failed to fetch subscription status:', error);
      // Default to free tier on error
      setSubscription({
        is_premium: false,
        plan_type: 'free',
        plan_expiration: null,
        stripe_customer_id: null
      });
    } finally {
      setLoading(false);
    }
  };

  const canAccessFeature = (feature: string): boolean => {
    if (!subscription) return false;
    
    // Always allow access for lifetime/superuser
    if (subscription.plan_type === 'lifetime') return true;
    
    // Premium features require active subscription
    if (subscription.is_premium) return true;
    
    // Free tier features
    const freeTierFeatures = [
      'chapters-1-4',
      'basic-flashcards',
      'basic-calculators',
      'basic-scenarios'
    ];
    
    return freeTierFeatures.includes(feature);
  };

  const isPremium = subscription?.is_premium || false;
  const isFree = subscription?.plan_type === 'free';
  const planType = subscription?.plan_type || 'free';

  return {
    subscription,
    loading,
    isPremium,
    isFree,
    planType,
    canAccessFeature,
    refreshStatus: fetchSubscriptionStatus
  };
}

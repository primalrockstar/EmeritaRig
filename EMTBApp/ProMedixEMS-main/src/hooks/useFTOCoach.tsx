import React, { useState, useCallback } from 'react';
import { FTOToast } from '../components/ui/FTOToast';

const NUDGE_MESSAGES = [
  "Are you sure about that, partner?",
  "I think you're forgetting something.",
  "Double-check that answer.",
  "Think carefully before you proceed.",
  "That's not quite right, rookie."
];

const CHAOS_MESSAGES = [
  "BP is dropping, what are you doing!?",
  "Hospital is 2 minutes out, finish your report!",
  "Patient's crashing, move faster!",
  "Scene is getting hot, secure the area!",
  "Time is critical, act now!"
];

const WARNING_MESSAGES = [
  "Whoa, check your math. That dose would kill the patient.",
  "Too long, partner. The nurse stopped listening. Summarize better.",
  "That's it? You forgot the vitals. Try again.",
  "Scene Safe BSI first!",
  "I Can't Move Your Hands."
];

const SUCCESS_MESSAGES = [
  "Good handoff report. Clear and concise.",
  "Nice work, partner.",
  "You're getting it.",
  "Solid assessment.",
  "Keep it up."
];

export const useFTOCoach = () => {
  const [currentToast, setCurrentToast] = useState<{ message: string; duration: number } | null>(null);

  const triggerFeedback = useCallback((type: 'NUDGE' | 'CHAOS' | 'WARNING' | 'SUCCESS', duration: number = 4000) => {
    let messages: string[];
    switch (type) {
      case 'NUDGE':
        messages = NUDGE_MESSAGES;
        break;
      case 'CHAOS':
        messages = CHAOS_MESSAGES;
        break;
      case 'WARNING':
        messages = WARNING_MESSAGES;
        break;
      case 'SUCCESS':
        messages = SUCCESS_MESSAGES;
        break;
      default:
        messages = NUDGE_MESSAGES;
    }
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomIndex];

    setCurrentToast({ message, duration });
  }, []);

  const renderToast = useCallback(() => {
    if (!currentToast) return null;

    return (
      <FTOToast
        message={currentToast.message}
        duration={currentToast.duration}
        onClose={() => setCurrentToast(null)}
      />
    );
  }, [currentToast]);

  return {
    triggerFeedback,
    renderToast
  };
};
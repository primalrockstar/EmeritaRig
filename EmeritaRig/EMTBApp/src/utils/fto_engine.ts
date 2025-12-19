// FTO (Field Training Officer) Reaction Engine
// Provides "Aggressive but Helpful" feedback quotes

const CORRECT = [
  "Good catch.",
  "Solid work.",
  "That's how we save lives.",
  "By the book."
];

const INCORRECT = [
  "You killed him.",
  "Check your protocols.",
  "Is that your final answer?",
  "My grandmother drives faster than this."
];

const DISPATCH = [
  "Keep your head on a swivel.",
  "Scene safety is priority one.",
  "We have a mess here."
];

export type FTOReactionType = 'correct' | 'incorrect' | 'dispatch';

export const getFTOReaction = (type: FTOReactionType): string => {
  let quotes: string[];
  switch (type) {
    case 'correct':
      quotes = CORRECT;
      break;
    case 'incorrect':
      quotes = INCORRECT;
      break;
    case 'dispatch':
      quotes = DISPATCH;
      break;
    default:
      quotes = CORRECT;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
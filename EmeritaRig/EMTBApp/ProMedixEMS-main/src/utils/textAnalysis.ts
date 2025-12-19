import { chapters, studyModules } from '../data/curriculum';
import { drugFormulary } from '../data/pharmacology';

export interface TranscriptSegment {
  type: 'text' | 'keyword';
  content: string;
  id?: string;
}

export interface KeywordEntry {
  term: string;
  id: string;
  type: 'chapter' | 'module' | 'medication';
}

// Build the comprehensive dictionary
export const buildDictionary = (): KeywordEntry[] => {
  const dictionary: KeywordEntry[] = [];

  // Add chapter titles
  chapters.forEach(chapter => {
    dictionary.push({
      term: chapter.title.toLowerCase(),
      id: `chap-${chapter.id}`,
      type: 'chapter'
    });
  });

  // Add module titles
  studyModules.forEach(module => {
    dictionary.push({
      term: module.title.toLowerCase(),
      id: `mod-${module.id}`,
      type: 'module'
    });
  });

  // Add medication names
  drugFormulary.forEach(med => {
    dictionary.push({
      term: med.name.toLowerCase(),
      id: `drug-${med.id}`,
      type: 'medication'
    });
  });

  // Sort by length descending for longer matches first
  return dictionary.sort((a, b) => b.term.length - a.term.length);
};

// Process transcript and identify keywords
export const processTranscript = (text: string, dictionary: KeywordEntry[]): TranscriptSegment[] => {
  if (!text) return [];

  const segments: TranscriptSegment[] = [];
  let remainingText = text;
  let lastIndex = 0;

  // Build regex pattern from dictionary terms
  const pattern = new RegExp(`\\b(${dictionary.map(entry => entry.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');

  let match;
  while ((match = pattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: text.slice(lastIndex, match.index)
      });
    }

    // Add the keyword
    const matchedTerm = match[0].toLowerCase();
    const entry = dictionary.find(e => e.term === matchedTerm);
    if (entry) {
      segments.push({
        type: 'keyword',
        content: match[0],
        id: entry.id
      });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(lastIndex)
    });
  }

  return segments;
};
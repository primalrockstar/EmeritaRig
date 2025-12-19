import React, { useMemo, useState, useEffect } from 'react';
import { Brain, CheckCircle, RotateCcw, ArrowLeft, ArrowRight, Shuffle, Lock } from 'lucide-react';
import MedicalDisclaimer from '../../components/MedicalDisclaimer';
import { useAuth } from '../../auth/AuthContext';
import api from '../../api/axios';
import { chapter3Flashcards } from '../../data/emtb/chapter3-flashcards';
import { chapter4Flashcards } from '../../data/emtb/chapter4-flashcards';
import { chapter5Flashcards } from '../../data/emtb/chapter5-flashcards';
import { chapter6Flashcards } from '../../data/emtb/chapter6-flashcards';
import { chapter7Flashcards } from '../../data/emtb/chapter7-flashcards';
import { chapter8Flashcards } from '../../data/emtb/chapter8-flashcards';
import { chapter9Flashcards } from '../../data/emtb/chapter9-flashcards';
import { chapter10Flashcards } from '../../data/emtb/chapter10-flashcards';
import { chapter11Flashcards } from '../../data/emtb/chapter11-flashcards';
import { chapter12Flashcards } from '../../data/emtb/chapter12-flashcards';
import { chapter13Flashcards } from '../../data/emtb/chapter13-flashcards';
import { chapter14Flashcards } from '../../data/emtb/chapter14-flashcards';
import { flashcards as globalFlashcards } from '../../data/flashcards';
import { usePerformanceTracker } from '../../hooks/usePerformanceTracker';

// Chapter 1: EMS Ecosystem Essentials (15 cards)
const chapter1Flashcards = [
  {
    id: "ch1-001",
    question: "What are the four levels of EMT training in the National EMS Scope of Practice?",
    answer: "Emergency Medical Responder (EMR), Emergency Medical Technician (EMT), Advanced EMT (AEMT), and Paramedic.",
    category: "EMS Systems",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch1-002",
    question: "What does the acronym NHTSA stand for and what is their role in EMS?",
    answer: "National Highway Traffic Safety Administration. They develop national standards for EMS training, equipment, and system development.",
    category: "EMS Regulation",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-003",
    question: "A patient calls 911 for chest pain. Describe the EMS system response from dispatch to hospital care.",
    answer: "1) Dispatcher receives call and obtains information, 2) Appropriate EMS unit is dispatched, 3) EMTs respond, assess, and treat patient, 4) Patient is transported to appropriate hospital, 5) Hospital receives report and continues care.",
    category: "System Operations",
    difficulty: "medium",
    type: "scenario"
  },
  {
    id: "ch1-004",
    question: "What are the primary roles and responsibilities of an EMT?",
    answer: "Scene safety, patient assessment, emergency medical care, safe patient transport, communication with medical direction, and accurate documentation.",
    category: "EMT Roles",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch1-005",
    question: "What is the difference between online and offline medical direction?",
    answer: "Online medical direction involves direct communication with a physician during patient care. Offline medical direction includes protocols, standing orders, and training provided in advance.",
    category: "Medical Direction",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-006",
    question: "An EMT wants to administer a medication that requires medical direction. What steps should they follow?",
    answer: "Contact medical direction, provide patient information and assessment findings, clearly state the medication request, receive and confirm orders, document the interaction.",
    category: "Medical Direction",
    difficulty: "hard",
    type: "application"
  },
  {
    id: "ch1-007",
    question: "What are the essential components of a comprehensive EMS system?",
    answer: "Regulation and policy, resource management, human resources and training, transportation, facilities, communications, public information and education, medical direction, and trauma systems.",
    category: "System Components",
    difficulty: "hard",
    type: "recognition"
  },
  {
    id: "ch1-008",
    question: "What is the purpose of EMS protocols and standing orders?",
    answer: "Protocols provide step-by-step procedures for specific conditions. Standing orders allow EMTs to perform certain treatments without direct physician contact, enabling faster patient care.",
    category: "Protocols",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-009",
    question: "A rural EMS system has limited resources. What factors should be considered for system design?",
    answer: "Response times, available personnel, training levels, equipment needs, communication systems, transport distances to hospitals, mutual aid agreements, and community needs assessment.",
    category: "System Design",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch1-010",
    question: "What is the role of quality improvement in EMS systems?",
    answer: "Continuous evaluation of system performance, identifying areas for improvement, analyzing patient outcomes, updating protocols, and ensuring high-quality patient care through data-driven decisions.",
    category: "Quality Improvement",
    difficulty: "medium",
    type: "assessment"
  },
  {
    id: "ch1-011",
    question: "What are the minimum training requirements for EMT certification?",
    answer: "Completion of state-approved EMT course (typically 120-150 hours), passing written and practical examinations, CPR certification, and meeting physical and mental health requirements.",
    category: "EMT Training",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch1-012",
    question: "How do EMS systems integrate with other emergency services?",
    answer: "Through unified command structures, shared communication systems, coordinated response protocols, joint training exercises, and established mutual aid agreements with fire, police, and emergency management.",
    category: "System Integration",
    difficulty: "medium",
    type: "application"
  },
  {
    id: "ch1-013",
    question: "What is the significance of evidence-based medicine in EMS?",
    answer: "Uses scientific research and clinical studies to guide treatment protocols, ensures treatments are proven effective, improves patient outcomes, and supports continuous system improvement.",
    category: "Evidence-Based Practice",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-014",
    question: "An EMS system is developing new protocols. What stakeholders should be involved in the process?",
    answer: "Medical director, EMTs and paramedics, hospital physicians, nurses, system administrators, training coordinators, quality improvement staff, and community representatives.",
    category: "Protocol Development",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch1-015",
    question: "What are the key performance indicators used to evaluate EMS system effectiveness?",
    answer: "Response times, patient survival rates, protocol compliance, customer satisfaction, cost-effectiveness, training completion rates, and clinical outcome measures.",
    category: "Performance Metrics",
    difficulty: "hard",
    type: "assessment"
  },
  // Chapter 3: Medical, Legal, and Ethical Principles
  ...chapter3Flashcards
];

// Chapter 2: Safety Protocols for Responders (15 cards)
const chapter2Flashcards = [
  {
    id: "ch2-001",
    question: "What percentage of first responders have seen traumatic events, and what percentage have been diagnosed with mental health issues?",
    answer: "84% of first responders have seen traumatic events, and 34% have been diagnosed with mental health issues like depression or PTSD.",
    category: "Workforce Safety",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch2-002",
    question: "Define the difference between eustress and distress in emergency medical services.",
    answer: "Eustress causes positive responses like increased focus and job satisfaction from performing well in tough situations. Distress causes negative responses like feeling overwhelmed or anxious.",
    category: "Stress Management",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch2-003",
    question: "An EMT notices a colleague seems exhausted, cynical, and showing poor performance after months of high-stress calls. What condition should they be concerned about?",
    answer: "Burnout - which is exhaustion, cynicism, and poor performance from long-term job stress that can lead to medical errors and decreased morale.",
    category: "Mental Health",
    difficulty: "medium",
    type: "scenario"
  },
  {
    id: "ch2-004",
    question: "List the five key strategies to increase resilience for EMTs.",
    answer: "1. Eat a healthy diet, 2. Get 7 to 9 hours of sleep daily, 3. Build strong relationships with family, friends, and co-workers, 4. Exercise daily, 5. Practice mindfulness.",
    category: "Wellness",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch2-005",
    question: "What is the proper order for donning (putting on) PPE?",
    answer: "Gown first, then mask, then eyewear, then gloves. Always doff (remove) the mask last to avoid contamination.",
    category: "Infection Control",
    difficulty: "hard",
    type: "application"
  },
  {
    id: "ch2-006",
    question: "A patient asks an EMT 'Am I going to die?' How should the EMT respond appropriately?",
    answer: "Be honest without scaring the patient, avoid false promises like 'Everything will be alright,' remain calm and caring, and always allow for hope even in serious situations.",
    category: "Patient Communication",
    difficulty: "medium",
    type: "scenario"
  },
  {
    id: "ch2-007",
    question: "What are the five stages of grief identified by Dr. Elizabeth Kubler-Ross?",
    answer: "Denial, Anger, Bargaining, Depression, and Acceptance. These stages can occur in any order during the grieving process.",
    category: "Grief Support",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch2-008",
    question: "An EMT has been working 24-hour shifts and is experiencing fatigue that could compromise patient safety. What management strategies should be implemented?",
    answer: "Work shifts shorter than 24 hours, use fatigue surveys for assessment, provide access to caffeine and naps while on duty, and receive education on fatigue risks.",
    category: "Fatigue Management",
    difficulty: "hard",
    type: "application"
  },
  {
    id: "ch2-009",
    question: "Define Standard Precautions according to CDC guidelines.",
    answer: "Standard precautions mean assuming every person might be infected, so always use infection control procedures including proper PPE, hand washing, and safe disposal of sharp items.",
    category: "Infection Control",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch2-010",
    question: "What is the difference between Disease Prevention and Health Promotion?",
    answer: "Disease Prevention focuses on medical care to avoid illness (like vaccinations and screenings). Health Promotion focuses on personal habits to improve health (like proper diet and exercise).",
    category: "Health Management",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch2-011",
    question: "During a traumatic call involving a child fatality, an EMT experiences critical incident stress. What support options are available?",
    answer: "Critical Incident Stress Management (CISM) including defusing sessions during/after the event, debriefing sessions 24-72 hours later with mental health professionals, Employee Assistance Programs, or private counseling.",
    category: "Critical Incident Stress",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch2-012",
    question: "What are the key principles for safe lifting practices in EMS?",
    answer: "Pre-plan the move, bend your legs not your waist, keep the weight close to your body, and lift straight up using your legs.",
    category: "Injury Prevention",
    difficulty: "easy",
    type: "application"
  },
  {
    id: "ch2-013",
    question: "How many hours of sleep do adults need each night, and what individual strategies help with fatigue management?",
    answer: "Adults need 7 to 9 hours of sleep each night. Individual strategies include getting quality sleep, taking short naps, doing physical and mental exercise, avoiding caffeine/alcohol before bed, keeping consistent sleep schedule, and exposing yourself to natural light during waking hours.",
    category: "Sleep Management",
    difficulty: "medium",
    type: "assessment"
  },
  {
    id: "ch2-014",
    question: "An EMT suspects a coworker is impaired by alcohol or drugs during a shift. What is the appropriate action?",
    answer: "Report the impaired coworker immediately. Covering for them can cause serious harm to patients. Substance abuse increases accidents, creates tension, and leads to poor treatment decisions.",
    category: "Workplace Safety",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch2-015",
    question: "What constitutes proper protective clothing layers for cold weather EMS operations?",
    answer: "Multiple layers: thin inner layer to wick away moisture, thermal middle layer for insulation, and outer layer to resist wind and wetness. Avoid cotton in cold, wet conditions as it absorbs moisture and causes chilling.",
    category: "Protective Equipment",
    difficulty: "medium",
    type: "application"
  }
];

// Isolate true Chapter 1 items (exclude appended Chapter 3 items)
const chapter1Only = chapter1Flashcards.filter(card => card.id.startsWith('ch1-'));
// Legacy aggregate deck (Ch.1 + Ch.2)
const legacyAllFlashcards = [...chapter1Only, ...chapter2Flashcards];

// Build a 50-card Human Body Systems deck from the global library
type UIFCard = {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
};

const mapDifficulty = (d: string): UIFCard['difficulty'] => {
  if (/advanced/i.test(d)) return 'hard';
  if (/intermediate/i.test(d)) return 'medium';
  return 'easy';
};

function buildHumanBodySystemsDeck(max = 150): UIFCard[] {
  // Define 10 system buckets approximating Human Body chapters
  const buckets = [
    { cat: 'integumentary' },
    { cat: 'skeletal' },
    { cat: 'muscular' },
    { cat: 'nervous' },
    { cat: 'cardiovascular' },
    { cat: 'respiratory' },
    { cat: 'medical', sub: 'GI Emergencies' }, // digestive
    { cat: 'medical', sub: 'Diabetes' },        // endocrine proxy
    { cat: 'obstetrics' },                      // reproductive proxy
    { cat: 'medical', sub: 'Hematologic' }      // fill for urinary if none present
  ];

  // Build bucketed pools
  const pools: Record<string, any[]> = {};
  for (const b of buckets) {
    const key = b.cat + (b.sub ? `:${b.sub}` : '');
    pools[key] = globalFlashcards.filter(fc => {
      if (fc.category !== b.cat) return false;
      if (b.sub) return fc.subcategory === b.sub;
      return true;
    });
  }

  const result: UIFCard[] = [];
  const keys = Object.keys(pools);
  let idx = 0;
  // Round-robin until max or all empty
  while (result.length < max && keys.length > 0) {
    const k = keys[idx % keys.length];
    const arr = pools[k];
    if (arr && arr.length) {
      const raw = arr.shift();
      result.push({
        id: `hbs_${raw.id}`,
        question: raw.question,
        answer: raw.answer,
        category: raw.category,
        difficulty: mapDifficulty(raw.difficulty),
        type: 'recognition'
      });
    }
    // remove empty buckets
    for (let i = keys.length - 1; i >= 0; i--) {
      const kk = keys[i];
      if (!pools[kk] || pools[kk].length === 0) keys.splice(i, 1);
    }
    idx++;
  }

  return result.slice(0, max);
}

function sampleArray<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.max(0, Math.min(n, a.length)));
}

const EMTBFlashcards: React.FC = () => {
  const { user } = useAuth();
  const { trackEvent } = usePerformanceTracker();
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [collection, setCollection] = useState<'chapter'|'module'|'all'|'random'>('module');
  const [selectedDeck, setSelectedDeck] = useState<string>('module1');
  const [randomKey, setRandomKey] = useState(0);
  const [showUnlockModal, setShowUnlockModal] = React.useState(false);
  const [studySession, setStudySession] = useState({
    correct: 0,
    needReview: 0,
    total: 0
  });
  const [sessionData, setSessionData] = useState({
    deckId: '',
    deckName: '',
    cardCount: 0,
    startTime: Date.now(),
    confidenceHistory: [] as Array<{
      cardId: string;
      topic: string;
      confidence: 'again' | 'hard' | 'good' | 'easy';
      timeSpent: number;
    }>
  });
  const [cardViewTime, setCardViewTime] = useState<number>(0);
  const [cardStartTime, setCardStartTime] = useState<number>(Date.now());

  // Build decks
  const decks = useMemo(() => {
    const hbs = buildHumanBodySystemsDeck(150);
    const ch3 = chapter3Flashcards.map(c => ({ id: c.id, question: c.front, answer: c.back, category: c.category, difficulty: 'medium' as const, type: 'recognition' as const }));
    const chaptersAll = [
      ...legacyAllFlashcards,
      ...ch3,
      ...chapter4Flashcards,
      ...chapter5Flashcards,
      ...chapter6Flashcards,
      ...chapter7Flashcards,
      ...chapter8Flashcards,
      ...chapter9Flashcards,
      ...chapter10Flashcards,
      ...chapter11Flashcards,
      ...chapter12Flashcards,
      ...chapter13Flashcards,
      ...chapter14Flashcards,
    ] as UIFCard[]; // Chapters 1–9

    // Map available chapters (each chapter should be 15)
    const chapterMap: Record<number, UIFCard[]> = {
      1: chapter1Only as UIFCard[],
      2: chapter2Flashcards as UIFCard[],
      3: ch3,
      4: chapter4Flashcards as UIFCard[],
        5: chapter5Flashcards as UIFCard[],
        6: chapter6Flashcards as UIFCard[],
        7: chapter7Flashcards as UIFCard[],
        8: chapter8Flashcards as UIFCard[],
        9: chapter9Flashcards as UIFCard[],
        10: chapter10Flashcards as UIFCard[],
        11: chapter11Flashcards as UIFCard[],
        12: chapter12Flashcards as UIFCard[],
        13: chapter13Flashcards as UIFCard[],
        14: chapter14Flashcards as UIFCard[],
      // Future chapters (15–41) will be added as they are loaded
    };

    // Define core EMT-B modules and their chapter IDs
    const moduleDefs: Array<{ key: string; label: string; chapterIds: number[] }> = [
  { key: 'module1', label: 'Module 1: Preparatory', chapterIds: [1, 2, 3, 4] },
  { key: 'module2', label: 'Module 2: Clinical Fundamentals', chapterIds: [5, 6, 7, 8, 9] },
      { key: 'module3', label: 'Module 3: Patient Assessment', chapterIds: [10] },
      { key: 'module4', label: 'Module 4: Airway Management', chapterIds: [11] },
      { key: 'module5', label: 'Module 5: Medication Administration', chapterIds: [12] },
      { key: 'module6', label: 'Module 6: Shock & Resuscitation', chapterIds: [13, 14] },
      // Additional modules (7–14) can be defined here with their chapter ranges when ready
    ];

    // Build module decks with expected vs available counts
    type ModuleDeck = { label: string; cards: UIFCard[]; expected: number; available: number };
    const moduleDecks: Record<string, ModuleDeck> = {};
    for (const def of moduleDefs) {
      const cards = def.chapterIds.flatMap((cid) => chapterMap[cid] ?? []);
      const expected = def.chapterIds.length * 15;
      moduleDecks[def.key] = {
        label: def.label,
        cards,
        expected,
        available: cards.length,
      };
    }

    // Bonus: Human Body Systems module
    moduleDecks['bonusHumanBody'] = {
      label: 'Bonus: Human Body Systems',
      cards: hbs,
      expected: 150, // 10 chapters × 15
      available: hbs.length,
    };

  const allFlashcards = [...chaptersAll, ...hbs] as UIFCard[]; // Keep All = Chapters + Bonus
  const chapterCount = Object.keys(chapterMap).length;

    return {
      chaptersAll,
      allFlashcards,
      chapter1: chapter1Only as UIFCard[],
      chapter2: chapter2Flashcards as UIFCard[],
      chapter3: ch3,
  chapter4: chapter4Flashcards as UIFCard[],
  chapter5: chapter5Flashcards as UIFCard[],
  chapter6: chapter6Flashcards as UIFCard[],
  chapter7: chapter7Flashcards as UIFCard[],
  chapter8: chapter8Flashcards as UIFCard[],
  chapter9: chapter9Flashcards as UIFCard[],
  chapter10: chapter10Flashcards as UIFCard[],
  chapter11: chapter11Flashcards as UIFCard[],
  chapter12: chapter12Flashcards as UIFCard[],
  chapter13: chapter13Flashcards as UIFCard[],
  chapter14: chapter14Flashcards as UIFCard[],
  moduleDecks,
  chapterCount,
    };
  }, []);

  // Build a random deck from all flashcards (50 sample)
  const RANDOM_COUNT = 50;
  const randomDeck: UIFCard[] = useMemo(() => sampleArray(decks.allFlashcards ?? [], RANDOM_COUNT), [decks.allFlashcards, randomKey]);

  const activeDeck: UIFCard[] = useMemo(() => {
    let deck: UIFCard[] = [];
    if (collection === 'random') deck = randomDeck;
    else if (collection === 'all') deck = decks.allFlashcards;
    else if (collection === 'module') {
      const md = decks.moduleDecks[selectedDeck];
      deck = md ? md.cards : [];
    }
    else {
      // collection === 'chapter'
      switch (selectedDeck) {
        case 'chapter1': deck = decks.chapter1; break;
        case 'chapter2': deck = decks.chapter2; break;
        case 'chapter3': deck = decks.chapter3; break;
        case 'chapter4': deck = decks.chapter4; break;
        case 'chapter5': deck = decks.chapter5; break;
        case 'chapter6': deck = decks.chapter6; break;
        case 'chapter7': deck = decks.chapter7; break;
        case 'chapter8': deck = decks.chapter8; break;
        case 'chapter9': deck = decks.chapter9; break;
    case 'chapter10': deck = decks.chapter10; break;
    case 'chapter11': deck = decks.chapter11; break;
    case 'chapter12': deck = decks.chapter12; break;
    case 'chapter13': deck = decks.chapter13; break;
    case 'chapter14': deck = decks.chapter14; break;
        case 'chaptersAll':
        default: deck = decks.chaptersAll; break;
      }
    }
    // Apply freemium limit: first 25 cards for free users
    return user?.has_lifetime_access ? deck : deck.slice(0, 25);
  }, [collection, selectedDeck, decks, randomDeck, user?.has_lifetime_access]);

  // Get unique categories for the active deck
  const categories = ['all', ...Array.from(new Set(activeDeck.map(card => card.category)))];

  // Filter cards by category (within active deck)
  const filteredCards = selectedCategory === 'all'
    ? activeDeck
    : activeDeck.filter(card => card.category === selectedCategory);

  const currentFlashcard = filteredCards[currentCard];

  // Update session data when deck changes
  useEffect(() => {
    const deckName = collection === 'random' ? 'Random (All)' :
      collection === 'all' ? 'All Flashcards' :
      collection === 'module' ? (decks.moduleDecks[selectedDeck]?.label || 'Module') : (
        selectedDeck === 'chapter1' ? 'Chapter 1' :
        selectedDeck === 'chapter2' ? 'Chapter 2' :
        selectedDeck === 'chapter3' ? 'Chapter 3' :
        selectedDeck === 'chapter4' ? 'Chapter 4: Communications & Documentation' :
        selectedDeck === 'chapter5' ? 'Chapter 5: Essential Terminology for Responders' :
        selectedDeck === 'chapter6' ? 'Chapter 6: Body Systems for Emergency Care' :
        selectedDeck === 'chapter7' ? 'Chapter 7: Lifespan Considerations in EMS' :
        selectedDeck === 'chapter8' ? 'Chapter 8: Lifting and Moving Patients' :
        selectedDeck === 'chapter9' ? 'Chapter 9: Airway Management' :
        selectedDeck === 'chapter10' ? 'Chapter 10: Comprehensive Patient Assessment' :
        selectedDeck === 'chapter11' ? 'Chapter 11: Airway Management Techniques' :
        selectedDeck === 'chapter12' ? 'Chapter 12: Medication Administration Essentials' :
        selectedDeck === 'chapter13' ? 'Chapter 13: Shock Recognition & Response' :
        selectedDeck === 'chapter14' ? 'Chapter 14: BLS Resuscitation Protocols' :
        'Chapters 1–14'
      );
    setSessionData(prev => ({
      ...prev,
      deckId: selectedDeck,
      deckName,
      cardCount: filteredCards.length
    }));
  }, [collection, selectedDeck, filteredCards.length]);

  // Track card view when card changes
  useEffect(() => {
    if (currentFlashcard) {
      trackEvent({
        activityType: 'flashcard',
        activityId: currentFlashcard.id,
        topic: currentFlashcard.category,
        score: 0,
        timeSpent: 0,
        metadata: {
          action: 'view',
          cardId: currentFlashcard.id,
          front: currentFlashcard.question.substring(0, 50),
          topic: currentFlashcard.category,
          difficulty: currentFlashcard.difficulty,
          type: currentFlashcard.type
        }
      });
      setCardStartTime(Date.now());
      setCardViewTime(0);
    }
  }, [currentFlashcard, trackEvent]);

  const trackConfidenceRating = (confidence: 'again' | 'hard' | 'good' | 'easy') => {
    const timeSpent = Date.now() - cardStartTime;
    const confidenceScore = {
      'again': 0,
      'hard': 50,
      'good': 85,
      'easy': 100
    }[confidence];

    trackEvent({
      activityType: 'flashcard',
      activityId: currentFlashcard.id,
      topic: currentFlashcard.category,
      score: confidenceScore,
      timeSpent: Math.floor(timeSpent / 1000),
      metadata: {
        action: 'review',
        cardId: currentFlashcard.id,
        confidence,
        confidenceScore,
        timeSpentMs: timeSpent,
        difficulty: currentFlashcard.difficulty,
        type: currentFlashcard.type
      }
    });

    setSessionData(prev => ({
      ...prev,
      confidenceHistory: [
        ...prev.confidenceHistory,
        {
          cardId: currentFlashcard.id,
          topic: currentFlashcard.category,
          confidence,
          timeSpent
        }
      ]
    }));
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % filteredCards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setShowAnswer(false);
  };

  const shuffleCards = () => {
    setCurrentCard(Math.floor(Math.random() * filteredCards.length));
    setShowAnswer(false);
  };

  const markCard = (correct: boolean) => {
    const confidence = correct ? 'good' : 'again';
    trackConfidenceRating(confidence);
    setStudySession(prev => ({
      correct: correct ? prev.correct + 1 : prev.correct,
      needReview: correct ? prev.needReview : prev.needReview + 1,
      total: prev.total + 1
    }));
    nextCard();
  };

  // Track session completion on unmount or deck change
  useEffect(() => {
    return () => {
      if (sessionData.confidenceHistory.length > 0) {
        const totalTime = Date.now() - sessionData.startTime;
        const averageConfidence = sessionData.confidenceHistory.length > 0
          ? sessionData.confidenceHistory.reduce((sum, event) => {
              const score = { again: 0, hard: 50, good: 85, easy: 100 }[event.confidence] || 0;
              return sum + score;
            }, 0) / sessionData.confidenceHistory.length
          : 0;

        trackEvent({
          activityType: 'flashcard',
          activityId: `session-${sessionData.deckId}-${Date.now()}`,
          topic: 'Mixed',
          score: averageConfidence,
          timeSpent: Math.floor(totalTime / 1000),
          metadata: {
            action: 'session',
            deckId: sessionData.deckId,
            deckName: sessionData.deckName,
            totalCards: sessionData.cardCount,
            cardsReviewed: sessionData.confidenceHistory.length,
            completionRate: sessionData.cardCount > 0 ? (sessionData.confidenceHistory.length / sessionData.cardCount) * 100 : 0,
            averageConfidence,
            totalTimeMs: totalTime,
            averageTimePerCard: sessionData.confidenceHistory.length > 0 ? totalTime / sessionData.confidenceHistory.length : 0,
            confidenceDistribution: {
              again: sessionData.confidenceHistory.filter(c => c.confidence === 'again').length,
              hard: sessionData.confidenceHistory.filter(c => c.confidence === 'hard').length,
              good: sessionData.confidenceHistory.filter(c => c.confidence === 'good').length,
              easy: sessionData.confidenceHistory.filter(c => c.confidence === 'easy').length
            }
          }
        });
      }
    };
  }, [sessionData, trackEvent]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (filteredCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Brain className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">No flashcards found</h1>
            <p className="text-gray-600">Please select a different category.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Medical Disclaimer */}
        <MedicalDisclaimer variant="inline" />
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {user && !user.has_lifetime_access && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="text-yellow-800 text-sm">
                  Free tier: Access to first 25 flashcards. Upgrade for unlimited access to 1,000+ cards.
                </p>
              </div>
              <button
                onClick={() => setShowUnlockModal(true)}
                className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
              >
                Upgrade
              </button>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EMT-B Flashcards</h1>
                <p className="text-gray-600">{filteredCards.length} cards • Deck: {
                  collection === 'random' ? 'Random (All)' :
                  collection === 'all' ? 'All Flashcards' :
                  collection === 'module' ? (decks.moduleDecks[selectedDeck]?.label || 'Module') : (
                    selectedDeck === 'chapter1' ? 'Chapter 1' :
                    selectedDeck === 'chapter2' ? 'Chapter 2' :
                    selectedDeck === 'chapter3' ? 'Chapter 3' :
                    selectedDeck === 'chapter4' ? 'Chapter 4: Communications & Documentation' :
                    selectedDeck === 'chapter5' ? 'Chapter 5: Essential Terminology for Responders' :
                    selectedDeck === 'chapter6' ? 'Chapter 6: Body Systems for Emergency Care' :
                    selectedDeck === 'chapter7' ? 'Chapter 7: Lifespan Considerations in EMS' :
                    selectedDeck === 'chapter8' ? 'Chapter 8: Lifting and Moving Patients' :
                    selectedDeck === 'chapter9' ? 'Chapter 9: Airway Management' :
                    selectedDeck === 'chapter10' ? 'Chapter 10: Comprehensive Patient Assessment' :
                    selectedDeck === 'chapter11' ? 'Chapter 11: Airway Management Techniques' :
                    selectedDeck === 'chapter12' ? 'Chapter 12: Medication Administration Essentials' :
                    selectedDeck === 'chapter13' ? 'Chapter 13: Shock Recognition & Response' :
                    selectedDeck === 'chapter14' ? 'Chapter 14: BLS Resuscitation Protocols' :
                    'Chapters 1–14'
                  )
                }</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Study Progress</div>
              <div className="flex space-x-4 text-sm">
                <span className="text-green-600">✓ {studySession.correct}</span>
                <span className="text-red-600">⚠ {studySession.needReview}</span>
                <span className="text-gray-600">Total: {studySession.total}</span>
              </div>
            </div>
          </div>
          {/* Collection + Deck selectors */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 items-center">
              <label className="text-sm text-gray-700">Collection:</label>
              <select
                value={collection}
                onChange={(e) => {
                  const val = e.target.value as 'chapter'|'module'|'all'|'random';
                  setCollection(val);
                  setSelectedCategory('all');
                  setCurrentCard(0);
                  setShowAnswer(false);
                  // Set sensible default deck per collection
                  if (val === 'chapter') setSelectedDeck('chaptersAll');
                  else if (val === 'module') setSelectedDeck('module1');
                  else if (val === 'all') setSelectedDeck('allFlashcards');
                  else setSelectedDeck('random');
                  if (val === 'random') setRandomKey(k => k + 1);
                }}
                className="border rounded-md px-3 py-1 text-sm"
              >
                <option value="chapter">Chapter</option>
                <option value="module">Module</option>
                <option value="all">All</option>
                <option value="random">Random</option>
              </select>

              {(collection === 'chapter') && (
                <>
                  <label className="text-sm text-gray-700 ml-2">Deck:</label>
                  <select
                    value={selectedDeck}
                    onChange={(e) => {
                      setSelectedDeck(e.target.value);
                      setSelectedCategory('all');
                      setCurrentCard(0);
                      setShowAnswer(false);
                    }}
                    className="border rounded-md px-3 py-1 text-sm"
                  >
                    <option value="chaptersAll">Chapters 1–14 ({decks.chaptersAll.length})</option>
                    <option value="chapter14">Chapter 14 (15)</option>
                    <option value="chapter13">Chapter 13 (15)</option>
                    <option value="chapter12">Chapter 12 (15)</option>
                    <option value="chapter11">Chapter 11 (15)</option>
                    <option value="chapter10">Chapter 10 (15)</option>
                    <option value="chapter9">Chapter 9 (15)</option>
                    <option value="chapter8">Chapter 8 (15)</option>
                    <option value="chapter7">Chapter 7 (15)</option>
                    <option value="chapter6">Chapter 6 (15)</option>
                    <option value="chapter5">Chapter 5 (15)</option>
                    <option value="chapter4">Chapter 4 (15)</option>
                    <option value="chapter3">Chapter 3 (15)</option>
                    <option value="chapter2">Chapter 2 (15)</option>
                    <option value="chapter1">Chapter 1 (15)</option>
                  </select>
                </>
              )}

      {(collection === 'module') && (
                <>
                  <label className="text-sm text-gray-700 ml-2">Module:</label>
                  <select
                    value={selectedDeck}
                    onChange={(e) => {
                      setSelectedDeck(e.target.value);
                      setSelectedCategory('all');
                      setCurrentCard(0);
                      setShowAnswer(false);
                    }}
                    className="border rounded-md px-3 py-1 text-sm"
                  >
        {/* Core modules */}
        <option value="module1">{decks.moduleDecks['module1']?.label || 'Module 1'} ({decks.moduleDecks['module1']?.expected ?? 60} expected; {decks.moduleDecks['module1']?.available ?? 0} available)</option>
        <option value="module2">{decks.moduleDecks['module2']?.label || 'Module 2'} ({decks.moduleDecks['module2']?.expected ?? 75} expected; {decks.moduleDecks['module2']?.available ?? 0} available)</option>
  <option value="module3">{decks.moduleDecks['module3']?.label || 'Module 3'} ({decks.moduleDecks['module3']?.expected ?? 15} expected; {decks.moduleDecks['module3']?.available ?? 0} available)</option>
  <option value="module4">{decks.moduleDecks['module4']?.label || 'Module 4'} ({decks.moduleDecks['module4']?.expected ?? 15} expected; {decks.moduleDecks['module4']?.available ?? 0} available)</option>
  <option value="module5">{decks.moduleDecks['module5']?.label || 'Module 5'} ({decks.moduleDecks['module5']?.expected ?? 15} expected; {decks.moduleDecks['module5']?.available ?? 0} available)</option>
  <option value="module6">{decks.moduleDecks['module6']?.label || 'Module 6'} ({decks.moduleDecks['module6']?.expected ?? 30} expected; {decks.moduleDecks['module6']?.available ?? 0} available)</option>
        {/* Bonus */}
        <option value="bonusHumanBody">{decks.moduleDecks['bonusHumanBody']?.label} ({decks.moduleDecks['bonusHumanBody']?.expected} expected; {decks.moduleDecks['bonusHumanBody']?.available} available)</option>
                  </select>
                </>
              )}

              {(collection === 'all') && (
                <span className="text-sm text-gray-600 ml-2">All Flashcards ({decks.allFlashcards.length})</span>
              )}

        {(collection === 'random') && (
                <>
          <span className="text-sm text-gray-600 ml-2">Random 50 from All</span>
                  <button
                    onClick={() => { setRandomKey(k => k + 1); setCurrentCard(0); setShowAnswer(false); }}
                    className="ml-2 px-3 py-1 rounded-md text-sm bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Reshuffle
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Category Filter (compact) */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentCard(0);
                setShowAnswer(false);
              }}
              className="border rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All categories</option>
              {categories.filter(c => c !== 'all').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-lg shadow-lg p-8 min-h-96">
          <div className="text-center">
            {/* Card Info */}
            <div className="flex justify-between items-center mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentFlashcard.difficulty)}`}>
                {currentFlashcard.difficulty.toUpperCase()}
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {currentFlashcard.category}
              </span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {currentFlashcard.type}
              </span>
            </div>
            
            {/* Question/Answer */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {showAnswer ? 'Answer' : 'Question'}
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 min-h-32 flex items-center justify-center">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {showAnswer ? currentFlashcard.answer : currentFlashcard.question}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                {showAnswer ? 'Show Question' : 'Show Answer'}
              </button>
              
              {showAnswer && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => markCard(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Got It
                  </button>
                  <button
                    onClick={() => markCard(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Need Review
                  </button>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevCard}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  {currentCard + 1} of {filteredCards.length}
                </span>
                <button
                  onClick={shuffleCards}
                  className="bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  <Shuffle className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={nextCard}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">{activeDeck.length}</div>
              <div className="text-sm text-gray-600">Total Cards</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{
                collection === 'module' ? 1 :
                collection === 'chapter' && selectedDeck === 'chaptersAll' ? decks.chapterCount :
                collection === 'all' ? 5 : 1
              }</div>
              <div className="text-sm text-gray-600">{
                collection === 'module' ? 'Module' : (collection === 'all' ? 'Collections' : 'Chapter(s)')
              }</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{filteredCards.length}</div>
              <div className="text-sm text-gray-600">Current Set</div>
            </div>
          </div>
        </div>
      </div>

      {/* Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Unlock Full Suite</h3>
            <p className="text-gray-600 mb-6">
              You've completed the free preview! Unlock 1,000+ Flashcards, 50+ Scenarios, and the Full Curriculum for Lifetime Access.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowUnlockModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await api.post('/api/create-checkout-session');
                    window.location.href = response.data.checkout_url;
                  } catch (error) {
                    console.error('Error creating checkout session:', error);
                    alert('Error processing payment. Please try again.');
                  }
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Secure Checkout with Stripe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMTBFlashcards;

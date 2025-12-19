import React, { useState, useEffect } from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, CheckCircle2, XCircle, RefreshCw, ListChecks, AlertCircle } from 'lucide-react';
import { ModernButton } from '../ui/ModernGlassComponents';

// --- Reusable Sortable Item ---
interface SortableItemProps {
  id: string;
  text: string;
  isCorrect?: boolean | null;
  isSubmitted: boolean;
}

const SortableItem = ({ id, text, isCorrect, isSubmitted }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  let borderColor = 'border-gray-200';
  let bgColor = 'bg-white';
  let textColor = 'text-gray-700';

  if (isSubmitted) {
    if (isCorrect) {
      borderColor = 'border-emerald-500';
      bgColor = 'bg-emerald-50';
      textColor = 'text-emerald-700';
    } else {
      borderColor = 'border-rose-500';
      bgColor = 'bg-rose-50';
      textColor = 'text-rose-700';
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 mb-2 rounded-lg border ${borderColor} ${bgColor} shadow-sm transition-colors touch-none`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
        <GripVertical className="w-5 h-5" />
      </div>
      <span className={`flex-1 font-medium ${textColor}`}>{text}</span>
      {isSubmitted && (
        <div>
          {isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-500" />
          )}
        </div>
      )}
    </div>
  );
};

// --- Generic Sortable List Component ---
interface SortableListProps {
  items: string[];
  correctOrder: string[];
  onComplete: (score: number) => void;
  title: string;
  description?: string;
}

const GenericSortableList = ({ items: initialItems, correctOrder, onComplete, title, description }: SortableListProps) => {
  const [items, setItems] = useState<string[]>(initialItems);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Scramble on mount
  useEffect(() => {
    scrambleItems();
  }, [initialItems]); // Re-scramble if initial items change (e.g. switching actions)

  const scrambleItems = () => {
    // Create a copy and sort randomly
    const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);
    // Simple check to avoid accidental correct order (unlikely for >3 items but good practice)
    if (JSON.stringify(shuffled) === JSON.stringify(correctOrder) && correctOrder.length > 1) {
      // Try again if it's exactly the same (recursive, but safe for small lists)
      const reshuffled = [...correctOrder].sort(() => Math.random() - 0.5);
      setItems(reshuffled);
    } else {
      setItems(shuffled);
    }
    setIsSubmitted(false);
    setScore(0);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const checkOrder = () => {
    let correctCount = 0;
    items.forEach((item, index) => {
      if (item === correctOrder[index]) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsSubmitted(true);
    onComplete(correctCount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex gap-2">
          <ModernButton variant="secondary" size="sm" onClick={scrambleItems} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Reset
          </ModernButton>
          <ModernButton variant="primary" size="sm" onClick={checkOrder} disabled={isSubmitted}>
            Check Order
          </ModernButton>
        </div>
      </div>
      {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="bg-gray-50/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            {items.map((item, index) => (
              <SortableItem 
                key={item} 
                id={item} 
                text={item} 
                isSubmitted={isSubmitted}
                isCorrect={isSubmitted ? item === correctOrder[index] : null}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {isSubmitted && (
        <div className={`p-4 rounded-lg border ${score === correctOrder.length ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <h4 className={`font-semibold ${score === correctOrder.length ? 'text-emerald-800' : 'text-amber-800'}`}>
            {score === correctOrder.length ? 'Perfect Sequence!' : `You got ${score}/${correctOrder.length} correct.`}
          </h4>
        </div>
      )}
    </div>
  );
};

// --- Primary Assessment Sorter ---
export const PrimaryAssessmentSorter = () => {
  const steps = [
    'General Impression',
    'Airway Assessment',
    'Breathing Assessment',
    'Circulation Assessment',
    'Disability (AVPU)'
  ];

  return (
    <GenericSortableList
      items={steps}
      correctOrder={steps}
      onComplete={() => {}}
      title="Interactive: Primary Assessment"
      description="Order the steps of the Primary Assessment (ABCDE)."
    />
  );
};

// --- History Taking Sorter ---
export const HistoryTakingSorter = () => {
  const steps = [
    'Signs & Symptoms',
    'Allergies',
    'Medications',
    'Past Pertinent History',
    'Last Oral Intake',
    'Events Leading to Illness/Injury'
  ];

  return (
    <GenericSortableList
      items={steps}
      correctOrder={steps}
      onComplete={() => {}}
      title="Interactive: History Taking (SAMPLE)"
      description="Order the components of the SAMPLE history."
    />
  );
};

// --- Critical Action Mix & Match (SOPs) ---
const CRITICAL_ACTION_SOPS: Record<string, string[]> = {
  'Administer Aspirin': [
    'Ensure patient is alert and can swallow',
    'Ask about allergies to aspirin',
    'Check medication expiration date',
    'Verify dose (324mg / 4 baby aspirin)',
    'Instruct patient to chew and swallow'
  ],
  'Administer Epinephrine': [
    'Ensure 5 rights of medication',
    'Check concentration (1:1000) and clarity',
    'Remove safety cap',
    'Inject into lateral thigh (hold 10s)',
    'Dispose in sharps container'
  ],
  'Check Blood Glucose': [
    'Prepare glucometer and strip',
    'Clean finger with alcohol prep',
    'Lance finger (lateral side)',
    'Wipe away first drop of blood',
    'Apply second drop to test strip'
  ],
  'Perform Cincinnati Stroke Scale': [
    'Facial Droop (Ask patient to smile)',
    'Arm Drift (Eyes closed, arms out, palms up)',
    'Speech (Repeat "The sky is blue")'
  ],
  'C-Spine Stabilization': [
    'Direct manual stabilization of head',
    'Check PMS (Pulse, Motor, Sensory) in all 4 extremities',
    'Apply appropriately sized cervical collar',
    'Secure patient to backboard/stretcher',
    'Reassess PMS in all 4 extremities'
  ],
  'Administer Naloxone': [
    'Assess respiratory rate and depth',
    'Assemble pre-filled syringe/atomizer',
    'Administer 1mg per nostril (2mg total)',
    'Continue ventilation support',
    'Reassess respiratory status'
  ],
  'Administer Oral Glucose': [
    'Ensure patient is conscious and can swallow',
    'Check blood glucose level (<60 mg/dL)',
    'Squeeze tube onto tongue depressor',
    'Place between cheek and gum',
    'Reassess mental status and glucose'
  ],
  'Control Major Bleeding': [
    'Apply direct pressure with gloved hand',
    'Apply pressure dressing',
    'If bleeding continues, apply tourniquet',
    'Tighten windlass until bleeding stops',
    'Mark time on forehead/tourniquet'
  ],
  'Administer Oxygen': [
    'Assemble regulator to oxygen tank',
    'Open tank valve and check pressure',
    'Attach delivery device (NRB/Cannula)',
    'Adjust flow rate (10-15 LPM for NRB)',
    'Pre-fill reservoir bag (if NRB)',
    'Apply mask/cannula to patient'
  ],
  'Obtain Vital Signs': [
    'Assess Pulse (Rate, Rhythm, Quality)',
    'Assess Respirations (Rate, Quality)',
    'Measure Blood Pressure (Proper cuff size)',
    'Assess Skin (Color, Temperature, Condition)',
    'Assess Pupils (PERRL)'
  ]
};

interface CriticalActionMixMatchProps {
  scenarioActions: string[];
}

export const CriticalActionMixMatch = ({ scenarioActions }: CriticalActionMixMatchProps) => {
  // Filter scenario actions to only those we have SOPs for
  const availableSOPs = scenarioActions.filter(action => 
    Object.keys(CRITICAL_ACTION_SOPS).some(key => action.includes(key) || key.includes(action))
  );

  // Fuzzy match helper (simple inclusion check for now)
  const getSOPKey = (action: string) => {
    return Object.keys(CRITICAL_ACTION_SOPS).find(key => action.includes(key) || key.includes(action));
  };

  const [selectedAction, setSelectedAction] = useState<string | null>(
    availableSOPs.length > 0 ? availableSOPs[0] : null
  );

  if (availableSOPs.length === 0) {
    return (
      <div className="p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5" />
          <h4 className="font-semibold">No Interactive Procedures Available</h4>
        </div>
        <p className="text-sm">
          This scenario's critical actions don't have interactive step-by-step drills yet. 
          Focus on the "Required Actions" checklist above.
        </p>
      </div>
    );
  }

  const sopKey = selectedAction ? getSOPKey(selectedAction) : null;
  const steps = sopKey ? CRITICAL_ACTION_SOPS[sopKey] : [];

  return (
    <div className="space-y-6">
      {availableSOPs.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {availableSOPs.map(action => (
            <button
              key={action}
              onClick={() => setSelectedAction(action)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedAction === action
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {action}
            </button>
          ))}
        </div>
      )}

      {selectedAction && steps.length > 0 && (
        <GenericSortableList
          key={selectedAction} // Force re-render when action changes
          items={steps}
          correctOrder={steps}
          onComplete={() => {}}
          title={`Procedure: ${selectedAction}`}
          description="Drag the steps into the correct clinical order."
        />
      )}

      <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
        Source: NREMT Psychomotor Exam / National Model EMS Clinical Guidelines
      </div>
    </div>
  );
};

// --- Primary Assessment Mix & Match ---
export const PrimaryAssessmentMixMatch = () => {
  const pairs = [
    { id: 'gen', term: 'General Impression', def: 'Age, Sex, Level of Distress' },
    { id: 'air', term: 'Airway', def: 'Patency, Sounds, Obstructions' },
    { id: 'bre', term: 'Breathing', def: 'Rate, Depth, Quality, O2' },
    { id: 'cir', term: 'Circulation', def: 'Pulse, Skin Signs, Bleeding' },
    { id: 'dis', term: 'Disability', def: 'AVPU, GCS, Pupils' }
  ];

  const [shuffledDefs, setShuffledDefs] = useState(() => 
    [...pairs].sort(() => Math.random() - 0.5)
  );
  
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const handleTermClick = (id: string) => {
    if (matched.has(id)) return;
    setSelectedTerm(id);
    setError(null);
  };

  const handleDefClick = (defId: string) => {
    if (matched.has(defId)) return;
    
    if (selectedTerm) {
      if (selectedTerm === defId) {
        setMatched(prev => new Set(prev).add(selectedTerm));
        setSelectedTerm(null);
      } else {
        setError('Incorrect match. Try again.');
        setTimeout(() => setError(null), 1000);
        setSelectedTerm(null);
      }
    }
  };

  const reset = () => {
    setMatched(new Set());
    setSelectedTerm(null);
    setShuffledDefs([...pairs].sort(() => Math.random() - 0.5));
    setError(null);
  };

  const isComplete = matched.size === pairs.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interactive: Primary Assessment</h3>
        <ModernButton variant="secondary" size="sm" onClick={reset} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Reset
        </ModernButton>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Match the assessment phase to its key components.
      </p>

      {error && (
        <div className="p-2 bg-rose-50 text-rose-600 text-sm rounded-lg flex items-center gap-2 animate-pulse">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phase</h4>
          {pairs.map(item => (
            <button
              key={item.id}
              onClick={() => handleTermClick(item.id)}
              disabled={matched.has(item.id)}
              className={`w-full p-4 text-left rounded-xl border transition-all ${
                matched.has(item.id)
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : selectedTerm === item.id
                  ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-100'
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.term}</span>
                {matched.has(item.id) && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Components</h4>
          {shuffledDefs.map(item => (
            <button
              key={item.id}
              onClick={() => handleDefClick(item.id)}
              disabled={matched.has(item.id)}
              className={`w-full p-4 text-left rounded-xl border transition-all ${
                matched.has(item.id)
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 opacity-50'
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <span className="text-sm">{item.def}</span>
            </button>
          ))}
        </div>
      </div>

      {isComplete && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-semibold text-center">
          Excellent! You've mastered the Primary Assessment components.
        </div>
      )}

      <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
        Source: NREMT Psychomotor Exam / National Model EMS Clinical Guidelines
      </div>
    </div>
  );
};

// --- History Taking Fill in the Blanks ---
export const HistoryTakingFillBlanks = () => {
  const acronym = [
    { letter: 'S', answer: 'Signs & Symptoms' },
    { letter: 'A', answer: 'Allergies' },
    { letter: 'M', answer: 'Medications' },
    { letter: 'P', answer: 'Past Pertinent History' },
    { letter: 'L', answer: 'Last Oral Intake' },
    { letter: 'E', answer: 'Events Leading to Illness' }
  ];

  const [options, setOptions] = useState(() => 
    [...acronym].map(a => a.answer).sort(() => Math.random() - 0.5)
  );
  
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleOptionClick = (opt: string) => {
    setSelectedOption(opt);
  };

  const handleSlotClick = (letter: string) => {
    if (selectedOption && !answers[letter]) {
      setAnswers(prev => ({ ...prev, [letter]: selectedOption }));
      setOptions(prev => prev.filter(o => o !== selectedOption));
      setSelectedOption(null);
    } else if (answers[letter]) {
      // Return to pool
      const returned = answers[letter];
      setAnswers(prev => {
        const next = { ...prev };
        delete next[letter];
        return next;
      });
      setOptions(prev => [...prev, returned].sort(() => Math.random() - 0.5));
    }
  };

  const checkAnswers = () => {
    const allCorrect = acronym.every(item => answers[item.letter] === item.answer);
    setIsComplete(allCorrect);
  };

  const reset = () => {
    setAnswers({});
    setOptions([...acronym].map(a => a.answer).sort(() => Math.random() - 0.5));
    setIsComplete(false);
    setSelectedOption(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interactive: SAMPLE History</h3>
        <div className="flex gap-2">
          <ModernButton variant="secondary" size="sm" onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Reset
          </ModernButton>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Complete the SAMPLE acronym by selecting a term from the bank and tapping the correct slot.
      </p>

      {/* Word Bank */}
      <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 min-h-[80px]">
        <h4 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">Term Bank</h4>
        <div className="flex flex-wrap gap-2">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedOption === opt
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'bg-white text-blue-800 border border-blue-200 hover:bg-blue-50'
              }`}
            >
              {opt}
            </button>
          ))}
          {options.length === 0 && (
            <span className="text-sm text-gray-400 italic">All terms placed</span>
          )}
        </div>
      </div>

      {/* Slots */}
      <div className="grid gap-3">
        {acronym.map(item => {
          const filled = answers[item.letter];
          const isCorrect = isComplete && filled === item.answer;
          
          return (
            <div key={item.letter} className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-900 text-white text-xl font-bold rounded-lg shadow-sm">
                {item.letter}
              </div>
              <button
                onClick={() => handleSlotClick(item.letter)}
                className={`flex-1 h-12 px-4 text-left rounded-lg border-2 border-dashed transition-all flex items-center justify-between ${
                  filled
                    ? isComplete
                      ? 'bg-emerald-50 border-emerald-200 border-solid'
                      : 'bg-white border-blue-300 border-solid'
                    : selectedOption
                    ? 'bg-blue-50/30 border-blue-400 hover:bg-blue-50'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <span className={`font-medium ${filled ? 'text-gray-900' : 'text-gray-400'}`}>
                  {filled || 'Tap to place term...'}
                </span>
                {filled && !isComplete && <XCircle className="w-4 h-4 text-gray-400 hover:text-rose-500" />}
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              </button>
            </div>
          );
        })}
      </div>

      {!isComplete && Object.keys(answers).length === acronym.length && (
        <ModernButton variant="primary" className="w-full" onClick={checkAnswers}>
          Check Answers
        </ModernButton>
      )}

      {isComplete && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-semibold text-center">
          Perfect! You know your SAMPLE history.
        </div>
      )}

      <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
        Source: NREMT Psychomotor Exam / National Model EMS Clinical Guidelines
      </div>
    </div>
  );
};

// --- Reassessment Checklist ---
export const ReassessmentChecklist = () => {
  const items = [
    { id: 'primary', text: 'Repeat Primary Assessment', correct: true },
    { id: 'vitals', text: 'Reassess Vital Signs', correct: true },
    { id: 'interventions', text: 'Check Interventions', correct: true },
    { id: 'complaint', text: 'Re-evaluate Chief Complaint', correct: true },
    { id: 'detailed', text: 'Perform Detailed Physical Exam', correct: false }, // Usually secondary
    { id: 'history', text: 'Obtain Past Medical History', correct: false } // Usually history
  ];

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleItem = (id: string) => {
    if (isSubmitted) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const checkAnswers = () => {
    setIsSubmitted(true);
  };

  const reset = () => {
    setSelected(new Set());
    setIsSubmitted(false);
  };

  const correctCount = items.filter(i => i.correct && selected.has(i.id)).length;
  const incorrectCount = items.filter(i => !i.correct && selected.has(i.id)).length;
  const missedCount = items.filter(i => i.correct && !selected.has(i.id)).length;
  const isPerfect = correctCount === 4 && incorrectCount === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interactive: Reassessment</h3>
        <div className="flex gap-2">
          <ModernButton variant="secondary" size="sm" onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Reset
          </ModernButton>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Select all components that are part of the ongoing Reassessment phase.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(item => {
          const isSelected = selected.has(item.id);
          let style = "bg-white border-gray-200 hover:border-blue-300";
          let icon = isSelected ? <CheckCircle2 className="w-5 h-5 text-blue-500" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;

          if (isSubmitted) {
            if (item.correct) {
              style = isSelected 
                ? "bg-emerald-50 border-emerald-500 text-emerald-800" 
                : "bg-white border-emerald-200 border-dashed text-gray-500"; // Missed
              icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
            } else {
              style = isSelected 
                ? "bg-rose-50 border-rose-500 text-rose-800" 
                : "bg-white border-gray-200 opacity-50";
              icon = isSelected ? <XCircle className="w-5 h-5 text-rose-500" /> : <div className="w-5 h-5" />;
            }
          } else if (isSelected) {
            style = "bg-blue-50 border-blue-500 text-blue-800";
          }

          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              disabled={isSubmitted}
              className={`p-4 rounded-xl border flex items-center gap-3 transition-all text-left ${style}`}
            >
              {icon}
              <span className="font-medium">{item.text}</span>
            </button>
          );
        })}
      </div>

      {!isSubmitted && (
        <ModernButton variant="primary" className="w-full" onClick={checkAnswers}>
          Check Selection
        </ModernButton>
      )}

      {isSubmitted && (
        <div className={`p-4 rounded-lg border ${isPerfect ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <h4 className={`font-semibold ${isPerfect ? 'text-emerald-800' : 'text-amber-800'}`}>
            {isPerfect ? 'Perfect! You identified all reassessment components.' : `You got ${correctCount} correct, missed ${missedCount}, and selected ${incorrectCount} incorrect.`}
          </h4>
        </div>
      )}

      <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
        Source: NREMT Psychomotor Exam / National Model EMS Clinical Guidelines
      </div>
    </div>
  );
};

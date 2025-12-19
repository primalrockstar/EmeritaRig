import React, { useState, useEffect } from 'react';

interface EnhancedMultipleResponseProps {
  question: {
    id: string;
    stem: string;
    options: string[];
    correctAnswers: number[];
    instruction?: 'Select TWO' | 'Select THREE';
    minimumSelections: number;
    onAnswer: (selected: number[]) => void;
  };
  showFeedback?: boolean;
}

const EnhancedMultipleResponse: React.FC<EnhancedMultipleResponseProps> = ({
  question,
  showFeedback = false
}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const requiredCount = question.minimumSelections;

  useEffect(() => {
    setSelected([]);
    setSubmitted(false);
  }, [question.id]);

  const handleSelect = (index: number) => {
    if (submitted) return;

    let newSelected;
    if (selected.includes(index)) {
      newSelected = selected.filter(i => i !== index);
    } else {
      if (selected.length >= requiredCount) {
        // NREMT doesn't allow selecting more than required
        return;
      }
      newSelected = [...selected, index];
    }

    setSelected(newSelected);

    // Auto-submit when correct number selected (mimics real NREMT)
    if (newSelected.length === requiredCount) {
      setSubmitted(true);
      setTimeout(() => question.onAnswer(newSelected), 1000);
    }
  };

  const getOptionState = (index: number) => {
    if (!submitted) {
      return selected.includes(index) ? 'selected' : 'unselected';
    }

    const isCorrect = question.correctAnswers.includes(index);
    const wasSelected = selected.includes(index);

    if (wasSelected && isCorrect) return 'correct-selected';
    if (wasSelected && !isCorrect) return 'incorrect-selected';
    if (!wasSelected && isCorrect) return 'correct-unselected';
    return 'unselected';
  };

  const getStateClasses = (state: string) => {
    const baseClasses = 'w-full text-left p-4 rounded-lg border-2 transition-all cursor-pointer';

    switch (state) {
      case 'unselected':
        return `${baseClasses} bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600`;
      case 'selected':
        return `${baseClasses} bg-blue-900/50 border-blue-500`;
      case 'correct-selected':
        return `${baseClasses} bg-emerald-900/30 border-emerald-500`;
      case 'incorrect-selected':
        return `${baseClasses} bg-rose-900/30 border-rose-500`;
      case 'correct-unselected':
        return `${baseClasses} bg-emerald-900/10 border-emerald-500/50`;
      default:
        return `${baseClasses} bg-slate-800 border-slate-700`;
    }
  };

  const getStateIndicators = (state: string) => {
    switch (state) {
      case 'selected':
        return { icon: '○', color: 'text-blue-400', label: 'Selected' };
      case 'correct-selected':
        return { icon: '✓', color: 'text-emerald-400', label: 'Correct' };
      case 'incorrect-selected':
        return { icon: '✗', color: 'text-rose-400', label: 'Incorrect' };
      case 'correct-unselected':
        return { icon: '○', color: 'text-emerald-400', label: 'Correct (not selected)' };
      default:
        return { icon: '○', color: 'text-slate-400', label: '' };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{question.stem}</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-slate-300">
            {question.instruction || `Select ${requiredCount}`}
          </div>
          <div className="text-sm text-slate-400">
            Selected: {selected.length} of {requiredCount}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {question.options.map((option, index) => {
          const state = getOptionState(index);
          const stateClasses = getStateClasses(state);
          const indicators = getStateIndicators(state);

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={submitted}
              className={stateClasses}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className={`w-8 h-8 flex items-center justify-center mr-4 text-lg font-bold ${indicators.color}`}>
                    {indicators.icon}
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-200 mr-3 font-semibold">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-slate-200">{option}</span>
                  </div>
                </div>

                {submitted && indicators.label && (
                  <span className={`text-sm font-medium ${indicators.color}`}>
                    {indicators.label}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-700">
        {!submitted ? (
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-400">
              Select exactly {requiredCount} options to auto-submit
            </div>
            {selected.length === requiredCount && (
              <button
                onClick={() => {
                  setSubmitted(true);
                  question.onAnswer(selected);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Answer
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-400 mb-2">
              ✓ Answer Submitted
            </div>
            <div className="text-sm text-slate-400">
              {selected.filter(s => question.correctAnswers.includes(s)).length} of {requiredCount} correct
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedMultipleResponse;
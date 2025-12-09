import React, { useState, useEffect } from 'react';

interface DragDropQuestionProps {
  question: {
    id: string;
    stem: string;
    instruction?: string;
    columns: string[];
    items: string[];
    correctPlacement: Record<string, string>;
    onAnswer: (placement: Record<string, string>) => void;
  };
}

const DragDropQuestion: React.FC<DragDropQuestionProps> = ({ question }) => {
  const [placement, setPlacement] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    // Initialize empty placement
    const initial: Record<string, string> = {};
    question.items.forEach(item => {
      initial[item] = '';
    });
    setPlacement(initial);
    setSubmitted(false);
    setIsCorrect(false);
  }, [question.id]);

  const handleDragStart = (item: string) => {
    if (submitted) return;
    setDraggedItem(item);
  };

  const handleDrop = (column: string) => {
    if (!draggedItem || submitted) return;

    // Remove from current column if already placed
    const newPlacement = { ...placement };
    Object.keys(newPlacement).forEach(item => {
      if (newPlacement[item] === column && item !== draggedItem) {
        // Allow only one item per column for simplicity
        newPlacement[item] = '';
      }
    });

    newPlacement[draggedItem] = column;
    setPlacement(newPlacement);
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const removeFromColumn = (item: string) => {
    if (submitted) return;

    setPlacement(prev => ({
      ...prev,
      [item]: ''
    }));
  };

  const checkAnswer = () => {
    const correct = JSON.stringify(placement) === JSON.stringify(question.correctPlacement);
    setIsCorrect(correct);
    setSubmitted(true);

    // Submit after a brief delay to show feedback
    setTimeout(() => question.onAnswer(placement), 1500);
  };

  const resetQuestion = () => {
    const initial: Record<string, string> = {};
    question.items.forEach(item => {
      initial[item] = '';
    });
    setPlacement(initial);
    setSubmitted(false);
    setIsCorrect(false);
    setDraggedItem(null);
  };

  const showCorrectAnswer = () => {
    setPlacement(question.correctPlacement);
  };

  // Group items by column for display
  const itemsByColumn = question.columns.reduce((acc, column) => {
    acc[column] = question.items.filter(item => placement[item] === column);
    return acc;
  }, {} as Record<string, string[]>);

  // Items not yet placed
  const unplacedItems = question.items.filter(item => !placement[item]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{question.stem}</h3>
        <p className="text-slate-300 mb-4">
          {question.instruction || 'Drag each item to the correct category'}
        </p>
      </div>

      {/* Unplaced Items */}
      {unplacedItems.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-slate-300 mb-3">Items to Place:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
            {unplacedItems.map((item) => (
              <div
                key={item}
                draggable={!submitted}
                onDragStart={() => handleDragStart(item)}
                onDragEnd={handleDragEnd}
                className={`p-3 rounded-lg border-2 cursor-move transition-all ${
                  draggedItem === item
                    ? 'bg-blue-600 border-blue-400 shadow-lg scale-105'
                    : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-200">{item}</span>
                  {!submitted && <span className="text-slate-500">⋮⋮</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Column Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {question.columns.map((column) => (
          <div
            key={column}
            onDrop={() => handleDrop(column)}
            onDragOver={handleDragOver}
            className={`p-4 rounded-lg border-2 border-dashed min-h-[150px] transition-all ${
              draggedItem && (!itemsByColumn[column] || itemsByColumn[column].length === 0)
                ? 'border-blue-400 bg-blue-900/10'
                : submitted
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-900/10'
                    : 'border-slate-600 bg-slate-800'
                  : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
            }`}
          >
            <h4 className={`text-lg font-semibold mb-3 text-center ${
              submitted && isCorrect ? 'text-emerald-400' : 'text-slate-300'
            }`}>
              {column}
            </h4>

            <div className="space-y-2">
              {itemsByColumn[column]?.map((item) => (
                <div
                  key={item}
                  className={`p-2 rounded flex items-center justify-between ${
                    submitted
                      ? isCorrect
                        ? 'bg-emerald-900/30 border border-emerald-500'
                        : 'bg-slate-700'
                      : 'bg-slate-600'
                  }`}
                >
                  <span className={`${
                    submitted && isCorrect ? 'text-emerald-200' : 'text-slate-200'
                  }`}>
                    {item}
                  </span>

                  {!submitted && (
                    <button
                      onClick={() => removeFromColumn(item)}
                      className="text-slate-500 hover:text-slate-300 ml-2"
                    >
                      ✕
                    </button>
                  )}

                  {submitted && isCorrect && (
                    <span className="text-emerald-400">✓</span>
                  )}
                </div>
              ))}

              {(!itemsByColumn[column] || itemsByColumn[column].length === 0) && (
                <div className="text-slate-500 text-sm italic p-4 text-center border-2 border-dashed border-slate-600 rounded">
                  Drop item here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="bg-slate-800/50 p-3 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">
            Placed: {question.items.filter(item => placement[item]).length} of {question.items.length}
          </span>
          <span className="text-slate-400">
            {Math.round((question.items.filter(item => placement[item]).length / question.items.length) * 100)}% complete
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="pt-4 border-t border-slate-700">
        {!submitted ? (
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-400">
              Drag items from the list above into the appropriate columns
            </div>
            <button
              onClick={checkAnswer}
              disabled={question.items.some(item => !placement[item])}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-600 transition-colors"
            >
              Check Placement
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`text-center p-4 rounded-lg ${
              isCorrect
                ? 'bg-emerald-900/20 border border-emerald-500'
                : 'bg-rose-900/20 border border-rose-500'
            }`}>
              <div className={`text-2xl font-bold mb-2 ${
                isCorrect ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect Placement'}
              </div>
              <div className="text-slate-300">
                {isCorrect
                  ? 'All items are correctly placed!'
                  : 'Some items are in the wrong columns.'
                }
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              {!isCorrect && (
                <button
                  onClick={showCorrectAnswer}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Show Correct Answer
                </button>
              )}
              <button
                onClick={resetQuestion}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDropQuestion;
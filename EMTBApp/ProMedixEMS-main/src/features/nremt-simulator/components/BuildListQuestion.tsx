import React, { useState } from 'react';

interface BuildListQuestionProps {
  question: {
    id: string;
    stem: string;
    instruction: string;
    items: string[];
    correctOrder: number[];
    onAnswer: (order: number[]) => void;
  };
}

const BuildListQuestion: React.FC<BuildListQuestionProps> = ({ question }) => {
  const [items, setItems] = useState(question.items);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    if (submitted) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (submitted || draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];

    // Remove dragged item
    newItems.splice(draggedIndex, 1);

    // Insert at new position
    newItems.splice(index, 0, draggedItem);

    setItems(newItems);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const checkAnswer = () => {
    const currentOrder = items.map((item, index) =>
      question.items.findIndex(qi => qi === item)
    );

    const correct = JSON.stringify(currentOrder) === JSON.stringify(question.correctOrder);
    setIsCorrect(correct);
    setSubmitted(true);

    // Submit after a brief delay to show feedback
    setTimeout(() => question.onAnswer(currentOrder), 1500);
  };

  const resetQuestion = () => {
    setItems(question.items);
    setSubmitted(false);
    setIsCorrect(false);
    setDraggedIndex(null);
  };

  const showCorrectOrder = () => {
    const correctItems = question.correctOrder.map(idx => question.items[idx]);
    setItems(correctItems);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{question.stem}</h3>
        <p className="text-slate-300 mb-4">{question.instruction}</p>
      </div>

      <div className="space-y-2 p-4 rounded-lg border-2 border-slate-700 bg-slate-800/50">
        {items.map((item, index) => (
          <div
            key={`item-${index}`}
            draggable={!submitted}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center p-4 rounded-lg transition-all cursor-move ${
              draggedIndex === index
                ? 'bg-blue-600 shadow-lg rotate-2 scale-105'
                : submitted
                  ? isCorrect
                    ? 'bg-emerald-900/30 border border-emerald-500'
                    : 'bg-slate-800 border border-slate-600'
                  : 'bg-slate-700 hover:bg-slate-600 border border-slate-600'
            }`}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 font-bold ${
              submitted
                ? isCorrect
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-600 text-slate-400'
                : 'bg-slate-600 text-slate-200'
            }`}>
              {submitted ? (
                isCorrect ? (
                  <span>✓</span>
                ) : (
                  <span>{index + 1}</span>
                )
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            <div className="flex-1">
              <span className={`${
                submitted && isCorrect
                  ? 'text-emerald-200'
                  : 'text-slate-200'
              }`}>
                {item}
              </span>
            </div>

            {!submitted && (
              <div className="text-slate-500 ml-4">
                ⋮⋮
              </div>
            )}

            {submitted && (
              <div className="ml-4">
                {isCorrect ? (
                  <div className="text-emerald-400 font-semibold">
                    ✓ Correct position
                  </div>
                ) : (
                  <div className="text-slate-400 text-sm">
                    Position {index + 1}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-700">
        {!submitted ? (
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-400">
              Drag items to arrange them in the correct order
            </div>
            <button
              onClick={checkAnswer}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Check Order
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
                {isCorrect ? '✓ Correct!' : '✗ Incorrect Order'}
              </div>
              <div className="text-slate-300">
                {isCorrect
                  ? 'The sequence is correct!'
                  : 'The items are not in the correct order.'
                }
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              {!isCorrect && (
                <button
                  onClick={showCorrectOrder}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Show Correct Order
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

export default BuildListQuestion;
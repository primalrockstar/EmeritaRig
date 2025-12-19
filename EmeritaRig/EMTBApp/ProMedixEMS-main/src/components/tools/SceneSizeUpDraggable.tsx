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
import { GripVertical, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { ModernButton } from '../ui/ModernGlassComponents';

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
      className={`flex items-center gap-3 p-3 mb-2 rounded-lg border ${borderColor} ${bgColor} shadow-sm transition-colors`}
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

const CORRECT_ORDER = [
  'Take Standard Precautions (BSI/PPE)',
  'Evaluate Scene Safety',
  'Determine Mechanism of Injury / Nature of Illness',
  'Determine Number of Patients',
  'Request Additional Resources',
  'Consider Stabilization of C-Spine'
];

const SceneSizeUpDraggable = () => {
  const [items, setItems] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    scrambleItems();
  }, []);

  const scrambleItems = () => {
    const shuffled = [...CORRECT_ORDER].sort(() => Math.random() - 0.5);
    // Ensure it's not accidentally correct
    if (JSON.stringify(shuffled) === JSON.stringify(CORRECT_ORDER)) {
      scrambleItems();
    } else {
      setItems(shuffled);
      setIsSubmitted(false);
      setScore(0);
    }
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
      if (item === CORRECT_ORDER[index]) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interactive: Scene Size-Up Sequence</h3>
        <div className="flex gap-2">
          <ModernButton 
            variant="outline" 
            size="sm" 
            onClick={scrambleItems}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Reset
          </ModernButton>
          <ModernButton 
            variant="primary" 
            size="sm" 
            onClick={checkOrder}
            disabled={isSubmitted}
          >
            Check Order
          </ModernButton>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Drag and drop the steps below into the correct NREMT order.
      </p>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={items}
          strategy={verticalListSortingStrategy}
        >
          <div className="bg-gray-50/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            {items.map((item, index) => (
              <SortableItem 
                key={item} 
                id={item} 
                text={item} 
                isSubmitted={isSubmitted}
                isCorrect={isSubmitted ? item === CORRECT_ORDER[index] : null}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {isSubmitted && (
        <div className={`p-4 rounded-lg border ${score === 6 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <h4 className={`font-semibold ${score === 6 ? 'text-emerald-800' : 'text-amber-800'}`}>
            {score === 6 ? 'Perfect Score!' : `You got ${score}/6 correct.`}
          </h4>
          {score < 6 && (
            <p className="text-sm text-amber-700 mt-1">
              Review the standard NREMT Scene Size-up sequence: BSI → Scene Safety → MOI/NOI → # Patients → Resources → C-Spine.
            </p>
          )}
        </div>
      )}
      
      <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
        Source: NREMT Psychomotor Exam / National Model EMS Clinical Guidelines
      </div>
    </div>
  );
};

export default SceneSizeUpDraggable;

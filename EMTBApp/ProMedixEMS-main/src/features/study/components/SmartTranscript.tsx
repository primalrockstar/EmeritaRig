import React, { useMemo, useState, useRef } from 'react';
import { buildDictionary, processTranscript, TranscriptSegment } from '../../../utils/textAnalysis';
import { getChapterById } from '../../../data/curriculum';
import { drugFormulary } from '../../../data/pharmacology';
import { useDebounce } from '../../../hooks/useDebounce';
import GlassCard from '../../../components/ui/GlassCard';

interface SmartTranscriptProps {
  transcript: string;
}

interface PopoverData {
  title: string;
  class: string;
  link: string;
}

const SmartTranscript: React.FC<SmartTranscriptProps> = ({ transcript }) => {
  const debouncedTranscript = useDebounce(transcript, 500);
  const [popover, setPopover] = useState<{ data: PopoverData; position: { x: number; y: number } } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dictionary = useMemo(() => buildDictionary(), []);

  const segments = useMemo(() => {
    return processTranscript(debouncedTranscript, dictionary);
  }, [debouncedTranscript, dictionary]);

  const getPopoverData = (id: string): PopoverData | null => {
    if (id.startsWith('chap-')) {
      const chapterId = parseInt(id.split('-')[1]);
      const chapter = getChapterById(chapterId);
      if (chapter) {
        return {
          title: chapter.title,
          class: 'Chapter',
          link: `/study/chapter/${chapterId}`
        };
      }
    } else if (id.startsWith('drug-')) {
      const medId = id.split('-')[1];
      const med = drugFormulary.find((m: any) => m.id === medId);
      if (med) {
        return {
          title: med.name,
          class: med.category,
          link: `/meds/${medId}`
        };
      }
    }
    return null;
  };

  const handleKeywordClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      const data = getPopoverData(id);
      if (data) {
        setPopover({
          data,
          position: {
            x: rect.left - containerRect.left,
            y: rect.bottom - containerRect.top + 5
          }
        });
      }
    }
  };

  const closePopover = () => {
    setPopover(null);
  };

  return (
    <div ref={containerRef} className="relative h-64 overflow-y-auto text-gray-300 leading-relaxed">
      {segments.map((segment: TranscriptSegment, index: number) => {
        if (segment.type === 'text') {
          return <span key={index}>{segment.content}</span>;
        } else {
          return (
            <button
              key={index}
              className="text-cyan-400 font-bold hover:underline cursor-pointer"
              onClick={(e) => segment.id && handleKeywordClick(e, segment.id)}
            >
              {segment.content}
            </button>
          );
        }
      })}
      {popover && (
        <div
          className="absolute z-10"
          style={{ left: popover.position.x, top: popover.position.y }}
          onClick={closePopover}
        >
          <GlassCard className="p-4 min-w-64">
            <div className="text-sm">
              <div className="font-semibold text-white">{popover.data.title}</div>
              <div className="text-gray-300">{popover.data.class}</div>
              <a
                href={popover.data.link}
                className="text-cyan-400 hover:underline mt-2 inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                View Details →
              </a>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default SmartTranscript;
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getChapterById } from '../../data/curriculum';
import { ArrowLeft, Brain, Target, AlertTriangle } from 'lucide-react';
import TacticalLayout from '../../layouts/TacticalLayout';

const ChapterReader: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const chapterData = chapterId ? getChapterById(chapterId) : null;

  if (!chapterData) {
    return (
      <TacticalLayout title="CHAPTER NOT FOUND">
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto" />
            <h1 className="text-2xl font-bold text-slate-200">Chapter Not Found</h1>
            <p className="text-slate-400">The requested chapter could not be located.</p>
            <Link
              to="/study-notes"
              className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Field Manual
            </Link>
          </div>
        </div>
      </TacticalLayout>
    );
  }

  const { chapter, module } = chapterData;

  return (
    <TacticalLayout
      title={`CHAPTER ${chapter.aaos_chapter || 'BONUS'}`}
      showWarning={module.isBonus}
    >
      <div className="min-h-screen bg-slate-900">
        {/* Navigation Header */}
        <div className="border-b border-slate-700 bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                to="/study-notes"
                className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Field Manual</span>
              </Link>

              <div className="flex items-center space-x-4">
                <Link
                  to={`/flashcards?chapter=${chapter.id}`}
                  className="flex items-center space-x-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-200 hover:text-amber-400 transition-colors"
                >
                  <Brain className="w-4 h-4" />
                  <span className="text-sm">Flashcards</span>
                </Link>

                <Link
                  to={`/enhanced-quiz?chapter=${chapter.id}`}
                  className="flex items-center space-x-2 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded transition-colors"
                >
                  <Target className="w-4 h-4" />
                  <span className="text-sm">Take Quiz</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <article className="space-y-8">
            {/* Chapter Header */}
            <header className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span className="px-2 py-1 bg-slate-800 border border-slate-600 rounded text-xs">
                  {module.title}
                </span>
                {chapter.aaos_chapter && (
                  <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-300">
                    AAOS Chapter {chapter.aaos_chapter}
                  </span>
                )}
              </div>

              <h1
                className="text-3xl font-bold text-amber-400 font-mono uppercase tracking-wider"
                style={{ fontFamily: 'Courier Prime, monospace' }}
              >
                {chapter.title}
              </h1>

              <div className="w-16 h-1 bg-amber-500/50 rounded"></div>
            </header>

            {/* Chapter Content Placeholder */}
            <div className="space-y-6 text-slate-200 leading-relaxed">
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <h2
                  className="text-xl font-semibold text-amber-400 mb-4 font-mono"
                  style={{ fontFamily: 'Courier Prime, monospace' }}
                >
                  ## OBJECTIVES
                </h2>
                <ul className="space-y-2 text-slate-300">
                  <li>• Understand key concepts and principles</li>
                  <li>• Apply knowledge to clinical scenarios</li>
                  <li>• Prepare for NREMT examination questions</li>
                </ul>
              </div>

              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <h2
                  className="text-xl font-semibold text-amber-400 mb-4 font-mono"
                  style={{ fontFamily: 'Courier Prime, monospace' }}
                >
                  ## KEY CONCEPTS
                </h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    <strong className="text-amber-300">Clinical Pearl:</strong> This chapter focuses on critical concepts that appear frequently
                    on the NREMT examination and in clinical practice.
                  </p>

                  <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4">
                    <p className="text-amber-200">
                      <strong>Memory Aid:</strong> Key mnemonics and memory techniques for this topic.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <h2
                  className="text-xl font-semibold text-amber-400 mb-4 font-mono"
                  style={{ fontFamily: 'Courier Prime, monospace' }}
                >
                  ## CLINICAL APPLICATION
                </h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Practical application of concepts in emergency medical services scenarios.
                    Focus on assessment, intervention, and transport priorities.
                  </p>

                  <div className="bg-red-500/10 border-l-4 border-red-500 p-4">
                    <p className="text-red-200">
                      <strong>Critical Error Watch-out:</strong> Common mistakes and pitfalls to avoid in clinical practice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <h2
                  className="text-xl font-semibold text-amber-400 mb-4 font-mono"
                  style={{ fontFamily: 'Courier Prime, monospace' }}
                >
                  ## NREMT PREPARATION
                </h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Common examination questions and scenarios related to this chapter.
                    Focus areas for cognitive and affective objectives.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-slate-700/50 p-4 rounded border border-slate-600">
                      <h3 className="font-semibold text-amber-300 mb-2">High-Yield Topics</h3>
                      <ul className="text-sm space-y-1 text-slate-300">
                        <li>• Assessment priorities</li>
                        <li>• Intervention protocols</li>
                        <li>• Transport considerations</li>
                      </ul>
                    </div>

                    <div className="bg-slate-700/50 p-4 rounded border border-slate-600">
                      <h3 className="font-semibold text-amber-300 mb-2">Common Pitfalls</h3>
                      <ul className="text-sm space-y-1 text-slate-300">
                        <li>• Scope of practice violations</li>
                        <li>• Assessment omissions</li>
                        <li>• Documentation errors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Footer */}
            <footer className="border-t border-slate-700 pt-8 mt-12">
              <div className="flex items-center justify-between">
                <Link
                  to="/study-notes"
                  className="flex items-center space-x-2 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Field Manual</span>
                </Link>

                <div className="flex items-center space-x-4">
                  <Link
                    to={`/flashcards?chapter=${chapter.id}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-200 hover:text-amber-400 transition-colors"
                  >
                    <Brain className="w-4 h-4" />
                    <span>Study Flashcards</span>
                  </Link>

                  <Link
                    to={`/enhanced-quiz?chapter=${chapter.id}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded transition-colors"
                  >
                    <Target className="w-4 h-4" />
                    <span>Take Chapter Quiz</span>
                  </Link>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </TacticalLayout>
  );
};

export default ChapterReader;
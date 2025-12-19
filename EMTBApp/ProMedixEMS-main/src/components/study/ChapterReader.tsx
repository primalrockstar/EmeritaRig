import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getChapterById } from '../../data/curriculum';
import { ArrowLeft, Brain, Target, AlertTriangle, ChevronDown, ChevronUp, FileText, Zap } from 'lucide-react';
import TacticalLayout from '../../layouts/TacticalLayout';

// Import EMTB study content
import { chapter1StudyNotes as ch1Data } from '../../data/emtb/chapter1-study-notes';
import { chapter2StudyNotes as ch2Data } from '../../data/emtb/chapter2-study-notes';
import { chapter3StudyNotes as ch3Data } from '../../data/emtb/chapter3-study-notes';
import { chapter4StudyNotes as ch4Data } from '../../data/emtb/chapter4-study-notes';
import { chapter5StudyNotes as ch5Data } from '../../data/emtb/chapter5-study-notes';
import { chapter6StudyNotes as ch6Data } from '../../data/emtb/chapter6-study-notes';
import { chapter7StudyNotes as ch7Data } from '../../data/emtb/chapter7-study-notes';
import { chapter8StudyNotes as ch8Data } from '../../data/emtb/chapter8-study-notes';
import { chapter9StudyNotes as ch9Data } from '../../data/emtb/chapter9-study-notes';
import { chapter10StudyNotes as ch10Data } from '../../data/emtb/chapter10-study-notes';
import { chapter11StudyNotes as ch11Data } from '../../data/emtb/chapter11-study-notes';
import { chapter12StudyNotes as ch12Data } from '../../data/emtb/chapter12-study-notes';
import { chapter13StudyNotes as ch13Data } from '../../data/emtb/chapter13-study-notes';
import { chapter14StudyNotes as ch14Data } from '../../data/emtb/chapter14-study-notes';
import { chapter15StudyNotes as ch15Data } from '../../data/emtb/chapter15-study-notes';
import { chapter16StudyNotes as ch16Data } from '../../data/emtb/chapter16-study-notes';
import { chapter17StudyNotes as ch17Data } from '../../data/emtb/chapter17-study-notes';
import { chapter18StudyNotes as ch18Data } from '../../data/emtb/chapter18-study-notes';
import { chapter19StudyNotes as ch19Data } from '../../data/emtb/chapter19-study-notes';
import { chapter20StudyNotes as ch20Data } from '../../data/emtb/chapter20-study-notes';
import { chapter21StudyNotes as ch21Data } from '../../data/emtb/chapter21-study-notes';
import { chapter22StudyNotes as ch22Data } from '../../data/emtb/chapter22-study-notes';
import { chapter23StudyNotes as ch23Data } from '../../data/emtb/chapter23-study-notes';
import { chapter24StudyNotes as ch24Data } from '../../data/emtb/chapter24-study-notes';
import { chapter25StudyNotes as ch25Data } from '../../data/emtb/chapter25-study-notes';
import { chapter26StudyNotes as ch26Data } from '../../data/emtb/chapter26-study-notes';
import { chapter27StudyNotes as ch27Data } from '../../data/emtb/chapter27-study-notes';
import { chapter28StudyNotes as ch28Data } from '../../data/emtb/chapter28-study-notes';
import { chapter29StudyNotes as ch29Data } from '../../data/emtb/chapter29-study-notes';
import { chapter30StudyNotes as ch30Data } from '../../data/emtb/chapter30-study-notes';
import { chapter31StudyNotes as ch31Data } from '../../data/emtb/chapter31-study-notes';
import { chapter32StudyNotes as ch32Data } from '../../data/emtb/chapter32-study-notes';
import { chapter33StudyNotes as ch33Data } from '../../data/emtb/chapter33-study-notes';
import { chapter34StudyNotes as ch34Data } from '../../data/emtb/chapter34-study-notes';
import { chapter35StudyNotes as ch35Data } from '../../data/emtb/chapter35-study-notes';
import { chapter36StudyNotes as ch36Data } from '../../data/emtb/chapter36-study-notes';
import { chapter37StudyNotes as ch37Data } from '../../data/emtb/chapter37-study-notes';
import { chapter38StudyNotes as ch38Data } from '../../data/emtb/chapter38-study-notes';
import { chapter39StudyNotes as ch39Data } from '../../data/emtb/chapter39-study-notes';
import { chapter40StudyNotes as ch40Data } from '../../data/emtb/chapter40-study-notes';
import { chapter41StudyNotes as ch41Data } from '../../data/emtb/chapter41-study-notes';
import { chapter42StudyNotes as ch42Data } from '../../data/emtb/chapter42-study-notes';
import { chapter43StudyNotes as ch43Data } from '../../data/emtb/chapter43-study-notes';
import { chapter44StudyNotes as ch44Data } from '../../data/emtb/chapter44-study-notes';
import { chapter45StudyNotes as ch45Data } from '../../data/emtb/chapter45-study-notes';

interface StudySection {
  title: string;
  content: string[] | string;
  keyPoints?: string[];
  clinicalNote?: string;
  rememberThis?: string;
  clinicalPearls?: string[];
  mnemonics?: string[];
  commonPitfalls?: string[];
  decisionTrees?: string[];
  fieldApplications?: string[];
}

interface ChapterData {
  title: string;
  description: string;
  module: string;
  scope: 'EMT-B' | 'AEMT' | 'Paramedic';
  learningObjectives: string[];
  keyTerms: (string | { term: string; definition: string; })[];
  protocols: string[];
  sections: StudySection[];
  criticalConcepts?: string[];
  clinicalDecisionRules?: string[];
  commonMisconceptions?: string[];
  examTips?: string[];
  crossReferences?: string[];
  flashcards: any[];
  historicalOverview?: any;
  systemComponents?: any;
}

const ChapterReader: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const chapterNum = chapterId ? parseInt(chapterId) : null;
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  // Debug logging
  console.log('ChapterReader Debug:', { chapterId, chapterNum });

  // Map chapter numbers to data
  const chapterDataMap: { [key: number]: any } = {
    1: ch1Data, 2: ch2Data, 3: ch3Data, 4: ch4Data, 5: ch5Data, 6: ch6Data,
    7: ch7Data, 8: ch8Data, 9: ch9Data, 10: ch10Data, 11: ch11Data, 12: ch12Data,
    13: ch13Data, 14: ch14Data, 15: ch15Data, 16: ch16Data, 17: ch17Data, 18: ch18Data,
    19: ch19Data, 20: ch20Data, 21: ch21Data, 22: ch22Data, 23: ch23Data, 24: ch24Data,
    25: ch25Data, 26: ch26Data, 27: ch27Data, 28: ch28Data, 29: ch29Data, 30: ch30Data,
    31: ch31Data, 32: ch32Data, 33: ch33Data, 34: ch34Data, 35: ch35Data, 36: ch36Data,
    37: ch37Data, 38: ch38Data, 39: ch39Data, 40: ch40Data, 41: ch41Data, 42: ch42Data,
    43: ch43Data, 44: ch44Data, 45: ch45Data
  };

  const curriculumData = chapterNum ? getChapterById(chapterNum) : null;
  const studyData = chapterNum ? chapterDataMap[chapterNum] : null;

  console.log('Data lookup results:', { curriculumData, studyData, chapterNum });

  // Convert enhanced chapter data to display format
  const convertToChapterData = (studyData: any): ChapterData => {
    let convertedSections: StudySection[] = [];

    // Handle enhanced chapter structure
    if (studyData.systemComponents || studyData.historicalOverview || studyData.emergingTrends) {
      // Historical Overview Section
      if (studyData.historicalOverview) {
        const historyContent: string[] = [];
        if (studyData.historicalOverview.description) {
          historyContent.push(studyData.historicalOverview.description);
        }
        if (studyData.historicalOverview.militaryInfluence) {
          historyContent.push("**Military Influence**: " + studyData.historicalOverview.militaryInfluence.description);
          if (studyData.historicalOverview.militaryInfluence.keyDevelopments) {
            historyContent.push(...studyData.historicalOverview.militaryInfluence.keyDevelopments);
          }
        }
        if (studyData.historicalOverview.civilianDevelopment) {
          historyContent.push("**Civilian Development Timeline**:");
          Object.entries(studyData.historicalOverview.civilianDevelopment).forEach(([year, development]) => {
            historyContent.push(`**${year}**: ${development}`);
          });
        }
        convertedSections.push({
          title: studyData.historicalOverview.title || "History and Development",
          content: historyContent,
          clinicalPearls: [],
          mnemonics: [],
          fieldApplications: []
        });
      }

      // System Components Section
      if (studyData.systemComponents) {
        Object.entries(studyData.systemComponents).forEach(([key, component]: [string, any]) => {
          if (key !== 'title' && typeof component === 'object') {
            const content: string[] = [];
            if (component.description) content.push(component.description);
            if (component.elements) content.push(...component.elements);
            if (component.levels) {
              content.push("**Training Levels**:");
              Object.entries(component.levels).forEach(([level, details]: [string, any]) => {
                content.push(`**${level}**: ${details.scope} (Training: ${details.training})`);
              });
            }
            if (component.qualityIndicators) {
              content.push("**Quality Indicators**:");
              content.push(...component.qualityIndicators);
            }
            if (component.applications) content.push(...component.applications);
            if (component.goals) content.push(...component.goals);

            convertedSections.push({
              title: component.component || component.title || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
              content,
              clinicalPearls: [],
              mnemonics: [],
              fieldApplications: []
            });
          }
        });
      }
    }
    // Handle standard sections structure
    else if (studyData.sections) {
      convertedSections = studyData.sections.map((section: any) => {
        if (section.content) {
          let contentArray: string[] = [];
          if (Array.isArray(section.content)) {
            contentArray = section.content.map((item: any) => {
              if (typeof item === 'string') return item;
              if (item.subtitle && item.points) {
                return `${item.subtitle}: ${Array.isArray(item.points) ? item.points.join(', ') : item.points}`;
              }
              if (item.points) {
                return Array.isArray(item.points) ? item.points.join(', ') : item.points;
              }
              return String(item);
            });
          } else {
            contentArray = [String(section.content)];
          }

          return {
            title: section.title,
            content: contentArray,
            clinicalPearls: section.clinicalPearls || [],
            mnemonics: section.mnemonics || [],
            fieldApplications: section.fieldApplications || []
          };
        }

        return {
          title: section.title,
          content: [section.description || 'Enhanced content available'],
          clinicalPearls: [],
          mnemonics: [],
          fieldApplications: []
        };
      });
    } else {
      convertedSections = [{
        title: "Content",
        content: ["No enhanced content structure found"],
        clinicalPearls: [],
        mnemonics: [],
        fieldApplications: []
      }];
    }

    return {
      title: studyData.title || studyData.chapterTitle || "Enhanced Chapter",
      description: studyData.description || `Comprehensive study of ${studyData.title || 'this topic'}`,
      module: studyData.module || studyData.moduleTitle || "Enhanced EMS Training",
      scope: "EMT-B" as const,
      protocols: studyData.protocols || [],
      learningObjectives: studyData.learningObjectives || studyData.objectives || [],
      keyTerms: studyData.keyTerms ? (
        Array.isArray(studyData.keyTerms)
          ? studyData.keyTerms.map((item: any) =>
              typeof item === 'object' && item.term && item.definition
                ? { term: item.term, definition: item.definition }
                : { term: String(item), definition: '' }
            )
          : Object.entries(studyData.keyTerms).map(([term, definition]) => ({
              term,
              definition: String(definition)
            }))
      ) : [],
      sections: convertedSections,
      criticalConcepts: studyData.clinicalPearls || studyData.criticalConcepts || [],
      flashcards: [],
      crossReferences: studyData.crossReferences || [],
      historicalOverview: studyData.historicalOverview,
      systemComponents: studyData.systemComponents
    };
  };

  const chapterData = useMemo(() => {
    if (!studyData) return null;
    return convertToChapterData(studyData);
  }, [studyData]);

  if (!chapterData || !curriculumData) {
    return (
      <TacticalLayout>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto" />
            <h1 className="text-2xl font-bold text-slate-200">Chapter Not Found</h1>
            <div className="text-slate-400 space-y-2">
              <p>The requested chapter could not be located.</p>
              <div className="bg-slate-800 p-4 rounded text-left text-sm">
                <p><strong>Debug Info:</strong></p>
                <p>URL Parameter: {chapterId}</p>
                <p>Parsed Chapter ID: {chapterNum}</p>
                <p>Curriculum Data Found: {curriculumData ? 'Yes' : 'No'}</p>
                <p>Study Data Found: {studyData ? 'Yes' : 'No'}</p>
              </div>
            </div>
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

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <TacticalLayout>
      <div className="min-h-screen bg-slate-900">
        {/* Navigation Header */}
        <div className="border-b border-slate-700 bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-6 py-4">
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
                  to={`/flashcards?chapter=${chapterNum}`}
                  className="flex items-center space-x-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-200 hover:text-amber-400 transition-colors"
                >
                  <Brain className="w-4 h-4" />
                  <span className="text-sm">Flashcards</span>
                </Link>

                <Link
                  to={`/enhanced-quiz?chapter=${chapterNum}`}
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
        <div className="max-w-6xl mx-auto px-6 py-8">
          <article className="space-y-8">
            {/* Chapter Header */}
            <header className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span className="px-2 py-1 bg-slate-800 border border-slate-600 rounded text-xs">
                  {chapterData.module}
                </span>
                <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-xs text-amber-300">
                  Chapter {chapterNum}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-amber-400 font-mono uppercase tracking-wider">
                {chapterData.title}
              </h1>

              <p className="text-slate-300 leading-relaxed text-lg">
                {chapterData.description}
              </p>

              <div className="w-16 h-1 bg-amber-500/50 rounded"></div>
            </header>

            {/* Learning Objectives */}
            {chapterData.learningObjectives && chapterData.learningObjectives.length > 0 && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-amber-400 mb-4 font-mono">
                  🎯 LEARNING OBJECTIVES
                </h2>
                <ul className="space-y-2 text-slate-300">
                  {chapterData.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Terms */}
            {chapterData.keyTerms && chapterData.keyTerms.length > 0 && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-amber-400 mb-4 font-mono">
                  📚 KEY TERMS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chapterData.keyTerms.map((termItem, index) => {
                    const term = typeof termItem === 'string' ? termItem : termItem.term;
                    const definition = typeof termItem === 'string' ? '' : termItem.definition;
                    return (
                      <div key={index} className="bg-slate-700/50 p-3 rounded border border-slate-600">
                        <div className="font-medium text-amber-300 mb-1">{term}</div>
                        {definition && <div className="text-sm text-slate-300">{definition}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Study Sections */}
            <div className="space-y-6">
              {chapterData.sections.map((section, index) => (
                <div key={index} className="bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-700/30 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-amber-400 font-mono">
                      {section.title}
                    </h3>
                    {expandedSections.has(index) ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  {expandedSections.has(index) && (
                    <div className="px-6 pb-6 space-y-4">
                      {/* Content */}
                      <div className="text-slate-200 leading-relaxed space-y-4">
                        {Array.isArray(section.content) ? (
                          section.content.map((paragraph, pIndex) => (
                            <div key={pIndex} className="text-slate-300">
                              {paragraph.includes('**') ? (
                                <div dangerouslySetInnerHTML={{
                                  __html: paragraph
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-300">$1</strong>')
                                    .replace(/\n/g, '<br>')
                                }} />
                              ) : (
                                <p>{paragraph}</p>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-slate-300">
                            {section.content.includes('**') ? (
                              <div dangerouslySetInnerHTML={{
                                __html: section.content
                                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-300">$1</strong>')
                                  .replace(/\n/g, '<br>')
                              }} />
                            ) : (
                              <p>{section.content}</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Clinical Pearls */}
                      {section.clinicalPearls && section.clinicalPearls.length > 0 && (
                        <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4">
                          <h4 className="font-semibold text-blue-300 mb-2">💡 Clinical Pearls</h4>
                          <ul className="space-y-1 text-sm text-blue-200">
                            {section.clinicalPearls.map((pearl, pearlIndex) => (
                              <li key={pearlIndex}>• {pearl}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Mnemonics */}
                      {section.mnemonics && section.mnemonics.length > 0 && (
                        <div className="bg-green-500/10 border-l-4 border-green-500 p-4">
                          <h4 className="font-semibold text-green-300 mb-2">🧠 Mnemonics</h4>
                          <ul className="space-y-1 text-sm text-green-200">
                            {section.mnemonics.map((mnemonic, mnemonicIndex) => (
                              <li key={mnemonicIndex}>• {mnemonic}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Field Applications */}
                      {section.fieldApplications && section.fieldApplications.length > 0 && (
                        <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4">
                          <h4 className="font-semibold text-purple-300 mb-2">🚑 Field Applications</h4>
                          <ul className="space-y-1 text-sm text-purple-200">
                            {section.fieldApplications.map((application, appIndex) => (
                              <li key={appIndex}>• {application}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Critical Concepts */}
            {chapterData.criticalConcepts && chapterData.criticalConcepts.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-red-400 mb-4 font-mono">
                  ⚠️ CRITICAL CONCEPTS
                </h2>
                <ul className="space-y-2 text-red-200">
                  {chapterData.criticalConcepts.map((concept, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                    to={`/flashcards?chapter=${chapterNum}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-200 hover:text-amber-400 transition-colors"
                  >
                    <Brain className="w-4 h-4" />
                    <span>Study Flashcards</span>
                  </Link>

                  <Link
                    to={`/enhanced-quiz?chapter=${chapterNum}`}
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
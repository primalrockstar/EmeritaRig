import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, BookOpen, AlertCircle, Heart, Shield, Stethoscope, ChevronDown, ChevronUp, Download, FileText, Activity, Zap } from 'lucide-react';
import MedicalDisclaimer from '../MedicalDisclaimer';
import { medicationsData } from '../../data/medications';
import { emsProtocols } from '../../data/ems-protocols';
import { emergencyScenarios } from '../../data/emergency-scenarios';
// import { chapter30StudyNotes as chapter30Data } from '../../data/emtb/chapter30-study-notes';
// import { chapter31StudyNotes as chapter31Data } from '../../data/emtb/chapter31-study-notes';

// Module 1: Foundations of EMS Practice (Chapters 1-4)
import { chapter1StudyNotes as ch1Data } from '../../data/emtb/chapter1-study-notes';
import { chapter1Flashcards as ch1Flash } from '../../data/emtb/chapter1-flashcards';
import { chapter2StudyNotes as ch2Data } from '../../data/emtb/chapter2-study-notes';
import { chapter2Flashcards as ch2Flash } from '../../data/emtb/chapter2-flashcards';
import { chapter3StudyNotes as ch3Data } from '../../data/emtb/chapter3-study-notes';
import { chapter3Flashcards as ch3Flash } from '../../data/emtb/chapter3-flashcards';
import { chapter4StudyNotes as ch4Data } from '../../data/emtb/chapter4-study-notes';
import { chapter4Flashcards as ch4Flash } from '../../data/emtb/chapter4-flashcards';

// Module 2: Clinical Foundations (Chapters 5-9)
import { chapter5StudyNotes as ch5Data } from '../../data/emtb/chapter5-study-notes';
import { chapter5Flashcards as ch5Flash } from '../../data/emtb/chapter5-flashcards';
import { chapter6StudyNotes as ch6Data } from '../../data/emtb/chapter6-study-notes';
import { chapter6Flashcards as ch6Flash } from '../../data/emtb/chapter6-flashcards';
import { chapter7StudyNotes as ch7Data } from '../../data/emtb/chapter7-study-notes';
import { chapter7Flashcards as ch7Flash } from '../../data/emtb/chapter7-flashcards';
import { chapter8StudyNotes as ch8Data } from '../../data/emtb/chapter8-study-notes';
import { chapter8Flashcards as ch8Flash } from '../../data/emtb/chapter8-flashcards';
import { chapter9StudyNotes as ch9Data } from '../../data/emtb/chapter9-study-notes';
import { chapter9Flashcards as ch9Flash } from '../../data/emtb/chapter9-flashcards';

// Module 3: Patient Assessment Mastery (Chapter 10)
import { chapter10StudyNotes as ch10Data } from '../../data/emtb/chapter10-study-notes';
import { chapter10Flashcards as ch10Flash } from '../../data/emtb/chapter10-flashcards';

// Module 4: Airway & Ventilatory Management (Chapter 11)
import { chapter11StudyNotes as ch11Data } from '../../data/emtb/chapter11-study-notes';
import { chapter11Flashcards as ch11Flash } from '../../data/emtb/chapter11-flashcards';

// Module 5: Pharmacological Principles (Chapter 12)
import { chapter12StudyNotes as ch12Data } from '../../data/emtb/chapter12-study-notes';
import { chapter12Flashcards as ch12Flash } from '../../data/emtb/chapter12-flashcards';

// Module 6: Shock & Circulatory Emergencies (Chapters 13-14)
import { chapter13StudyNotes as ch13Data } from '../../data/emtb/chapter13-study-notes';
import { chapter13Flashcards as ch13Flash } from '../../data/emtb/chapter13-flashcards';
import { chapter14StudyNotes as ch14Data } from '../../data/emtb/chapter14-study-notes';
import { chapter14Flashcards as ch14Flash } from '../../data/emtb/chapter14-flashcards';

// Module 7: Medical Emergency Response (Chapters 15-17)
import { chapter15StudyNotes as ch15Data } from '../../data/emtb/chapter15-study-notes';
import { chapter16StudyNotes as ch16Data } from '../../data/emtb/chapter16-study-notes';
import { chapter17StudyNotes as ch17Data } from '../../data/emtb/chapter17-study-notes';

// Module 8: Neurological & Systemic Emergencies (Chapters 18-20)
import { chapter18StudyNotes as ch18Data } from '../../data/emtb/chapter18-study-notes';
import { chapter19StudyNotes as ch19Data } from '../../data/emtb/chapter19-study-notes';
import { chapter20StudyNotes as ch20Data } from '../../data/emtb/chapter20-study-notes';

// Module 9: Specialized Emergency Care (Chapters 21-24)
import { chapter21StudyNotes as ch21Data } from '../../data/emtb/chapter21-study-notes';
import { chapter22StudyNotes as ch22Data } from '../../data/emtb/chapter22-study-notes';
import { chapter23StudyNotes as ch23Data } from '../../data/emtb/chapter23-study-notes';
import { chapter24StudyNotes as ch24Data } from '../../data/emtb/chapter24-study-notes';

// Module 10: Trauma Response Principles (Chapters 25-27)
import { chapter25StudyNotes as ch25Data } from '../../data/emtb/chapter25-study-notes';
import { chapter26StudyNotes as ch26Data } from '../../data/emtb/chapter26-study-notes';
import { chapter27StudyNotes as ch27Data } from '../../data/emtb/chapter27-study-notes';

// Module 11: Traumatic Injury Management (Chapters 28-30)
import { chapter28StudyNotes as ch28Data } from '../../data/emtb/chapter28-study-notes';
import { chapter29StudyNotes as ch29Data } from '../../data/emtb/chapter29-study-notes';
import { chapter30StudyNotes as ch30Data } from '../../data/emtb/chapter30-study-notes';

// Module 12: Environmental & Musculoskeletal Emergencies (Chapters 31-33)
import { chapter31StudyNotes as ch31Data } from '../../data/emtb/chapter31-study-notes';
import { chapter32StudyNotes as ch32Data } from '../../data/emtb/chapter32-study-notes';
import { chapter33StudyNotes as ch33Data } from '../../data/emtb/chapter33-study-notes';

// Module 13: Special Patient Populations (Chapters 34-37)
import { chapter34StudyNotes as ch34Data } from '../../data/emtb/chapter34-study-notes';
import { chapter35StudyNotes as ch35Data } from '../../data/emtb/chapter35-study-notes';
import { chapter36StudyNotes as ch36Data } from '../../data/emtb/chapter36-study-notes';
import { chapter37StudyNotes as ch37Data } from '../../data/emtb/chapter37-study-notes';

// Module 14: EMS Operations & Disaster Response (Chapters 38-41)
import { chapter38StudyNotes as ch38Data } from '../../data/emtb/chapter38-study-notes';
import { chapter39StudyNotes as ch39Data } from '../../data/emtb/chapter39-study-notes';
import { chapter40StudyNotes as ch40Data } from '../../data/emtb/chapter40-study-notes';
import { chapter41StudyNotes as ch41Data } from '../../data/emtb/chapter41-study-notes';

// BONUS Advanced Content (Chapters 42-45)
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

interface Flashcard {
  front: string;
  back: string;
  category?: 'definition' | 'protocol' | 'clinical' | 'scenario';
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
  flashcards: Flashcard[];
  historicalOverview?: {
    title: string;
    militaryInfluence?: {
      description: string;
      keyDevelopments: string[];
    };
    civilianDevelopment?: Record<string, string>;
  };
  systemComponents?: Record<string, any>;
}

interface EMTBStudyNotesProps {
  initialChapter?: string;
}

const EMTBStudyNotes: React.FC<EMTBStudyNotesProps> = ({ initialChapter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeChapter, setActiveChapter] = useState(initialChapter || 'chapter1');
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveChapter(initialChapter || 'chapter1');
  }, [initialChapter]);

  // Helper function to convert enhanced chapter data to ChapterData format
  const convertToChapterData = (studyData: any, flashcardData: any[] = []): ChapterData => {
    let convertedSections: StudySection[] = [];

    console.log('=== CONVERSION DEBUG ===');
    console.log('Chapter Title:', studyData.title);
    console.log('Has systemComponents:', !!studyData.systemComponents);
    console.log('Has historicalOverview:', !!studyData.historicalOverview);
    console.log('Has emergingTrends:', !!studyData.emergingTrends);
    console.log('Has sections:', !!studyData.sections);

    // Handle enhanced chapter structure (like Chapter 1)
    if (studyData.systemComponents || studyData.historicalOverview || studyData.emergingTrends || studyData.regulatoryFramework || studyData.serviceModels) {
      console.log('✅ USING ENHANCED CONVERSION LOGIC');
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
          title: studyData.historicalOverview.title || "History and Development of EMS",
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
            if (component.onlineDirection) {
              content.push("**Online Direction**: " + component.onlineDirection.definition);
              if (component.onlineDirection.methods) content.push("Methods: " + component.onlineDirection.methods.join(", "));
              if (component.onlineDirection.benefits) content.push("Benefits: " + component.onlineDirection.benefits.join(", "));
            }
            if (component.offlineDirection) {
              content.push("**Offline Direction**: " + component.offlineDirection.definition);
              if (component.offlineDirection.components) content.push("Components: " + component.offlineDirection.components.join(", "));
            }
            if (component.responsibilities) content.push(...component.responsibilities);
            if (component.variations) content.push(...component.variations);
            
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

      // Regulatory Framework Section
      if (studyData.regulatoryFramework) {
        Object.entries(studyData.regulatoryFramework).forEach(([key, section]: [string, any]) => {
          if (key !== 'title' && typeof section === 'object') {
            const content: string[] = [];
            if (section.description) content.push(section.description);
            if (section.agencies) {
              content.push("**Key Agencies**:");
              Object.entries(section.agencies).forEach(([agency, description]) => {
                content.push(`**${agency}**: ${description}`);
              });
            }
            if (section.responsibilities) content.push(...section.responsibilities);
            if (section.variations) content.push(...section.variations);
            
            convertedSections.push({
              title: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
              content,
              clinicalPearls: [],
              mnemonics: [],
              fieldApplications: []
            });
          }
        });
      }

      // Service Models Section
      if (studyData.serviceModels) {
        Object.entries(studyData.serviceModels).forEach(([key, model]: [string, any]) => {
          if (key !== 'title' && typeof model === 'object') {
            const content: string[] = [];
            if (model.description) content.push(model.description);
            if (model.advantages) {
              content.push("**Advantages**:");
              content.push(...model.advantages);
            }
            if (model.challenges) {
              content.push("**Challenges**:");
              content.push(...model.challenges);
            }
            if (typeof model === 'string') content.push(model);
            
            convertedSections.push({
              title: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
              content,
              clinicalPearls: [],
              mnemonics: [],
              fieldApplications: []
            });
          }
        });
      }

      // Emerging Trends / Future Directions Section
      if (studyData.emergingTrends || studyData.futureDirections) {
        const trendsData = studyData.emergingTrends || studyData.futureDirections;
        const futureContent: string[] = [];
        Object.entries(trendsData).forEach(([key, section]: [string, any]) => {
          if (key !== 'title' && typeof section === 'object') {
            futureContent.push(`**${section.description || key}**`);
            if (section.trends) futureContent.push(...section.trends);
            if (section.applications) futureContent.push(...section.applications);
            if (section.goals) futureContent.push(...section.goals);
          } else if (Array.isArray(section)) {
            futureContent.push(`**${key.replace(/([A-Z])/g, ' $1')}**:`);
            futureContent.push(...section);
          }
        });
        convertedSections.push({
          title: trendsData.title || "Future Directions in EMS",
          content: futureContent,
          clinicalPearls: [],
          mnemonics: [],
          fieldApplications: []
        });
      }
    }
    // Handle standard sections structure
    else if (studyData.sections) {
      console.log('⚠️ USING STANDARD SECTIONS LOGIC');
      convertedSections = studyData.sections.map((section: any) => {
        if (section.content) {
          // Handle content that might be arrays of objects or strings
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
      console.log('❌ NO CONTENT STRUCTURE FOUND');
      convertedSections = [{
        title: "Content",
        content: ["No enhanced content structure found"],
        clinicalPearls: [],
        mnemonics: [],
        fieldApplications: []
      }];
    }

    console.log('Final sections count:', convertedSections.length);
    console.log('=== END DEBUG ===');

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
      flashcards: flashcardData.map((card: any) => ({
        front: card.question,
        back: card.answer,
        category: card.type || card.category || 'definition'
      })) || [],
      crossReferences: studyData.crossReferences || [],
      historicalOverview: studyData.historicalOverview,
      systemComponents: studyData.systemComponents
    };
  };

  // Close download menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset flashcard when chapter changes
  useEffect(() => {
    setCurrentFlashcard(0);
    setIsFlipped(false);
  }, [activeChapter]);

  // Module 1: Foundations of EMS Practice - Enhanced Chapters  
  const chapter1StudyNotes: ChapterData = convertToChapterData(ch1Data, ch1Flash);
  
  const chapter2StudyNotes: ChapterData = convertToChapterData(ch2Data, ch2Flash);
  const chapter3StudyNotes: ChapterData = convertToChapterData(ch3Data, ch3Flash);
  const chapter4StudyNotes: ChapterData = convertToChapterData(ch4Data, ch4Flash);

  // Module 2: Medical Foundations & Assessment - Enhanced Chapters
  const chapter5StudyNotes: ChapterData = convertToChapterData(ch5Data, ch5Flash);
  const chapter6StudyNotes: ChapterData = convertToChapterData(ch6Data, ch6Flash);
  const chapter7StudyNotes: ChapterData = convertToChapterData(ch7Data, ch7Flash);
  const chapter8StudyNotes: ChapterData = convertToChapterData(ch8Data, ch8Flash);

  // Module 3: Team Communication & Patient Assessment - Enhanced Chapters
  const chapter9StudyNotes: ChapterData = convertToChapterData(ch9Data, ch9Flash);
  const chapter10StudyNotes: ChapterData = convertToChapterData(ch10Data, ch10Flash);
  const chapter11StudyNotes: ChapterData = convertToChapterData(ch11Data, ch11Flash);
  const chapter12StudyNotes: ChapterData = convertToChapterData(ch12Data, ch12Flash);

  // Module 4: Medical Emergencies & Critical Care - Enhanced Chapters
  const chapter13StudyNotes: ChapterData = convertToChapterData(ch13Data, ch13Flash);
  const chapter14StudyNotes: ChapterData = convertToChapterData(ch14Data, ch14Flash);
  const chapter15StudyNotes: ChapterData = convertToChapterData(ch15Data, []);
  const chapter16StudyNotes: ChapterData = convertToChapterData(ch16Data, []);

  // Module 5: Cardiovascular & Respiratory Care - Enhanced Chapters
  const chapter17StudyNotes: ChapterData = convertToChapterData(ch17Data, []);
  const chapter18StudyNotes: ChapterData = convertToChapterData(ch18Data, []);
  const chapter19StudyNotes: ChapterData = convertToChapterData(ch19Data, []);
  const chapter20StudyNotes: ChapterData = convertToChapterData(ch20Data, []);

  // Module 6: Pediatric & Special Population Care - Enhanced Chapters
  const chapter21StudyNotes: ChapterData = convertToChapterData(ch21Data, []);
  const chapter22StudyNotes: ChapterData = convertToChapterData(ch22Data, []);
  const chapter23StudyNotes: ChapterData = convertToChapterData(ch23Data, []);
  const chapter24StudyNotes: ChapterData = convertToChapterData(ch24Data, []);
  const chapter25StudyNotes: ChapterData = convertToChapterData(ch25Data, []);

  // Module 7: Trauma & Emergency Care - Enhanced Chapters
  const chapter26StudyNotes: ChapterData = convertToChapterData(ch26Data, []);
  const chapter27StudyNotes: ChapterData = convertToChapterData(ch27Data, []);
  const chapter28StudyNotes: ChapterData = convertToChapterData(ch28Data, []);
  const chapter29StudyNotes: ChapterData = convertToChapterData(ch29Data, []);
  const chapter30StudyNotes: ChapterData = convertToChapterData(ch30Data, []);

  // Module 8: Neurological & Systemic Emergencies - Enhanced Chapters
  const chapter31StudyNotes: ChapterData = convertToChapterData(ch31Data, []);
  const chapter32StudyNotes: ChapterData = convertToChapterData(ch32Data, []);
  const chapter33StudyNotes: ChapterData = convertToChapterData(ch33Data, []);
  const chapter34StudyNotes: ChapterData = convertToChapterData(ch34Data, []);
  const chapter35StudyNotes: ChapterData = convertToChapterData(ch35Data, []);

  // Module 9: Specialized Emergency Care - Enhanced Chapters
  const chapter36StudyNotes: ChapterData = convertToChapterData(ch36Data, []);
  const chapter37StudyNotes: ChapterData = convertToChapterData(ch37Data, []);
  const chapter38StudyNotes: ChapterData = convertToChapterData(ch38Data, []);
  const chapter39StudyNotes: ChapterData = convertToChapterData(ch39Data, []);
  const chapter40StudyNotes: ChapterData = convertToChapterData(ch40Data, []);

  // Module 14: EMS Operations & Disaster Response - Enhanced Chapter
  const chapter41StudyNotes: ChapterData = convertToChapterData(ch41Data, []);

  // BONUS Module 1: Advanced Content - Enhanced Chapters
  const chapter42StudyNotes: ChapterData = convertToChapterData(ch42Data, []);
  const chapter43StudyNotes: ChapterData = convertToChapterData(ch43Data, []);
  const chapter44StudyNotes: ChapterData = convertToChapterData(ch44Data, []);
  const chapter45StudyNotes: ChapterData = convertToChapterData(ch45Data, []);

  // BONUS Chapters (manually defined for specialized content)
  const bonusStudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 1: Cellular Structure & Function 🧬",
    description: "Advanced cellular biology foundations connecting microscopic processes to EMT-B clinical assessment and interventions",
    module: "Body Systems",
    scope: "EMT-B",
    protocols: [
      "Cellular Biology",
      "Basic Life Processes",
      "Membrane Transport",
      "Cellular Metabolism",
      "Cellular Injury Response"
    ],
    learningObjectives: [
      "Differentiate prokaryotic and eukaryotic cell structures with emphasis on human organelles",
      "Explain membrane transport mechanisms and their relevance to fluid and electrolyte balance",
      "Describe cellular respiration pathways and ATP production under aerobic and anaerobic conditions",
      "Relate cellular communication and signal transduction to endocrine and nervous system responses",
      "Recognize cell injury, adaptation, and death patterns that manifest in EMT field presentations"
    ],
    keyTerms: [
      { term: "Phospholipid Bilayer", definition: "Double-layered membrane structure forming a selectively permeable barrier" },
      { term: "Organelle", definition: "Specialized intracellular structure performing dedicated cellular functions" },
      { term: "Homeostasis", definition: "Dynamic equilibrium maintained through cellular feedback mechanisms" },
      { term: "ATP", definition: "Adenosine triphosphate, primary cellular energy currency generated via respiration" },
      { term: "Signal Transduction", definition: "Process of converting extracellular signals into cellular responses" },
      { term: "Apoptosis", definition: "Programmed cell death maintaining tissue health and preventing inflammation" },
      { term: "Necrosis", definition: "Unregulated cell death resulting from injury, often provoking inflammation" },
      { term: "Oxidative Stress", definition: "Cellular damage caused by imbalance between free radicals and antioxidants" },
      { term: "Ion Pump", definition: "Membrane protein actively transporting ions against concentration gradients using ATP" },
      { term: "Anaerobic Metabolism", definition: "Energy production without oxygen, yielding lactic acid as by-product" }
    ],
    criticalConcepts: [
      "All tissue-level patient findings originate from cellular processes",
      "Membrane transport dysregulation explains fluid shifts seen in shock and edema",
      "ATP depletion during hypoxia drives transition to anaerobic metabolism and acidosis",
      "Cellular injury patterns (reversible vs irreversible) guide expectations for organ recovery"
    ],
    commonMisconceptions: [
      "Cells only use oxygen when exercising – in reality, aerobic metabolism is constant",
      "All cell death is the same – apoptosis is orderly whereas necrosis triggers inflammation",
      "Diffusion alone maintains electrolyte balance – active transport is essential to gradients"
    ],
    examTips: [
      "Connect cellular metabolism to shock pathophysiology questions",
      "Remember sodium-potassium pump function when evaluating fluid shifts",
      "Associate mitochondrial failure with causes of sudden energy collapse in critical illness"
    ],
    sections: [
      {
        title: "Cell Architecture and Organelles",
        content: [
          "Cell membrane composed of phospholipid bilayer with embedded proteins regulates exchanges and cell recognition",
          "Nucleus houses DNA, directs protein synthesis, and coordinates cell division",
          "Mitochondria conduct aerobic respiration generating ATP; abundant in high-energy tissues like myocardium",
          "Rough endoplasmic reticulum synthesizes proteins; smooth endoplasmic reticulum manages lipids and detoxification",
          "Golgi apparatus modifies, packages, and ships proteins and lipids for cellular use or secretion",
          "Lysosomes and peroxisomes contain enzymes for intracellular digestion and reactive oxygen detoxification"
        ],
        clinicalPearls: [
          "Hypoxic injuries initially impair mitochondria leading to decreased ATP and cellular swelling",
          "Certain toxins (e.g., cyanide) directly inhibit mitochondrial electron transport chain",
          "Lysosomal rupture releases enzymes contributing to irreversible cell damage"
        ]
      },
      {
        title: "Membrane Transport and Fluid Balance",
        content: [
          "Passive transport includes diffusion, osmosis, and facilitated diffusion without ATP expenditure",
          "Active transport (e.g., sodium-potassium pump) maintains ionic gradients critical for neuron and muscle function",
          "Endocytosis and exocytosis move large molecules and particulates across the membrane",
          "Aquaporins enable rapid water movement influencing cellular hydration and edema formation",
          "Tonicity differences (hypotonic, hypertonic, isotonic) determine fluid shifts across membranes"
        ],
        clinicalPearls: [
          "Hypertonic solutions draw water out of cells, used cautiously to reduce intracranial pressure",
          "Failure of sodium-potassium pump during hypoxia causes intracellular sodium accumulation and swelling",
          "Electrolyte disturbances (e.g., hyponatremia) alter neuronal cell volume producing neurological symptoms"
        ]
      },
      {
        title: "Cellular Metabolism and Energy Production",
        content: [
          "Aerobic respiration in mitochondria yields up to 36 ATP per glucose via Krebs cycle and oxidative phosphorylation",
          "Anaerobic glycolysis produces 2 ATP per glucose with lactic acid accumulation leading to metabolic acidosis",
          "ATP fuels muscle contraction, active transport, and biosynthesis; depletion impairs vital functions",
          "Electron transport chain requires oxygen as final electron acceptor; interruption halts ATP production",
          "Beta-oxidation of fatty acids provides sustained energy during fasting or prolonged exertion"
        ],
        clinicalPearls: [
          "Shock states force cells into anaerobic metabolism evidenced by rising lactic acid levels",
          "Seizures dramatically increase metabolic demand leading to rapid glucose depletion",
          "Hypothermia slows enzymatic activity, reducing overall metabolic rate"
        ]
      },
      {
        title: "Cell Communication and Adaptation",
        content: [
          "Receptors on cell membranes bind hormones and neurotransmitters triggering intracellular cascades",
          "Second messengers (cAMP, IP3, calcium) amplify signals altering gene expression or metabolic activity",
          "Cells adapt through hypertrophy, hyperplasia, atrophy, dysplasia, and metaplasia in response to stress",
          "Gap junctions permit electrical and chemical communication between adjacent cells (e.g., cardiac muscle)",
          "Inflammatory mediators released by injured cells recruit immune response and promote healing"
        ],
        clinicalPearls: [
          "Beta-agonist medications mimic sympathetic signaling to smooth muscle receptors reducing bronchospasm",
          "Chronic hypertension induces cardiac muscle hypertrophy altering electrical conduction",
          "Metaplasia in airway epithelium of smokers increases cancer risk due to chronic irritation"
        ]
      },
      {
        title: "Cell Injury, Death, and Repair",
        content: [
          "Reversible injury features cellular swelling and fatty change when stress is removed promptly",
          "Irreversible injury leads to membrane rupture, enzyme leakage, and necrosis",
          "Apoptosis removes damaged cells without inflammation, essential in development and immune regulation",
          "Ischemia-reperfusion injury generates reactive oxygen species causing additional damage",
          "Stem cells and regeneration capacity vary by tissue; CNS neurons regenerate poorly compared to epithelial cells"
        ],
        clinicalPearls: [
          "Serum biomarkers (troponin, AST/ALT) represent enzymes released from necrotic cells",
          "Compartment syndrome exemplifies ischemic injury progressing to necrosis without pressure relief",
          "Rapid cooling in cardiac arrest may reduce reperfusion injury and improve outcomes"
        ]
      }
    ],
    flashcards: [
      { front: "What organelle is responsible for aerobic ATP production?", back: "Mitochondria via the Krebs cycle and oxidative phosphorylation", category: "definition" },
      { front: "How does the sodium-potassium pump maintain cellular homeostasis?", back: "Uses ATP to move 3 Na⁺ out and 2 K⁺ into the cell, preserving gradients", category: "clinical" },
      { front: "What happens during anaerobic metabolism?", back: "Glucose converts to lactic acid yielding 2 ATP when oxygen is limited", category: "definition" },
      { front: "Which cellular adaptation describes increased cell size?", back: "Hypertrophy", category: "definition" },
      { front: "Why does ischemia lead to cell swelling?", back: "ATP depletion stops ion pumps causing sodium and water influx", category: "clinical" },
      { front: "What is apoptosis?", back: "Programmed cell death removing damaged cells without inflammation", category: "definition" },
      { front: "Which messenger amplifies hormone signals inside cells?", back: "Second messengers such as cyclic AMP (cAMP)", category: "definition" },
      { front: "How can lactic acid levels guide shock management?", back: "Elevated levels indicate inadequate perfusion and anaerobic metabolism", category: "clinical" },
      { front: "What cellular change is seen in chronic smokers' airway lining?", back: "Metaplasia replacing ciliated columnar epithelium with stratified squamous cells", category: "clinical" },
      { front: "Which tissues have high regenerative capacity?", back: "Epithelial tissues and liver regenerate effectively compared to cardiac muscle or neurons", category: "definition" }
    ]
  };

  /*const chapter3StudyNotes: ChapterData = {
    title: "Chapter 3: EMS Law & Ethical Practice",
    description: "Legal foundations, ethical principles, and professional responsibilities in emergency medical services practice",
    module: "1",
    scope: "EMT-B",
    protocols: ["Legal Authority", "Consent Procedures", "Confidentiality", "Documentation Requirements", "Ethical Decision Making", "Professional Standards"],
    learningObjectives: [
      "Apply legal principles governing EMS practice and scope of practice limitations",
      "Obtain proper consent for treatment including implied, expressed, and informed consent",
      "Implement appropriate procedures for refusal of care and against medical advice situations",
      "Maintain patient confidentiality and apply HIPAA regulations in field operations",
      "Demonstrate ethical decision-making processes in complex patient scenarios",
      "Understand mandatory reporting requirements and legal documentation standards"
    ],
    keyTerms: [
      "Scope of Practice",
      "Standard of Care",
      "Duty to Act",
      "Negligence",
      "Malpractice",
      "Expressed Consent",
      "Implied Consent",
      "Informed Consent",
      "Minor Consent",
      "Refusal of Care",
      "Against Medical Advice",
      "Abandonment",
      "Assault",
      "Battery",
      "False Imprisonment",
      "Confidentiality",
      "HIPAA",
      "Protected Health Information",
      "Mandatory Reporting",
      "Advanced Directive",
      "DNR Order",
      "Living Will",
      "Healthcare Proxy",
      "Emancipated Minor",
      "Good Samaritan Laws",
      "Governmental Immunity",
      "Ethical Dilemma",
      "Beneficence",
      "Non-maleficence",
      "Autonomy",
      "Justice",
      "Veracity",
      "Documentation",
      "Legal Discovery"
    ],
    sections: [
      {
        title: "Legal Foundation and Scope of Practice",
        content: [
          "EMS providers operate under specific legal authority granted by state legislation and regulations",
          "Scope of practice defines the procedures, medications, and interventions legally permitted for each certification level",
          "Standard of care represents the level of care expected from similarly trained providers in similar circumstances",
          "Duty to act exists when EMS providers are on duty or have contractual obligations to respond",
          "Negligence requires four elements: duty, breach of duty, causation, and damages",
          "Malpractice represents professional negligence by healthcare providers falling below standard of care",
          "Good Samaritan laws provide limited liability protection for off-duty emergency care",
          "Governmental immunity may protect public EMS services from certain civil lawsuits"
        ],
        clinicalPearls: [
          "Scope of practice violations account for 25% of EMS-related lawsuits",
          "Standard of care is determined by local protocols, training standards, and expert testimony",
          "Duty to act extends beyond transport refusals to include scene safety and appropriate referrals",
          "Negligence claims increase by 40% when documentation is incomplete or inaccurate"
        ],
        mnemonics: [
          "SCOPE: Standards define, Care protocols, Operations authorized, Practice limitations, Education required",
          "NEGLIGENCE: Need duty, Error in care, Grounds for causation, Legal damages, Investigation required, Guidelines violated, Evidence documented, No excuse defense, Court proceedings, Evaluation by peers"
        ],
        decisionTrees: [
          "Legal Authority → On Duty → Scope of Practice → Standard Protocols → Document Actions",
          "Potential Negligence → Assess Duty → Review Actions → Document Thoroughly → Consult Medical Direction"
        ],
        fieldApplications: [
          "Always verify scope of practice before performing advanced interventions",
          "Follow local protocols and medical direction for complex situations",
          "Document rationale for deviations from standard procedures",
          "Consult with medical control when scope of practice questions arise"
        ]
      },
      {
        title: "Consent and Patient Rights",
        content: [
          "Expressed consent involves verbal or written agreement to treatment after explanation of risks and benefits",
          "Implied consent assumes unconscious or incapacitated patients would consent to life-saving treatment",
          "Informed consent requires explanation of condition, proposed treatment, risks, benefits, and alternatives",
          "Minor consent requires parent or guardian permission except for emancipated minors or emergency situations",
          "Refusal of care must be by competent adult after explanation of risks and consequences",
          "Against medical advice (AMA) situations require thorough documentation and risk explanation",
          "Mental capacity assessment determines patient's ability to make informed healthcare decisions",
          "Advanced directives including DNR orders must be honored when properly executed and presented"
        ],
        clinicalPearls: [
          "Consent issues are involved in 30% of EMS legal disputes",
          "Implied consent applies to all life-threatening emergencies regardless of patient response",
          "Refusal documentation reduces liability by 60% when properly completed",
          "Mental capacity can fluctuate and must be assessed for each treatment decision"
        ],
        mnemonics: [
          "CONSENT: Competent patient, Options explained, No coercion, Specific to treatment, Explained risks/benefits, No time pressure, Thoroughly documented",
          "REFUSAL: Risks explained, Explanation documented, Fully competent, Understanding confirmed, Signature obtained, Alternatives offered, Legal consultation available"
        ],
        decisionTrees: [
          "Patient Consent → Conscious? → Competent? → Risks Explained? → Consent Obtained → Treatment Provided",
          "Refusal Situation → Assess Capacity → Explain Risks → Document Thoroughly → Offer Alternatives → Respect Decision"
        ],
        fieldApplications: [
          "Explain procedures in terms patients can understand before obtaining consent",
          "Document patient's exact words when refusing care",
          "Use translator services for non-English speaking patients",
          "Reassess capacity throughout patient encounter, especially if condition changes"
        ]
      },
      {
        title: "Confidentiality and Privacy Protection",
        content: [
          "Patient confidentiality is fundamental ethical and legal obligation in healthcare",
          "HIPAA establishes national standards for protection of health information",
          "Protected Health Information (PHI) includes any identifiable patient data in any form",
          "Permitted disclosures include treatment, payment, healthcare operations, and legal requirements",
          "Patient authorization required for disclosures beyond permitted uses",
          "Minimum necessary standard limits information shared to essential elements only",
          "Verbal communications must protect privacy in public areas and emergency scenes",
          "Electronic health records require proper security measures and access controls"
        ],
        clinicalPearls: [
          "HIPAA violations can result in fines up to $1.5 million and criminal prosecution",
          "Patient information shared inappropriately appears in 15% of EMS complaints",
          "Proper privacy training reduces violations by 75% in EMS organizations",
          "Electronic audit trails identify unauthorized access in 95% of privacy breaches"
        ],
        mnemonics: [
          "HIPAA: Health Information Privacy and Portability Act",
          "PRIVATE: Protect information, Restrict access, Individual authorization, Verify recipients, Audit compliance, Train staff, Electronic security"
        ],
        decisionTrees: [
          "Information Request → Verify Identity → Check Authorization → Determine Minimum Necessary → Release Information",
          "Privacy Breach → Stop Disclosure → Assess Damage → Notify Patients → Report Incident → Implement Corrections"
        ],
        fieldApplications: [
          "Position yourself to prevent overhearing of patient information by bystanders",
          "Use patient numbers or initials instead of names in radio communications",
          "Verify identity before sharing information with family members",
          "Log off computer systems when stepping away from workstation"
        ]
      },
      {
        title: "Ethical Decision Making and Professional Standards",
        content: [
          "Biomedical ethics provides framework for healthcare decision making in complex situations",
          "Beneficence requires acting in the patient's best interest and promoting good outcomes",
          "Non-maleficence mandates 'do no harm' by avoiding actions that could injure patients",
          "Autonomy respects patient's right to make informed decisions about their healthcare",
          "Justice ensures fair distribution of resources and equal treatment regardless of patient characteristics",
          "Veracity requires honesty and truthfulness in all patient interactions and documentation",
          "Ethical dilemmas arise when competing principles create conflicts in patient care decisions",
          "Professional standards include competence, integrity, respect, and continuous improvement"
        ],
        clinicalPearls: [
          "Ethical conflicts appear in 20% of complex EMS calls involving end-of-life care",
          "Patient autonomy takes precedence when competent adults make informed decisions",
          "Resource allocation decisions must consider medical need rather than social factors",
          "Professional integrity requires reporting impaired colleagues and safety violations"
        ],
        mnemonics: [
          "ETHICS: Examine situation, Think through principles, Honor patient rights, Identify conflicts, Consider consequences, Seek consultation",
          "PRINCIPLES: Patient autonomy, Respect persons, Integrity in actions, Non-maleficence first, Care with beneficence, Individual justice, Promote welfare, Legal compliance, Ethical standards, Service to others"
        ],
        decisionTrees: [
          "Ethical Dilemma → Identify Principles → Assess Conflicts → Consider Options → Consult Resources → Make Decision → Document Rationale",
          "Professional Conflict → Review Standards → Assess Obligations → Seek Guidance → Take Action → Follow Up"
        ],
        fieldApplications: [
          "Respect cultural and religious beliefs while providing medical care",
          "Treat all patients equally regardless of social status or personal characteristics",
          "Report suspected abuse or neglect according to mandatory reporting requirements",
          "Maintain professional boundaries in all patient relationships"
        ]
      }
    ],
    criticalConcepts: [
      "Legal authority and scope of practice define boundaries of EMS practice",
      "Proper consent protects both patient rights and provider liability",
      "Confidentiality and privacy are fundamental obligations in healthcare",
      "Ethical decision making requires balancing competing principles and values",
      "Professional standards demand competence, integrity, and continuous improvement"
    ],
    clinicalDecisionRules: [
      "Consent Assessment: Conscious + Competent + Informed = Valid Consent",
      "Refusal Protocol: Competent patient + Risks explained + Documented = Valid refusal",
      "Confidentiality Standard: Minimum necessary information + Authorized recipient = Permitted disclosure"
    ],
    commonMisconceptions: [
      "MYTH: Unconscious patients cannot refuse care - FACT: Advanced directives may limit treatment",
      "MYTH: Family members can always make decisions - FACT: Legal guardianship or healthcare proxy required",
      "MYTH: EMS providers have unlimited authority - FACT: Must operate within defined scope of practice",
      "MYTH: Patient information can be shared freely with police - FACT: Requires specific legal authority or patient consent"
    ],
    examTips: [
      "Consent questions often involve capacity assessment and emergency exceptions",
      "Legal scenarios test understanding of scope of practice and standard of care",
      "Confidentiality questions focus on HIPAA requirements and permitted disclosures",
      "Ethical dilemmas require application of biomedical ethics principles"
    ],
    crossReferences: [
      "Chapter 1: EMS System Fundamentals - legal framework of EMS systems",
      "Chapter 2: Responder Safety & Resilience - professional responsibilities and standards",
      "Chapter 4: Emergency Communication Protocols - documentation and confidentiality requirements",
      "Chapter 23: Behavioral Crisis Protocols - capacity assessment and involuntary treatment"
    ],
    flashcards: [
      { front: "What are the four elements of negligence?", back: "Duty, breach of duty, causation, and damages", category: "definition" },
      { front: "What is implied consent?", back: "Assumed consent for life-saving treatment of unconscious or incapacitated patients", category: "definition" },
      { front: "What does HIPAA protect?", back: "Protected Health Information (PHI) - any identifiable patient data", category: "definition" },
      { front: "What is scope of practice?", back: "Procedures, medications, and interventions legally permitted for each certification level", category: "definition" },
      { front: "What percentage of EMS lawsuits involve scope of practice violations?", back: "25% of EMS-related lawsuits", category: "clinical" },
      { front: "What is the standard of care?", back: "Level of care expected from similarly trained providers in similar circumstances", category: "definition" },
      { front: "What is beneficence?", back: "Acting in the patient's best interest and promoting good outcomes", category: "definition" },
      { front: "What is non-maleficence?", back: "'Do no harm' - avoiding actions that could injure patients", category: "definition" },
      { front: "How much do proper refusal documentation reduce liability?", back: "60% reduction when properly completed", category: "clinical" },
      { front: "What is autonomy in medical ethics?", back: "Patient's right to make informed decisions about their healthcare", category: "definition" },
      { front: "What percentage of EMS complaints involve inappropriate information sharing?", back: "15% of EMS complaints", category: "clinical" },
      { front: "What is expressed consent?", back: "Verbal or written agreement to treatment after explanation of risks and benefits", category: "definition" },
      { front: "What is abandonment in EMS?", back: "Terminating care without ensuring appropriate continuation of care", category: "definition" },
      { front: "How much can HIPAA violation fines reach?", back: "Up to $1.5 million and potential criminal prosecution", category: "protocol" },
      { front: "What is justice in medical ethics?", back: "Fair distribution of resources and equal treatment regardless of patient characteristics", category: "definition" }
    ]
  };*/

  /*const chapter4StudyNotes: ChapterData = {
    title: "Chapter 4: Emergency Communication Protocols",
    description: "Advanced communication systems, documentation standards, and information management in emergency medical services",
    module: "1",
    scope: "EMT-B",
    protocols: ["Radio Communication", "Written Documentation", "Electronic Records", "Interprofessional Communication", "Legal Documentation", "Quality Assurance"],
    learningObjectives: [
      "Demonstrate effective radio communication techniques following standardized protocols",
      "Complete accurate and legally defensible patient care documentation",
      "Apply HIPAA regulations and patient privacy protections in EMS communications",
      "Utilize electronic health record systems for patient information management",
      "Implement effective interprofessional communication strategies",
      "Understand legal implications of EMS documentation and communication"
    ],
    keyTerms: [
      "Radio Communication",
      "Base Station",
      "Mobile Radio",
      "Portable Radio",
      "Repeater System",
      "Frequency",
      "Channel",
      "Simplex",
      "Duplex",
      "Multiplex",
      "Digital Communication",
      "Trunked System",
      "Interoperability",
      "Patient Care Report",
      "Electronic Health Record",
      "Documentation",
      "SOAP Format",
      "Narrative Report",
      "Objective Findings",
      "Subjective Findings",
      "Assessment",
      "Plan",
      "HIPAA",
      "Protected Health Information",
      "Confidentiality",
      "Legal Documentation",
      "Falsification",
      "Addendum",
      "Amendment",
      "Quality Assurance",
      "Peer Review",
      "Medical Direction",
      "Verbal Orders",
      "Standing Orders"
    ],
    sections: [
      {
        title: "Radio Communication Systems and Protocols",
        content: [
          "EMS radio systems operate on FCC-allocated frequencies with specific protocols for emergency communication",
          "Base station provides central communication hub with dispatch and hospital coordination",
          "Mobile radios in ambulances offer higher power and better range than portable units",
          "Repeater systems extend communication range and improve signal quality in challenging terrain",
          "Digital trunked systems provide enhanced capacity and interoperability between agencies",
          "Standard radio procedures include proper identification, clear speech, and brevity",
          "Medical communication follows structured format: unit ID, patient age/sex, chief complaint, vital signs, ETA",
          "Emergency traffic protocols ensure priority communication during critical incidents"
        ],
        clinicalPearls: [
          "Radio communication errors contribute to 15% of medication administration mistakes",
          "Clear, structured radio reports reduce hospital preparation time by 3-5 minutes",
          "Digital systems provide 40% better audio quality and reduced background noise",
          "Interoperable communication systems improve multi-agency response by 60%"
        ],
        mnemonics: [
          "RADIO: Recognize unit, Announce patient info, Describe condition, Inquire for orders, Over and out",
          "CLEAR: Concise message, Loud and clear speech, Emergency priority, Accurate information, Repeat if necessary"
        ],
        decisionTrees: [
          "Radio Communication → Unit ID → Patient Info → Vital Signs → Assessment → Plan → Medical Control Orders",
          "System Failure → Switch to backup → Contact dispatch → Use cell phone → Document communication issue"
        ],
        fieldApplications: [
          "Test radio equipment at start of shift to ensure proper function",
          "Use standardized medical terminology to avoid confusion",
          "Position radio microphone 2-3 inches from mouth for optimal clarity",
          "Monitor emergency channels for high-priority traffic during routine operations"
        ]
      },
      {
        title: "Patient Care Documentation Standards",
        content: [
          "Patient Care Report (PCR) serves as legal document, billing record, and quality assurance tool",
          "SOAP format organizes documentation: Subjective findings, Objective data, Assessment, Plan",
          "Narrative section provides chronological account of patient encounter and care provided",
          "Vital signs must be documented with times, patient position, and measurement method",
          "All interventions require documentation with times, patient response, and complications",
          "Medication administration documentation includes drug name, dose, route, time, and patient response",
          "Refusal of care requires thorough documentation of patient capacity and risks explained",
          "Electronic PCRs improve legibility, reduce errors, and enhance data collection"
        ],
        clinicalPearls: [
          "Electronic documentation reduces medication errors by 35% compared to handwritten reports",
          "Complete PCRs within 24 hours to ensure accuracy and meet legal requirements",
          "Objective findings carry more legal weight than subjective interpretations",
          "Time documentation accuracy within 2 minutes improves quality assurance outcomes"
        ],
        mnemonics: [
          "SOAP: Subjective complaints, Objective findings, Assessment impression, Plan of care",
          "CHART: Chief complaint, History, Assessment findings, Rx (treatment), Transport decisions"
        ],
        decisionTrees: [
          "Documentation → Identify Patient → Chief Complaint → History → Physical Exam → Treatment → Transport",
          "Error Correction → Single line through error → Initial and date → Write correct information → Never erase or white out"
        ],
        fieldApplications: [
          "Document assessment findings immediately after patient contact",
          "Use direct quotes for patient statements rather than interpretation",
          "Record exact medication doses and administration times",
          "Complete documentation before end of shift while details are fresh"
        ]
      },
      {
        title: "HIPAA Compliance and Patient Privacy",
        content: [
          "Health Insurance Portability and Accountability Act (HIPAA) protects patient health information",
          "Protected Health Information (PHI) includes any identifiable patient data in EMS records",
          "Minimum necessary standard requires limiting PHI disclosure to essential personnel only",
          "Patient authorization required for non-routine disclosures beyond treatment and payment",
          "Verbal communications must protect patient privacy in public areas and hospitals",
          "Electronic systems require user authentication and audit trails for PHI access",
          "Breach notification requirements mandate reporting unauthorized PHI disclosures",
          "Business associate agreements required for vendors handling patient information"
        ],
        clinicalPearls: [
          "HIPAA violations can result in fines up to $1.5 million per incident",
          "70% of HIPAA violations in healthcare involve improper verbal disclosures",
          "Electronic audit trails identify 95% of unauthorized PHI access attempts",
          "Proper privacy training reduces HIPAA violations by 80% in EMS services"
        ],
        mnemonics: [
          "HIPAA: Health Information Privacy and Accountability Act",
          "PRIVATE: Protect information, Restrict access, Individual rights, Verify authorization, Audit compliance, Train personnel, Electronic safeguards"
        ],
        decisionTrees: [
          "PHI Disclosure → Treatment/Payment/Operations → No authorization needed → Other purposes → Patient authorization required",
          "Privacy Breach → Identify scope → Notify patients → Report to authorities → Implement corrective measures"
        ],
        fieldApplications: [
          "Lower voice when discussing patient information in public areas",
          "Position computer screens away from public view",
          "Verify recipient identity before sharing patient information",
          "Use patient initials rather than full names in radio communications when possible"
        ]
      },
      {
        title: "Legal and Quality Assurance Documentation",
        content: [
          "EMS documentation serves as legal evidence in malpractice, criminal, and workers' compensation cases",
          "Contemporaneous documentation carries more legal weight than delayed entries",
          "Objective language and factual observations preferred over opinions and assumptions",
          "All corrections must follow proper procedures with original entries remaining visible",
          "Late entries and addenda must be clearly identified with reasons for delay",
          "Quality assurance reviews identify documentation deficiencies and improvement opportunities",
          "Peer review processes use documentation to evaluate care quality and compliance",
          "Documentation audit trails support system improvement and regulatory compliance"
        ],
        clinicalPearls: [
          "Poor documentation is cited in 65% of successful EMS malpractice suits",
          "Electronic timestamps provide irrefutable evidence of care timing",
          "Objective documentation reduces liability exposure by 40% in legal proceedings",
          "Quality metrics derived from documentation drive system performance improvement"
        ],
        mnemonics: [
          "LEGAL: Legible writing, Evidence-based, Good timing, Accurate facts, Legal corrections",
          "QUALITY: Quantify performance, Understand variations, Analyze outcomes, Learn from data, Implement improvements, Track progress, Yield better care"
        ],
        decisionTrees: [
          "Legal Challenge → Review documentation → Assess completeness → Identify gaps → Supplement with additional evidence",
          "QA Review → Compare to standards → Identify deficiencies → Provide feedback → Implement improvements → Monitor progress"
        ],
        fieldApplications: [
          "Document unusual circumstances or deviations from standard care",
          "Use quotation marks for exact patient statements",
          "Record refusals with specific risks explained to patient",
          "Maintain professional language even in challenging situations"
        ]
      }
    ],
    criticalConcepts: [
      "Effective communication is essential for patient safety and system coordination",
      "Documentation serves multiple purposes: legal protection, quality improvement, and billing",
      "HIPAA compliance protects patient privacy and prevents legal violations",
      "Radio protocols ensure clear, efficient communication during emergencies",
      "Quality documentation supports evidence-based practice improvement"
    ],
    clinicalDecisionRules: [
      "Radio Communication: Use standard format - Unit ID, patient demographics, vital signs, assessment, ETA",
      "Documentation Timing: Complete PCRs within 24 hours of patient contact for legal validity",
      "HIPAA Disclosure: Verify recipient authorization before sharing patient information"
    ],
    commonMisconceptions: [
      "MYTH: Radio communications are private - FACT: EMS radio traffic is public and can be monitored",
      "MYTH: Electronic records are automatically HIPAA compliant - FACT: Require proper safeguards and training",
      "MYTH: Late documentation is acceptable - FACT: Contemporaneous records have greater legal validity",
      "MYTH: Abbreviations save time and space - FACT: Can create confusion and legal liability"
    ],
    examTips: [
      "Radio communication questions focus on proper procedures and medical terminology",
      "Documentation scenarios test SOAP format and legal requirements",
      "HIPAA questions emphasize patient privacy and proper disclosure procedures",
      "Quality assurance concepts often appear in system improvement contexts"
    ],
    crossReferences: [
      "Chapter 1: EMS System Fundamentals - system communication integration",
      "Chapter 2: Responder Safety & Resilience - safety communication protocols",
      "Chapter 9: Interprofessional EMS Teams - team communication strategies",
      "Chapter 10: Comprehensive Patient Evaluation - assessment documentation"
    ],
    flashcards: [
      { front: "What does SOAP stand for in documentation?", back: "Subjective, Objective, Assessment, Plan", category: "definition" },
      { front: "What is the maximum time to complete a PCR?", back: "24 hours after patient contact", category: "protocol" },
      { front: "What is PHI?", back: "Protected Health Information - any identifiable patient data", category: "definition" },
      { front: "What is the proper way to correct documentation errors?", back: "Single line through error, initial and date, write correct information", category: "protocol" },
      { front: "What are the four components of SOAP documentation?", back: "Subjective findings, Objective data, Assessment, Plan", category: "definition" },
      { front: "What is HIPAA?", back: "Health Insurance Portability and Accountability Act", category: "definition" },
      { front: "How much do radio communication errors contribute to medication mistakes?", back: "15% of medication administration errors", category: "clinical" },
      { front: "What is a base station in radio communication?", back: "Central communication hub for dispatch and hospital coordination", category: "definition" },
      { front: "What is the minimum necessary standard?", back: "HIPAA requirement to limit PHI disclosure to essential personnel only", category: "protocol" },
      { front: "How much do electronic PCRs reduce medication errors?", back: "35% reduction compared to handwritten reports", category: "clinical" },
      { front: "What is a repeater system?", back: "Radio system that extends communication range and improves signal quality", category: "definition" },
      { front: "What percentage of HIPAA violations involve verbal disclosures?", back: "70% of healthcare HIPAA violations", category: "clinical" },
      { front: "What is interoperability in radio systems?", back: "Ability for different agencies to communicate on same system", category: "definition" },
      { front: "How much can HIPAA violation fines reach?", back: "Up to $1.5 million per incident", category: "protocol" },
      { front: "What is contemporaneous documentation?", back: "Documentation completed at the time of or immediately after patient care", category: "definition" }
    ]
  };*/

  /*const chapter5StudyNotes: ChapterData = {
    title: "Chapter 5: Medical Terminology Foundations",
    description: "Essential medical terminology, anatomical references, and professional communication language for emergency medical services",
    module: "2",
    scope: "EMT-B",
    protocols: ["Medical Terminology", "Anatomical Position", "Directional Terms", "Body Systems", "Medical Abbreviations", "Professional Communication"],
    learningObjectives: [
      "Apply proper medical terminology in patient assessment and documentation",
      "Utilize anatomical position and directional terms for accurate body reference",
      "Demonstrate understanding of medical word components including roots, prefixes, and suffixes",
      "Implement appropriate medical abbreviations following standardized conventions",
      "Communicate effectively using professional medical terminology with healthcare teams",
      "Interpret medical terminology in various healthcare documentation and reports"
    ],
    keyTerms: [
      "Anatomical Position",
      "Anterior",
      "Posterior",
      "Superior",
      "Inferior",
      "Medial",
      "Lateral",
      "Proximal",
      "Distal",
      "Superficial",
      "Deep",
      "Sagittal Plane",
      "Coronal Plane",
      "Transverse Plane",
      "Midline",
      "Bilateral",
      "Unilateral",
      "Ipsilateral",
      "Contralateral",
      "Dorsal",
      "Ventral",
      "Cephalic",
      "Caudal",
      "Prone",
      "Supine",
      "Fowler Position",
      "Trendelenburg Position",
      "Root Word",
      "Prefix",
      "Suffix",
      "Combining Form",
      "Medical Abbreviation",
      "Acronym"
    ],
    sections: [
      {
        title: "Anatomical Position and Directional Terms",
        content: [
          "Anatomical position serves as universal reference point: standing erect, facing forward, arms at sides, palms facing forward",
          "Anterior (ventral) refers to front of body while posterior (dorsal) indicates back of body",
          "Superior (cranial/cephalic) means toward head while inferior (caudal) means toward feet",
          "Medial indicates toward midline of body while lateral means away from midline",
          "Proximal refers to closer to point of attachment while distal means farther from attachment point",
          "Superficial describes closer to surface while deep indicates farther from surface",
          "Bilateral means both sides while unilateral refers to one side only",
          "Ipsilateral indicates same side while contralateral means opposite side"
        ],
        clinicalPearls: [
          "Consistent use of anatomical terms reduces communication errors by 60% in EMS reports",
          "Proper directional terminology is essential for accurate injury documentation and legal protection",
          "Anatomical position reference prevents confusion regardless of patient's actual position",
          "Medical terminology standardization improves hospital handoff communication by 45%"
        ],
        mnemonics: [
          "PALM: Proximal closer, Anterior front, Lateral away, Medial toward midline",
          "SIDS: Superior up, Inferior down, Distal away, Superficial surface"
        ],
        decisionTrees: [
          "Body Reference → Establish Anatomical Position → Apply Directional Terms → Document Accurately",
          "Injury Location → Identify Body Region → Use Proper Terminology → Communicate Clearly"
        ],
        fieldApplications: [
          "Always use anatomical position as reference regardless of how patient is found",
          "Combine directional terms for precise location: 'proximal medial forearm'",
          "Use consistent terminology in radio reports and documentation",
          "Verify understanding when communicating with other healthcare providers"
        ]
      },
      {
        title: "Body Planes and Positioning",
        content: [
          "Sagittal plane divides body into right and left portions with midsagittal creating equal halves",
          "Coronal (frontal) plane separates body into anterior and posterior sections",
          "Transverse (horizontal) plane creates superior and inferior divisions",
          "Prone position places patient face down while supine position has patient face up",
          "Fowler's position elevates head and torso at various angles for respiratory comfort",
          "Trendelenburg position places patient supine with feet elevated above head",
          "Lateral recumbent (recovery) position places patient on side for airway protection",
          "Positioning terminology essential for patient movement and treatment protocols"
        ],
        clinicalPearls: [
          "Body plane understanding critical for radiographic interpretation and surgical communication",
          "Positioning terminology prevents confusion during patient transfers between providers",
          "Proper position documentation supports quality assurance and protocol compliance",
          "Anatomical planes provide framework for understanding three-dimensional body relationships"
        ],
        mnemonics: [
          "PLANES: Posterior-anterior coronal, Lateral sagittal, Above-below transverse, Never confuse, Equal divisions, Systematic approach",
          "POSITION: Prone face down, Opposite supine, Sides lateral, Inclined Fowler's, Trendelenburg feet up, Identify clearly, Options multiple, Never assume"
        ],
        decisionTrees: [
          "Patient Positioning → Assess Condition → Choose Appropriate Position → Use Correct Terminology → Document Position",
          "Position Description → Identify Plane → Apply Directional Terms → Communicate Clearly"
        ],
        fieldApplications: [
          "Document patient's found position before any movement",
          "Use standard positioning terminology in patient care reports",
          "Communicate position changes clearly during transport",
          "Consider anatomical position when describing injury mechanisms"
        ]
      },
      {
        title: "Medical Word Construction and Components",
        content: [
          "Root words provide basic meaning and often refer to body parts or systems",
          "Prefixes appear before root words and modify meaning, often indicating location, number, or condition",
          "Suffixes follow root words and typically indicate procedures, conditions, or states",
          "Combining forms use connecting vowels (usually 'o') to join word parts smoothly",
          "Medical terms often combine multiple roots, prefixes, and suffixes for precise meaning",
          "Understanding word components allows interpretation of unfamiliar medical terms",
          "Greek and Latin origins predominate in medical terminology construction",
          "Systematic approach to word analysis improves medical vocabulary comprehension"
        ],
        clinicalPearls: [
          "Understanding word components enables interpretation of 75% of medical terminology",
          "Systematic word analysis reduces medication errors by identifying drug classifications",
          "Medical terminology knowledge improves patient education and communication effectiveness",
          "Root word mastery provides foundation for learning complex medical concepts"
        ],
        mnemonics: [
          "COMPONENTS: Combining forms connect, Origins Greek-Latin, Meaning modified, Prefixes before, Order matters, Numbers indicated, Endings show conditions, New terms analyzed, Terms systematically, Systems organized",
          "ROOTS: Remember basic meaning, Origins body parts, Organize by systems, Terms build from foundation, Systems connect logically"
        ],
        decisionTrees: [
          "Unknown Term → Identify Components → Analyze Root → Check Prefix → Examine Suffix → Determine Meaning",
          "Word Construction → Choose Root → Add Prefix if Needed → Select Appropriate Suffix → Check Combining Vowels"
        ],
        fieldApplications: [
          "Break down unfamiliar terms into component parts for understanding",
          "Use proper medical terminology in documentation and communication",
          "Verify understanding of terms before using in patient care",
          "Build vocabulary systematically by learning common roots, prefixes, and suffixes"
        ]
      },
      {
        title: "Common Medical Abbreviations and Professional Communication",
        content: [
          "Standard medical abbreviations improve documentation efficiency while maintaining clarity",
          "Dangerous abbreviations list identifies terms that increase error risk and should be avoided",
          "Time notation uses 24-hour format to prevent AM/PM confusion in critical care",
          "Vital signs abbreviations follow standardized format: BP, HR, RR, Temp, SpO2",
          "Route abbreviations specify medication administration pathways: PO, IV, IM, SL, PR",
          "Frequency abbreviations indicate timing: BID, TID, QID, PRN, STAT",
          "Professional communication requires appropriate abbreviation use in proper context",
          "Documentation standards mandate approved abbreviations for legal and quality purposes"
        ],
        clinicalPearls: [
          "Inappropriate abbreviation use contributes to 25% of medication administration errors",
          "Joint Commission maintains 'Do Not Use' abbreviation list to prevent patient harm",
          "Standardized abbreviations improve communication efficiency by 35% in emergency settings",
          "Electronic health records often expand abbreviations automatically for clarity"
        ],
        mnemonics: [
          "ABBREVIATIONS: Approved lists only, Brief but clear, Brackets for clarity, Read carefully, Error prevention, Verify meanings, Inappropriate avoided, Appropriate context, Time format standard, International standards, Organization approved, Never assume, Standard usage",
          "VITALS: Verify measurements, Input correctly, Temperature noted, Always document, Location specified, Standard abbreviations"
        ],
        decisionTrees: [
          "Abbreviation Use → Check Approved List → Verify Meaning → Use Appropriately → Document Correctly",
          "Communication → Choose Terminology → Use Standard Abbreviations → Verify Understanding → Document Accurately"
        ],
        fieldApplications: [
          "Use only organization-approved abbreviations in documentation",
          "Spell out potentially confusing abbreviations when communicating verbally",
          "Verify abbreviation meanings when receiving information from other providers",
          "Follow facility-specific abbreviation policies and procedures"
        ]
      }
    ],
    criticalConcepts: [
      "Anatomical position provides universal reference point for all body descriptions",
      "Consistent medical terminology prevents communication errors and improves patient safety",
      "Understanding word components enables interpretation of complex medical terms",
      "Standardized abbreviations improve efficiency while maintaining clarity and safety",
      "Professional medical communication requires precise terminology and proper context"
    ],
    clinicalDecisionRules: [
      "Anatomical Reference: Always use anatomical position as reference regardless of patient's found position",
      "Terminology Standards: Use approved medical terminology and abbreviations per organizational policy",
      "Communication Clarity: Verify understanding of medical terms when communicating with others"
    ],
    commonMisconceptions: [
      "MYTH: Medical terminology is too complex to master - FACT: Understanding word components makes learning systematic",
      "MYTH: Abbreviations always save time - FACT: Unclear abbreviations can cause dangerous delays and errors",
      "MYTH: Lay terms are acceptable in medical documentation - FACT: Professional terminology is required for legal and clinical accuracy",
      "MYTH: Anatomical terms are only needed for complex injuries - FACT: Precise terminology is essential for all patient descriptions"
    ],
    examTips: [
      "Anatomical position questions often test directional term understanding",
      "Word component analysis helps with unfamiliar terminology questions",
      "Abbreviation questions may include 'Do Not Use' list items",
      "Body plane questions often combine with positioning terminology"
    ],
    crossReferences: [
      "Chapter 6: Human Body Systems - anatomical terminology application",
      "Chapter 4: Emergency Communication Protocols - professional communication standards",
      "Chapter 10: Comprehensive Patient Evaluation - terminology in assessment documentation",
      "All clinical chapters - medical terminology foundation for understanding"
    ],
    flashcards: [
      { front: "What is anatomical position?", back: "Standing erect, facing forward, arms at sides, palms facing forward", category: "definition" },
      { front: "What does anterior mean?", back: "Toward the front of the body", category: "definition" },
      { front: "What does posterior mean?", back: "Toward the back of the body", category: "definition" },
      { front: "What does superior mean?", back: "Toward the head, above", category: "definition" },
      { front: "What does inferior mean?", back: "Toward the feet, below", category: "definition" },
      { front: "What does medial mean?", back: "Toward the midline of the body", category: "definition" },
      { front: "What does lateral mean?", back: "Away from the midline of the body", category: "definition" },
      { front: "What does proximal mean?", back: "Closer to the point of attachment", category: "definition" },
      { front: "What does distal mean?", back: "Farther from the point of attachment", category: "definition" },
      { front: "What does bilateral mean?", back: "Affecting both sides of the body", category: "definition" },
      { front: "What plane divides the body into right and left?", back: "Sagittal plane", category: "definition" },
      { front: "What plane divides the body into front and back?", back: "Coronal (frontal) plane", category: "definition" },
      { front: "What plane divides the body into upper and lower?", back: "Transverse (horizontal) plane", category: "definition" },
      { front: "What position has the patient lying face up?", back: "Supine position", category: "definition" },
      { front: "What are the three components of medical words?", back: "Root, prefix, and suffix", category: "definition" }
    ]
  };*/

  /*const chapter2StudyNotes: ChapterData = {
    title: "Chapter 2: Responder Safety & Resilience",
    description: "Comprehensive safety protocols, personal protective equipment, and resilience strategies for emergency medical services personnel",
    module: "1",
    scope: "EMT-B",
    protocols: ["Personal Safety", "Scene Safety", "PPE Usage", "Infection Control", "Stress Management", "Resilience Building"],
    learningObjectives: [
      "Implement comprehensive scene safety assessment protocols before patient approach",
      "Demonstrate proper personal protective equipment selection and usage procedures",
      "Apply infection control measures and standard precautions in all patient encounters",
      "Recognize signs of acute and cumulative stress in self and team members",
      "Utilize evidence-based resilience strategies to maintain professional effectiveness",
      "Understand occupational health requirements and injury prevention strategies"
    ],
    keyTerms: [
      "Scene Safety",
      "Personal Protective Equipment",
      "Standard Precautions",
      "Universal Precautions",
      "Bloodborne Pathogens",
      "Airborne Precautions",
      "Contact Precautions",
      "Droplet Precautions",
      "N95 Respirator",
      "Fit Testing",
      "Decontamination",
      "Exposure Control Plan",
      "Post-Exposure Prophylaxis",
      "Acute Stress Reaction",
      "Cumulative Stress",
      "Critical Incident Stress",
      "Resilience",
      "Self-Care",
      "Burnout",
      "Secondary Trauma",
      "Employee Assistance Program",
      "Peer Support",
      "Mindfulness",
      "Work-Life Balance"
    ],
    sections: [
      {
        title: "Scene Safety Assessment and Management",
        content: [
          "Scene safety assessment begins before arrival through dispatch information analysis and continues throughout call",
          "Primary safety hazards include traffic, violence, environmental dangers, and structural instability",
          "Dynamic scene assessment requires continuous reevaluation as conditions change during emergency response",
          "Safety zones establish safe working areas with clear egress routes for personnel protection",
          "Multiple agency coordination essential for complex scenes requiring specialized resources",
          "Personal safety takes precedence over patient care in dangerous environments",
          "Communication systems must remain functional for emergency assistance requests",
          "Documentation of safety concerns supports legal protection and quality improvement"
        ],
        clinicalPearls: [
          "Scene safety violations contribute to 40% of EMS worker injuries annually",
          "Proper scene assessment reduces responder injury rates by 65% compared to inadequate evaluation",
          "Traffic-related incidents cause 25% of line-of-duty deaths in EMS personnel",
          "Early scene control prevents 80% of secondary incidents during emergency operations"
        ],
        mnemonics: [
          "SAFER: Scene assessment, Assess hazards, Find safe zone, Evaluate continuously, Request assistance as needed",
          "SCENE: Survey thoroughly, Control hazards, Establish zones, Navigate safely, Exit planned"
        ],
        decisionTrees: [
          "Scene Arrival → Initial Assessment → Identify Hazards → Establish Safety Zone → Continuous Monitoring",
          "Unsafe Scene → Stop Approach → Request Additional Resources → Wait for Scene Security → Reassess Safety"
        ],
        fieldApplications: [
          "Conduct 360-degree scene survey before exiting vehicle",
          "Position apparatus to protect work area from traffic",
          "Maintain situational awareness throughout entire call duration",
          "Have predetermined exit strategy for all scene locations"
        ]
      },
      {
        title: "Personal Protective Equipment and Infection Control",
        content: [
          "Standard precautions treat all body fluids as potentially infectious requiring appropriate PPE",
          "PPE selection based on anticipated exposure risks and transmission routes",
          "Proper donning and doffing procedures prevent contamination and self-exposure",
          "Respiratory protection requires fit-tested N95 respirators for airborne pathogens",
          "Eye protection mandatory for procedures with splash or droplet risk",
          "Glove selection varies by procedure: nitrile preferred for durability and chemical resistance",
          "Gown protection required for procedures with significant contamination risk",
          "Decontamination procedures follow established protocols for personnel and equipment safety"
        ],
        clinicalPearls: [
          "Proper PPE use reduces occupational infection risk by 90% in healthcare settings",
          "Incorrect glove removal is the most common cause of hand contamination",
          "N95 respirator fit testing must be performed annually and with facial changes",
          "Eye protection prevents 85% of mucous membrane exposures during patient care"
        ],
        mnemonics: [
          "PPE: Protect yourself first, Proper selection, Equipment maintained, Everyone trained",
          "GLOVES: Guard hands always, Latex-free options, Observe proper technique, Verify integrity, Extended use avoided, Single use only"
        ],
        decisionTrees: [
          "Patient Contact → Assess Exposure Risk → Select Appropriate PPE → Don Properly → Provide Care → Doff Safely",
          "Potential Exposure → Stop Activity → Assess Risk → Implement Controls → Document Incident → Seek Medical Evaluation"
        ],
        fieldApplications: [
          "Change gloves between patients and after contamination",
          "Verify N95 seal check before entering infectious patient areas",
          "Remove contaminated PPE before entering clean areas",
          "Maintain PPE inventory and replace expired equipment"
        ]
      },
      {
        title: "Occupational Health and Injury Prevention",
        content: [
          "Ergonomic principles reduce musculoskeletal injury risk during patient handling and transport",
          "Mechanical lift devices required for patients exceeding safe lifting limits",
          "Body mechanics training essential for proper lifting, carrying, and pushing techniques",
          "Immunization requirements protect against occupational disease exposure",
          "Annual health screenings detect early signs of work-related health issues",
          "Injury reporting systems ensure proper documentation and treatment of workplace injuries",
          "Return-to-work programs facilitate safe recovery and prevent re-injury",
          "Fitness-for-duty evaluations ensure personnel capability to perform essential functions safely"
        ],
        clinicalPearls: [
          "Back injuries account for 45% of all EMS worker compensation claims",
          "Proper body mechanics reduce lifting injury risk by 70% when consistently applied",
          "Mechanical lift device usage mandatory for patients over 157 pounds per NIOSH guidelines",
          "Annual TB screening detects occupational exposure in 2-3% of EMS personnel"
        ],
        mnemonics: [
          "LIFT: Legs do work, Intimate grip, Feet stable, Torso straight",
          "HEALTH: Have regular checkups, Exercise regularly, Avoid risky behaviors, Learn injury prevention, Track exposures, Healthy lifestyle choices"
        ],
        decisionTrees: [
          "Patient Movement → Assess Weight/Mobility → Determine Resources Needed → Use Proper Technique → Monitor for Injury",
          "Workplace Injury → Immediate Care → Report Incident → Seek Medical Attention → Follow Return-to-Work Protocol"
        ],
        fieldApplications: [
          "Use team lifting for all patients regardless of apparent weight",
          "Maintain proper lifting posture with neutral spine alignment",
          "Report all injuries immediately regardless of perceived severity",
          "Participate in required occupational health programs and screenings"
        ]
      },
      {
        title: "Stress Management and Professional Resilience",
        content: [
          "Acute stress reactions are normal responses to abnormal situations requiring recognition and management",
          "Cumulative stress builds over time from repeated exposure to traumatic events and workplace pressures",
          "Critical incident stress management provides structured support following traumatic events",
          "Resilience strategies include mindfulness, social support, physical fitness, and professional development",
          "Self-awareness enables early recognition of stress symptoms and proactive intervention",
          "Work-life balance requires deliberate boundaries between professional and personal time",
          "Peer support programs provide confidential assistance from specially trained colleagues",
          "Employee assistance programs offer professional counseling and resource referral services"
        ],
        clinicalPearls: [
          "Untreated cumulative stress increases burnout risk by 300% in emergency services personnel",
          "Resilience training reduces PTSD symptoms by 40% in first responders",
          "Peer support utilization correlates with 60% reduction in early career turnover",
          "Mindfulness practices improve emotional regulation and job satisfaction by 35%"
        ],
        mnemonics: [
          "RESILIENCE: Recognize stress early, Exercise regularly, Sleep adequately, Interests outside work, Learn coping skills, Involve support systems, Engage in self-care, Navigate challenges, Connect with others, Evaluate regularly",
          "STRESS: Signs recognize early, Take action promptly, Resources utilize available, Evaluate effectiveness, Support seek when needed, Strategy develop personal"
        ],
        decisionTrees: [
          "Stress Recognition → Assess Severity → Implement Coping Strategies → Seek Support if Needed → Monitor Progress",
          "Critical Incident → Immediate Self-Care → Utilize Support Resources → Professional Help if Indicated → Return to Duty Assessment"
        ],
        fieldApplications: [
          "Practice stress recognition techniques during routine calls",
          "Maintain regular exercise and healthy sleep patterns",
          "Participate in peer support programs and critical incident debriefings",
          "Develop personal stress management toolkit with multiple strategies"
        ]
      }
    ],
    criticalConcepts: [
      "Scene safety assessment is continuous and takes precedence over patient care",
      "Standard precautions and proper PPE use prevent occupational disease transmission",
      "Ergonomic principles and mechanical aids prevent musculoskeletal injuries",
      "Stress management and resilience strategies are essential for career longevity",
      "Occupational health programs support personnel safety and wellness"
    ],
    clinicalDecisionRules: [
      "Scene Safety Rule: If scene is unsafe, do not enter until hazards are controlled",
      "PPE Selection: Choose protection based on anticipated exposure routes and risks",
      "Lifting Guidelines: Use mechanical aids for patients over 157 pounds or awkward positioning"
    ],
    commonMisconceptions: [
      "MYTH: Scene safety assessment only occurs on arrival - FACT: Must be continuous throughout call",
      "MYTH: Standard precautions only for known infectious patients - FACT: Apply to all patient contacts",
      "MYTH: Stress reactions indicate weakness - FACT: Normal response to abnormal situations",
      "MYTH: PPE prevents all occupational exposures - FACT: Reduces risk but proper technique essential"
    ],
    examTips: [
      "Scene safety questions often test priority of safety over patient care",
      "PPE questions focus on selection criteria and proper usage techniques",
      "Stress management questions emphasize recognition and resource utilization",
      "Ergonomic questions test knowledge of proper body mechanics and lifting limits"
    ],
    crossReferences: [
      "Chapter 1: EMS System Fundamentals - safety within system context",
      "Chapter 4: Emergency Communication Protocols - safety communication protocols",
      "Chapter 9: Interprofessional EMS Teams - relates to team safety culture",
      "All clinical chapters - safety considerations specific to each area"
    ],
    flashcards: [
      { front: "What is the first priority on any EMS scene?", back: "Scene safety and responder safety", category: "protocol" },
      { front: "What are standard precautions?", back: "Treating all body fluids as potentially infectious", category: "definition" },
      { front: "What percentage of EMS worker injuries involve scene safety violations?", back: "40% of EMS worker injuries annually", category: "clinical" },
      { front: "What is the NIOSH lifting guideline for EMS?", back: "Use mechanical aids for patients over 157 pounds", category: "protocol" },
      { front: "What causes 25% of line-of-duty deaths in EMS?", back: "Traffic-related incidents", category: "clinical" },
      { front: "What does PPE stand for?", back: "Personal Protective Equipment", category: "definition" },
      { front: "How much do proper PPE practices reduce infection risk?", back: "90% reduction in occupational infection risk", category: "clinical" },
      { front: "What percentage of EMS compensation claims involve back injuries?", back: "45% of all EMS worker compensation claims", category: "clinical" },
      { front: "What is acute stress reaction?", back: "Normal response to abnormal situations requiring recognition and management", category: "definition" },
      { front: "How much does resilience training reduce PTSD symptoms?", back: "40% reduction in PTSD symptoms in first responders", category: "clinical" },
      { front: "What is cumulative stress?", back: "Stress that builds over time from repeated traumatic exposures", category: "definition" },
      { front: "How often should N95 fit testing be performed?", back: "Annually and with any facial changes", category: "protocol" },
      { front: "What is the most common PPE mistake?", back: "Incorrect glove removal causing hand contamination", category: "clinical" },
      { front: "What prevents 85% of mucous membrane exposures?", back: "Proper eye protection during patient care", category: "clinical" },
      { front: "How much does peer support reduce early career turnover?", back: "60% reduction in early career turnover", category: "clinical" }
    ]
  };*/

  /*const chapter6StudyNotes: ChapterData = {
    title: "Chapter 6: Human Body Systems & Anatomy",
    description: "Comprehensive anatomy and physiology of human body systems essential for emergency medical assessment and intervention",
    module: "2",
    scope: "EMT-B",
    protocols: ["Anatomical Assessment", "System Integration", "Physiological Monitoring", "Pathophysiology Recognition", "Body System Interactions", "Clinical Correlation"],
    learningObjectives: [
      "Identify major anatomical structures and their physiological functions across all body systems",
      "Analyze integration between body systems and predict cascade effects of system dysfunction",
      "Apply anatomical knowledge to perform systematic patient assessment and recognize abnormalities",
      "Correlate signs and symptoms with underlying anatomical and physiological processes",
      "Understand age-related anatomical variations and their clinical implications",
      "Recognize pathophysiological changes that occur in common emergency conditions"
    ],
    keyTerms: [
      "Homeostasis",
      "Metabolism",
      "Perfusion",
      "Oxygenation",
      "Ventilation",
      "Cardiac Output",
      "Blood Pressure",
      "Respiratory System",
      "Cardiovascular System",
      "Nervous System",
      "Musculoskeletal System",
      "Integumentary System",
      "Endocrine System",
      "Digestive System",
      "Urinary System",
      "Reproductive System",
      "Lymphatic System",
      "Immune System",
      "Central Nervous System",
      "Peripheral Nervous System",
      "Sympathetic Nervous System",
      "Parasympathetic Nervous System",
      "Stroke Volume",
      "Heart Rate",
      "Preload",
      "Afterload",
      "Contractility",
      "Tidal Volume",
      "Respiratory Rate",
      "Minute Ventilation"
    ],
    sections: [
      {
        title: "Respiratory System Structure and Function",
        content: [
          "Upper airway includes nose, mouth, pharynx, larynx providing air filtration, warming, and humidification",
          "Lower airway consists of trachea, bronchi, bronchioles, and alveoli enabling gas exchange",
          "Alveolar-capillary membrane facilitates oxygen and carbon dioxide exchange through diffusion",
          "Respiratory muscles including diaphragm and intercostals create pressure changes for ventilation",
          "Respiratory control centers in medulla and pons regulate breathing rate and depth",
          "Chemoreceptors monitor oxygen, carbon dioxide, and pH levels triggering respiratory adjustments",
          "Ventilation moves air while respiration refers to cellular gas exchange processes",
          "Respiratory system integration with cardiovascular system ensures adequate oxygen delivery"
        ],
        clinicalPearls: [
          "Adult respiratory rate normally 12-20 breaths per minute with tidal volume 500mL",
          "Oxygen saturation below 90% indicates significant respiratory compromise requiring intervention",
          "Respiratory drive primarily controlled by CO2 levels, not oxygen in healthy individuals",
          "Accessory muscle use indicates respiratory distress and increased work of breathing"
        ],
        mnemonics: [
          "RESPIRATORY: Rate normal range, Effort assessment, Sounds auscultated, Pattern observed, Intervention when needed, Rate varies by age, Accessory muscles noted, Tidal volume adequate, Oxygen saturation monitored, Rhythm regular expected, Y-axis shows trends",
          "AIRWAY: Assess patency, Inspect for obstructions, Respirations evaluate, Watch for compromise, Auscultate sounds, Year-round vigilance"
        ],
        decisionTrees: [
          "Respiratory Assessment → Rate → Rhythm → Effort → Sounds → Interventions as Needed",
          "Respiratory Distress → Assess Severity → Positioning → Oxygen → Advanced Interventions → Transport"
        ],
        fieldApplications: [
          "Count respiratory rate for full 30 seconds for accuracy",
          "Observe chest rise and fall symmetry during ventilation assessment",
          "Auscultate breath sounds systematically in all lung fields",
          "Monitor oxygen saturation continuously in respiratory compromise"
        ]
      },
      {
        title: "Cardiovascular System Components and Circulation",
        content: [
          "Heart serves as four-chambered pump with right side handling venous return and left side arterial circulation",
          "Cardiac cycle includes systole (contraction) and diastole (relaxation) phases coordinated by electrical system",
          "Coronary circulation supplies heart muscle with oxygen and nutrients through dedicated arterial system",
          "Systemic circulation delivers oxygenated blood to body tissues and returns deoxygenated blood to heart",
          "Pulmonary circulation carries deoxygenated blood to lungs and returns oxygenated blood to left heart",
          "Blood pressure reflects force of blood against arterial walls during cardiac contraction and relaxation",
          "Perfusion depends on adequate cardiac output, blood volume, and vascular integrity",
          "Cardiovascular system responds to stress through sympathetic nervous system activation"
        ],
        clinicalPearls: [
          "Normal cardiac output 4-6 liters per minute calculated as heart rate × stroke volume",
          "Blood pressure normal range: systolic 90-140 mmHg, diastolic 60-90 mmHg",
          "Pulse pressure (systolic-diastolic) normally 30-40 mmHg indicating stroke volume adequacy",
          "Capillary refill time >2 seconds suggests inadequate peripheral perfusion"
        ],
        mnemonics: [
          "CIRCULATION: Cardiac output adequate, Inspection for perfusion, Rate and rhythm, Circulation peripheral, Understanding blood flow, Lungs included, Assessment systematic, Transport decisions, Interventions appropriate, Oxygen delivery, Never ignore signs",
          "PERFUSION: Pressure blood adequate, Extremities warm, Rate capillary refill, Flow blood continuous, Understanding circulation, Skin color normal, Intervention when needed, Output cardiac sufficient, Never delay treatment"
        ],
        decisionTrees: [
          "Circulatory Assessment → Heart Rate → Blood Pressure → Perfusion Signs → Interventions → Monitoring",
          "Shock Recognition → Assess Perfusion → Identify Type → Fluid Resuscitation → Transport Priority"
        ],
        fieldApplications: [
          "Palpate pulse for rate, rhythm, and quality assessment",
          "Measure blood pressure in both arms when indicated",
          "Assess perfusion through skin color, temperature, and capillary refill",
          "Monitor for signs of cardiovascular compromise during transport"
        ]
      },
      {
        title: "Nervous System Organization and Function",
        content: [
          "Central nervous system includes brain and spinal cord providing integration and control functions",
          "Peripheral nervous system consists of cranial and spinal nerves connecting CNS to body structures",
          "Autonomic nervous system regulates involuntary functions through sympathetic and parasympathetic divisions",
          "Brain regions include cerebrum, cerebellum, and brainstem with specialized functions for survival",
          "Spinal cord transmits signals between brain and body while providing reflex coordination",
          "Neurons communicate through electrical and chemical signals enabling rapid response coordination",
          "Blood-brain barrier protects nervous tissue while potentially limiting drug penetration",
          "Neurological assessment evaluates consciousness, motor function, sensory response, and reflexes"
        ],
        clinicalPearls: [
          "Glasgow Coma Scale ranges 3-15 with scores <8 indicating severe brain injury",
          "Pupil response to light tests cranial nerve function and brainstem integrity",
          "Sympathetic activation during stress increases heart rate, blood pressure, and respiratory rate",
          "Neurological deficits may be focal (specific area) or global (widespread) in presentation"
        ],
        mnemonics: [
          "NERVOUS: Neurological assessment, Evaluate consciousness, Reflexes check, Vision and pupils, Orientation assess, Understanding deficits, Sensory function, Systematic approach",
          "NEURO: Note responsiveness, Evaluate pupils, Understanding speech, Reflexes test, Orient to person/place/time"
        ],
        decisionTrees: [
          "Neurological Assessment → Consciousness Level → Motor Response → Verbal Response → Eye Opening → GCS Score",
          "Altered Mental Status → Assess ABCs → Check Glucose → Evaluate Pupils → Transport Priority"
        ],
        fieldApplications: [
          "Perform systematic neurological assessment using standardized scales",
          "Document baseline neurological status and monitor for changes",
          "Assess pupil size, equality, and reaction to light bilaterally",
          "Evaluate motor strength and coordination in all extremities"
        ]
      },
      {
        title: "Musculoskeletal System and Movement",
        content: [
          "Skeletal system provides structural framework, protects organs, and produces blood cells in bone marrow",
          "Muscular system enables movement through contraction of skeletal, cardiac, and smooth muscle types",
          "Joints connect bones and allow movement with synovial fluid providing lubrication",
          "Tendons connect muscles to bones while ligaments connect bones to other bones",
          "Bone composition includes calcium and phosphate minerals providing strength and density",
          "Muscle contraction requires calcium, ATP, and nervous system stimulation for coordinated movement",
          "Fracture healing involves inflammatory, proliferative, and remodeling phases over months",
          "Musculoskeletal injuries can affect mobility, stability, and overall functional capacity"
        ],
        clinicalPearls: [
          "Adults have 206 bones with long bones containing growth plates until skeletal maturity",
          "Muscle strength graded 0-5 scale with 5/5 representing normal strength against resistance",
          "Joint range of motion assessment identifies limitations and potential injury",
          "Compartment syndrome develops when tissue pressure exceeds perfusion pressure"
        ],
        mnemonics: [
          "MUSCLES: Movement assessment, Understanding strength, Stability evaluate, Contractile function, Location of injury, Extremity circulation, Sensation check",
          "SKELETAL: Structure intact, Know anatomy, Examine systematically, Look for deformity, Evaluate function, Test sensation, Assessment complete, Location document"
        ],
        decisionTrees: [
          "Musculoskeletal Assessment → Inspection → Palpation → Range of Motion → Strength Testing → Circulation/Sensation",
          "Fracture Suspicion → Immobilize → Assess Circulation → Pain Management → Transport → Definitive Care"
        ],
        fieldApplications: [
          "Inspect for obvious deformity, swelling, or discoloration",
          "Palpate bones and joints for tenderness and crepitus",
          "Assess circulation, sensation, and motor function distal to injuries",
          "Immobilize suspected fractures to prevent further injury"
        ]
      }
    ],
    criticalConcepts: [
      "Body systems work together to maintain homeostasis and support life functions",
      "Understanding normal anatomy and physiology enables recognition of pathological changes",
      "System integration means dysfunction in one system affects others",
      "Clinical assessment must be systematic and thorough to identify all abnormalities",
      "Age-related changes alter normal values and expected responses"
    ],
    clinicalDecisionRules: [
      "Respiratory Assessment: Rate + Effort + Sounds + Oxygen saturation = Respiratory status",
      "Circulatory Assessment: Heart rate + Blood pressure + Perfusion signs = Cardiac status",
      "Neurological Assessment: Consciousness + Motor + Verbal + Eye response = GCS score"
    ],
    commonMisconceptions: [
      "MYTH: All body systems function independently - FACT: Systems are highly integrated and interdependent",
      "MYTH: Normal vital signs mean no serious illness - FACT: Compensatory mechanisms can maintain normal vitals initially",
      "MYTH: Anatomy is the same for all patients - FACT: Significant age-related and individual variations exist",
      "MYTH: One abnormal finding indicates the primary problem - FACT: Multiple system assessment required for complete picture"
    ],
    examTips: [
      "Body system questions often test integration and cascade effects",
      "Anatomy questions may include variations by age group",
      "Physiology questions focus on normal values and compensatory mechanisms",
      "Assessment questions emphasize systematic approach and interpretation"
    ],
    crossReferences: [
      "Chapter 5: Medical Terminology Foundations - anatomical terminology application",
      "Chapter 7: Life Span Development - age-related anatomical variations",
      "Chapter 10: Comprehensive Patient Evaluation - systematic assessment approach",
      "All clinical chapters - anatomical foundation for understanding pathology"
    ],
    flashcards: [
      { front: "What is the normal adult respiratory rate?", back: "12-20 breaths per minute", category: "clinical" },
      { front: "What is normal cardiac output?", back: "4-6 liters per minute", category: "clinical" },
      { front: "What is the normal pulse pressure range?", back: "30-40 mmHg (systolic minus diastolic)", category: "clinical" },
      { front: "What Glasgow Coma Scale score indicates severe brain injury?", back: "GCS less than 8", category: "clinical" },
      { front: "What is normal capillary refill time?", back: "Less than 2 seconds", category: "clinical" },
      { front: "What is homeostasis?", back: "Body's ability to maintain stable internal environment", category: "definition" },
      { front: "What connects muscles to bones?", back: "Tendons", category: "definition" },
      { front: "What connects bones to bones?", back: "Ligaments", category: "definition" },
      { front: "How many bones do adults have?", back: "206 bones", category: "definition" },
      { front: "What is the difference between ventilation and respiration?", back: "Ventilation moves air; respiration is cellular gas exchange", category: "definition" },
      { front: "What primarily controls respiratory drive?", back: "Carbon dioxide levels, not oxygen", category: "clinical" },
      { front: "What indicates respiratory distress?", back: "Accessory muscle use and increased work of breathing", category: "clinical" },
      { front: "What is stroke volume?", back: "Amount of blood pumped by heart with each contraction", category: "definition" },
      { front: "What protects nervous tissue from toxins?", back: "Blood-brain barrier", category: "definition" },
      { front: "What scale grades muscle strength?", back: "0-5 scale with 5/5 being normal strength", category: "clinical" }
    ]
  };*/

  /*const chapter7StudyNotes: ChapterData = {
    title: "Chapter 7: Life Span Development & Age-Related Care",
    description: "Comprehensive understanding of human development across the lifespan with age-specific assessment and treatment considerations for emergency medical care",
    module: "2",
    scope: "EMT-B",
    protocols: ["Age-Specific Assessment", "Developmental Considerations", "Pediatric Protocols", "Geriatric Adaptations", "Family-Centered Care", "Age-Appropriate Communication"],
    learningObjectives: [
      "Identify normal physical, cognitive, and psychosocial development across all life stages",
      "Apply age-appropriate assessment techniques and communication strategies for different populations",
      "Recognize age-related variations in vital signs, anatomy, and physiological responses",
      "Understand unique medical conditions and emergency presentations by age group",
      "Implement family-centered care approaches appropriate for developmental stage",
      "Adapt treatment protocols and equipment selection based on patient age and development"
    ],
    keyTerms: [
      "Neonate",
      "Infant",
      "Toddler",
      "Preschooler",
      "School Age",
      "Adolescent",
      "Young Adult",
      "Middle Adult",
      "Older Adult",
      "Geriatric",
      "Growth",
      "Development",
      "Milestones",
      "Fontanelles",
      "Stranger Anxiety",
      "Separation Anxiety",
      "Cognitive Development",
      "Psychosocial Development",
      "Physical Development",
      "Fine Motor Skills",
      "Gross Motor Skills",
      "Language Development",
      "Social Development",
      "Moral Development",
      "Puberty",
      "Menopause",
      "Senescence",
      "Polypharmacy",
      "Activities of Daily Living",
      "Instrumental Activities"
    ],
    sections: [
      {
        title: "Infant and Toddler Development (0-3 Years)",
        content: [
          "Neonates (0-1 month) have immature organ systems requiring specialized assessment and care approaches",
          "Infants (1 month-1 year) show rapid physical growth with doubling birth weight by 6 months",
          "Fontanelles remain open until 12-18 months providing access for intracranial pressure assessment",
          "Toddlers (1-3 years) develop autonomy while requiring constant supervision due to risk-taking behaviors",
          "Respiratory rates highest in this age group: neonates 30-60, infants 25-50, toddlers 20-30 per minute",
          "Heart rates elevated: neonates 120-160, infants 80-140, toddlers 80-130 beats per minute",
          "Blood pressure systems not fully developed requiring age-appropriate cuff sizing",
          "Communication primarily through crying in infants progressing to simple words in toddlers"
        ],
        clinicalPearls: [
          "Infants cannot regulate temperature effectively making hypothermia a significant risk",
          "Dehydration develops rapidly in infants due to higher fluid requirements per body weight",
          "Stranger anxiety peaks around 8-10 months making assessment challenging",
          "Toddler injuries often result from exploration behaviors and lack of danger awareness"
        ],
        mnemonics: [
          "INFANT: Immature systems, Needs frequent feeding, Fontanelles open, Assessment gentle, No temperature control, Temperature monitor closely",
          "TODDLER: Toileting learning, Outdoor supervision, Dangerous behaviors, Development rapid, Language emerging, Exploration constant, Requires patience"
        ],
        decisionTrees: [
          "Infant Assessment → Observe Before Touch → Assess Vital Signs → Check Fontanelles → Look for Fever → Family History",
          "Toddler Emergency → Calm Approach → Parent Present → Age-Appropriate Equipment → Gentle Handling → Distraction Techniques"
        ],
        fieldApplications: [
          "Use pediatric equipment sizing charts for accurate fit",
          "Allow parents to hold child during assessment when possible",
          "Assess fontanelles for bulging or depression indicating intracranial issues",
          "Monitor for signs of dehydration including sunken fontanelles and decreased skin turgor"
        ]
      },
      {
        title: "School Age and Adolescent Development (4-18 Years)",
        content: [
          "Preschoolers (3-6 years) develop language skills and begin following multi-step instructions",
          "School age children (6-12 years) show steady growth and development of logical thinking",
          "Adolescents (12-18 years) experience puberty with dramatic physical and emotional changes",
          "Vital signs gradually approach adult values throughout childhood and adolescence",
          "School age children can participate in assessment and understand explanations of procedures",
          "Adolescents desire privacy and independence while still requiring parental involvement",
          "Risk-taking behaviors increase during adolescence due to brain development patterns",
          "Body image concerns and peer pressure significantly influence adolescent behavior and compliance"
        ],
        clinicalPearls: [
          "School age children fear permanent injury and benefit from reassurance about healing",
          "Adolescents may hide substance use, sexual activity, or mental health issues from parents",
          "Growth spurts during adolescence can affect medication dosing and equipment sizing",
          "Modesty and privacy become increasingly important from school age onward"
        ],
        mnemonics: [
          "SCHOOL: Safety education, Cooperative with treatment, Home and family stable, Organized thinking, Opportunities for choices, Logical explanations helpful",
          "ADOLESCENT: Autonomy seeking, Development rapid, Opinions strong, Lifestyles risky, Education about consequences, Social pressures, Career planning, Environment peer-influenced, No child anymore, Trust building important"
        ],
        decisionTrees: [
          "School Age Care → Explain Procedures → Allow Choices → Include in Assessment → Provide Reassurance → Family Support",
          "Adolescent Care → Respect Privacy → Direct Communication → Address Concerns → Confidentiality Issues → Family Dynamics"
        ],
        fieldApplications: [
          "Explain procedures in age-appropriate language before performing",
          "Offer choices when possible to promote cooperation",
          "Respect modesty with appropriate draping and positioning",
          "Consider interviewing adolescents separately from parents for sensitive issues"
        ]
      },
      {
        title: "Adult Development and Aging Process (18+ Years)",
        content: [
          "Young adults (18-40 years) generally healthy with peak physical performance and few medical conditions",
          "Middle adults (40-65 years) experience gradual physiological changes and increased chronic disease risk",
          "Older adults (65+ years) show significant individual variation in health status and functional capacity",
          "Aging process affects all body systems with gradual decline in reserve capacity",
          "Cardiovascular changes include decreased cardiac output and increased blood pressure",
          "Respiratory changes involve decreased lung capacity and efficiency",
          "Neurological changes may affect reaction time, memory, and sensory function",
          "Musculoskeletal changes include bone density loss and muscle mass reduction"
        ],
        clinicalPearls: [
          "Older adults may present atypically with serious conditions like myocardial infarction",
          "Medication interactions increase significantly with polypharmacy in older adults",
          "Falls are leading cause of injury in adults over 65 with high morbidity and mortality",
          "Cognitive assessment must distinguish between normal aging and pathological conditions"
        ],
        mnemonics: [
          "AGING: Assessment thorough, Gradual changes, Increased medication risks, Normal variations wide, Goals maintain function",
          "OLDER: Optimal function goal, Listen carefully, Dignity maintain, Evaluate thoroughly, Respect autonomy"
        ],
        decisionTrees: [
          "Adult Assessment → Medical History → Current Medications → Functional Status → Social Support → Risk Factors",
          "Geriatric Emergency → Assess Baseline Function → Check Medications → Evaluate Mental Status → Consider Atypical Presentation"
        ],
        fieldApplications: [
          "Obtain comprehensive medication list including over-the-counter drugs",
          "Assess functional status and activities of daily living",
          "Consider multiple diagnoses as older adults often have several conditions",
          "Communicate clearly and allow extra time for responses"
        ]
      },
      {
        title: "Special Considerations and Family Dynamics",
        content: [
          "Family-centered care involves family members as partners in healthcare decisions and support",
          "Cultural considerations affect development expectations and healthcare preferences",
          "Developmental disabilities require individualized assessment approaches and communication strategies",
          "Chronic illness impacts normal developmental progression and family dynamics",
          "End-of-life care considerations vary by age group and family circumstances",
          "Child abuse and elder abuse recognition requires understanding of normal development patterns",
          "Communication strategies must adapt to cognitive abilities and emotional development",
          "Social determinants of health significantly impact development and health outcomes across lifespan"
        ],
        clinicalPearls: [
          "Family presence during medical emergencies can reduce anxiety in patients of all ages",
          "Cultural competence improves communication and treatment compliance",
          "Developmental delays may affect ability to cooperate with assessment and treatment",
          "Signs of abuse may be subtle and require high index of suspicion"
        ],
        mnemonics: [
          "FAMILY: Focus on patient needs, Assessment includes family, Maintain communication, Involve appropriately, Learn preferences, Year-round support",
          "CULTURE: Consider beliefs, Understand practices, Language preferences, Traditions respect, Understand worldview, Religious considerations, Education culturally appropriate"
        ],
        decisionTrees: [
          "Family Involvement → Assess Dynamics → Determine Decision Makers → Include Appropriately → Communicate Effectively",
          "Cultural Sensitivity → Learn Background → Respect Beliefs → Adapt Communication → Include Cultural Preferences"
        ],
        fieldApplications: [
          "Include family members in age-appropriate ways during emergency care",
          "Adapt communication style to patient's cognitive and emotional development",
          "Recognize when family dynamics may be affecting patient care",
          "Consider cultural factors when developing treatment and transport plans"
        ]
      }
    ],
    criticalConcepts: [
      "Normal development varies widely between individuals while following predictable patterns",
      "Age-appropriate care requires understanding of physical, cognitive, and emotional development",
      "Vital signs and normal values change significantly across the lifespan",
      "Family dynamics and cultural factors significantly influence healthcare experiences",
      "Communication strategies must adapt to developmental stage and individual capabilities"
    ],
    clinicalDecisionRules: [
      "Pediatric Vital Signs: Use age-appropriate normal ranges for assessment and intervention decisions",
      "Family Involvement: Include family in age-appropriate ways while respecting patient autonomy",
      "Communication Level: Match explanation complexity to patient's cognitive developmental stage"
    ],
    commonMisconceptions: [
      "MYTH: All children develop at the same rate - FACT: Significant individual variation exists within normal ranges",
      "MYTH: Older adults always have multiple medical problems - FACT: Many older adults maintain good health",
      "MYTH: Teenagers always rebel against medical advice - FACT: Most respond well to respectful, honest communication",
      "MYTH: Families always help in medical emergencies - FACT: Family dynamics can sometimes complicate care"
    ],
    examTips: [
      "Vital sign questions often test age-specific normal ranges",
      "Development questions focus on major milestones and variations",
      "Communication questions emphasize age-appropriate strategies",
      "Family dynamics questions test understanding of developmental needs"
    ],
    crossReferences: [
      "Chapter 6: Human Body Systems - physiological changes with aging",
      "Chapter 34: Pediatric Emergency Protocols - specific pediatric care applications",
      "Chapter 35: Geriatric Care Considerations - detailed older adult considerations",
      "Chapter 10: Comprehensive Patient Evaluation - age-specific assessment techniques"
    ],
    flashcards: [
      { front: "What is the normal heart rate range for neonates?", back: "120-160 beats per minute", category: "clinical" },
      { front: "What is the normal respiratory rate for infants?", back: "25-50 breaths per minute", category: "clinical" },
      { front: "When do fontanelles typically close?", back: "12-18 months", category: "clinical" },
      { front: "What age group shows stranger anxiety?", back: "Infants around 8-10 months", category: "definition" },
      { front: "What defines a neonate?", back: "0-1 month of age", category: "definition" },
      { front: "What defines a toddler?", back: "1-3 years of age", category: "definition" },
      { front: "When does puberty typically begin?", back: "Ages 12-18 years (adolescence)", category: "clinical" },
      { front: "What is polypharmacy?", back: "Taking multiple medications, common in older adults", category: "definition" },
      { front: "What age group has the highest respiratory rates?", back: "Neonates (30-60 breaths per minute)", category: "clinical" },
      { front: "What is separation anxiety?", back: "Distress when separated from primary caregiver, common in infants/toddlers", category: "definition" },
      { front: "What defines older adult/geriatric age?", back: "65+ years of age", category: "definition" },
      { front: "What is the leading cause of injury in adults over 65?", back: "Falls", category: "clinical" },
      { front: "What might affect medication dosing in adolescents?", back: "Growth spurts and rapid physical changes", category: "clinical" },
      { front: "Why can't infants regulate temperature effectively?", back: "Immature thermoregulatory systems", category: "clinical" },
      { front: "What is family-centered care?", back: "Involving family members as partners in healthcare decisions and support", category: "definition" }
    ]
  };

  const chapter3DuplicateToDelete: ChapterData = {
    title: "Chapter 3: EMS Law & Ethical Practice",
    description: "Evidence-based workforce safety protocols and wellness strategies for emergency medical professionals",
    module: "1",
    scope: "EMT-B",
    learningObjectives: [
      "Assess unique occupational hazards in emergency medical services",
      "Apply stress management techniques and resilience-building strategies", 
      "Distinguish between adaptive (eustress) and maladaptive (distress) stress responses",
      "Implement evidence-based nutrition and fitness protocols for shift workers",
      "Execute proper body mechanics and injury prevention techniques",
      "Apply infection control principles and standard precautions",
      "Select and use appropriate Personal Protective Equipment (PPE)",
      "Recognize signs of burnout, PTSD, and compassion fatigue",
      "Demonstrate professional communication in emotionally charged situations",
      "Practice cultural competency and ethical decision-making"
    ],
    keyTerms: [
      "Eustress vs. Distress",
      "Allostatic Load", 
      "Wellness Continuum",
      "Resilience Factors",
      "Circadian Rhythm Disruption",
      "Pathogen Transmission Routes",
      "Standard Precautions",
      "PPE Hierarchy",
      "Critical Incident Stress Management (CISM)",
      "Secondary Traumatic Stress",
      "Burnout Syndrome",
      "Compassion Fatigue",
      "Cultural Humility",
      "Scope of Practice"
    ],
    protocols: [
      "Standard Precautions Protocol",
      "PPE Selection and Donning/Doffing",
      "Exposure Control Plan",
      "Critical Incident Stress Debriefing",
      "Fitness for Duty Assessment",
      "Workplace Violence Prevention"
    ],
    sections: [
      {
        title: "🎯 Occupational Hazards in EMS",
        content: [
          "**Statistical Reality**: 84% of first responders experience traumatic events; 34% develop depression/PTSD",
          "**Suicide Risk**: EMS professionals have 1.39x higher suicide rate vs. general population",
          "**Primary Risk Categories**: Infectious disease exposure, musculoskeletal injuries, vehicle accidents, violence exposure",
          "**Injury Statistics**: 50% higher rate of non-fatal occupational injuries than other healthcare workers"
        ],
        clinicalPearls: [
          "EMS workers are 2.5x more likely to be injured than police officers",
          "Back injuries account for 60% of all EMS workplace injuries",
          "Night shift workers have 30% higher injury rates"
        ],
        fieldApplications: [
          "Pre-shift equipment check reduces injury risk by 40%",
          "Crew resource management prevents 70% of preventable errors",
          "Proper scene size-up identifies 90% of safety hazards"
        ]
      },
      {
        title: "⚖️ Stress Management & Resilience",
        content: [
          "**Eustress vs. Distress**: Beneficial stress improves performance; harmful stress degrades function",
          "**Allostatic Load**: Cumulative physiological wear from chronic stress exposure",
          "**Resilience Factors**: Social support, self-efficacy, optimism, problem-solving skills",
          "**Warning Signs**: Sleep disturbances, appetite changes, irritability, substance use"
        ],
        mnemonics: [
          "**TEAM approach to stress**: Talk about it, Exercise regularly, Avoid alcohol/drugs, Maintain relationships",
          "**HALT check**: Hungry, Angry, Lonely, Tired - address these basic needs first"
        ],
        decisionTrees: [
          "If experiencing 3+ stress symptoms for >2 weeks → Seek EAP or mental health support",
          "If using substances to cope → Immediate intervention required"
        ]
      },
      {
        title: "🦠 Infection Control & PPE",
        content: [
          "**Transmission Routes**: Contact (direct/indirect), Droplet, Airborne, Vector-borne",
          "**Standard Precautions**: Treat all body fluids as potentially infectious",
          "**PPE Hierarchy**: Hand hygiene → Gloves → Eye protection → Mask/respirator → Gown",
          "**High-Risk Exposures**: Blood, CSF, synovial, pleural, pericardial, peritoneal fluids"
        ],
        clinicalPearls: [
          "Hand hygiene prevents 50% of healthcare-associated infections",
          "N95 respirators filter 95% of particles ≥0.3 microns",
          "Gloves must be changed between patients - never reused"
        ],
        commonPitfalls: [
          "❌ Touching face with contaminated gloves",
          "❌ Improper mask fit (allows 50% leakage)",
          "❌ Not removing PPE in proper sequence"
        ]
      },
      {
        title: "💪 Physical Wellness & Injury Prevention",
        content: [
          "**Proper Lifting**: Power zone (waist-shoulder height), avoid twisting, team lifts >50 lbs",
          "**Sleep Hygiene**: 7-9 hours minimum, consistent schedule, dark/cool environment",
          "**Nutrition**: Complex carbs for sustained energy, hydrate 8-10 glasses water/day",
          "**Fitness Standards**: Cardiovascular endurance, functional strength, flexibility"
        ],
        mnemonics: [
          "**BACK safety**: Bend your knees, Avoid twisting, Close to body, Keep back straight",
          "**SLEEP**: Schedule consistent, Light exposure morning, Exercise regularly, Evening routine, Phone/screens off"
        ],
        fieldApplications: [
          "Proper lifting prevents 80% of back injuries",
          "Pre-shift stretching reduces injury risk by 25%",
          "Team lifts required for patients >125 lbs"
        ]
      }
    ],
    criticalConcepts: [
      "🚨 **Exposure Protocol**: Immediately wash with soap/water, report to supervisor within 2 hours, seek medical evaluation",
      "🧠 **Mental Health**: Seeking help is strength, not weakness - 40% of first responders never seek treatment",
      "⚖️ **Work-Life Balance**: Burnout affects patient care quality and increases medical errors by 300%",
      "👥 **Team Safety**: Look out for crew members - 60% of LODD are preventable with proper safety protocols"
    ],
    clinicalDecisionRules: [
      "**PPE Selection**: Airborne precautions for TB, measles, varicella; Droplet for flu, meningitis; Contact for MRSA, C.diff",
      "**Fitness for Duty**: Unable to perform essential functions safely = off duty until cleared by medical provider",
      "**Stress Intervention**: Immediate defusing after critical incidents; formal debriefing within 24-72 hours"
    ],
    commonMisconceptions: [
      "❌ \"I'm immune to stress\" - Everyone is susceptible to cumulative stress effects",
      "❌ \"PPE slows me down\" - Proper PPE use actually improves efficiency and confidence",
      "❌ \"Asking for help shows weakness\" - 90% of successful first responders use support systems"
    ],
    examTips: [
      "📝 Know PPE donning/doffing sequence: Gown → Mask → Goggles → Gloves | Remove: Gloves → Goggles → Gown → Mask",
      "📝 Understand hepatitis transmission: HBV can survive on surfaces 7+ days, requires vaccination",
      "📝 Memorize stress warning signs: Changes in sleep, appetite, mood, performance, relationships"
    ],
    crossReferences: [
      "→ Chapter 10: Patient assessment includes scene safety evaluation",
      "→ Chapter 11: Airway management requires infection control measures", 
      "→ Medication protocols: Stress affects decision-making and drug calculations"
    ],
    flashcards: [
      { front: "What is the difference between eustress and distress?", back: "Eustress is beneficial stress that improves performance; distress is harmful stress that degrades function", category: "definition" },
      { front: "What percentage of first responders experience traumatic events?", back: "84% of first responders experience traumatic events", category: "clinical" },
      { front: "What is the proper PPE donning sequence?", back: "Gown → Mask → Goggles → Gloves", category: "protocol" },
      { front: "What is the proper PPE doffing sequence?", back: "Gloves → Goggles → Gown → Mask (mask removed last)", category: "protocol" },
      { front: "What does the TEAM mnemonic stand for in stress management?", back: "Talk about it, Exercise regularly, Avoid alcohol/drugs, Maintain relationships", category: "clinical" },
      { front: "What does the BACK safety mnemonic represent?", back: "Bend your knees, Avoid twisting, Close to body, Keep back straight", category: "protocol" },
      { front: "What are the four main transmission routes for pathogens?", back: "Contact (direct/indirect), Droplet, Airborne, Vector-borne", category: "definition" },
      { front: "What is allostatic load?", back: "Cumulative physiological wear from chronic stress exposure", category: "definition" },
      { front: "When should team lifts be used?", back: "For patients over 125 lbs or objects over 50 lbs", category: "protocol" },
      { front: "What is the HALT check for stress assessment?", back: "Hungry, Angry, Lonely, Tired - address these basic needs first", category: "clinical" },
      { front: "How long can Hepatitis B virus survive on surfaces?", back: "7+ days, which is why vaccination is required", category: "clinical" },
      { front: "What percentage of healthcare-associated infections does hand hygiene prevent?", back: "50% of healthcare-associated infections", category: "clinical" },
      { front: "What are the high-risk body fluids requiring standard precautions?", back: "Blood, CSF, synovial, pleural, pericardial, peritoneal fluids", category: "protocol" },
      { front: "When should critical incident stress debriefing occur?", back: "Formal debriefing within 24-72 hours after critical incidents", category: "protocol" },
      { front: "What percentage of first responders never seek mental health treatment?", back: "40% of first responders never seek treatment despite needing it", category: "clinical" }
    ]
  };*/

  // Module 2 Chapters
  /*const chapter8StudyNotes: ChapterData = {
    title: "Chapter 8: Patient Movement & Handling",
    description: "Proper body mechanics, patient positioning, and safe patient transport techniques with emphasis on ergonomic principles and injury prevention",
    module: "2",
    scope: "EMT-B",
    protocols: ["Body Mechanics", "Patient Positioning", "Emergency Moves", "Non-Emergency Moves", "Equipment Operation", "Spinal Immobilization"],
    learningObjectives: [
      "Demonstrate proper body mechanics and lifting techniques to prevent injury",
      "Select appropriate patient moving and positioning methods based on patient condition",
      "Perform emergency and non-emergency patient moves safely and efficiently",
      "Operate patient transport equipment properly and safely"
    ],
    keyTerms: [
      "Body Mechanics",
      "Power Grip",
      "Power Lift",
      "Emergency Move",
      "Non-Emergency Move",
      "Urgent Move",
      "Direct Ground Lift",
      "Extremity Lift",
      "Draw Sheet Method",
      "Blanket Drag",
      "Clothes Drag",
      "Firefighter's Carry",
      "Cradle Carry",
      "Pack Strap Carry",
      "Piggyback Carry",
      "Two-Person Carry",
      "Chair Carry",
      "Stair Chair",
      "Scoop Stretcher",
      "Basket Stretcher",
      "Flexible Stretcher",
      "Backboard",
      "Vacuum Mattress",
      "Recovery Position",
      "Trendelenburg Position",
      "Fowler's Position",
      "Semi-Fowler's Position",
      "Shock Position"
    ],
    sections: [
      {
        title: "Body Mechanics and Injury Prevention",
        content: [
          "Proper body mechanics are essential for preventing back injuries, which account for 37% of EMS worker injuries annually",
          "The power grip involves all fingers and thumb gripping firmly with hands at least 10 inches apart",
          "Power lift technique: feet shoulder-width apart, back straight, lift with legs not back",
          "Never lift more than 125 pounds per person - use additional personnel or mechanical devices",
          "Maintain natural curves of spine - avoid twisting while lifting",
          "Get as close as possible to patient before lifting to reduce stress on spine",
          "Communicate clearly with team members using standardized commands: 'Lift on 3: 1, 2, 3, lift'",
          "Take breaks between lifts to prevent fatigue-related injuries"
        ],
        clinicalPearls: [
          "Back injuries are the leading cause of EMT career-ending injuries",
          "Proper lifting technique reduces spine compression by up to 50%",
          "Team lifting with 4 people reduces individual load by 75%",
          "Fatigue increases injury risk by 300% - recognize when to use mechanical aids"
        ],
        mnemonics: [
          "LIFT: Legs up, In close, Feet apart, Team communication",
          "SAFE: Squat down, Abdominals tight, Feet apart, Everyone lifts together"
        ],
        decisionTrees: [
          "Patient Weight Assessment → <125 lbs (2 person lift) → 125-250 lbs (4 person lift) → >250 lbs (mechanical device required)",
          "Injury Risk → High risk position → Use additional personnel → Consider mechanical aids → Execute with proper technique"
        ],
        fieldApplications: [
          "Always assess patient weight and your team's capabilities before attempting lift",
          "Use stair chair for narrow staircases - never attempt manual carry on stairs",
          "Cold weather increases muscle stiffness - take extra time to warm up",
          "Wet conditions require extra caution and additional personnel"
        ]
      },
      {
        title: "Emergency vs Non-Emergency Moves",
        content: [
          "Emergency moves used only when immediate danger exists: fire, explosion, structural collapse",
          "Urgent moves when patient condition requires rapid transport but no immediate environmental danger",
          "Non-emergency moves are planned, controlled movements with spinal precautions maintained",
          "Emergency moves may cause spinal injury but are necessary when delay would be fatal",
          "Always consider whether scene safety allows for spinal immobilization",
          "Document rationale for emergency move in patient care report",
          "Three-person spinal immobilization move is preferred when time permits"
        ],
        clinicalPearls: [
          "Emergency moves should take <30 seconds to execute",
          "Only 3% of trauma patients have unstable spinal injuries, but treat all as potential",
          "Rapid extrication increases mortality by 15% compared to controlled removal",
          "Environmental hazards cause more EMS deaths than patient care complications"
        ],
        mnemonics: [
          "FIRE: Fast movement, Immediate danger, Rapid extrication, Emergency justification",
          "SAFE: Scene assessment, All clear, Formal immobilization, Executed properly"
        ],
        decisionTrees: [
          "Scene Assessment → Immediate danger (fire/explosion/collapse) → Emergency move → Otherwise → Assess patient stability → Urgent vs non-emergency move",
          "Spinal Injury Concern → High mechanism → Full immobilization → Low mechanism → Consider selective immobilization"
        ],
        fieldApplications: [
          "Vehicle fires require immediate removal regardless of potential spinal injury",
          "Combative patients may require rapid moves to prevent further injury",
          "Mass casualty incidents often require urgent moves to access other patients",
          "Indoor scenes with structural damage require continuous assessment of stability"
        ]
      },
      {
        title: "Patient Positioning and Transport",
        content: [
          "Recovery position (lateral recumbent) for unconscious patients without spinal injury",
          "Fowler's position (45-60° elevation) for respiratory distress patients",
          "Semi-Fowler's (30° elevation) for cardiac patients and mild respiratory distress",
          "Trendelenburg position contraindicated in modern EMS - may worsen outcomes",
          "Shock position: supine with legs elevated 6-12 inches if no contraindications",
          "Left lateral recumbent for pregnant patients >20 weeks to prevent supine hypotensive syndrome",
          "Transport position must consider patient comfort, clinical condition, and monitoring needs"
        ],
        clinicalPearls: [
          "Trendelenburg position can increase intracranial pressure and worsen pulmonary edema",
          "Fowler's position reduces work of breathing by 25% in CHF patients",
          "Pregnant patients develop supine hypotensive syndrome after 20 weeks gestation",
          "Recovery position prevents aspiration in unconscious patients without spinal injury"
        ],
        mnemonics: [
          "FOWLER: Forty-five degrees, Oxygenation improved, Working breathing easier, Lung expansion, Enhanced ventilation, Reduced distress",
          "POSITION: Patient comfort, Optimal monitoring, Spinal considerations, Injury pattern, Transport time, Interventions needed, Ongoing assessment, Never compromise safety"
        ],
        decisionTrees: [
          "Conscious Level → Unconscious + no spinal injury → Recovery position → Conscious → Assess respiratory status → Position accordingly",
          "Respiratory Distress → Severe → High Fowler's → Mild → Semi-Fowler's → None → Comfort position"
        ],
        fieldApplications: [
          "Stroke patients should remain supine unless actively vomiting",
          "Chest pain patients often prefer semi-Fowler's for comfort and monitoring",
          "Hypotensive patients may not tolerate elevation - reassess after position change",
          "Long transport times require position adjustments for pressure relief"
        ]
      },
      {
        title: "Equipment Operation and Maintenance",
        content: [
          "Daily equipment checks prevent 95% of transport device failures",
          "Stretcher weight capacity: standard 350 lbs, bariatric 650-1000 lbs",
          "Stair chair maximum weight 300 lbs - verify patient weight before use",
          "Scoop stretcher allows patient pickup without rolling but requires proper sizing",
          "Basket stretcher for wilderness or rope rescue operations",
          "Vacuum mattresses conform to patient shape and provide excellent immobilization",
          "All equipment must be cleaned and disinfected between patients",
          "Document equipment malfunctions and report immediately"
        ],
        clinicalPearls: [
          "Equipment failure during transport increases morbidity by 400%",
          "Improper stretcher height causes 60% of back injuries in EMS",
          "Scoop stretcher gaps can cause tissue entrapment - check alignment",
          "Stair chairs tip over when weight exceeds manufacturer specifications"
        ],
        mnemonics: [
          "INSPECT: Is it clean, Need repairs, Safe operation, Properly aligned, Equipment tested, Check weight limits, Test all functions",
          "MAINTAIN: Monthly inspection, All functions tested, Immediate repairs, Never ignore problems, Take out of service if unsafe, Always document, In proper condition, Never compromise safety"
        ],
        decisionTrees: [
          "Equipment Check → Daily inspection → Problems found → Take out of service → No problems → Ready for use → Document check",
          "Patient Weight → <300 lbs → Standard equipment → 300-650 lbs → Bariatric equipment → >650 lbs → Multiple personnel/special equipment"
        ],
        fieldApplications: [
          "Stretcher height should allow EMT to work without bending over",
          "Lock all wheels before patient transfer to prevent rolling",
          "Test electronic controls before each shift - have manual backup plan",
          "Clean equipment immediately after contamination to prevent damage"
        ]
      }
    ],
    criticalConcepts: [
      "Proper body mechanics prevent injury - use legs, not back for lifting",
      "Emergency moves only justified by immediate life threat to patient or crew",
      "Patient positioning directly affects respiratory and circulatory function",
      "Equipment failure during transport creates serious patient safety risks",
      "Team communication essential for safe patient movement"
    ],
    clinicalDecisionRules: [
      "Emergency Move Criteria: Fire, explosion, unable to access other patients, unable to provide life-saving care in current position",
      "Spinal Immobilization Decision: High-energy mechanism OR neurological deficit OR spinal pain/tenderness OR altered mental status",
      "Equipment Selection: Patient weight + clinical condition + transport environment + crew capabilities"
    ],
    commonMisconceptions: [
      "MYTH: Trendelenburg position improves blood pressure in shock - FACT: May worsen outcomes by increasing ICP and pulmonary congestion",
      "MYTH: Emergency moves always cause spinal injury - FACT: When properly executed, risk is acceptable given alternative of death",
      "MYTH: Stronger EMTs should always do the lifting - FACT: Proper technique matters more than strength",
      "MYTH: Scoop stretchers can be used for all patients - FACT: Contraindicated in suspected pelvic fractures"
    ],
    examTips: [
      "Questions often focus on when emergency moves are justified - remember immediate life threats only",
      "Body mechanics questions emphasize legs for power, not back",
      "Positioning questions test knowledge of respiratory and cardiac benefits",
      "Equipment questions focus on weight limits and proper inspection procedures"
    ],
    crossReferences: [
      "Chapter 2: Workforce Safety - relates to injury prevention",
      "Chapter 10: Patient Assessment - positioning affects assessment ability", 
      "Chapter 31: Spinal Injuries - immobilization techniques",
      "Chapter 32: Orthopedic Injuries - movement considerations"
    ],
    flashcards: [
      { front: "What is the power grip technique?", back: "All fingers and thumb grip firmly with hands at least 10 inches apart", category: "definition" },
      { front: "When are emergency moves justified?", back: "Fire, explosion, structural collapse, or inability to access life-threatening conditions", category: "protocol" },
      { front: "What is the maximum weight for a 2-person lift?", back: "125 pounds per person (250 total)", category: "protocol" },
      { front: "What position is best for respiratory distress?", back: "Fowler's position (45-60 degree elevation)", category: "clinical" },
      { front: "What is the recovery position used for?", back: "Unconscious patients without spinal injury to prevent aspiration", category: "clinical" },
      { front: "Why avoid Trendelenburg position?", back: "Can increase ICP and worsen pulmonary edema", category: "clinical" },
      { front: "What is supine hypotensive syndrome?", back: "Decreased blood pressure in pregnant patients >20 weeks when lying supine", category: "clinical" },
      { front: "What is the weight limit for a stair chair?", back: "300 pounds", category: "protocol" },
      { front: "How should you communicate during team lifts?", back: "Clear commands: 'Lift on 3: 1, 2, 3, lift'", category: "protocol" },
      { front: "What causes most EMS worker injuries?", back: "Back injuries (37% of all EMS injuries)", category: "clinical" },
      { front: "When should scoop stretchers NOT be used?", back: "Suspected pelvic fractures - can cause tissue entrapment", category: "clinical" },
      { front: "What is Semi-Fowler's position?", back: "30 degree elevation - used for cardiac patients and mild respiratory distress", category: "definition" },
      { front: "How much should legs be elevated in shock position?", back: "6-12 inches if no contraindications present", category: "protocol" },
      { front: "What increases injury risk by 300%?", back: "Fatigue - recognize when to use mechanical aids", category: "clinical" },
      { front: "What is the clothes drag technique?", back: "Emergency move pulling patient by clothing around shoulders", category: "definition" }
    ]
  };*/

  /*const chapter9StudyNotes: ChapterData = {
    title: "Chapter 9: Interprofessional EMS Teams",
    description: "Interprofessional collaboration, communication systems, and team dynamics in emergency medical services with emphasis on effective patient care coordination",
    module: "2", 
    scope: "EMT-B",
    protocols: ["Team Communication", "Hospital Transfer", "ICS Integration", "Quality Improvement", "Professional Development", "Interprofessional Collaboration"],
    learningObjectives: [
      "Demonstrate effective communication with healthcare team members",
      "Understand roles and responsibilities within the EMS system",
      "Apply teamwork principles to optimize patient care outcomes",
      "Participate in quality improvement and continuing education activities"
    ],
    keyTerms: [
      "Interprofessional Collaboration",
      "Chain of Command", 
      "Scope of Practice",
      "Standard of Care",
      "Quality Improvement",
      "Continuing Education",
      "Peer Review",
      "Clinical Guidelines",
      "Evidence-Based Practice",
      "Team Dynamics",
      "Communication Hierarchy",
      "Situational Awareness",
      "Closed-Loop Communication",
      "SBAR Communication",
      "Handoff Report", 
      "Transfer of Care",
      "Medical Direction",
      "Online Medical Control",
      "Offline Medical Control",
      "Standing Orders",
      "Protocols",
      "Quality Assurance",
      "Continuous Quality Improvement",
      "Root Cause Analysis",
      "Incident Command System",
      "Multi-Agency Response",
      "Unified Command",
      "Professional Development",
      "Competency Maintenance"
    ],
    sections: [
      {
        title: "Healthcare Team Structure and Roles",
        content: [
          "EMS operates within integrated healthcare system including hospitals, rehabilitation, public health",
          "Chain of command establishes clear authority and communication pathways",
          "Scope of practice defines legal boundaries for each healthcare provider level",
          "EMT-B scope includes basic life support, patient assessment, and emergency care",
          "Medical director provides clinical oversight and protocol development",
          "Quality assurance monitors care quality and identifies improvement opportunities",
          "Each team member has specific roles that complement overall patient care",
          "Understanding roles prevents duplication of effort and improves efficiency"
        ],
        clinicalPearls: [
          "Clear role definition reduces medical errors by 45% in emergency settings",
          "EMTs function under medical director's license - must follow protocols exactly",
          "Scope creep (performing outside scope) creates liability and patient safety risks",
          "Team communication errors cause 60% of preventable adverse events"
        ],
        mnemonics: [
          "TEAM: Together Everyone Achieves More",
          "ROLES: Responsibility, Oversight, Legal boundaries, Effective communication, Scope definition"
        ],
        decisionTrees: [
          "Scope Question → Is intervention within EMT-B scope → Yes → Follow protocol → No → Consult medical control or higher-level provider",
          "Chain of Command → Direct supervisor → Medical director → Hospital command → Administration"
        ],
        fieldApplications: [
          "Always identify yourself and credentials when joining healthcare team",
          "Clarify expectations when working with unfamiliar team members",
          "Respect scope limitations - ask for help rather than exceeding authority",
          "Document team member roles and actions in patient care report"
        ]
      },
      {
        title: "Effective Communication Systems",
        content: [
          "SBAR (Situation, Background, Assessment, Recommendation) provides structured communication framework",
          "Closed-loop communication confirms message received and understood correctly",
          "Handoff reports must include critical patient information and intervention history",
          "Radio communication follows standardized protocols to ensure clarity",
          "Written documentation supplements verbal communication for continuity",
          "Cultural competence improves communication with diverse patients and families",
          "Technology integration includes electronic health records and mobile devices",
          "Emergency communication systems must function during disasters and system failures"
        ],
        clinicalPearls: [
          "SBAR communication reduces medical errors by 30% during patient transfers",
          "Closed-loop communication catches 85% of communication errors before patient impact",
          "Poor handoff communication causes 80% of preventable patient safety events",
          "Standard terminology prevents misunderstandings in high-stress situations"
        ],
        mnemonics: [
          "SBAR: Situation, Background, Assessment, Recommendation",
          "COMMUNICATE: Clear message, Open listening, Make eye contact, Multiple confirmation, Understanding verified, Never assume, Include all team, Clarify questions, Address concerns, Transfer complete, Everyone informed"
        ],
        decisionTrees: [
          "Communication Issue → Clarify message → Confirm understanding → Document interaction → Follow up as needed",
          "Language Barrier → Use interpreter services → Avoid family translation → Confirm understanding → Document language needs"
        ],
        fieldApplications: [
          "Practice SBAR format during routine transfers to build competency",
          "Use read-back technique for all critical communications",
          "Speak clearly and avoid medical jargon with patients and families",
          "Document communication attempts and outcomes in patient record"
        ]
      },
      {
        title: "Quality Improvement and Professional Development",
        content: [
          "Continuous quality improvement (CQI) uses data to identify and address care gaps",
          "Peer review provides constructive feedback on patient care performance",
          "Continuing education maintains competency and introduces new practices",
          "Evidence-based practice integrates research findings with clinical experience",
          "Professional development includes formal education and skill enhancement",
          "Quality metrics include response times, clinical outcomes, and patient satisfaction",
          "Root cause analysis identifies system factors contributing to adverse events",
          "Professional organizations provide networking and continuing education opportunities"
        ],
        clinicalPearls: [
          "Services with active QI programs show 25% better patient outcomes",
          "Continuing education requirements vary by state but typically 24-48 hours biennially",
          "Peer feedback is most effective when focused on specific, observable behaviors",
          "Research shows EMT skills decay without regular practice and education"
        ],
        mnemonics: [
          "IMPROVE: Identify problems, Measure outcomes, Plan interventions, Review results, Ongoing assessment, Verify effectiveness, Everyone participates",
          "LEARN: Look for opportunities, Engage in education, Apply new knowledge, Reflect on practice, Network with colleagues"
        ],
        decisionTrees: [
          "Quality Issue → Identify problem → Analyze causes → Develop solutions → Implement changes → Measure results → Sustain improvements",
          "Learning Need → Assess knowledge gaps → Identify resources → Engage in education → Apply to practice → Evaluate effectiveness"
        ],
        fieldApplications: [
          "Participate actively in case review sessions and quality meetings",
          "Seek feedback from supervisors and experienced colleagues",
          "Maintain log of continuing education activities for recertification",
          "Apply research findings to improve patient care practices"
        ]
      },
      {
        title: "Multi-Agency Coordination and ICS Integration",
        content: [
          "Incident Command System (ICS) provides standardized approach to emergency management",
          "Multi-agency responses require clear communication and coordination protocols", 
          "Unified command allows multiple agencies to work together effectively",
          "Resource management prevents duplication and ensures adequate coverage",
          "Information sharing between agencies improves situational awareness",
          "Training exercises prepare teams for large-scale emergency response",
          "Mutual aid agreements provide additional resources during major incidents",
          "After-action reviews identify lessons learned and improvement opportunities"
        ],
        clinicalPearls: [
          "ICS reduces response time and improves coordination by 40% in major incidents",
          "Multi-agency training exercises improve real-world performance significantly",
          "Clear command structure prevents freelancing and improves safety",
          "Resource typing ensures appropriate capabilities are deployed to incidents"
        ],
        mnemonics: [
          "ICS: Incident command, Coordination system, Standardized approach",
          "COORDINATE: Communication clear, Objectives shared, Organize resources, Roles defined, Deploy appropriately, Information shared, Never work alone, Assess continuously, Team approach, Everyone accountable"
        ],
        decisionTrees: [
          "Multi-Agency Scene → Establish command → Define roles → Communicate objectives → Coordinate actions → Debrief afterward",
          "Resource Request → Assess needs → Contact appropriate agency → Coordinate deployment → Monitor effectiveness → Return when complete"
        ],
        fieldApplications: [
          "Report to incident command when arriving at multi-agency scenes",
          "Use clear, concise communication on emergency radio channels",
          "Stay within assigned role unless directed otherwise by command",
          "Participate in post-incident critiques to identify improvements"
        ]
      }
    ],
    criticalConcepts: [
      "Effective teamwork requires clear communication and defined roles",
      "EMT scope of practice must be strictly adhered to for legal and safety reasons", 
      "Quality improvement is ongoing process requiring active participation",
      "Professional development maintains competency and improves patient care",
      "Multi-agency coordination improves emergency response effectiveness"
    ],
    clinicalDecisionRules: [
      "Communication Protocol: Use SBAR format for all patient handoffs and critical communications",
      "Scope of Practice Decision: When in doubt, consult medical control or defer to higher-level provider",
      "Quality Issue Response: Report safety concerns immediately through established channels"
    ],
    commonMisconceptions: [
      "MYTH: EMTs work independently without oversight - FACT: Function under medical director supervision with strict protocols",
      "MYTH: Quality improvement is optional - FACT: Required for accreditation and professional competence",
      "MYTH: Communication skills are innate - FACT: Require training and practice to develop proficiency",
      "MYTH: Team roles are flexible in emergencies - FACT: Role clarity becomes more important under stress"
    ],
    examTips: [
      "Questions focus on appropriate scope of practice and when to seek guidance",
      "Communication scenarios test SBAR format and closed-loop techniques",
      "Quality improvement questions emphasize continuous learning and feedback",
      "Team dynamic questions assess understanding of roles and hierarchy"
    ],
    crossReferences: [
      "Chapter 2: Responder Safety & Resilience - relates to team safety culture",
      "Chapter 1: EMS System Fundamentals - overall system integration",
      "Chapter 10: Comprehensive Patient Evaluation - team assessment strategies",
      "Chapter 4: Emergency Communication Protocols - technical communication skills"
    ],
    flashcards: [
      { front: "What does SBAR stand for?", back: "Situation, Background, Assessment, Recommendation", category: "definition" },
      { front: "What is closed-loop communication?", back: "Confirming orders by repeating back what was heard", category: "definition" },
      { front: "What defines EMT scope of practice?", back: "Legal boundaries for interventions EMTs can perform", category: "definition" },
      { front: "Who provides clinical oversight for EMTs?", back: "Medical director", category: "protocol" },
      { front: "What is the purpose of quality improvement?", back: "Use data to identify and address gaps in patient care", category: "clinical" },
      { front: "What causes 60% of preventable adverse events?", back: "Team communication errors", category: "clinical" },
      { front: "How much do medical errors reduce with clear role definition?", back: "45% reduction in emergency settings", category: "clinical" },
      { front: "What is root cause analysis?", back: "Process to identify system factors contributing to adverse events", category: "definition" },
      { front: "What does ICS stand for?", back: "Incident Command System", category: "definition" },
      { front: "What improves response coordination by 40%?", back: "ICS implementation in major incidents", category: "clinical" },
      { front: "How often is continuing education typically required?", back: "24-48 hours every two years (varies by state)", category: "protocol" },
      { front: "What reduces medical errors by 30% during transfers?", back: "SBAR communication format", category: "clinical" },
      { front: "What is evidence-based practice?", back: "Integrating research findings with clinical experience", category: "definition" },
      { front: "What prevents freelancing at emergency scenes?", back: "Clear command structure and defined roles", category: "protocol" },
      { front: "What is peer review used for?", back: "Providing constructive feedback on patient care performance", category: "definition" }
    ]
  };*/

  // Placeholder data for other chapters (keeping existing structure)
  /*const chapter10StudyNotes: ChapterData = {
    title: "Chapter 10: Comprehensive Patient Evaluation",
    description: "Systematic patient assessment protocols with clinical decision-making frameworks for comprehensive patient evaluation",
    module: "3",
    scope: "EMT-B",
    protocols: ["Primary Assessment", "Secondary Assessment", "SAMPLE History", "OPQRST", "Vital Signs", "Reassessment"],
    learningObjectives: [
      "Perform systematic primary and secondary patient assessments",
      "Obtain accurate vital signs and interpret clinical significance", 
      "Apply effective history-taking techniques using standardized approaches",
      "Demonstrate proper reassessment intervals and trending techniques"
    ],
    keyTerms: [
      "Primary Assessment",
      "Secondary Assessment", 
      "AVPU Scale",
      "SAMPLE History",
      "OPQRST Method",
      "Chief Complaint",
      "History of Present Illness",
      "Trending",
      "DCAP-BTLS",
      "Baseline Vitals",
      "Reassessment"
    ],
    sections: [
      {
        title: "🎯 Scene Safety and Initial Assessment",
        content: [
          "**Scene Size-up**: BSI (Body Substance Isolation), scene safety, nature of illness/mechanism of injury, number of patients, additional resources",
          "**General Impression**: Forms within 60 seconds based on patient appearance, work of breathing, and circulation status",
          "**Primary Assessment Priority**: Identify and treat immediate life threats using ABCDE approach",
          "**Mental Status Assessment**: Uses AVPU scale - Alert, Verbal, Pain, Unresponsive with Glasgow Coma Scale backup"
        ],
        clinicalPearls: [
          "Trust your initial gut feeling - 'sick vs. not sick' impression is 85% accurate",
          "Address life threats immediately when identified during primary assessment",
          "Scene safety is ongoing - continuously reassess throughout call"
        ],
        mnemonics: [
          "**ABCDE**: Airway, Breathing, Circulation, Disability (neuro), Exposure/Environment",
          "**AVPU**: Alert, Verbal response, Pain response, Unresponsive"
        ]
      },
      {
        title: "📊 Vital Signs Assessment and Interpretation", 
        content: [
          "**Blood Pressure**: Normal adult 90-140/60-90 mmHg, obtained with proper cuff size (40% arm circumference)",
          "**Pulse Assessment**: Rate 60-100/min adult, rhythm regular/irregular, quality strong/weak/thready",
          "**Respiratory Rate**: 12-20/min adult, observe depth, effort, and pattern discretely",
          "**Temperature**: Normal 97.8-99.1°F (36.5-37.3°C), route affects accuracy"
        ],
        clinicalPearls: [
          "Pulse pressure (systolic - diastolic) >40 mmHg indicates good cardiac function",
          "Count respirations when patient unaware for most accurate rate",
          "Blood pressure cuff too small gives falsely high readings"
        ],
        fieldApplications: [
          "Practice one-handed BP technique for efficiency",
          "Master pulse assessment in various positions and conditions",
          "Develop systematic vital signs routine for consistency"
        ]
      },
      {
        title: "📝 History Taking - SAMPLE and OPQRST",
        content: [
          "**SAMPLE Components**: Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading up",
          "**OPQRST Pain Assessment**: Onset, Provocation/Palliation, Quality, Region/Radiation, Severity (1-10 scale), Time/Timing",
          "**Communication Techniques**: Open-ended questions first, then specific closed-ended for details",
          "**Documentation Standards**: Use patient's exact words in quotes when possible"
        ],
        mnemonics: [
          "**SAMPLE**: Signs/symptoms, Allergies, Medications, Past history, Last intake, Events",
          "**OPQRST**: Onset, Provocation, Quality, Region, Severity, Time"
        ],
        commonPitfalls: [
          "❌ Leading questions that suggest answers to patient",
          "❌ Interrupting patient's initial story",
          "❌ Failing to clarify vague responses"
        ]
      },
      {
        title: "🔍 Secondary Assessment - Head-to-Toe Examination",
        content: [
          "**DCAP-BTLS Assessment**: Deformities, Contusions, Abrasions, Penetrating injuries, Burns, Tenderness, Lacerations, Swelling",
          "**Systematic Approach**: Head → Neck → Chest → Abdomen → Pelvis → Extremities → Posterior",
          "**Inspection vs. Palpation**: Look first, then feel - explain procedures to gain cooperation",
          "**Focused Assessment**: Target specific areas based on chief complaint and mechanism"
        ],
        clinicalPearls: [
          "Watch patient's facial expressions during palpation for pain responses",
          "Compare bilateral findings for asymmetry and abnormalities", 
          "Document negative findings as well as positive ones"
        ],
        mnemonics: [
          "**DCAP-BTLS**: Deformities, Contusions, Abrasions, Penetrating injuries, Burns, Tenderness, Lacerations, Swelling"
        ]
      },
      {
        title: "🔄 Reassessment and Trending",
        content: [
          "**Reassessment Intervals**: Every 5 minutes for critical/unstable patients, every 15 minutes for stable patients",
          "**Trending Concept**: Serial vital signs reveal improvement, deterioration, or stability patterns",
          "**Intervention Monitoring**: Assess patient response to treatments and adjust care accordingly",
          "**Communication**: Report significant changes to receiving facility during transport"
        ],
        clinicalPearls: [
          "Look for trends rather than isolated abnormal values",
          "Reassess immediately after any intervention to evaluate effectiveness",
          "Consider patient's baseline when interpreting vital signs"
        ],
        fieldApplications: [
          "Establish baseline vitals before interventions when possible",
          "Document times of assessments and interventions for trending",
          "Practice efficient reassessment techniques during transport"
        ]
      }
    ],
    criticalConcepts: [
      "🚨 **Life Threats First**: Primary assessment identifies and treats immediate threats to life - airway, breathing, circulation",
      "📈 **Trending is Key**: Single vital signs are snapshots; trends reveal the patient's trajectory",
      "🎯 **Systematic Approach**: Consistent assessment method prevents missing critical findings",
      "⏰ **Time Sensitivity**: Reassessment intervals based on patient acuity ensure appropriate monitoring"
    ],
    clinicalDecisionRules: [
      "**Primary Assessment**: If life threat identified → treat immediately before continuing assessment",
      "**Reassessment Timing**: Critical patients every 5 min, stable patients every 15 min",
      "**Vital Signs Trending**: 3+ sets of vitals needed to establish meaningful trends"
    ],
    commonMisconceptions: [
      "❌ \"Normal vitals mean patient is stable\" - Consider overall clinical picture",
      "❌ \"Secondary assessment needed for all patients\" - Focus on chief complaint and findings", 
      "❌ \"One abnormal vital sign is diagnostic\" - Look for patterns and trends"
    ],
    examTips: [
      "📝 Know normal vital sign ranges for all age groups",
      "📝 Understand when to perform rapid vs. focused assessment",
      "📝 Practice SAMPLE and OPQRST until automatic"
    ],
    crossReferences: [
      "→ Chapter 2: Scene safety principles apply to all patient encounters",
      "→ Chapter 11: Airway assessment is first priority in primary assessment",
      "→ Chapter 17: Cardiovascular assessment techniques for chest pain patients"
    ],
    flashcards: [
      { front: "What does SAMPLE stand for?", back: "Signs/Symptoms, Allergies, Medications, Past history, Last meal, Events leading up", category: "protocol" },
      { front: "What does OPQRST assess?", back: "Onset, Provocation, Quality, Region, Severity, Time", category: "protocol" },
      { front: "What does AVPU measure?", back: "Alert, Verbal, Pain, Unresponsive (mental status)", category: "protocol" },
      { front: "What are the ABCs of primary assessment?", back: "Airway, Breathing, Circulation", category: "protocol" },
      { front: "What is the purpose of secondary assessment?", back: "Detailed head-to-toe examination for non-life-threatening conditions", category: "definition" },
      { front: "When is rapid trauma assessment indicated?", back: "Significant mechanism of injury or altered mental status", category: "protocol" },
      { front: "What vital signs are assessed in adults?", back: "Pulse, respirations, blood pressure, temperature, oxygen saturation", category: "clinical" },
      { front: "What is normal adult respiratory rate?", back: "12-20 breaths per minute", category: "clinical" },
      { front: "What is normal adult pulse rate?", back: "60-100 beats per minute", category: "clinical" },
      { front: "What blood pressure is considered hypertensive?", back: "Systolic >140 or diastolic >90 mmHg", category: "clinical" },
      { front: "What is the chief complaint?", back: "Patient's primary reason for seeking medical attention", category: "definition" },
      { front: "What information does SAMPLE history provide?", back: "Medical background and current condition context", category: "clinical" },
      { front: "What is trending in patient assessment?", back: "Monitoring changes in patient condition over time", category: "definition" },
      { front: "When should reassessment occur?", back: "Every 5 minutes for unstable, every 15 minutes for stable patients", category: "protocol" },
      { front: "What is the purpose of OPQRST?", back: "Systematic pain and symptom assessment", category: "definition" }
    ]
  };*/

  /*const chapter11StudyNotes: ChapterData = {
    title: "Chapter 11: Advanced Airway Interventions",
    description: "Advanced airway management techniques with evidence-based protocols for maintaining patent airways and effective ventilation",
    module: "4", 
    scope: "EMT-B",
    protocols: ["Basic Airway Management", "Advanced Airway Techniques", "Ventilation Support", "Airway Obstruction Management"],
    learningObjectives: [
      "Apply systematic approach to airway assessment and management",
      "Demonstrate proper use of airway adjuncts and ventilation devices",
      "Recognize and manage airway obstructions",
      "Implement age-appropriate airway management techniques"
    ],
    keyTerms: ["Airway Obstruction", "BVM", "OPA", "NPA", "Ventilation", "Hypoxia", "Stridor", "Patent Airway"],
    criticalConcepts: [
      "Airway management is the highest priority in patient care",
      "A patent airway must be maintained at all times",
      "Ventilation and oxygenation are essential for cellular function"
    ],
    clinicalDecisionRules: [
      "Use OPA only in unconscious patients without gag reflex",
      "Choose NPA for conscious patients or when OPA is contraindicated",
      "BVM ventilation: 10-12 breaths/min adults, 12-20 breaths/min pediatric"
    ],
    commonMisconceptions: [
      "Higher oxygen is always better (can cause oxygen toxicity)",
      "All unconscious patients need airway adjuncts",
      "BVM ventilation should be forceful (causes gastric distention)"
    ],
    examTips: [
      "Know contraindications for each airway adjunct",
      "Understand proper sizing techniques for OPA and NPA",
      "Remember age-specific ventilation rates and techniques"
    ],
    sections: [
      {
        title: "Airway Anatomy and Physiology",
        content: [
          "**Upper airway** includes nose, mouth, pharynx, and larynx, serving to warm, filter, and humidify inspired air.",
          "**Lower airway** consists of trachea, bronchi, bronchioles, and alveoli where gas exchange occurs.",
          "**Anatomical considerations** include tongue as most common airway obstruction, especially in unconscious patients.",
          "**Respiratory drive** is controlled by medulla oblongata responding to CO2 levels (hypercapnic drive) and backup hypoxic drive in COPD patients."
        ],
        clinicalPearls: [
          "Tongue falls backward in unconscious supine patients",
          "Children have proportionally larger heads and tongues",
          "Elderly patients may have dentures that can obstruct airways"
        ],
        mnemonics: [
          "**DOPE**: Displaced tube, Obstruction, Pneumothorax, Equipment failure (troubleshooting ventilation problems)"
        ]
      },
      {
        title: "Basic Airway Management Techniques", 
        content: [
          "**Head-tilt chin-lift** is primary technique for non-trauma patients to open airway by lifting tongue off posterior pharynx.",
          "**Jaw-thrust maneuver** maintains cervical spine alignment in trauma patients while opening airway.",
          "**Recovery position** (lateral recumbent) prevents aspiration in unconscious patients with patent airway.",
          "**Suction techniques** remove secretions, blood, and vomitus using rigid (Yankauer) or flexible catheters."
        ],
        clinicalPearls: [
          "Never hyperextend neck in suspected spinal injury",
          "Suction no longer than 15 seconds adults, 10 seconds children",
          "Position yourself at patient's head for optimal airway control"
        ],
        decisionTrees: [
          "Unconscious patient → Check responsiveness → Open airway → Assess breathing → Insert adjunct if needed → Ventilate if required"
        ],
        fieldApplications: [
          "Practice head positioning on various surfaces and angles",
          "Master one-handed BVM technique for single-rescuer scenarios",
          "Develop muscle memory for rapid suction setup and use"
        ]
      },
      {
        title: "Airway Adjuncts and Ventilation Devices",
        content: [
          "**Oropharyngeal airway (OPA)** prevents tongue from obstructing airway in unconscious patients without gag reflex.",
          "**Nasopharyngeal airway (NPA)** provides airway patency in conscious or semi-conscious patients with intact gag reflex.",
          "**Bag-valve-mask (BVM)** provides positive pressure ventilation with 90-100% oxygen when reservoir bag attached.",
          "**Oxygen delivery devices** include nasal cannula (2-6 L/min), non-rebreather mask (10-15 L/min), and BVM (15 L/min)."
        ],
        clinicalPearls: [
          "Proper OPA size: corner of mouth to earlobe",
          "Proper NPA size: nostril to earlobe, diameter smaller than nostril",
          "Two-person BVM technique provides better seal and ventilation",
          "Watch for gastric distention with excessive BVM pressure"
        ],
        commonPitfalls: [
          "Using OPA in conscious patients causes vomiting",
          "Forcing oversized NPA causes nosebleeds",
          "Single-person BVM often provides inadequate ventilation"
        ]
      },
      {
        title: "Airway Obstruction Recognition and Management",
        content: [
          "**Partial obstruction** presents with stridor, difficulty speaking, and accessory muscle use but maintains some air movement.",
          "**Complete obstruction** shows inability to speak, absent breath sounds, and universal choking sign (hands to throat).",
          "**Foreign body removal** uses back blows and abdominal thrusts (Heimlich maneuver) for conscious patients.",
          "**Unconscious obstruction management** includes CPR with visualization for foreign body before each ventilation attempt."
        ],
        clinicalPearls: [
          "Stridor indicates significant airway narrowing",
          "Tripod position suggests respiratory distress",
          "Don't attempt blind finger sweeps in children",
          "Laryngeal spasm can cause sudden complete obstruction"
        ],
        mnemonics: [
          "**FBAO**: Foreign Body Airway Obstruction management protocol"
        ]
      },
      {
        title: "Pediatric Airway Considerations", 
        content: [
          "**Anatomical differences** include proportionally larger occiput, larger tongue, more anterior larynx, and smaller airway diameter.",
          "**Positioning modifications** require shoulder roll or towel under shoulders rather than head extension.",
          "**Equipment sizing** uses age-based formulas or length-based tapes (Broselow) for proper adjunct selection.",
          "**Ventilation rates** are higher: 12-20 breaths per minute for children, 20-30 for infants."
        ],
        clinicalPearls: [
          "Children's airways narrow more quickly with swelling",
          "Crying can worsen airway obstruction in children",
          "Pediatric BVM requires gentler pressures to prevent lung injury",
          "Consider parental presence to reduce child anxiety"
        ]
      }
    ],
    flashcards: [
      { front: "When is an OPA contraindicated?", back: "In conscious patients with intact gag reflex", category: "protocol" },
      { front: "What does OPA stand for?", back: "Oropharyngeal airway (oral airway)", category: "definition" },
      { front: "What does NPA stand for?", back: "Nasopharyngeal airway (nasal airway)", category: "definition" },
      { front: "When is an NPA contraindicated?", back: "Suspected skull fracture or severe facial trauma", category: "protocol" },
      { front: "What does BVM stand for?", back: "Bag-valve-mask (manual ventilation device)", category: "definition" },
      { front: "What is the proper BVM ventilation rate for adults?", back: "10-12 breaths per minute", category: "protocol" },
      { front: "What is the head-tilt chin-lift maneuver?", back: "Basic airway opening technique for non-trauma patients", category: "protocol" },
      { front: "What is the jaw-thrust maneuver?", back: "Airway opening technique for suspected spinal injury", category: "protocol" },
      { front: "What are signs of airway obstruction?", back: "Stridor, difficulty speaking, cyanosis, use of accessory muscles", category: "clinical" },
      { front: "What is the recovery position?", back: "Lateral recumbent position for unconscious patients with patent airway", category: "protocol" },
      { front: "What oxygen concentration does a BVM deliver?", back: "90-100% with reservoir bag attached", category: "clinical" },
      { front: "How do you size an OPA?", back: "Measure from corner of mouth to earlobe", category: "protocol" },
      { front: "How do you size an NPA?", back: "Measure from nostril to earlobe", category: "protocol" },
      { front: "What is the sniffing position?", back: "Optimal head position for intubation - neck flexed, head extended", category: "protocol" },
      { front: "What indicates effective BVM ventilation?", back: "Chest rise, good mask seal, appropriate rate and volume", category: "clinical" }
    ]
  };*/

  /*const chapter12StudyNotes: ChapterData = {
    title: "Chapter 12: Medication Administration Essentials",
    description: "Comprehensive guide to safe medication administration, pharmacology principles, and EMT-B scope of practice in medication management",
    module: "5",
    scope: "EMT-B",
    protocols: ["Six Rights", "Medication Safety", "Adverse Reactions", "Documentation", "Scope of Practice"],
    learningObjectives: [
      "Understand basic principles of pharmacology and drug actions",
      "Identify the components of a medication order and prescription",
      "Demonstrate knowledge of medication routes of administration",
      "Apply the 'Six Rights' of medication administration safely",
      "Recognize and manage adverse drug reactions and side effects",
      "Understand EMT-B scope of practice regarding medication administration",
      "Calculate basic medication dosages and perform unit conversions",
      "Properly document medication administration and patient responses"
    ],
    keyTerms: [
      "Pharmacology",
      "Pharmacokinetics",
      "Pharmacodynamics",
      "Indication",
      "Contraindication",
      "Side Effect",
      "Adverse Reaction",
      "Tolerance",
      "Allergy",
      "Generic Name",
      "Trade Name",
      "Bioavailability",
      "Half-Life",
      "Therapeutic Index",
      "Six Rights",
      "Route of Administration",
      "Enteral",
      "Parenteral",
      "Sublingual",
      "Intramuscular",
      "Intravenous",
      "Subcutaneous",
      "Oral Glucose",
      "Activated Charcoal",
      "Aspirin",
      "Nitroglycerin",
      "Epinephrine",
      "Auto-injector",
      "Medical Direction",
      "Scope of Practice"
    ],
    sections: [
      {
        title: "Basic Principles of Pharmacology",
        content: [
          "Pharmacology is the study of drugs and their effects on living organisms",
          "Chemical name describes molecular structure (rarely used clinically)",
          "Generic name is the official non-proprietary name (lowercase)",
          "Trade/Brand name is the manufacturer's marketing name (capitalized)",
          "Example: acetaminophen (generic) vs. Tylenol® (trade name)",
          "Pharmacokinetics describes what the body does to a drug (ADME)",
          "Absorption: Drug entry into bloodstream from administration site",
          "Distribution: Drug transport throughout body via circulation",
          "Metabolism: Chemical alteration of drug, primarily in liver",
          "Excretion: Drug elimination from body, primarily through kidneys",
          "Pharmacodynamics describes what a drug does to the body",
          "Mechanism of action: How drug produces its therapeutic effect",
          "Dose-response relationship: Effect intensity related to dose",
          "Therapeutic window: Dose range between minimum effective and toxic levels"
        ],
        clinicalPearls: [
          "Generic drugs contain same active ingredient as brand names",
          "Bioavailability is percentage of administered drug reaching systemic circulation",
          "First-pass effect occurs when liver metabolizes drug before reaching systemic circulation",
          "Individual variations in drug response due to age, weight, genetics, disease states"
        ],
        mnemonics: [
          "ADME: Absorption, Distribution, Metabolism, Excretion",
          "For drug names: Chemical (Complex), Generic (Given), Trade (Titled)"
        ]
      },
      {
        title: "Medication Orders and Routes of Administration",
        content: [
          "Medication orders must include patient ID, date/time, drug name, dose, route, frequency",
          "Enteral routes go through GI tract: oral (PO), sublingual (SL), rectal (PR)",
          "Oral route is most common but has slow onset due to first-pass metabolism",
          "Sublingual route provides rapid absorption and bypasses liver metabolism",
          "Parenteral routes bypass GI tract: IV, IM, SC, ID, IO",
          "Intravenous (IV) provides immediate effect with direct bloodstream access",
          "Intramuscular (IM) injection into muscle tissue with moderate onset",
          "Subcutaneous (SC) injection into fatty tissue with slower onset",
          "Intraosseous (IO) provides emergency IV alternative through bone marrow",
          "Other routes include inhalation, topical, transdermal, ophthalmic, otic, nasal",
          "Route selection depends on desired onset, patient condition, and drug properties",
          "Proper storage requires attention to temperature, light, moisture, expiration dates"
        ],
        clinicalPearls: [
          "IV onset: seconds to minutes; IM onset: 15-30 minutes; PO onset: 30-60 minutes",
          "Sublingual nitroglycerin bypasses liver for rapid cardiac effect",
          "IO access provides same circulation access as IV in emergency situations",
          "Controlled substances require special storage and documentation"
        ],
        mnemonics: [
          "Routes: Enteral (Eating), Parenteral (Piercing)",
          "IV timing: Immediate, IM: Minutes, PO: Much longer"
        ]
      },
      {
        title: "The Six Rights of Medication Administration",
        content: [
          "Right Patient: Verify identity using two identifiers (name and DOB minimum)",
          "Always check patient identification band when available",
          "Ask patient to state name and birth date for verification",
          "Right Medication: Compare medication label to order three times",
          "Check when removing from storage, preparing, and before administration",
          "Be aware of look-alike/sound-alike medications",
          "Right Dose: Calculate dosage carefully and double-check calculations",
          "Consider patient's weight, age, and condition in dosing",
          "Right Route: Verify intended route and use proper technique",
          "Ensure medication is appropriate for chosen route",
          "Right Time: Administer at prescribed intervals considering drug action",
          "Account for emergency situations requiring immediate administration",
          "Right Documentation: Record immediately after administration",
          "Include all six rights, patient response, and any adverse effects"
        ],
        clinicalPearls: [
          "Never assume patient identity - always verify with two identifiers",
          "When in doubt about medication, dosage, or route - don't give it",
          "Documentation should occur immediately after administration, never before",
          "Some add 'Right Reason' and 'Right Response' as additional rights"
        ],
        mnemonics: [
          "Six Rights: Patient, Pill, Parts (dose), Path (route), Period (time), Paper (documentation)"
        ]
      },
      {
        title: "EMT-B Scope of Practice for Medications",
        content: [
          "EMTs can administer: Oxygen, activated charcoal, oral glucose, aspirin",
          "Oxygen indicated for any patient with suspected hypoxia or respiratory distress",
          "Activated charcoal for certain poisoning cases per protocol",
          "Oral glucose for conscious patients with hypoglycemia and intact gag reflex",
          "Aspirin for suspected cardiac events if not contraindicated",
          "EMTs can assist with patient's own prescribed medications with medical direction",
          "Auto-injector medications: Patient's own epinephrine, insulin pens",
          "Nitroglycerin assistance for chest pain with proper blood pressure",
          "Metered-dose inhalers for respiratory distress per protocol",
          "Must verify medication belongs to patient and check expiration",
          "Obtain medical direction approval when required by protocol",
          "Work within established scope of practice and local protocols"
        ],
        clinicalPearls: [
          "Patient's own medications are generally safer than carrying additional drugs",
          "Always check for medication allergies before administration",
          "Medical direction provides both online orders and offline protocols",
          "Specific protocols vary by jurisdiction and medical director"
        ],
        mnemonics: [
          "EMT can give: OAGA (Oxygen, Activated charcoal, Aspirin, Glucose)",
          "Assist with: Patient's Own Prescribed Pills (POPP)"
        ]
      },
      {
        title: "Drug Calculations and Safety",
        content: [
          "Basic calculations use metric system as primary measurement",
          "Common conversions: 1000 mg = 1 g, 1000 mL = 1 L",
          "Formula method: (Desired dose × Vehicle) ÷ Available dose",
          "Pediatric dosing usually based on body weight (mg/kg)",
          "Always double-check calculations and verify with another provider",
          "Understand difference between concentration and total amount",
          "Common medication concentrations: mg/mL, percentage solutions",
          "Use appropriate measuring devices for accurate dosing",
          "Be familiar with common dosage ranges for medications in scope",
          "When available, use calculators and reference guides for verification"
        ],
        clinicalPearls: [
          "Most medication errors occur during calculation and preparation phases",
          "Pediatric doses require extra attention to weight-based calculations",
          "Percentage solutions: 1% = 10 mg/mL, 0.1% = 1 mg/mL",
          "Always verify final concentration before administration"
        ],
        mnemonics: [
          "Calculation check: Does the Math Make Sense (DMMS)?",
          "Metric conversions: King Henry Died By Drinking Chocolate Milk"
        ]
      },
      {
        title: "Adverse Reactions and Emergency Management",
        content: [
          "Allergic reactions are immune system mediated and potentially life-threatening",
          "Side effects are expected undesirable effects at therapeutic doses",
          "Toxic effects result from overdose or drug accumulation",
          "Mild allergic reactions: skin rash, itching, localized swelling",
          "Moderate reactions: hives, difficulty breathing, nausea/vomiting",
          "Severe anaphylaxis: airway swelling, shock, cardiovascular collapse",
          "Stop medication administration immediately if adverse reaction occurs",
          "Assess and support airway, breathing, circulation as priority",
          "Administer oxygen and establish IV access as indicated",
          "Epinephrine is first-line treatment for severe allergic reactions",
          "Provide supportive care based on presenting symptoms",
          "Transport to appropriate medical facility with early notification"
        ],
        clinicalPearls: [
          "Previous exposure usually required for true allergic reactions",
          "Anaphylaxis can occur within minutes or be delayed up to hours",
          "Have reversal agents and emergency equipment ready before administration",
          "Cross-reactivity between similar medications is possible"
        ],
        mnemonics: [
          "Allergic reaction severity: Mild (skin), Moderate (breathing), Major (shock)",
          "Anaphylaxis management: Stop, Support ABC, Start epinephrine"
        ]
      }
    ],
    criticalConcepts: [
      "The Six Rights of medication administration are fundamental to patient safety",
      "EMT scope of practice varies by jurisdiction - know your local protocols",
      "Allergic reactions can be life-threatening - always obtain allergy history",
      "Documentation must be immediate, complete, and accurate",
      "When in doubt about any medication - consult medical direction",
      "Patient's own prescribed medications require verification and medical direction",
      "Proper calculation and double-checking prevents medication errors",
      "Understanding pharmacokinetics helps predict drug onset and effects"
    ],
    flashcards: [
      { front: "List the 6 Rights of medication administration", back: "Right patient, right medication, right dose, right route, right time, right documentation", category: "definition" },
      { front: "What medications can EMT-B administer independently?", back: "Oxygen, activated charcoal, oral glucose, aspirin (per protocol)", category: "protocol" },
      { front: "What does ADME stand for in pharmacokinetics?", back: "Absorption, Distribution, Metabolism, Excretion", category: "definition" },
      { front: "When is oral glucose contraindicated?", back: "When patient cannot protect airway or has altered mental status with aspiration risk", category: "clinical" },
      { front: "What are the signs of anaphylaxis?", back: "Airway swelling, difficulty breathing, shock, cardiovascular collapse, severe hives", category: "clinical" },
      { front: "How do you verify patient identity?", back: "Use two identifiers: name and date of birth minimum", category: "protocol" },
      { front: "What is the difference between generic and trade names?", back: "Generic is official chemical name (lowercase), trade is manufacturer's brand (capitalized)", category: "definition" },
      { front: "When should you stop medication administration?", back: "Immediately if adverse reaction occurs, patient refuses, or contraindication discovered", category: "protocol" },
      { front: "What routes bypass the GI tract?", back: "Parenteral routes: IV, IM, SC, ID, IO", category: "definition" },
      { front: "What information must be documented after medication administration?", back: "All six rights, time given, patient response, adverse effects, vital signs", category: "protocol" },
      { front: "What is sublingual medication absorption?", back: "Rapid absorption under the tongue that bypasses liver metabolism", category: "clinical" },
      { front: "How often should medication calculations be checked?", back: "Always double-check calculations, verify with another provider when possible", category: "protocol" },
      { front: "What is medical direction's role in medication administration?", back: "Provides online orders and offline protocols/standing orders for EMT medication use", category: "definition" },
      { front: "What medications can EMTs assist patients with?", back: "Patient's own prescribed medications: nitroglycerin, inhalers, auto-injectors (with medical direction)", category: "protocol" },
      { front: "What is the first-line treatment for severe allergic reactions?", back: "Epinephrine (along with airway support and oxygen)", category: "clinical" }
    ],
    crossReferences: [
      "Chapter 11: Airway Management - Oxygen administration techniques and indications",
      "Chapter 17: Cardiovascular Emergencies - Nitroglycerin and aspirin protocols",
      "Chapter 22: Toxicological Emergencies - Activated charcoal administration",
      "Chapter 23: Endocrine Emergencies - Oral glucose for hypoglycemia",
      "Chapter 21: Allergic Reactions - Epinephrine auto-injector assistance"
    ]
  };*/

  /*const chapter13StudyNotes: ChapterData = {
    title: "Chapter 13: Shock Recognition & Response",
    description: "Comprehensive understanding of shock pathophysiology, classification, recognition, and evidence-based prehospital management strategies",
    module: "6",
    scope: "EMT-B",
    protocols: ["Shock Assessment", "Hemorrhage Control", "Fluid Resuscitation", "Perfusion Support", "Rapid Transport"],
    learningObjectives: [
      "Define shock and understand its pathophysiology at the cellular level",
      "Identify the major classifications of shock and their underlying causes",
      "Recognize early and late signs and symptoms of shock progression",
      "Understand compensatory mechanisms the body uses to maintain perfusion",
      "Perform rapid assessment to identify patients in shock",
      "Implement appropriate prehospital management strategies for shock patients",
      "Differentiate between compensated and decompensated shock",
      "Understand the importance of rapid transport and early intervention"
    ],
    keyTerms: [
      "Shock",
      "Perfusion",
      "Hypoperfusion",
      "Compensated Shock",
      "Decompensated Shock",
      "Irreversible Shock",
      "Preload",
      "Afterload",
      "Cardiac Output",
      "Stroke Volume",
      "Systemic Vascular Resistance",
      "Mean Arterial Pressure",
      "Capillary Refill Time",
      "Orthostatic Vitals",
      "Hypovolemic Shock",
      "Cardiogenic Shock",
      "Distributive Shock",
      "Obstructive Shock",
      "Anaphylactic Shock",
      "Neurogenic Shock",
      "Septic Shock",
      "Hemorrhagic Shock",
      "Permissive Hypotension",
      "Fluid Resuscitation",
      "Compensatory Mechanisms",
      "Sympathetic Response",
      "Vasoconstriction",
      "Vasodilation",
      "Cellular Hypoxia",
      "Anaerobic Metabolism",
      "Lactic Acidosis"
    ],
    sections: [
      {
        title: "Pathophysiology and Cellular Effects of Shock",
        content: [
          "Shock is inadequate tissue perfusion resulting in cellular hypoxia and organ dysfunction",
          "Cellular respiration requires continuous oxygen and glucose delivery for ATP production",
          "Aerobic metabolism produces 36 ATP molecules per glucose molecule efficiently",
          "Anaerobic metabolism produces only 2 ATP molecules with lactic acid byproduct",
          "Lactic acid accumulation causes metabolic acidosis and cellular dysfunction",
          "Prolonged hypoperfusion leads to cellular death and multiple organ failure",
          "Compensatory mechanisms attempt to maintain perfusion to vital organs",
          "Sympathetic nervous system activation increases heart rate and vascular tone",
          "Blood is shunted away from non-essential organs to brain, heart, and lungs",
          "Compensatory mechanisms can maintain blood pressure initially (compensated shock)",
          "When compensation fails, blood pressure drops (decompensated shock)",
          "Irreversible shock occurs when cellular damage cannot be reversed"
        ],
        clinicalPearls: [
          "Normal blood pressure does not rule out shock - assess perfusion, not just BP",
          "Young, healthy patients compensate well until they suddenly decompensate",
          "Trending vital signs tells the story better than single measurements",
          "Mental status changes are often the first sign of inadequate brain perfusion"
        ],
        mnemonics: [
          "Shock compensation: Heart rate Up, Vessels tight, Blood shunted Right (to vital organs)",
          "ATP production: Oxygen Yes = 36, Oxygen No = 2"
        ]
      },
      {
        title: "Classifications of Shock",
        content: [
          "Hypovolemic shock: Most common in trauma, caused by blood or fluid loss",
          "External bleeding from trauma, GI bleeding, or surgical losses",
          "Internal bleeding in abdomen, chest, pelvis, or long bone fractures",
          "Fluid losses from vomiting, diarrhea, burns, or heat exhaustion",
          "Cardiogenic shock: Heart failure as primary pump problem",
          "Acute myocardial infarction is the most common cause",
          "Severe arrhythmias, valve problems, or cardiomyopathy can cause pump failure",
          "Distributive shock: Vasodilation causing relative hypovolemia",
          "Septic shock from systemic infection and inflammatory response",
          "Anaphylactic shock from severe allergic reactions",
          "Neurogenic shock from spinal cord injury affecting sympathetic tone",
          "Obstructive shock: Physical obstruction preventing blood flow",
          "Tension pneumothorax compressing heart and great vessels",
          "Cardiac tamponade preventing ventricular filling",
          "Massive pulmonary embolism obstructing pulmonary circulation"
        ],
        clinicalPearls: [
          "Hypovolemic shock requires volume replacement as primary treatment",
          "Cardiogenic shock may worsen with aggressive fluid administration",
          "Distributive shock often requires large volumes of fluid replacement",
          "Obstructive shock may respond dramatically to removal of obstruction"
        ],
        mnemonics: [
          "Shock types: Hypovolemic (Low volume), Cardiogenic (Pump problem), Distributive (Pipes too big), Obstructive (Blocked pipes)",
          "Anaphylaxis ABCs: Airway swelling, Breathing difficulty, Circulation problems"
        ]
      },
      {
        title: "Stages of Shock Progression",
        content: [
          "Stage 1 - Compensated Shock: Blood pressure maintained within normal limits",
          "Compensatory mechanisms working effectively to maintain perfusion",
          "Subtle signs: anxiety, restlessness, mild tachycardia, cool pale skin",
          "Normal mental status but patient may appear anxious or thirsty",
          "Most reversible stage with prompt recognition and intervention",
          "Stage 2 - Decompensated Shock: Compensatory mechanisms beginning to fail",
          "Blood pressure starting to fall, typically systolic <90 mmHg",
          "Marked tachycardia with weak, thready pulse quality",
          "Altered mental status including confusion, agitation, or lethargy",
          "Decreased urine output and delayed capillary refill >2 seconds",
          "Stage 3 - Irreversible Shock: Severe hypotension despite intervention",
          "Multiple organ failure developing with poor prognosis",
          "Severely altered mental status or unconsciousness",
          "Extremely weak or absent peripheral pulses with profound acidosis"
        ],
        clinicalPearls: [
          "Compensated shock can look deceptively stable - don't be fooled by normal BP",
          "Decompensated shock requires aggressive intervention and rapid transport",
          "Irreversible shock has poor outcomes even with hospital interventions",
          "Early recognition and treatment in compensated stage saves lives"
        ],
        mnemonics: [
          "Shock stages: Compensated (Coping), Decompensated (Declining), Irreversible (Irreparable)",
          "Early shock signs: CHIPS (Cool skin, Heart rate up, Irritable/anxious, Pale, Sweaty)"
        ]
      },
      {
        title: "Assessment and Recognition",
        content: [
          "Vital signs may be normal initially in compensated shock",
          "Heart rate typically increased except in neurogenic shock",
          "Blood pressure maintained until decompensation occurs",
          "Respiratory rate increased to compensate for metabolic acidosis",
          "Pulse oximetry may show normal readings despite poor perfusion",
          "Mental status changes: anxiety, restlessness progressing to confusion",
          "Skin assessment: color, temperature, moisture, capillary refill time",
          "Pulse quality progresses from strong to weak and thready",
          "Orthostatic vital signs indicate significant volume depletion",
          "Positive orthostatics: systolic BP drop >20 mmHg or pulse increase >20 bpm",
          "Special considerations for pediatric, elderly, and pregnant patients",
          "Medications may blunt normal compensatory responses in elderly"
        ],
        clinicalPearls: [
          "Orthostatic vitals indicate >1000 mL blood loss when positive",
          "Don't perform orthostatics on obviously unstable trauma patients",
          "Capillary refill >2 seconds suggests poor peripheral perfusion",
          "Pulse quality often more telling than blood pressure in shock assessment"
        ],
        mnemonics: [
          "Perfusion assessment: CAPS (Color, Activity/mental status, Pulse, Skin)",
          "Orthostatic vitals: 20/20 rule (20 mmHg drop in BP or 20 bpm pulse increase)"
        ]
      },
      {
        title: "Prehospital Management Strategies",
        content: [
          "Primary assessment priorities: Airway, Breathing, Circulation, Disability, Exposure",
          "Control external bleeding immediately using direct pressure, tourniquets",
          "Provide high-flow oxygen for all shock patients",
          "Establish large-bore IV access (14-16 gauge) in antecubital fossa",
          "Fluid resuscitation with normal saline or lactated Ringer's solution",
          "Amount and rate of fluids depend on type of shock",
          "Position patient supine, left lateral if pregnant",
          "Prevent heat loss and hypothermia with warming measures",
          "Cardiac monitoring to identify arrhythmias",
          "Pain control considerations if blood pressure stable",
          "Frequent reassessment and monitoring of response to treatment",
          "Rapid transport decision based on patient condition and resources"
        ],
        clinicalPearls: [
          "The best IV is the one that works - don't waste time on perfect access",
          "Control bleeding before fluid resuscitation in hemorrhagic shock",
          "Cardiogenic shock requires cautious fluid administration",
          "Hypothermia worsens coagulopathy and shock outcomes"
        ],
        mnemonics: [
          "Shock management: STOP (Stop bleeding, Temperature control, Oxygen, Pressure support)",
          "IV access: Large and Fast (Large bore, Fast access)"
        ]
      },
      {
        title: "Specific Shock Syndromes",
        content: [
          "Hemorrhagic shock: Control bleeding, permissive hypotension in trauma",
          "Target systolic 80-90 mmHg to limit bleeding until surgical control",
          "Cardiogenic shock: Recognize pulmonary edema, avoid fluid overload",
          "12-lead ECG changes may indicate acute MI",
          "Anaphylactic shock: Remove allergen, epinephrine 0.3-0.5 mg IM",
          "Aggressive airway management may be required",
          "Large volumes of IV fluids often needed",
          "Septic shock: Early recognition, aggressive fluid resuscitation",
          "Source identification and early antibiotic therapy critical",
          "Neurogenic shock: Warm, dry skin below injury level",
          "Heart rate may be normal or slow due to sympathetic disruption",
          "Obstructive shock: Remove obstruction when possible",
          "Tension pneumothorax requires immediate decompression"
        ],
        clinicalPearls: [
          "Epinephrine is first-line treatment for anaphylaxis - don't delay",
          "Permissive hypotension not appropriate with head injury",
          "Neurogenic shock has unique presentation with warm, dry skin",
          "Septic shock can present with warm or cool skin depending on stage"
        ],
        mnemonics: [
          "Anaphylaxis treatment: EAIO (Epinephrine, Airway, IV fluids, Oxygen)",
          "Neurogenic shock: SLOW (Spinal injury, Low/normal heart rate, Ok temperature, Warm skin)"
        ]
      }
    ],
    criticalConcepts: [
      "Shock is a perfusion problem, not just low blood pressure",
      "Early recognition in compensated stage dramatically improves outcomes",
      "Bleeding control takes priority over fluid resuscitation",
      "Different types of shock require different management strategies",
      "Trending vital signs is more important than single measurements",
      "Transport decisions should be based on shock severity and resources",
      "Hypothermia prevention is critical in shock management",
      "Frequent reassessment guides treatment effectiveness"
    ],
    flashcards: [
      { front: "Define shock and name the four main categories", back: "Inadequate tissue perfusion leading to cellular dysfunction. Categories: hypovolemic, cardiogenic, distributive, obstructive", category: "definition" },
      { front: "What are early signs of compensated shock?", back: "Tachycardia, cool pale clammy skin, delayed cap refill, anxiety, thirst; BP may be normal", category: "clinical" },
      { front: "First-line management for hypovolemic shock in trauma", back: "Control external bleeding, airway/oxygen, rapid transport, prevent hypothermia, permissive hypotension if indicated", category: "protocol" },
      { front: "Classic findings suggesting anaphylactic shock", back: "Sudden onset after exposure with hives, swelling, wheezing, hypotension; treat with IM epinephrine", category: "clinical" },
      { front: "How does neurogenic shock differ from hypovolemic shock?", back: "Neurogenic: warm, dry skin below injury, normal-to-slow heart rate. Hypovolemic: cool, pale, clammy with tachycardia", category: "clinical" },
      { front: "What is permissive hypotension?", back: "Maintaining lower-than-normal SBP (80-90 mmHg) in penetrating trauma to limit bleeding until surgical control", category: "protocol" },
      { front: "Key priorities in cardiogenic shock management", back: "Airway/oxygen, avoid fluid overload, consider nitro cautiously, rapid transport to cardiac center", category: "protocol" },
      { front: "Why is temperature management important in shock?", back: "Hypothermia worsens coagulopathy and shock outcomes; prevent heat loss with warming measures", category: "clinical" },
      { front: "What defines positive orthostatic vital signs?", back: "Systolic BP drop >20 mmHg or heart rate increase >20 bpm when moving from lying to standing", category: "definition" },
      { front: "Examples of obstructive shock", back: "Tension pneumothorax, cardiac tamponade, massive pulmonary embolism - support ABCs and rapid transport", category: "clinical" },
      { front: "Red flags indicating decompensated shock", back: "Hypotension, altered mental status, weak/absent pulses, mottled skin, severe dyspnea", category: "clinical" },
      { front: "Epinephrine dosing for anaphylaxis", back: "Adult: 0.3 mg IM lateral thigh; Pediatric: 0.15 mg IM; repeat per protocol while monitoring ABCs", category: "protocol" },
      { front: "Why avoid excessive ventilation in shock?", back: "Hyperventilation decreases venous return and cardiac output; ventilate just enough for adequate oxygenation", category: "clinical" },
      { front: "Early pediatric shock signs often missed", back: "Tachycardia with delayed cap refill and poor perfusion despite normal blood pressure; hypotension is late", category: "clinical" },
      { front: "Tourniquet application key points", back: "Place 2-3 inches above wound, avoid joints, tighten to stop bleeding, note time, don't loosen, document", category: "protocol" }
    ],
    crossReferences: [
      "Chapter 12: Medication Administration - Epinephrine for anaphylactic shock",
      "Chapter 17: Cardiovascular Emergencies - Cardiogenic shock from acute MI",
      "Chapter 21: Allergic Reactions - Anaphylactic shock recognition and treatment",
      "Chapter 31: Bleeding - Hemorrhagic shock and bleeding control techniques",
      "Chapter 34: Spinal Injuries - Neurogenic shock from spinal cord injury"
    ]
  };*/

  /*const chapter14StudyNotes: ChapterData = {
    title: "Chapter 14: BLS Resuscitation Protocols",
    description: "Comprehensive guide to high-quality cardiopulmonary resuscitation, automated external defibrillation, and advanced cardiac life support protocols",
    module: "6",
    scope: "EMT-B",
    protocols: ["CPR Guidelines", "AED Operation", "Chain of Survival", "Team Resuscitation", "Post-ROSC Care"],
    learningObjectives: [
      "Understand the pathophysiology of cardiac arrest and sudden cardiac death",
      "Perform high-quality cardiopulmonary resuscitation (CPR) according to current guidelines",
      "Demonstrate proper use of automated external defibrillator (AED)",
      "Recognize cardiac rhythms that require defibrillation vs. those that do not",
      "Apply the Chain of Survival concept to improve patient outcomes",
      "Modify resuscitation techniques for special populations (pediatric, drowning, etc.)",
      "Understand when to initiate, continue, and terminate resuscitation efforts",
      "Coordinate team-based resuscitation efforts effectively"
    ],
    keyTerms: [
      "Cardiac Arrest",
      "Sudden Cardiac Death",
      "Ventricular Fibrillation",
      "Ventricular Tachycardia",
      "Asystole",
      "Pulseless Electrical Activity",
      "Defibrillation",
      "CPR",
      "AED",
      "Chain of Survival",
      "ROSC",
      "Compressions Fraction",
      "Hands-Off Time",
      "Post-Cardiac Arrest Syndrome",
      "High-Quality CPR",
      "Compression Rate",
      "Compression Depth",
      "Chest Recoil",
      "Shockable Rhythms",
      "Non-Shockable Rhythms",
      "Pulse Check",
      "Rescue Breathing",
      "BLS Algorithm",
      "Team Dynamics",
      "Drowning Resuscitation",
      "Hypothermic Arrest",
      "Traumatic Arrest",
      "Pregnancy and CPR",
      "Pediatric CPR",
      "Reversible Causes",
      "H's and T's"
    ],
    sections: [
      {
        title: "Pathophysiology and Chain of Survival",
        content: [
          "Cardiac arrest is sudden cessation of effective cardiac pumping function",
          "Ventricular fibrillation is most common rhythm in witnessed adult arrest",
          "Ventricular tachycardia can be pulseless and requires immediate defibrillation",
          "Asystole shows no electrical activity and has poor prognosis",
          "Pulseless electrical activity has electrical activity but no mechanical function",
          "Chain of Survival includes early recognition, CPR, defibrillation, and advanced care",
          "Each link is critical - weakness in one affects overall survival",
          "Bystander CPR can double or triple survival rates",
          "Early defibrillation within 3-5 minutes significantly improves outcomes",
          "Reversible causes include hypoxia, hypovolemia, hypothermia, toxins",
          "Consider H's and T's: Hypovolemia, Hypoxia, Hydrogen ion, Hypokalemia/Hyperkalemia, Hypothermia",
          "T's include Tension pneumothorax, Tamponade, Toxins, Thrombosis"
        ],
        clinicalPearls: [
          "Every minute without CPR decreases survival by 7-10%",
          "High-quality CPR is more important than advanced interventions initially",
          "Compressions are the most important component of CPR",
          "Early defibrillation is the definitive treatment for VF/pulseless VT"
        ],
        mnemonics: [
          "Chain of Survival: Early Recognition, Early CPR, Early Defibrillation, Early Advanced care",
          "H's and T's: Hypovolemia, Hypoxia, Hydrogen ion, Hypokalemia/Hyperkalemia, Hypothermia; Tension pneumothorax, Tamponade, Toxins, Thrombosis"
        ]
      },
      {
        title: "High-Quality CPR Techniques",
        content: [
          "Adult compression rate: 100-120 compressions per minute",
          "Adult compression depth: at least 2 inches (5 cm), no more than 2.4 inches (6 cm)",
          "Hand placement: lower half of breastbone, heel of one hand with other on top",
          "Allow complete chest recoil between compressions",
          "Minimize interruptions - hands-off time should be <10 seconds",
          "Compression-to-ventilation ratio: 30:2 for single rescuer",
          "Pediatric modifications: 1/3 chest depth, two fingers for infants",
          "Infant CPR: two-finger technique or two-thumb encircling method",
          "Child CPR: one or two hands depending on size",
          "Rotate compressors every 2 minutes to prevent fatigue",
          "Compression fraction should be >80% of total arrest time",
          "Avoid hyperventilation - it decreases venous return"
        ],
        clinicalPearls: [
          "Push hard, push fast, allow complete recoil, minimize interruptions",
          "If you're not getting tired doing compressions, you're not doing them right",
          "Don't be afraid to break ribs - better broken ribs than dead patient",
          "Quality CPR is more important than perfect technique"
        ],
        mnemonics: [
          "CPR quality: PUSH (Push hard, Uninterrupted, Speed 100-120, Hands-off <10 seconds)",
          "Adult CPR: 30 and 2, at least 2 inches deep, 100-120 rate"
        ]
      },
      {
        title: "Automated External Defibrillator (AED) Operation",
        content: [
          "Turn on AED and follow voice and visual prompts",
          "Ensure patient is dry and remove metal objects from chest",
          "Apply pads according to diagram: right upper chest, left lower ribs",
          "Ensure all personnel are clear during rhythm analysis and shock",
          "Press shock button only when prompted and area is completely clear",
          "Resume CPR immediately after shock delivery",
          "Shockable rhythms: ventricular fibrillation and pulseless ventricular tachycardia",
          "Non-shockable rhythms: asystole and pulseless electrical activity",
          "AED automatically analyzes rhythm and determines shock indication",
          "Pediatric considerations: use pediatric pads for children <8 years or <25 kg",
          "Special situations: implanted devices, medication patches, water, hypothermia",
          "Continue CPR between shocks to maintain coronary perfusion pressure"
        ],
        clinicalPearls: [
          "AED pads can go over medication patches if removal delays defibrillation",
          "Place pads at least 1 inch away from implanted devices",
          "Early defibrillation is most important intervention for VF/pulseless VT",
          "Resume CPR immediately after shock - don't check pulse first"
        ],
        mnemonics: [
          "AED safety: CLEAR (Check area, Look around, Everyone away, Announce shock, Resume CPR)",
          "Shockable rhythms: VF (Very Fibrillatory) and VT (Very Tachycardic)"
        ]
      },
      {
        title: "BLS Algorithm and Team Dynamics",
        content: [
          "Verify unresponsiveness and abnormal breathing patterns",
          "Activate emergency response system and request AED",
          "Check pulse for no more than 10 seconds",
          "Begin chest compressions immediately if no pulse detected",
          "Provide rescue breaths using 30:2 compression-to-ventilation ratio",
          "Apply AED when available and follow voice prompts",
          "Continue CPR cycles until ROSC or termination criteria met",
          "Team roles: compressor, airway manager, AED operator, team leader",
          "Clear communication and role assignments are essential",
          "Rotate compressors every 2 minutes during rhythm checks",
          "Minimize hands-off time during role transitions",
          "Coordinate care and avoid confusion with clear commands"
        ],
        clinicalPearls: [
          "If uncertain about pulse presence, begin compressions immediately",
          "Healthcare providers should limit pulse checks to 10 seconds maximum",
          "Team leader should coordinate and make clinical decisions",
          "Practice role assignments regularly to improve efficiency"
        ],
        mnemonics: [
          "BLS sequence: Unresponsive, Activate, Check pulse, Compressions, Defibrillate",
          "Team roles: COAL (Compressor, Oxygen/airway, AED operator, Leader)"
        ]
      },
      {
        title: "Special Resuscitation Situations",
        content: [
          "Drowning: begin with 2 rescue breaths before compressions",
          "Remove from water quickly and safely, expect water/vomit",
          "Pregnancy: displace uterus to left side manually or with wedge",
          "Standard compression location and depth for pregnant patients",
          "Hypothermia: continue resuscitation during rewarming process",
          "Handle hypothermic patients gently to avoid triggering arrhythmias",
          "Traumatic arrest: address reversible causes like tension pneumothorax",
          "Maintain spinal immobilization during CPR if indicated",
          "Choking progression: if becomes unresponsive, start CPR",
          "Look for and remove visible objects before rescue breaths",
          "Pediatric considerations: proportionally larger head and tongue",
          "Special equipment needs: pediatric AED pads, appropriate bag-mask sizes"
        ],
        clinicalPearls: [
          "Not dead until warm and dead - continue resuscitation in hypothermia",
          "Neurological outcomes may be better in cold water drowning",
          "Emergency cesarean section may be needed in pregnancy >20 weeks",
          "Traumatic arrest has lower survival rates than medical arrest"
        ],
        mnemonics: [
          "Drowning: Water out, Breaths first, CPR next",
          "Pregnancy CPR: Displace uterus Left, Normal compression location"
        ]
      },
      {
        title: "Post-Resuscitation Care and Quality Improvement",
        content: [
          "Recognize ROSC: palpable pulse, improved perfusion, spontaneous breathing",
          "Assess and support airway, breathing, and circulation",
          "Provide oxygen to maintain SpO2 94-99% (avoid hyperoxia)",
          "Monitor blood pressure and treat hypotension if present",
          "Check blood glucose and treat hypoglycemia if detected",
          "Obtain 12-lead ECG if available and trained",
          "Prepare for rapid transport to appropriate receiving facility",
          "Monitor for return of cardiac arrest - ROSC may be transient",
          "Performance metrics: compression fraction >80%, rate 100-120/min",
          "Adequate compression depth without excessive depth",
          "Complete chest recoil and minimal hands-off time",
          "Post-event debriefing to identify improvement opportunities"
        ],
        clinicalPearls: [
          "ROSC may be transient - continue monitoring closely",
          "Avoid hyperventilation in post-ROSC period",
          "Early transport to appropriate facility improves outcomes",
          "Debriefing improves team performance in future cases"
        ],
        mnemonics: [
          "Post-ROSC ABCs: Airway, Breathing, Circulation, Don't forget glucose",
          "Quality CPR: ROSC (Rate 100-120, Oxygen when needed, Support circulation, Check metrics)"
        ]
      }
    ],
    criticalConcepts: [
      "High-quality CPR with minimal interruptions is the foundation of resuscitation",
      "Early defibrillation is the most important intervention for VF/pulseless VT",
      "Team coordination and communication are essential for effective resuscitation",
      "Recognition of cardiac arrest must be immediate and accurate",
      "Post-ROSC care focuses on supporting organ function and preventing re-arrest",
      "Special populations require modified techniques but same basic principles",
      "Quality improvement through debriefing enhances future performance",
      "Reversible causes should be considered and treated when possible"
    ],
    flashcards: [
      { front: "Adult CPR compression rate and depth", back: "Rate 100-120/min; depth at least 2 inches (5 cm); allow complete recoil; minimize interruptions", category: "protocol" },
      { front: "Compression-to-ventilation ratio for single rescuer", back: "30:2 for single rescuer without advanced airway", category: "protocol" },
      { front: "AED operation steps", back: "Power on, attach pads, analyze rhythm, clear area, shock if advised, resume CPR immediately", category: "protocol" },
      { front: "Pediatric CPR depth guidelines", back: "About 1/3 chest depth: 2 inches for child, 1.5 inches for infant; rate 100-120/min", category: "protocol" },
      { front: "When to use pediatric vs adult AED pads", back: "Pediatric pads for children under 8 years or under 25 kg; adult pads if pediatric unavailable", category: "protocol" },
      { front: "Reversible causes of cardiac arrest (H's and T's)", back: "Hypovolemia, hypoxia, hydrogen ion, hypokalemia/hyperkalemia, hypothermia; tension pneumothorax, tamponade, toxins, thrombosis", category: "definition" },
      { front: "Adult choking becomes unresponsive - next steps", back: "Lower to ground, start CPR, look for visible object before breaths, continue cycles", category: "protocol" },
      { front: "Post-ROSC care priorities", back: "Support airway/oxygen (94-99%), monitor vitals, check glucose, 12-lead ECG, rapid transport", category: "clinical" },
      { front: "How often should compressors rotate", back: "Every 2 minutes or during rhythm analysis to maintain compression quality", category: "protocol" },
      { front: "Special considerations for hypothermic arrest", back: "Continue resuscitation during rewarming, handle gently, may need prolonged efforts", category: "clinical" },
      { front: "Infant choking with severe obstruction", back: "Five back slaps and five chest thrusts alternating until relief or becomes unresponsive", category: "protocol" },
      { front: "Compression hand placement differences", back: "Adult: two hands center chest lower sternum; Infant: two fingers or two-thumb encircling", category: "protocol" },
      { front: "Managing arrest in pregnancy", back: "Manual left uterine displacement, standard compression location, prepare for rapid transport", category: "clinical" },
      { front: "When appropriate to withhold resuscitation", back: "Per protocol: obvious death, valid DNR/POLST, or medical direction termination orders", category: "protocol" },
      { front: "Chain of Survival components", back: "Early recognition, early CPR, early defibrillation, early advanced care, integrated post-arrest care", category: "definition" }
    ],
    crossReferences: [
      "Chapter 13: Shock Recognition - Understanding cardiac output and perfusion",
      "Chapter 11: Airway Management - Rescue breathing and airway adjuncts during CPR",
      "Chapter 17: Cardiovascular Emergencies - Acute MI leading to cardiac arrest",
      "Chapter 33: Pediatric Emergencies - Modified CPR techniques for children",
      "Chapter 36: Geriatric Emergencies - Special considerations for elderly patients"
    ]
  };*/

  /*const chapter15StudyNotes: ChapterData = {
    title: "Chapter 15: Medical Overview Essentials",
    description: "Systematic approach to medical emergencies, comprehensive patient assessment, and effective communication strategies for non-trauma patients",
    module: "7",
    scope: "EMT-B",
    protocols: ["Medical Assessment", "SAMPLE History", "OPQRST Analysis", "Medical Decision Making", "Patient Communication"],
    learningObjectives: [
      "Understand the systematic approach to medical emergencies",
      "Differentiate medical emergencies from trauma-related injuries",
      "Apply appropriate assessment techniques for medical patients",
      "Recognize common medical emergency presentations and patterns",
      "Understand the importance of medical history in emergency care",
      "Develop skills in medical decision-making and transport priorities",
      "Understand the role of family and caregivers in medical emergencies",
      "Apply effective communication techniques with medical patients"
    ],
    keyTerms: [
      "Medical Emergency",
      "Chief Complaint",
      "History of Present Illness",
      "Past Medical History",
      "Activities of Daily Living",
      "Baseline Mental Status",
      "Acute",
      "Chronic",
      "Exacerbation",
      "Comorbidity",
      "Polypharmacy",
      "Medication Compliance",
      "Social History",
      "Review of Systems",
      "SAMPLE",
      "OPQRST",
      "Medical History",
      "Systematic Assessment",
      "Medication Reconciliation",
      "Time-Critical Conditions",
      "Differential Diagnosis",
      "Clinical Impression",
      "Transport Decision",
      "Family History",
      "Environmental History",
      "Psychosocial Factors"
    ],
    sections: [
      {
        title: "Approach to Medical Emergencies",
        content: [
          "Medical emergencies are illness-related with internal causes",
          "Trauma involves injury from external forces with mechanism of injury",
          "Medical trauma occurs when medical condition causes fall or accident",
          "Some presentations can be both medical and traumatic in nature",
          "Medical assessment focuses on history and symptom analysis",
          "Trauma assessment emphasizes mechanism and physical examination",
          "Patient presentation guides assessment priorities and approach",
          "Age and comorbidities influence presentation and management",
          "Time-critical medical conditions require rapid recognition",
          "Systematic approach ensures nothing important is missed",
          "Chief complaint drives focused assessment and treatment",
          "Consider multiple medical conditions occurring simultaneously"
        ],
        clinicalPearls: [
          "History is often more important than physical exam in medical patients",
          "When patients say 'this is worst I've ever had,' take it seriously",
          "Changes from baseline are more significant than absolute values",
          "Consider medical causes even in apparent trauma situations"
        ],
        mnemonics: [
          "Medical vs Trauma: Internal vs External, Illness vs Injury",
          "Assessment priorities: History first, then Hands-on examination"
        ]
      },
      {
        title: "Comprehensive Medical History Taking",
        content: [
          "SAMPLE history: Signs/Symptoms, Allergies, Medications, Past history, Last meal, Events",
          "Chief complaint should be in patient's own words when possible",
          "History of present illness describes chronological symptom development",
          "OPQRST analyzes chief complaint: Onset, Provocation, Quality, Region, Severity, Time",
          "Past medical history includes previous conditions, surgeries, hospitalizations",
          "Current medications provide roadmap to patient's medical conditions",
          "Allergies include medications, foods, environmental triggers",
          "Social history covers smoking, alcohol, drug use, occupation",
          "Family history may reveal genetic predispositions",
          "Review of systems identifies additional unreported symptoms",
          "Baseline functional status and activities of daily living",
          "Recent changes in condition, medications, or lifestyle"
        ],
        clinicalPearls: [
          "Medication lists are roadmaps to patient's medical conditions",
          "Ask about recent medication changes - they often trigger symptoms",
          "Family members provide most accurate history for confused patients",
          "Don't discount complaints just because vital signs are normal"
        ],
        mnemonics: [
          "SAMPLE: Signs/Symptoms, Allergies, Medications, Past history, Last meal, Events",
          "OPQRST: Onset, Provocation, Quality, Region, Severity, Time"
        ]
      },
      {
        title: "Physical Assessment for Medical Patients",
        content: [
          "Primary assessment focuses on life threats: airway, breathing, circulation",
          "Secondary assessment guided by chief complaint and history",
          "Baseline mental status assessment using AVPU or Glasgow Coma Scale",
          "Vital signs should be obtained and trended over time",
          "General appearance provides immediate impression of illness severity",
          "Focused examination based on presenting complaint and symptoms",
          "Look for signs of chronic medical conditions",
          "Assess functional status and ability to perform daily activities",
          "Note medication compliance indicators and medication effects",
          "Identify signs of neglect or abuse, especially in vulnerable populations",
          "Reassessment is critical as medical conditions can change rapidly",
          "Document both positive findings and relevant negative findings"
        ],
        clinicalPearls: [
          "General appearance often correlates with illness severity",
          "Serial vital signs more important than single measurements",
          "Medication compliance clues: pill counts, filled prescriptions",
          "Look for medical alert jewelry and identification"
        ],
        mnemonics: [
          "Assessment sequence: Primary (ABCs), Secondary (Focused), Ongoing (Trending)",
          "Mental status: AVPU (Alert, Verbal, Painful, Unresponsive)"
        ]
      },
      {
        title: "Common Medical Emergency Patterns",
        content: [
          "Cardiovascular: chest pain, dyspnea, syncope, extremity swelling",
          "Respiratory: shortness of breath, cough, wheezing, stridor",
          "Neurological: altered mental status, weakness, seizures, headache",
          "Gastrointestinal: abdominal pain, nausea, vomiting, bleeding",
          "Endocrine: altered mental status, polyuria, polydipsia, weakness",
          "Infectious: fever, chills, malaise, localized pain or swelling",
          "Psychiatric: behavioral changes, suicidal ideation, psychosis",
          "Toxicological: altered mental status, unusual vital signs, history",
          "Allergic reactions: rash, swelling, respiratory distress",
          "Pain syndromes: chronic pain exacerbations, new onset pain",
          "Medication-related: side effects, interactions, overdoses",
          "Environmental: heat/cold exposure, dehydration, altitude"
        ],
        clinicalPearls: [
          "Atypical presentations common in elderly, diabetics, and women",
          "Multiple conditions often present simultaneously in elderly",
          "Consider medication effects and interactions in all patients",
          "Environmental factors can trigger or worsen medical conditions"
        ],
        mnemonics: [
          "Body systems: CARDIOVASCULAR (Cardio, Respiratory, Neuro, GI, Endocrine, etc.)",
          "Red flags: Worst ever, Sudden onset, Progressive worsening, Associated symptoms"
        ]
      },
      {
        title: "Special Considerations by Age Group",
        content: [
          "Pediatric patients: age-appropriate communication, parental involvement",
          "Children may not verbalize symptoms effectively",
          "Vital signs vary significantly by age in pediatric patients",
          "Consider child abuse and neglect in unexplained injuries or illness",
          "Adult patients: focus on work, family, and lifestyle impacts",
          "Consider pregnancy in women of childbearing age",
          "Medication compliance issues in working adults",
          "Geriatric patients: multiple comorbidities and polypharmacy",
          "Atypical presentations common in elderly patients",
          "Baseline cognitive function may be impaired",
          "Social isolation and neglect concerns in elderly",
          "Medication interactions and adverse effects more common"
        ],
        clinicalPearls: [
          "Children compensate well until they don't - watch for subtle changes",
          "Elderly may not show typical signs of serious illness",
          "Consider pregnancy in any woman of childbearing age",
          "Social factors significantly impact medical emergencies"
        ],
        mnemonics: [
          "Age groups: Pediatric (growth), Adult (lifestyle), Geriatric (complexity)",
          "Elderly considerations: Multiple meds, Atypical presentation, Social factors"
        ]
      },
      {
        title: "Communication and Documentation",
        content: [
          "Therapeutic communication builds rapport and gathers information",
          "Use open-ended questions to gather history",
          "Active listening demonstrates concern and improves information quality",
          "Cultural sensitivity important in diverse populations",
          "Language barriers require interpreter services when available",
          "Family involvement appropriate when patient consents",
          "Document chief complaint in patient's own words",
          "Record chronological development of symptoms",
          "Include relevant positive and negative findings",
          "Document medication compliance and recent changes",
          "SBAR format for hospital communication: Situation, Background, Assessment, Recommendation",
          "Continuous monitoring and documentation during transport"
        ],
        clinicalPearls: [
          "Patient's own words often provide diagnostic clues",
          "Cultural factors influence symptom reporting and pain expression",
          "Family dynamics can impact medical emergency management",
          "Good documentation protects both patient and provider"
        ],
        mnemonics: [
          "Communication: Open questions, Active listening, Cultural sensitivity",
          "SBAR: Situation, Background, Assessment, Recommendation"
        ]
      }
    ],
    criticalConcepts: [
      "Medical history often more important than physical examination",
      "SAMPLE and OPQRST provide systematic approach to history taking",
      "Baseline mental status and functional capacity guide assessment",
      "Multiple medical conditions commonly coexist in elderly patients",
      "Medication compliance and recent changes frequently cause symptoms",
      "Cultural and social factors significantly impact medical emergencies",
      "Trending vital signs more important than single measurements",
      "Effective communication improves both information gathering and patient care"
    ],
    flashcards: [
      { front: "What does SAMPLE stand for in medical history?", back: "Signs/Symptoms, Allergies, Medications, Past history, Last meal, Events", category: "definition" },
      { front: "What does OPQRST analyze about symptoms?", back: "Onset, Provocation, Quality, Region, Severity, Time", category: "definition" },
      { front: "What's the difference between medical and trauma emergencies?", back: "Medical: illness-related, internal cause; Trauma: injury-related, external force", category: "definition" },
      { front: "Why is medical history often more important than physical exam?", back: "Medical conditions are internal; history reveals onset, triggers, and progression patterns", category: "clinical" },
      { front: "What are key components of past medical history?", back: "Previous conditions, surgeries, hospitalizations, chronic diseases, allergies", category: "protocol" },
      { front: "How do you assess baseline mental status?", back: "Use AVPU scale, ask about normal cognitive function, compare to family description", category: "clinical" },
      { front: "What makes elderly medical patients unique?", back: "Multiple comorbidities, polypharmacy, atypical presentations, medication interactions", category: "clinical" },
      { front: "What's the difference between acute and chronic conditions?", back: "Acute: sudden onset, severe symptoms; Chronic: long-term, persistent conditions", category: "definition" },
      { front: "Why are medication lists important in medical assessment?", back: "They're roadmaps to patient's medical conditions and can reveal compliance issues", category: "clinical" },
      { front: "What does 'position of comfort' mean for medical patients?", back: "Let patient assume position that helps their breathing or reduces pain/discomfort", category: "protocol" },
      { front: "How should you document chief complaint?", back: "In patient's own words when possible, including exact quotes", category: "protocol" },
      { front: "What's SBAR format for hospital communication?", back: "Situation, Background, Assessment, Recommendation", category: "definition" },
      { front: "What are activities of daily living (ADL)?", back: "Basic self-care tasks: bathing, dressing, eating, toileting, mobility", category: "definition" },
      { front: "Why is family involvement important in medical emergencies?", back: "They provide accurate history for confused patients and baseline functional information", category: "clinical" },
      { front: "What should you consider in pediatric medical emergencies?", back: "Age-appropriate communication, parental involvement, normal vital sign ranges for age", category: "clinical" }
    ],
    crossReferences: [
      "Chapter 10: Patient Assessment - Primary and secondary assessment techniques",
      "Chapter 16: Respiratory Emergencies - Specific medical emergency presentations",
      "Chapter 17: Cardiovascular Emergencies - Cardiac-related medical conditions",
      "Chapter 22: Endocrine Emergencies - Diabetes and other endocrine conditions",
      "Chapter 35: Geriatric Emergencies - Special considerations for elderly patients"
    ]
  };*/

  /*const chapter16StudyNotes: ChapterData = {
    title: "Chapter 16: Respiratory Emergencies Essentials",
    description: "Comprehensive assessment and management of respiratory distress, breathing problems, and life-threatening airway emergencies",
    module: "7",
    scope: "EMT-B",
    protocols: ["Respiratory Assessment", "Oxygen Therapy", "Medication Assistance", "Airway Management", "Ventilation Support"],
    learningObjectives: [
      "Understand the anatomy and physiology of the respiratory system",
      "Recognize signs and symptoms of respiratory distress and failure",
      "Differentiate between various respiratory emergency conditions",
      "Perform appropriate assessment of patients with breathing problems",
      "Understand the pathophysiology of common respiratory diseases",
      "Apply appropriate oxygen therapy and ventilation techniques",
      "Assist patients with their respiratory medications",
      "Recognize when advanced airway intervention is needed"
    ],
    keyTerms: [
      "Dyspnea",
      "Tachypnea",
      "Bradypnea",
      "Apnea",
      "Hypoxia",
      "Hypoxemia",
      "Hypercapnia",
      "Respiratory Distress",
      "Respiratory Failure",
      "Adventitious Sounds",
      "Wheezing",
      "Crackles",
      "Stridor",
      "Bronchospasm",
      "Asthma",
      "COPD",
      "Pneumonia",
      "CHF",
      "Pulmonary Edema",
      "Pneumothorax",
      "Pulmonary Embolism",
      "Croup",
      "Epiglottitis",
      "Tripod Position",
      "Accessory Muscles",
      "Retractions",
      "Cyanosis",
      "Peak Flow",
      "Nebulizer",
      "MDI",
      "CPAP"
    ],
    sections: [
      {
        title: "Respiratory System Anatomy and Physiology",
        content: [
          "Upper airway includes nose, mouth, pharynx, larynx, and upper trachea",
          "Lower airway consists of trachea, bronchi, bronchioles, and alveoli",
          "Gas exchange occurs at alveolar-capillary membrane",
          "Ventilation is mechanical movement of air in and out of lungs",
          "Respiration is gas exchange between alveoli and bloodstream",
          "Respiratory drive controlled by medulla and chemoreceptors",
          "Primary drive is CO2 levels, secondary drive is O2 levels",
          "Normal breathing is quiet, effortless, and regular",
          "Diaphragm is primary muscle of respiration",
          "Accessory muscles used during respiratory distress",
          "Pediatric airway differences: larger head, smaller airways, higher metabolism",
          "Normal respiratory rates vary by age: adult 12-20, child 15-30, infant 25-50"
        ],
        clinicalPearls: [
          "Upper airway obstruction causes inspiratory stridor",
          "Lower airway obstruction causes expiratory wheezing",
          "COPD patients may have CO2 drive - but give oxygen anyway",
          "Children have proportionally higher oxygen consumption"
        ],
        mnemonics: [
          "Airway divisions: Upper (mouth to vocal cords), Lower (below vocal cords)",
          "Normal rates: Adult teens, Child twenties, Infant forties"
        ]
      },
      {
        title: "Recognition of Respiratory Distress and Failure",
        content: [
          "Respiratory distress: increased work of breathing, adequate gas exchange",
          "Respiratory failure: inadequate gas exchange, life-threatening condition",
          "Early signs: tachypnea, mild dyspnea, restlessness, anxiety",
          "Progressive signs: accessory muscle use, retractions, nasal flaring",
          "Late signs: altered mental status, cyanosis, bradypnea, exhaustion",
          "Tripod position indicates severe respiratory distress",
          "One to two word dyspnea suggests significant distress",
          "Inability to speak indicates severe respiratory compromise",
          "Silent chest in asthmatic suggests impending respiratory arrest",
          "Cyanosis is late sign - don't wait for it to appear",
          "Children may appear normal until sudden decompensation",
          "Grunting in children indicates significant respiratory distress"
        ],
        clinicalPearls: [
          "Position of comfort is usually best for respiratory distress",
          "If patient can speak full sentences, airway is patent",
          "Wheezing you can hear without stethoscope indicates severe bronchospasm",
          "Absence of wheezing in known asthmatic may mean worsening condition"
        ],
        mnemonics: [
          "Distress progression: Early (rate up), Progressive (muscles work), Late (tired out)",
          "Speaking ability: Full sentences (OK), 2-3 words (distress), Unable (severe)"
        ]
      },
      {
        title: "Common Respiratory Emergency Conditions",
        content: [
          "Asthma: reversible airway obstruction with bronchospasm and inflammation",
          "COPD: chronic bronchitis and emphysema with irreversible airway obstruction",
          "Pneumonia: infection of lung tissue causing inflammation and fluid accumulation",
          "Congestive heart failure: fluid backup into lungs from heart failure",
          "Pulmonary embolism: blood clot blocking pulmonary circulation",
          "Pneumothorax: air in pleural space causing lung collapse",
          "Croup: viral infection causing upper airway swelling in children",
          "Epiglottitis: bacterial infection of epiglottis (rare but life-threatening)",
          "Anaphylaxis: severe allergic reaction causing airway swelling",
          "Toxic inhalation: chemical exposure causing airway inflammation",
          "Foreign body obstruction: partial or complete airway blockage",
          "Hyperventilation syndrome: anxiety-induced rapid breathing"
        ],
        clinicalPearls: [
          "Asthma typically has expiratory wheezing and responds to bronchodilators",
          "COPD patients often have barrel chest and chronic productive cough",
          "CHF causes crackles that start at bases and progress upward",
          "PE often presents with sudden onset dyspnea and chest pain"
        ],
        mnemonics: [
          "Obstructive diseases: Asthma (reversible), COPD (irreversible)",
          "Fluid conditions: Pneumonia (infection), CHF (heart), PE (clot)"
        ]
      },
      {
        title: "Respiratory Assessment Techniques",
        content: [
          "Look: respiratory rate, rhythm, effort, accessory muscle use, positioning",
          "Listen: breath sounds, voice changes, stridor, wheezing audible without stethoscope",
          "Feel: chest rise and fall, skin temperature and moisture",
          "Measure: pulse oximetry, peak flow if available and trained",
          "Auscultation: listen to breath sounds systematically",
          "Normal breath sounds: clear, equal bilaterally",
          "Abnormal sounds: wheezes, crackles, stridor, diminished, absent",
          "Inspect skin color: central vs peripheral cyanosis",
          "Assess mental status: anxiety, confusion, combativeness",
          "Check for jugular venous distension (suggests heart failure)",
          "Look for medication inhalers and home oxygen equipment",
          "Assess response to position changes and interventions"
        ],
        clinicalPearls: [
          "Pulse oximetry may be normal in early respiratory distress",
          "Central cyanosis (lips, tongue) more significant than peripheral",
          "JVD with respiratory distress suggests congestive heart failure",
          "Patient's own assessment of breathing is usually accurate"
        ],
        mnemonics: [
          "Assessment: LOOK (rate, effort), LISTEN (sounds), FEEL (movement)",
          "Breath sounds: Normal (clear), Abnormal (wet, wheeze, blocked)"
        ]
      },
      {
        title: "Oxygen Therapy and Ventilation Support",
        content: [
          "Nasal cannula: 1-6 L/min provides 24-44% oxygen concentration",
          "Non-rebreather mask: 10-15 L/min provides 90-95% oxygen",
          "Venturi mask: precise oxygen concentrations for COPD patients",
          "Bag-valve-mask: provides positive pressure ventilation",
          "CPAP: continuous positive airway pressure for CHF and sleep apnea",
          "Start with high-flow oxygen for all respiratory emergencies",
          "Adjust based on patient response and pulse oximetry",
          "Assist ventilation if respiratory rate inadequate or patient exhausted",
          "BVM ventilation rate: 10-12/min for adults, 20/min for children",
          "Avoid hyperventilation - causes decreased venous return",
          "Monitor for improvement in mental status and work of breathing",
          "Consider CPAP for CHF patients with pulmonary edema"
        ],
        clinicalPearls: [
          "When in doubt, give high-flow oxygen initially",
          "CPAP can be dramatically effective for CHF with pulmonary edema",
          "Don't withhold oxygen from COPD patients in emergency",
          "Ventilation quality more important than rate"
        ],
        mnemonics: [
          "Oxygen delivery: Low flow (cannula), High flow (mask), Positive pressure (BVM/CPAP)",
          "Ventilation rates: Adult 10-12, Child 20, Infant 20 (per minute)"
        ]
      },
      {
        title: "Medication Assistance and Special Considerations",
        content: [
          "Metered-dose inhalers (MDI): bronchodilators for asthma and COPD",
          "Nebulizers: liquid medication converted to mist for inhalation",
          "Common bronchodilators: albuterol, levalbuterol, ipratropium",
          "Assist with patient's own prescribed medications",
          "Verify medication, dose, expiration date, and patient identity",
          "Use spacer device if available to improve medication delivery",
          "Monitor for improvement in breathing and possible side effects",
          "Side effects: tachycardia, tremor, nervousness from beta-agonists",
          "Consider epinephrine for severe anaphylaxis with respiratory distress",
          "Multiple doses may be needed for severe bronchospasm",
          "Environmental modifications: remove from allergens or irritants",
          "Position patient upright for optimal medication distribution"
        ],
        clinicalPearls: [
          "Bronchodilators work best when delivered during early inspiration",
          "Spacers improve medication delivery and reduce side effects",
          "Multiple doses often needed in severe exacerbations",
          "Remove patient from triggering environment when possible"
        ],
        mnemonics: [
          "MDI technique: Shake, Breathe out, Seal lips, Inhale slow and deep, Hold breath",
          "Bronchodilator effects: Opens airways (good), Racing heart (side effect)"
        ]
      }
    ],
    criticalConcepts: [
      "Respiratory distress can rapidly progress to respiratory failure",
      "Position of comfort is usually optimal for respiratory patients",
      "High-flow oxygen is indicated for all respiratory emergencies initially",
      "Assist with patient's own respiratory medications when appropriate",
      "Recognize when positive pressure ventilation is needed",
      "Children can compensate well until sudden decompensation occurs",
      "CPAP therapy can be life-saving for CHF patients",
      "Environmental factors often trigger respiratory emergencies"
    ],
    flashcards: [
      { front: "Define respiratory distress vs respiratory failure", back: "Distress: increased work of breathing, adequate gas exchange; Failure: inadequate gas exchange, life-threatening", category: "definition" },
      { front: "Normal respiratory rates by age group", back: "Adult: 12-20/min, Child: 15-30/min, Infant: 25-50/min", category: "protocol" },
      { front: "What causes inspiratory stridor?", back: "Upper airway obstruction (croup, epiglottitis, foreign body)", category: "clinical" },
      { front: "What causes expiratory wheezing?", back: "Lower airway obstruction (asthma, COPD, bronchospasm)", category: "clinical" },
      { front: "Signs of severe respiratory distress", back: "Tripod position, accessory muscle use, one-word dyspnea, inability to speak", category: "clinical" },
      { front: "Oxygen delivery with non-rebreather mask", back: "10-15 L/min flow rate provides 90-95% oxygen concentration", category: "protocol" },
      { front: "When is CPAP indicated?", back: "CHF with pulmonary edema, sleep apnea exacerbations (per protocol)", category: "protocol" },
      { front: "BVM ventilation rates", back: "Adult: 10-12/min, Child/Infant: 20/min", category: "protocol" },
      { front: "Common bronchodilator medications", back: "Albuterol (most common), levalbuterol, ipratropium", category: "definition" },
      { front: "Side effects of bronchodilators", back: "Tachycardia, tremor, nervousness, palpitations", category: "clinical" },
      { front: "What does 'silent chest' in asthmatic indicate?", back: "Severe bronchospasm with little air movement - impending respiratory arrest", category: "clinical" },
      { front: "Key differences between asthma and COPD", back: "Asthma: reversible, younger patients; COPD: irreversible, older patients, smoking history", category: "clinical" },
      { front: "Signs of CHF with pulmonary edema", back: "Crackles starting at lung bases, JVD, pink frothy sputum, orthopnea", category: "clinical" },
      { front: "Why position respiratory patients upright?", back: "Improves diaphragm function, reduces work of breathing, enhances comfort", category: "protocol" },
      { front: "When should you assist with patient's inhaler?", back: "Patient has prescribed medication, experiencing respiratory distress, can follow commands", category: "protocol" }
    ],
    crossReferences: [
      "Chapter 11: Airway Management - Basic airway techniques and oxygen therapy",
      "Chapter 15: Medical Overview - Systematic approach to medical emergencies",
      "Chapter 21: Allergic Reactions - Anaphylaxis with respiratory involvement",
      "Chapter 33: Pediatric Emergencies - Pediatric respiratory conditions",
      "Chapter 35: Geriatric Emergencies - COPD and other chronic respiratory conditions"
    ]
  };*/

  /*const chapter17StudyNotes: ChapterData = {
    title: "Chapter 17: Cardiovascular Emergency Management",
    description: "Cardiovascular emergencies with pathophysiology and evidence-based intervention protocols for optimal patient outcomes",
    module: "7",
    scope: "EMT-B", 
    protocols: ["ACS Management", "CHF Treatment", "Cardiac Arrest", "Hypertensive Emergency"],
    learningObjectives: [
      "Recognize signs and symptoms of acute coronary syndrome",
      "Apply systematic approach to cardiovascular emergency assessment",
      "Implement appropriate interventions for cardiac conditions",
      "Understand pathophysiology of common cardiovascular emergencies"
    ],
    keyTerms: ["ACS", "MI", "CHF", "Cardiogenic Shock", "Angina", "STEMI", "NSTEMI", "Preload", "Afterload"],
    criticalConcepts: [
      "Time is muscle in acute coronary syndrome",
      "Early recognition and intervention improve cardiovascular outcomes", 
      "Cardiovascular emergencies can rapidly progress to cardiac arrest"
    ],
    clinicalDecisionRules: [
      "Aspirin 324mg for suspected ACS unless contraindicated",
      "Nitroglycerin only if systolic BP >100 mmHg",
      "High-flow oxygen for chest pain with signs of hypoxia"
    ],
    commonMisconceptions: [
      "All chest pain is cardiac in origin",
      "Women present with classic cardiac symptoms",
      "Nitroglycerin is safe for all chest pain patients"
    ],
    examTips: [
      "Know contraindications for aspirin and nitroglycerin",
      "Understand difference between stable and unstable angina",
      "Remember atypical presentations in elderly and diabetic patients"
    ],
    sections: [
      {
        title: "Cardiovascular System Anatomy and Physiology",
        content: [
          "**Heart structure** consists of four chambers: right and left atria (receiving chambers) and right and left ventricles (pumping chambers).",
          "**Coronary circulation** supplies heart muscle with oxygen via right and left coronary arteries, with occlusion causing myocardial ischemia.",
          "**Cardiac cycle** includes systole (contraction) and diastole (relaxation), creating pressure changes that drive circulation.",
          "**Electrical conduction system** coordinates heart rhythm through SA node, AV node, bundle branches, and Purkinje fibers."
        ],
        clinicalPearls: [
          "Left anterior descending (LAD) occlusion causes 'widow maker' MI",
          "Heart muscle begins dying within 20-30 minutes of complete occlusion",
          "Collateral circulation may minimize damage in gradual vessel narrowing"
        ],
        mnemonics: [
          "**MONA**: Morphine, Oxygen, Nitroglycerin, Aspirin (traditional ACS treatment, now evidence-based approach varies)"
        ]
      },
      {
        title: "Acute Coronary Syndrome (ACS)",
        content: [
          "**Unstable angina** involves chest pain at rest or with minimal exertion, indicating unstable coronary plaque without complete occlusion.",
          "**STEMI (ST-Elevation MI)** shows complete coronary artery occlusion requiring immediate reperfusion therapy (PCI or thrombolytics).",
          "**NSTEMI (Non-ST-Elevation MI)** involves partial coronary occlusion with cardiac enzyme elevation but without ST elevation on ECG.",
          "**Risk stratification** uses TIMI score, HEART score, and clinical presentation to guide treatment intensity and disposition."
        ],
        clinicalPearls: [
          "Classic chest pain: crushing, radiating to jaw/arm, with diaphoresis",
          "Atypical presentations common in women, elderly, and diabetics",
          "Silent MIs occur in 25% of cases, especially diabetics",
          "Levine's sign: clenched fist over chest indicates cardiac origin"
        ],
        decisionTrees: [
          "Chest pain → Assess vital signs → 12-lead ECG → Aspirin if no contraindications → Nitroglycerin if BP >100 → Transport to PCI center"
        ],
        fieldApplications: [
          "Practice 12-lead ECG placement for rapid STEMI identification",
          "Master medication contraindication assessment",
          "Develop systematic chest pain evaluation approach"
        ]
      },
      {
        title: "Congestive Heart Failure (CHF)",
        content: [
          "**Left heart failure** causes pulmonary edema with shortness of breath, orthopnea, and paroxysmal nocturnal dyspnea.",
          "**Right heart failure** presents with peripheral edema, jugular venous distention, and hepatomegaly from systemic congestion.",
          "**Acute decompensation** can be triggered by medication non-compliance, dietary indiscretion, infection, or arrhythmias.",
          "**Treatment approach** focuses on reducing preload with positioning, oxygen, and rapid transport for advanced interventions."
        ],
        clinicalPearls: [
          "Pink, frothy sputum indicates acute pulmonary edema",
          "Orthopnea: inability to lie flat due to shortness of breath",
          "Two-pillow orthopnea quantifies severity of symptoms",
          "Pedal edema pits with 5+ seconds return time in severe CHF"
        ],
        mnemonics: [
          "**CHF**: Cough, Heaviness (chest), Fatigue (classic triad)",
          "**OLDCARTS**: Onset, Location, Duration, Character, Aggravating factors, Relieving factors, Timing, Severity"
        ]
      },
      {
        title: "Cardiac Arrest and Dysrhythmias",
        content: [
          "**Ventricular fibrillation** presents as chaotic electrical activity requiring immediate defibrillation for survival.",
          "**Ventricular tachycardia** may be pulsed (unstable) or pulseless, both requiring urgent intervention.",
          "**Asystole** shows flatline rhythm with poor prognosis, requiring CPR and epinephrine.",
          "**PEA (Pulseless Electrical Activity)** demonstrates organized rhythm without pulse, requiring treatment of underlying causes."
        ],
        clinicalPearls: [
          "Survival decreases 10% per minute without defibrillation",
          "High-quality CPR: 100-120 compressions/min, 2+ inches deep",
          "Minimize interruptions in chest compressions",
          "Consider reversible causes: H's and T's"
        ],
        commonPitfalls: [
          "Checking pulse too long delays CPR initiation",
          "Inadequate compression depth reduces circulation",
          "Excessive ventilation impedes venous return"
        ]
      },
      {
        title: "Hypertensive Emergencies",
        content: [
          "**Hypertensive urgency** involves severe hypertension (>180/120) without end-organ damage.",
          "**Hypertensive emergency** shows severe hypertension with acute end-organ damage (stroke, MI, pulmonary edema).",
          "**Management approach** avoids rapid blood pressure reduction to prevent cerebral hypoperfusion.",
          "**Transport considerations** require cardiac monitoring and frequent vital sign assessment during transport."
        ],
        clinicalPearls: [
          "Avoid sublingual nitroglycerin in hypertensive emergency",
          "Target 10-15% BP reduction in first hour maximum",
          "Monitor for signs of stroke during transport",
          "Document baseline neurological status carefully"
        ]
      }
    ],
    flashcards: [
      { front: "What is the standard aspirin dose for ACS?", back: "324mg chewed (four 81mg tablets)", category: "protocol" },
      { front: "What does ACS stand for?", back: "Acute Coronary Syndrome", category: "definition" },
      { front: "What are the classic signs of MI?", back: "Chest pain, shortness of breath, nausea, diaphoresis", category: "clinical" },
      { front: "What is the difference between stable and unstable angina?", back: "Stable: predictable, exercise-induced; Unstable: unpredictable, rest pain", category: "definition" },
      { front: "What does CHF stand for?", back: "Congestive Heart Failure", category: "definition" },
      { front: "What are signs of CHF?", back: "Pedal edema, JVD, crackles, shortness of breath", category: "clinical" },
      { front: "What is cardiogenic shock?", back: "Shock caused by heart's inability to pump effectively", category: "definition" },
      { front: "What is nitroglycerin's mechanism of action?", back: "Vasodilation to reduce cardiac workload", category: "clinical" },
      { front: "What are contraindications to nitroglycerin?", back: "Hypotension, erectile dysfunction drugs, right ventricular MI", category: "protocol" },
      { front: "What is a normal cardiac rhythm?", back: "Normal sinus rhythm, regular, 60-100 bpm", category: "clinical" },
      { front: "What is ventricular fibrillation?", back: "Chaotic, disorganized electrical activity with no effective circulation", category: "definition" },
      { front: "What is the treatment for cardiac arrest?", back: "CPR, defibrillation if shockable rhythm, ACLS medications", category: "protocol" },
      { front: "What does STEMI stand for?", back: "ST-Elevation Myocardial Infarction", category: "definition" },
      { front: "What is the goal for door-to-balloon time?", back: "Less than 90 minutes for STEMI patients", category: "protocol" },
      { front: "What are atypical MI presentations?", back: "Common in elderly, diabetics, women - may present as weakness, nausea", category: "clinical" }
    ]
  };*/

  /*const chapter18StudyNotes: ChapterData = {
    title: "Chapter 18: Neurological Emergencies",
    description: "Comprehensive assessment and management of stroke, seizures, altered mental status, and other neurological emergencies",
    module: "8",
    scope: "EMT-B",
    protocols: ["Neurological Assessment", "Stroke Recognition", "Seizure Management", "Glasgow Coma Scale", "Rapid Transport"],
    learningObjectives: [
      "Understand the anatomy and physiology of the nervous system",
      "Recognize signs and symptoms of neurological emergencies",
      "Differentiate between stroke, seizures, and altered mental status",
      "Perform appropriate neurological assessment techniques",
      "Understand the pathophysiology of common neurological conditions",
      "Apply appropriate management for neurological emergencies",
      "Recognize time-critical neurological conditions requiring rapid transport",
      "Understand special considerations for pediatric neurological emergencies"
    ],
    keyTerms: [
      "Altered Mental Status",
      "Stroke",
      "Transient Ischemic Attack",
      "Seizure",
      "Status Epilepticus",
      "Postictal State",
      "Glasgow Coma Scale",
      "Aphasia",
      "Hemiplegia",
      "Hemiparesis",
      "Dysarthria",
      "Ataxia",
      "Syncope",
      "Hypoglycemia",
      "Ischemic Stroke",
      "Hemorrhagic Stroke",
      "Tonic-Clonic Seizure",
      "Focal Seizure",
      "Febrile Seizure",
      "Aura",
      "Intracranial Pressure",
      "FAST Assessment",
      "Cincinnati Stroke Scale",
      "Subarachnoid Hemorrhage",
      "Carbon Monoxide Poisoning",
      "Diabetic Emergency",
      "Wernicke's Aphasia",
      "Broca's Aphasia",
      "Neurogenic Shock",
      "Brain Herniation",
      "Cushing's Triad"
    ],
    sections: [
      {
        title: "Nervous System Anatomy and Neurological Assessment",
        content: [
          "Central nervous system includes brain and spinal cord",
          "Brain controls all body functions: cerebrum, cerebellum, brainstem",
          "Cerebrum handles higher functions: speech, movement, sensation",
          "Cerebellum controls balance, coordination, fine motor skills",
          "Brainstem controls vital functions: breathing, heart rate, consciousness",
          "Peripheral nervous system connects CNS to body organs and limbs",
          "Glasgow Coma Scale assesses eye opening, verbal response, motor response",
          "FAST assessment: Face droop, Arm drift, Speech difficulty, Time",
          "Cincinnati Stroke Scale evaluates facial droop, arm drift, speech",
          "Baseline mental status must be established early in assessment",
          "Pupil assessment: size, equality, reactivity to light",
          "Motor function tested with grip strength and purposeful movement",
          "Sensory testing includes response to touch and pain",
          "Coordination assessed through finger-to-nose and heel-to-shin tests"
        ],
        clinicalPearls: [
          "Glasgow Coma Scale trends more important than single measurements",
          "Any change from baseline mental status is significant",
          "Pupils provide important clues about intracranial pressure",
          "Unequal pupils may indicate brain herniation"
        ],
        mnemonics: [
          "GCS: Eyes (4), Voice (5), Motor (6) - total 15 maximum",
          "FAST: Face, Arms, Speech, Time (stroke assessment)"
        ]
      },
      {
        title: "Stroke Recognition and Management",
        content: [
          "Stroke is sudden loss of brain function from interrupted blood flow",
          "Ischemic stroke: blood clot blocks artery (80% of strokes)",
          "Hemorrhagic stroke: bleeding in brain (20% of strokes)",
          "Transient ischemic attack (TIA): temporary stroke symptoms that resolve",
          "Time is brain - rapid recognition and transport critical",
          "FAST assessment identifies most strokes quickly",
          "Sudden severe headache may indicate hemorrhagic stroke",
          "Facial droop, arm weakness, speech problems are classic signs",
          "Visual disturbances, confusion, balance problems also common",
          "Note exact time of symptom onset for hospital treatment decisions",
          "Maintain airway and provide oxygen if needed",
          "Position patient with affected side down if unconscious",
          "Monitor blood glucose - hypoglycemia can mimic stroke",
          "Transport rapidly to designated stroke center when possible"
        ],
        clinicalPearls: [
          "Time is brain - rapid recognition and transport for stroke patients",
          "Hypoglycemia can mimic stroke - always check blood glucose",
          "TIA patients still need immediate evaluation for stroke risk",
          "Sudden 'worst headache of life' suggests subarachnoid hemorrhage"
        ],
        mnemonics: [
          "Stroke types: Ischemic (clot), Hemorrhagic (bleed)",
          "BE-FAST: Balance, Eyes, Face, Arms, Speech, Time"
        ]
      },
      {
        title: "Seizure Recognition and Management",
        content: [
          "Seizure is abnormal electrical activity in brain causing involuntary movements",
          "Generalized seizures affect entire brain: tonic-clonic most common",
          "Focal seizures affect specific brain area with localized symptoms",
          "Status epilepticus: continuous seizure >5 minutes or recurring without recovery",
          "Aura may precede seizure: unusual smell, taste, or feeling",
          "Tonic phase: muscle rigidity and loss of consciousness",
          "Clonic phase: rhythmic muscle contractions and jerking movements",
          "Postictal state: confusion and altered mental status after seizure",
          "Protect patient from injury but don't restrain movements",
          "Never put anything in mouth of seizing patient",
          "Position on side when seizure stops to prevent aspiration",
          "Monitor airway and breathing throughout seizure",
          "Note duration, type of movements, and recovery pattern",
          "Transport if first seizure, status epilepticus, or injuries occurred"
        ],
        clinicalPearls: [
          "Never put anything in mouth of seizing patient",
          "Postictal confusion is normal and expected after seizures",
          "Status epilepticus is medical emergency requiring immediate transport",
          "Febrile seizures in children usually benign but need evaluation"
        ],
        mnemonics: [
          "Seizure phases: Aura (warning), Tonic (rigid), Clonic (jerking), Postictal (confused)",
          "Seizure safety: Protect from injury, Position on side, Don't restrain"
        ]
      },
      {
        title: "Altered Mental Status and Other Neurological Emergencies",
        content: [
          "Altered mental status: any deviation from normal consciousness",
          "Common causes: hypoglycemia, hypoxia, stroke, seizure, infection",
          "AEIOU-TIPS: Alcohol, Epilepsy, Insulin, Oxygen, Uremia; Trauma, Infection, Psychosis, Stroke",
          "Syncope: temporary loss of consciousness from reduced brain blood flow",
          "Vasovagal syncope: fainting from emotional stress or pain",
          "Cardiac syncope: fainting from heart rhythm problems",
          "Orthostatic syncope: fainting from standing up too quickly",
          "Headache red flags: sudden severe, fever, neck stiffness, neurological changes",
          "Subarachnoid hemorrhage: worst headache of patient's life",
          "Increased intracranial pressure: headache, vomiting, altered mental status",
          "Cushing's triad: hypertension, bradycardia, irregular breathing",
          "Carbon monoxide poisoning: headache, nausea, altered mental status",
          "Always check blood glucose in patients with altered mental status",
          "Consider drug intoxication or withdrawal in appropriate patients"
        ],
        clinicalPearls: [
          "Always check blood glucose in altered mental status patients",
          "Consider carbon monoxide poisoning in winter months",
          "Sudden severe headache needs immediate evaluation",
          "Syncope in elderly may indicate serious underlying condition"
        ],
        mnemonics: [
          "AMS causes: AEIOU-TIPS (Alcohol, Epilepsy, Insulin, Oxygen, Uremia; Trauma, Infection, Psychosis, Stroke)",
          "Headache red flags: SNOOP (Systemic illness, Neurological symptoms, Onset sudden, Older age, Pattern change)"
        ]
      },
      {
        title: "Pediatric Neurological Considerations",
        content: [
          "Febrile seizures occur in children 6 months to 6 years with fever",
          "Simple febrile seizures: generalized, <15 minutes, no focal features",
          "Complex febrile seizures: focal, >15 minutes, or recurring",
          "Children's normal mental status varies by developmental age",
          "Shaken baby syndrome: intracranial bleeding from violent shaking",
          "Head injuries more serious in children due to larger head size",
          "Glasgow Coma Scale modified for children under 4 years",
          "Hypoglycemia more common in children due to smaller glycogen stores",
          "Dehydration can cause altered mental status more quickly",
          "Consider child abuse with unexplained neurological symptoms",
          "Breath-holding spells: brief loss of consciousness, usually benign",
          "Age-appropriate communication essential for pediatric assessment",
          "Parents provide valuable baseline mental status information",
          "Transport all pediatric patients with first seizure or neurological emergency"
        ],
        clinicalPearls: [
          "Febrile seizures usually benign but still need evaluation",
          "Children's larger heads make them more susceptible to head injury",
          "Consider child abuse with unexplained neurological findings",
          "Parents are best source of baseline behavior information"
        ],
        mnemonics: [
          "Febrile seizure age: 6 months to 6 years",
          "Pediatric considerations: Larger head, Smaller reserves, Different normals"
        ]
      },
      {
        title: "Management and Transport Decisions",
        content: [
          "Primary assessment focuses on airway, breathing, circulation",
          "Maintain airway patency - suction if necessary",
          "Provide oxygen for hypoxic patients or those with altered mental status",
          "Position unconscious patients to protect airway",
          "Check blood glucose in all altered mental status patients",
          "Rapid transport for stroke patients to appropriate facility",
          "Stroke centers have specialized capabilities for acute stroke treatment",
          "Document exact time of symptom onset when possible",
          "Serial neurological assessments during transport",
          "Avoid excessive stimulation in patients with headache or altered mental status",
          "Position of comfort for conscious patients with headache",
          "Seizure patients: transport if first seizure, status epilepticus, or injuries",
          "Communicate findings clearly to receiving hospital",
          "Consider advanced life support for deteriorating patients"
        ],
        clinicalPearls: [
          "Time is critical for stroke patients - don't delay transport",
          "Serial assessments more valuable than single measurements",
          "Document everything - hospital needs detailed neurological findings",
          "When in doubt, transport to higher level of care"
        ],
        mnemonics: [
          "Stroke transport: Time critical, Stroke center, Document onset",
          "Neurological priorities: Airway, Glucose, Assessment, Transport"
        ]
      }
    ],
    criticalConcepts: [
      "Time is brain - rapid recognition and transport saves neurological function",
      "Glasgow Coma Scale provides standardized neurological assessment",
      "Blood glucose check mandatory for all altered mental status patients",
      "FAST assessment rapidly identifies stroke patients",
      "Status epilepticus is neurological emergency requiring immediate transport",
      "Postictal confusion is normal but patient still needs evaluation",
      "Sudden severe headache may indicate life-threatening bleeding",
      "Serial neurological assessments track improvement or deterioration"
    ],
    flashcards: [
      { front: "What does FAST stand for in stroke assessment?", back: "Face droop, Arm drift, Speech difficulty, Time of onset", category: "definition" },
      { front: "Normal Glasgow Coma Scale score range", back: "15 is normal (4 for eyes, 5 for verbal, 6 for motor)", category: "protocol" },
      { front: "Define status epilepticus", back: "Continuous seizure lasting >5 minutes or recurring seizures without recovery", category: "definition" },
      { front: "What is postictal state?", back: "Period of confusion and altered mental status following a seizure", category: "definition" },
      { front: "Common causes of altered mental status (AEIOU-TIPS)", back: "Alcohol, Epilepsy, Insulin, Oxygen, Uremia; Trauma, Infection, Psychosis, Stroke", category: "definition" },
      { front: "Difference between ischemic and hemorrhagic stroke", back: "Ischemic: clot blocks artery (80%); Hemorrhagic: bleeding in brain (20%)", category: "clinical" },
      { front: "Why check blood glucose in neurological emergencies?", back: "Hypoglycemia can mimic stroke, seizures, and other neurological conditions", category: "clinical" },
      { front: "What should you never do during a seizure?", back: "Never put anything in the patient's mouth or restrain their movements", category: "protocol" },
      { front: "Signs of increased intracranial pressure", back: "Headache, vomiting, altered mental status; late signs include Cushing's triad", category: "clinical" },
      { front: "What is Cushing's triad?", back: "Hypertension, bradycardia, and irregular breathing - indicates increased ICP", category: "definition" },
      { front: "Febrile seizure typical age range", back: "6 months to 6 years old, associated with fever", category: "clinical" },
      { front: "Red flags for dangerous headaches", back: "Sudden severe onset, fever with neck stiffness, neurological changes, 'worst ever'", category: "clinical" },
      { front: "How to position unconscious stroke patient", back: "Affected side down to protect airway, or recovery position if no spinal injury", category: "protocol" },
      { front: "When to transport seizure patients", back: "First seizure, status epilepticus, injuries occurred, or prolonged postictal state", category: "protocol" },
      { front: "What is a TIA?", back: "Transient Ischemic Attack - temporary stroke symptoms that resolve completely", category: "definition" }
    ],
    crossReferences: [
      "Chapter 15: Medical Overview - Systematic approach to neurological assessment",
      "Chapter 10: Patient Assessment - Glasgow Coma Scale and neurological examination",
      "Chapter 22: Endocrine Emergencies - Hypoglycemia causing altered mental status",
      "Chapter 33: Pediatric Emergencies - Febrile seizures and pediatric neurological conditions",
      "Chapter 35: Geriatric Emergencies - Stroke and neurological changes in elderly"
    ]
  };*/

  /*const chapter19StudyNotes: ChapterData = {
    title: "Chapter 19: Gastrointestinal and Genitourinary Emergencies",
    description: "Assessment and management of abdominal pain, GI bleeding, and genitourinary emergencies including reproductive health issues",
    module: "8",
    scope: "EMT-B",
    protocols: ["Abdominal Assessment", "GI Bleeding Management", "Pain Assessment", "Privacy Protection", "Rapid Transport"],
    learningObjectives: [
      "Understand the anatomy and physiology of the gastrointestinal system",
      "Recognize signs and symptoms of GI emergencies",
      "Understand the anatomy and physiology of the genitourinary system",
      "Identify signs and symptoms of GU emergencies",
      "Perform appropriate assessment of abdominal pain",
      "Understand the pathophysiology of common GI/GU conditions",
      "Apply appropriate management for GI/GU emergencies",
      "Recognize life-threatening GI/GU conditions requiring rapid transport"
    ],
    keyTerms: [
      "Abdominal Pain",
      "Peritonitis",
      "Appendicitis",
      "Cholecystitis",
      "Pancreatitis",
      "Peptic Ulcer Disease",
      "Gastrointestinal Bleeding",
      "Hematemesis",
      "Melena",
      "Hematochezia",
      "Kidney Stones",
      "Urinary Tract Infection",
      "Testicular Torsion",
      "Ectopic Pregnancy",
      "Rebound Tenderness",
      "Guarding",
      "Murphy's Sign",
      "Referred Pain",
      "Colicky Pain",
      "Visceral Pain",
      "Parietal Pain",
      "Upper GI Bleeding",
      "Lower GI Bleeding",
      "Hematuria",
      "Dysuria",
      "Oliguria",
      "Anuria",
      "Flank Pain",
      "Pelvic Inflammatory Disease",
      "Ovarian Cyst",
      "NPO Status"
    ],
    sections: [
      {
        title: "Gastrointestinal System and Common Emergencies",
        content: [
          "GI system includes mouth, esophagus, stomach, small/large intestine, liver, pancreas",
          "Stomach produces acid for protein digestion and intrinsic factor",
          "Small intestine is primary site of nutrient absorption",
          "Large intestine absorbs water and forms stool",
          "Liver produces bile, metabolizes drugs, and stores nutrients",
          "Pancreas produces digestive enzymes and insulin",
          "Appendicitis: inflammation causing RLQ pain, nausea, fever",
          "Cholecystitis: gallbladder inflammation with RUQ pain after fatty meals",
          "Pancreatitis: severe epigastric pain radiating to back",
          "Peptic ulcer disease: stomach/duodenal erosions causing burning pain",
          "Peritonitis: inflammation of abdominal lining from infection or perforation",
          "GI bleeding: upper (above ligament of Treitz) vs lower (below)"
        ],
        clinicalPearls: [
          "Any woman of childbearing age with abdominal pain - think pregnancy",
          "Elderly patients may not have typical symptoms of serious conditions",
          "Rebound tenderness suggests peritoneal irritation",
          "Coffee-ground vomit indicates upper GI bleeding"
        ],
        mnemonics: [
          "GI tract: Mouth, Esophagus, Stomach, Small intestine, Large intestine",
          "RUQ pain: Gallbladder, Liver; RLQ pain: Appendix, Ovary"
        ]
      },
      {
        title: "Abdominal Pain Assessment",
        content: [
          "Visceral pain: deep, poorly localized, cramping or gnawing",
          "Parietal pain: sharp, well-localized, worsened by movement",
          "Referred pain: felt in area distant from actual source",
          "Colicky pain: comes and goes, suggests obstruction",
          "Constant pain: suggests inflammation or ischemia",
          "Inspect abdomen for distension, scars, masses, discoloration",
          "Auscultate for bowel sounds: normal, hyperactive, or absent",
          "Palpate gently starting away from area of pain",
          "Check for rebound tenderness and guarding",
          "Murphy's sign: pain with deep inspiration during RUQ palpation",
          "Assess for signs of shock from blood loss or sepsis",
          "Note last bowel movement and urination",
          "Maintain NPO status for patients with abdominal pain"
        ],
        clinicalPearls: [
          "Colicky pain comes and goes, constant pain suggests inflammation",
          "Murphy's sign suggests gallbladder disease",
          "Referred pain patterns can help locate the problem",
          "Absent bowel sounds may indicate obstruction or peritonitis"
        ],
        mnemonics: [
          "Abdominal assessment: Inspect, Auscultate, Palpate (before percussion)",
          "Pain types: Visceral (deep), Parietal (sharp), Referred (distant)"
        ]
      },
      {
        title: "Gastrointestinal Bleeding",
        content: [
          "Upper GI bleeding: occurs above ligament of Treitz",
          "Common causes: peptic ulcers, esophageal varices, Mallory-Weiss tear",
          "Hematemesis: vomiting bright red blood or coffee-ground material",
          "Melena: black, tarry, foul-smelling stools from upper GI bleeding",
          "Lower GI bleeding: occurs below ligament of Treitz",
          "Common causes: diverticulosis, hemorrhoids, inflammatory bowel disease",
          "Hematochezia: bright red blood in stool from lower GI bleeding",
          "Assess for signs of shock: tachycardia, hypotension, altered mental status",
          "Large-bore IV access for potential fluid resuscitation",
          "Monitor vital signs closely during transport",
          "Keep patient NPO in case emergency surgery needed",
          "Rapid transport for significant bleeding with hemodynamic compromise"
        ],
        clinicalPearls: [
          "Coffee-ground vomitus indicates upper GI bleeding with gastric acid exposure",
          "Melena has characteristic foul smell from bacterial action",
          "Bright red blood usually indicates lower GI source",
          "Even small amounts of visible blood can indicate significant bleeding"
        ],
        mnemonics: [
          "Upper GI bleeding: Hematemesis (vomit blood), Melena (black stool)",
          "Lower GI bleeding: Hematochezia (bright red blood in stool)"
        ]
      },
      {
        title: "Genitourinary System and Emergencies",
        content: [
          "Kidneys filter blood and produce urine",
          "Ureters transport urine from kidneys to bladder",
          "Bladder stores urine until voluntary urination",
          "Urethra allows urine elimination from body",
          "Kidney stones: crystal deposits causing severe colicky pain",
          "Classic presentation: severe flank pain radiating to groin",
          "Urinary tract infections: bacterial infection causing dysuria, frequency",
          "Hematuria: blood in urine from infection, stones, or trauma",
          "Testicular torsion: twisting cuts off blood supply, surgical emergency",
          "Sudden severe testicular pain in adolescents or young adults",
          "Urinary retention: inability to urinate despite full bladder",
          "Acute kidney injury: sudden loss of kidney function"
        ],
        clinicalPearls: [
          "Sudden severe testicular pain in adolescent = torsion until proven otherwise",
          "Kidney stone pain is often described as worst pain patient has experienced",
          "UTI symptoms may be subtle in elderly patients",
          "Testicular torsion is time-sensitive - minutes count"
        ],
        mnemonics: [
          "Kidney stone pain: Flank to groin, Colicky pattern",
          "Testicular torsion: Sudden, Severe, Surgical emergency"
        ]
      },
      {
        title: "Reproductive Health Emergencies",
        content: [
          "Ectopic pregnancy: implantation outside uterus, usually fallopian tube",
          "Presents with abdominal pain, vaginal bleeding, missed period",
          "Can cause life-threatening internal bleeding",
          "Ovarian cysts: fluid-filled sacs that can rupture or twist",
          "Pelvic inflammatory disease: infection of female reproductive organs",
          "Causes lower abdominal pain, fever, abnormal discharge",
          "Pregnancy complications: consider in any woman of childbearing age",
          "Vaginal bleeding: assess amount, character, associated symptoms",
          "Sexual assault: provide emotional support, preserve evidence",
          "Maintain patient privacy and dignity during assessment",
          "Same-sex partner involvement in care decisions when appropriate",
          "Cultural sensitivity important in reproductive health emergencies"
        ],
        clinicalPearls: [
          "Any woman of childbearing age with abdominal pain - consider pregnancy",
          "Ectopic pregnancy can present with minimal bleeding but severe internal hemorrhage",
          "Maintain strict privacy during reproductive health assessments",
          "Consider domestic violence in women with unexplained injuries"
        ],
        mnemonics: [
          "Ectopic pregnancy triad: Pain, Bleeding, Missed period",
          "Reproductive emergencies: Privacy, Dignity, Sensitivity"
        ]
      },
      {
        title: "Management and Transport Considerations",
        content: [
          "Maintain NPO status for patients with abdominal pain",
          "Position of comfort usually best for abdominal pain patients",
          "Avoid analgesics that might mask important symptoms",
          "Large-bore IV access for patients with signs of bleeding",
          "Monitor vital signs frequently for signs of shock",
          "Gentle handling during transport to avoid worsening pain",
          "Rapid transport for time-critical conditions like testicular torsion",
          "Consider gynecological emergency for female patients",
          "Preserve privacy and dignity during assessment and transport",
          "Document findings objectively and completely",
          "Communicate clearly with receiving hospital about findings",
          "Consider advanced life support for unstable patients"
        ],
        clinicalPearls: [
          "Position of comfort usually best unless signs of shock present",
          "NPO status important in case emergency surgery needed",
          "Gentle palpation prevents worsening peritoneal irritation",
          "Rapid transport essential for testicular torsion and ectopic pregnancy"
        ],
        mnemonics: [
          "Abdominal pain management: NPO, IV access, Monitor vitals, Transport",
          "Emergency priorities: Airway, Breathing, Circulation, Pain management"
        ]
      }
    ],
    criticalConcepts: [
      "Ectopic pregnancy must be considered in any woman of childbearing age with abdominal pain",
      "Testicular torsion is surgical emergency requiring immediate transport",
      "GI bleeding can cause rapid hemodynamic compromise",
      "Peritonitis signs indicate serious intra-abdominal infection",
      "NPO status important for patients who may need emergency surgery",
      "Privacy and dignity essential during GU examinations",
      "Pain patterns help differentiate between various abdominal conditions",
      "Elderly patients may have atypical presentations of serious conditions"
    ],
    flashcards: [
      { front: "Classic triad of ectopic pregnancy", back: "Abdominal pain, vaginal bleeding, missed menstrual period", category: "clinical" },
      { front: "What is testicular torsion and why is it an emergency?", back: "Twisting of testicle cutting off blood supply; requires surgery within 6 hours to save testicle", category: "clinical" },
      { front: "Difference between hematemesis and hematochezia", back: "Hematemesis: vomiting blood (upper GI); Hematochezia: bright red blood in stool (lower GI)", category: "definition" },
      { front: "What is melena and what does it indicate?", back: "Black, tarry, foul-smelling stools indicating upper GI bleeding", category: "clinical" },
      { front: "Signs of peritonitis", back: "Rebound tenderness, guarding, rigid abdomen, fever, altered mental status", category: "clinical" },
      { front: "Murphy's sign indicates what condition?", back: "Cholecystitis (gallbladder inflammation) - pain with deep inspiration during RUQ palpation", category: "clinical" },
      { front: "Why maintain NPO status for abdominal pain?", back: "Patient may need emergency surgery; food/fluid increases aspiration risk during anesthesia", category: "protocol" },
      { front: "Classic presentation of appendicitis", back: "RLQ pain (McBurney's point), nausea, vomiting, low-grade fever, rebound tenderness", category: "clinical" },
      { front: "Kidney stone pain characteristics", back: "Severe colicky flank pain radiating to groin, patient cannot find comfortable position", category: "clinical" },
      { front: "When should you suspect ectopic pregnancy?", back: "Any woman of childbearing age with abdominal pain, especially with missed period", category: "clinical" },
      { front: "Difference between visceral and parietal pain", back: "Visceral: deep, poorly localized, cramping; Parietal: sharp, well-localized, worse with movement", category: "definition" },
      { front: "Signs of significant GI bleeding", back: "Hematemesis, melena, hematochezia, tachycardia, hypotension, altered mental status", category: "clinical" },
      { front: "What is referred pain?", back: "Pain felt in area distant from actual source (e.g., gallbladder pain felt in right shoulder)", category: "definition" },
      { front: "Priority assessment for testicular pain in young male", back: "Rule out testicular torsion - sudden severe pain requires immediate transport", category: "protocol" },
      { front: "Key considerations for female reproductive emergencies", back: "Consider pregnancy, maintain privacy, cultural sensitivity, possible domestic violence", category: "clinical" }
    ],
    crossReferences: [
      "Chapter 15: Medical Overview - Systematic approach to abdominal assessment",
      "Chapter 13: Shock Recognition - Hemorrhagic shock from GI bleeding",
      "Chapter 34: Gynecological Emergencies - Female reproductive health issues",
      "Chapter 33: Pediatric Emergencies - Pediatric abdominal conditions",
      "Chapter 35: Geriatric Emergencies - Atypical presentations in elderly"
    ]
  };*/

  /*const chapter20StudyNotes: ChapterData = {
    title: "Chapter 20: Metabolic & Hematologic Emergencies",
    description: "Comprehensive management of endocrine and hematologic emergencies with evidence-based protocols and pathophysiology",
    module: "8",
    scope: "EMT-B",
    protocols: ["Hypoglycemia Management", "Diabetic Ketoacidosis Recognition", "Bleeding Control", "Shock Prevention", "Sickle Cell Crisis Management"],
    learningObjectives: [
      "Recognize and manage hypoglycemic and hyperglycemic emergencies",
      "Apply systematic approach to diabetic emergency assessment",
      "Assess and control bleeding in hematologic emergencies", 
      "Identify complications of bleeding disorders and sickle cell disease",
      "Implement evidence-based glucose administration protocols"
    ],
    keyTerms: [
      "Hypoglycemia",
      "Hyperglycemia", 
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State (HHS)",
      "Insulin",
      "Glucagon",
      "Hemophilia",
      "Thrombocytopenia", 
      "Sickle Cell Disease",
      "Vaso-occlusive Crisis",
      "Anticoagulants",
      "Hemostasis"
    ],
    sections: [
      {
        title: "🩸 Endocrine System Overview and Glucose Regulation",
        content: [
          "**Pancreatic Function**: Beta cells produce insulin (lowers glucose), alpha cells produce glucagon (raises glucose)",
          "**Normal Glucose Range**: 70-100 mg/dL fasting, maintained through hormonal balance",
          "**Type 1 Diabetes**: Autoimmune destruction of beta cells, absolute insulin deficiency, typically childhood onset",
          "**Type 2 Diabetes**: Insulin resistance with relative insulin deficiency, typically adult onset with obesity"
        ],
        clinicalPearls: [
          "Brain depends entirely on glucose - cannot use alternative fuels effectively",
          "Epinephrine release during hypoglycemia causes classic 'fight or flight' symptoms",
          "Diabetics lose hypoglycemia awareness over time (hypoglycemia unawareness)"
        ],
        mnemonics: [
          "**TIRED**: Tremors, Irritability, Restlessness, Excessive hunger, Diaphoresis (hypoglycemia)",
          "**DKA triad**: Dehydration, Ketosis, Acidosis"
        ]
      },
      {
        title: "⚠️ Hypoglycemic Emergencies",
        content: [
          "**Definition**: Blood glucose <70 mg/dL with symptoms or <50 mg/dL regardless of symptoms",
          "**Pathophysiology**: Inadequate glucose delivery to brain causes altered mental status and sympathetic nervous system activation",
          "**Classic Presentation**: Diaphoresis, shakiness, confusion, combativeness, altered mental status progressing to unconsciousness",
          "**Treatment Protocol**: Oral glucose 15-30g if conscious with gag reflex, IV dextrose if unconscious or unable to swallow"
        ],
        clinicalPearls: [
          "Hypoglycemic patients often appear intoxicated - always check glucose",
          "Sweating in diabetic with altered mental status = hypoglycemia until proven otherwise",
          "Response to glucose administration is diagnostic and therapeutic"
        ],
        fieldApplications: [
          "Practice glucose administration techniques safely",
          "Master blood glucose meter operation and quality control", 
          "Develop systematic approach to altered mental status assessment"
        ],
        commonPitfalls: [
          "❌ Giving oral glucose to unconscious patient (aspiration risk)",
          "❌ Assuming psychiatric emergency without checking glucose",
          "❌ Delaying treatment while obtaining IV access"
        ]
      },
      {
        title: "📈 Hyperglycemic Emergencies - DKA and HHS",
        content: [
          "**Diabetic Ketoacidosis (DKA)**: Usually Type 1 diabetes, glucose >250 mg/dL, ketones present, acidosis, dehydration",
          "**Hyperosmolar Hyperglycemic State (HHS)**: Usually Type 2 diabetes, glucose >600 mg/dL, severe dehydration, no ketosis",
          "**Common Triggers**: Infection, medication non-compliance, illness, stress, new-onset diabetes",
          "**Assessment Findings**: Polyuria, polydipsia, polyphagia, weakness, fruity breath odor (DKA), altered mental status"
        ],
        clinicalPearls: [
          "Kussmaul respirations (deep, rapid) compensate for metabolic acidosis in DKA",
          "HHS has higher mortality than DKA due to severe dehydration",
          "Abdominal pain in DKA may mimic surgical emergency"
        ],
        mnemonics: [
          "**3 P's**: Polyuria, Polydipsia, Polyphagia (hyperglycemia symptoms)",
          "**MUDPILES**: Metabolic acidosis causes (includes DKA)"
        ],
        decisionTrees: [
          "Altered mental status → Check glucose → If >250 → Assess hydration → Look for ketones → DKA vs HHS"
        ]
      },
      {
        title: "🩸 Hematologic System and Bleeding Disorders",
        content: [
          "**Hemostasis Process**: Vascular spasm → platelet plug → coagulation cascade → fibrin clot formation",
          "**Hemophilia Types**: Factor VIII deficiency (Hemophilia A), Factor IX deficiency (Hemophilia B), prolonged bleeding",
          "**Thrombocytopenia**: Low platelet count <150,000, causes easy bruising and petechiae",
          "**Anticoagulant Effects**: Warfarin, heparin, NOACs increase bleeding risk with trauma"
        ],
        clinicalPearls: [
          "Hemophiliacs may have delayed bleeding hours after injury",
          "Anticoagulated patients can have severe bleeding from minor trauma",
          "Internal bleeding may not be immediately apparent"
        ],
        fieldApplications: [
          "Practice pressure point techniques for bleeding control",
          "Master tourniquet application for extremity hemorrhage",
          "Develop systematic bleeding assessment approach"
        ]
      },
      {
        title: "🌙 Sickle Cell Disease and Vaso-occlusive Crisis",
        content: [
          "**Pathophysiology**: Abnormal hemoglobin S causes red blood cells to sickle under stress, causing vascular occlusion",
          "**Crisis Triggers**: Dehydration, hypoxia, infection, cold exposure, stress, acidosis",
          "**Clinical Presentation**: Severe pain (often chest, back, extremities), fever, swelling, priapism",
          "**Complications**: Acute chest syndrome, stroke, splenic sequestration, infection susceptibility"
        ],
        clinicalPearls: [
          "Pain level in sickle cell crisis is often severe (8-10/10)",
          "Patients are usually experts on their own disease management",
          "Avoid giving oxygen unless hypoxic (may suppress bone marrow)"
        ],
        commonPitfalls: [
          "❌ Undertreating pain due to concerns about drug-seeking behavior",
          "❌ Not recognizing acute chest syndrome as life-threatening",
          "❌ Assuming all presentations are typical crises"
        ]
      }
    ],
    criticalConcepts: [
      "🧠 **Brain Glucose Dependency**: Brain requires constant glucose supply - hypoglycemia causes immediate CNS dysfunction",
      "⚖️ **Diabetic Emergency Spectrum**: Ranges from mild hypoglycemia to life-threatening DKA/HHS",
      "🩸 **Bleeding Risk Factors**: Anticoagulants, bleeding disorders, and liver disease increase hemorrhage risk",
      "🔄 **Sickle Cell Triggers**: Prevention through hydration, warmth, and oxygen (if hypoxic) prevents crises"
    ],
    clinicalDecisionRules: [
      "**15-15 Rule**: Give 15g glucose, recheck in 15 minutes, repeat if glucose still <70 mg/dL",
      "**DKA Criteria**: Glucose >250, ketones present, pH <7.3, bicarbonate <15",
      "**Blood Loss Assessment**: >500mL in adult or >100mL in child requires immediate intervention"
    ],
    commonMisconceptions: [
      "❌ \"All diabetics can take oral glucose\" - Check consciousness and gag reflex first",
      "❌ \"High glucose isn't immediately dangerous\" - DKA and HHS are life-threatening",
      "❌ \"Sickle cell patients are drug-seeking\" - Pain is real and severe"
    ],
    examTips: [
      "📝 Know glucose normal ranges and treatment thresholds",
      "📝 Understand difference between DKA (Type 1) and HHS (Type 2)",
      "📝 Remember sickle cell crisis triggers and complications"
    ],
    crossReferences: [
      "→ Chapter 10: Glucose assessment part of altered mental status evaluation",
      "→ Chapter 17: Diabetic patients have increased cardiac risk",
      "→ Chapter 31: Abdominal pain may be DKA presentation"
    ],
    flashcards: [
      { front: "What blood glucose level defines hypoglycemia?", back: "Below 70 mg/dL", category: "definition" },
      { front: "What is the 15-15 rule?", back: "Give 15g glucose, recheck in 15 minutes, repeat if needed", category: "protocol" },
      { front: "What triggers sickle cell crisis?", back: "Dehydration, infection, stress, hypoxia, temperature extremes", category: "clinical" },
      { front: "What is DKA?", back: "Diabetic Ketoacidosis - life-threatening complication of diabetes", category: "definition" },
      { front: "What are signs of hyperglycemia?", back: "Polyuria, polydipsia, polyphagia, fruity breath odor", category: "clinical" },
      { front: "What is normal blood glucose range?", back: "80-120 mg/dL", category: "clinical" },
      { front: "What is hemophilia?", back: "Inherited bleeding disorder due to clotting factor deficiency", category: "definition" },
      { front: "What does TIRED mnemonic represent?", back: "Tremors, Irritability, Restlessness, Excessive hunger, Diaphoresis", category: "protocol" },
      { front: "What is HHNS?", back: "Hyperosmolar Hyperglycemic Nonketotic Syndrome", category: "definition" },
      { front: "What causes Type 1 diabetes?", back: "Autoimmune destruction of insulin-producing beta cells", category: "definition" },
      { front: "What medication do diabetics commonly take?", back: "Insulin, metformin, sulfonylureas", category: "clinical" },
      { front: "What is sickle cell disease?", back: "Genetic disorder causing abnormal hemoglobin and vaso-occlusive crises", category: "definition" },
      { front: "What are signs of severe hypoglycemia?", back: "Altered mental status, seizures, loss of consciousness", category: "clinical" },
      { front: "What oral glucose dose for conscious hypoglycemic patient?", back: "15-25 grams oral glucose gel", category: "protocol" },
      { front: "What can mimic hypoglycemia?", back: "Stroke, alcohol intoxication, psychiatric disorders", category: "clinical" }
    ]
  };*/

  /*const chapter21StudyNotes: ChapterData = {
    title: "Chapter 21: Allergic & Anaphylactic Response",
    description: "Recognition and emergency management of allergic reactions and anaphylaxis with life-saving interventions",
    module: "9",
    scope: "EMT-B",
    protocols: ["Anaphylaxis Management", "Epinephrine Administration", "Airway Support", "Fluid Resuscitation"],
    learningObjectives: [
      "Differentiate between allergic reactions and anaphylaxis",
      "Demonstrate proper epinephrine auto-injector use",
      "Recognize life-threatening allergic reactions",
      "Apply appropriate supportive care measures"
    ],
    keyTerms: ["Anaphylaxis", "Epinephrine", "Auto-injector", "Histamine", "Urticaria", "Angioedema", "Bronchospasm"],
    criticalConcepts: [
      "Anaphylaxis can be fatal within minutes without treatment",
      "Epinephrine is the first-line treatment for severe allergic reactions",
      "Biphasic reactions can occur 4-12 hours after initial resolution"
    ],
    clinicalDecisionRules: [
      "Anaphylaxis criteria: exposure + 2+ organ systems involved",
      "Severe reaction indicators: respiratory distress, hypotension, altered mental status"
    ],
    commonMisconceptions: [
      "Mild reactions cannot progress to anaphylaxis",
      "Previous mild reactions predict future severity",
      "Epinephrine is dangerous in cardiac patients"
    ],
    examTips: [
      "Know the difference between local and systemic allergic reactions",
      "Remember that anaphylaxis can occur without skin involvement"
    ],
    sections: [
      {
        title: "Allergic Reaction Classification",
        content: [
          "**Local allergic reactions** affect only the area of contact, presenting with localized redness, swelling, or itching.",
          "**Systemic allergic reactions** affect multiple body systems and can rapidly progress to anaphylaxis.",
          "**Anaphylaxis** is a severe, life-threatening systemic allergic reaction involving cardiovascular and respiratory compromise."
        ],
        clinicalPearls: [
          "Anaphylaxis can occur without skin symptoms in 10-20% of cases",
          "Biphasic reactions occur in 5-20% of anaphylaxis cases"
        ],
        mnemonics: [
          "**FAST**: Face/lips swelling, Airway compromise, Skin changes, Tachycardia (anaphylaxis signs)"
        ],
        decisionTrees: [
          "Exposure → Symptoms in 2+ systems → Epinephrine → Transport → Monitor for biphasic reaction"
        ]
      },
      {
        title: "Emergency Management",
        content: [
          "**Epinephrine** 0.3mg IM (adult) or 0.15mg IM (pediatric) is the first-line treatment for anaphylaxis.",
          "**Supportive care** includes high-flow oxygen, IV access, fluid resuscitation, and continuous monitoring.",
          "**Transport** all anaphylaxis patients immediately due to potential for biphasic reactions."
        ],
        fieldApplications: [
          "Check expiration dates on patient's auto-injectors",
          "Be prepared for multiple epinephrine doses if transport is delayed",
          "Position patient supine unless respiratory distress requires upright position"
        ]
      }
    ],
    flashcards: [
      { front: "What is the adult epinephrine dose for anaphylaxis?", back: "0.3mg intramuscular", category: "protocol" },
      { front: "When can biphasic reactions occur?", back: "4-12 hours after initial reaction resolution", category: "clinical" },
      { front: "What defines anaphylaxis?", back: "Exposure + involvement of 2 or more organ systems", category: "definition" },
      { front: "What is the pediatric epinephrine dose?", back: "0.15mg intramuscular", category: "protocol" },
      { front: "What does FAST stand for in anaphylaxis?", back: "Face/lips swelling, Airway compromise, Skin changes, Tachycardia", category: "protocol" },
      { front: "What is urticaria?", back: "Hives - raised, itchy skin welts", category: "definition" },
      { front: "What is angioedema?", back: "Swelling of deeper tissues, especially face and throat", category: "definition" },
      { front: "What percentage of anaphylaxis cases occur without skin symptoms?", back: "10-20% can occur without skin involvement", category: "clinical" },
      { front: "What is histamine's role in allergic reactions?", back: "Mediator causing vasodilation, increased permeability, bronchospasm", category: "clinical" },
      { front: "Where should epinephrine auto-injectors be administered?", back: "Outer thigh, vastus lateralis muscle", category: "protocol" },
      { front: "What are common anaphylaxis triggers?", back: "Foods, medications, insect stings, latex", category: "clinical" },
      { front: "What supportive care is needed for anaphylaxis?", back: "High-flow oxygen, IV access, fluid resuscitation, position supine", category: "protocol" },
      { front: "What is a local allergic reaction?", back: "Limited to area of contact - redness, swelling, itching", category: "definition" },
      { front: "How long should anaphylaxis patients be monitored?", back: "Minimum 4-6 hours due to biphasic reaction risk", category: "clinical" },
      { front: "What cardiac effects can anaphylaxis cause?", back: "Tachycardia, hypotension, cardiovascular collapse", category: "clinical" }
    ]
  };*/

  /*const chapter22StudyNotes: ChapterData = {
    title: "Chapter 22: Toxicological Emergencies",
    description: "Emergency management of poisoning and overdose cases with evidence-based decontamination and supportive care",
    module: "9", 
    scope: "EMT-B",
    protocols: ["Poisoning Management", "Overdose Assessment", "Decontamination Procedures", "Antidote Administration"],
    learningObjectives: [
      "Identify common poisoning presentations",
      "Apply appropriate decontamination methods",
      "Recognize specific overdose syndromes",
      "Provide supportive care for toxic exposures"
    ],
    keyTerms: ["Toxidrome", "Decontamination", "Antidote", "Activated Charcoal", "Naloxone", "Organophosphate", "Carbon Monoxide"],
    criticalConcepts: [
      "Scene safety is paramount in toxic exposures",
      "Supportive care is the cornerstone of toxicology management", 
      "Specific antidotes exist for limited number of poisons"
    ],
    clinicalDecisionRules: [
      "Altered mental status + unknown exposure = consider toxic cause",
      "Pinpoint pupils + respiratory depression = opioid overdose"
    ],
    commonMisconceptions: [
      "Inducing vomiting is helpful in most poisonings",
      "Activated charcoal works for all ingested poisons",
      "Antidotes are available for most toxic substances"
    ],
    sections: [
      {
        title: "Toxidromes and Recognition",
        content: [
          "**Cholinergic toxidrome** presents with SLUDGE symptoms: Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis.",
          "**Anticholinergic toxidrome** presents with hot, dry, flushed skin, altered mental status, and hyperthermia.",
          "**Opioid toxidrome** characterized by CNS depression, respiratory depression, and pinpoint pupils."
        ],
        mnemonics: [
          "**SLUDGE**: Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis (cholinergic)",
          "**Mad as a hatter, red as a beet, hot as a pistol, dry as a bone** (anticholinergic)"
        ],
        commonPitfalls: [
          "Missing mixed overdoses that present with confusing symptoms",
          "Assuming single substance involvement"
        ]
      },
      {
        title: "Emergency Management",
        content: [
          "**Scene safety** assessment for ongoing toxic exposure risks to providers and bystanders.",
          "**Decontamination** methods include removal from source, skin/eye irrigation, and selective use of activated charcoal.",
          "**Supportive care** focuses on airway management, breathing support, and circulation maintenance."
        ],
        clinicalPearls: [
          "Activated charcoal is most effective within 1 hour of ingestion",
          "Naloxone may need repeated doses for long-acting opioids"
        ],
        fieldApplications: [
          "Always consider scene safety before patient contact",
          "Bring medication bottles or containers to hospital",
          "Consider multiple patients in household chemical exposures"
        ]
      }
    ],
    flashcards: [
      { front: "What does SLUDGE represent?", back: "Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis", category: "protocol" },
      { front: "When is activated charcoal most effective?", back: "Within 1 hour of ingestion", category: "clinical" },
      { front: "What are classic opioid overdose signs?", back: "CNS depression, respiratory depression, pinpoint pupils", category: "definition" },
      { front: "What is a toxidrome?", back: "Constellation of signs and symptoms from specific poison class", category: "definition" },
      { front: "What is the anticholinergic mnemonic?", back: "Mad as a hatter, red as a beet, hot as a pistol, dry as a bone", category: "protocol" },
      { front: "What is the antidote for opioid overdose?", back: "Naloxone (Narcan)", category: "protocol" },
      { front: "What is carbon monoxide poisoning treatment?", back: "High-flow oxygen, remove from source", category: "protocol" },
      { front: "What are organophosphate sources?", back: "Pesticides, insecticides, nerve agents", category: "clinical" },
      { front: "What is the universal antidote myth?", back: "There is no universal antidote; supportive care is key", category: "clinical" },
      { front: "What are contraindications to activated charcoal?", back: "Altered mental status, caustics, hydrocarbons, alcohols", category: "protocol" },
      { front: "What is decontamination?", back: "Removal or neutralization of toxic substances", category: "definition" },
      { front: "What are signs of methamphetamine overdose?", back: "Hyperthermia, agitation, tachycardia, hypertension", category: "clinical" },
      { front: "What is the cholinergic toxidrome treatment?", back: "Atropine for organophosphate poisoning", category: "protocol" },
      { front: "What household items commonly cause poisoning?", back: "Cleaning products, medications, plants, chemicals", category: "clinical" },
      { front: "What is naloxone's duration of action?", back: "30-90 minutes, may need repeated doses", category: "clinical" }
    ]
  };*/

  /*const chapter23StudyNotes: ChapterData = {
    title: "Chapter 23: Behavioral Crisis Protocols",
    description: "Professional approach to behavioral health emergencies with de-escalation techniques and safety protocols",
    module: "9",
    scope: "EMT-B", 
    protocols: ["Crisis De-escalation", "Restraint Procedures", "Involuntary Transport", "Safety Assessment"],
    learningObjectives: [
      "Apply de-escalation techniques for agitated patients",
      "Recognize psychiatric emergency presentations",
      "Ensure scene and provider safety",
      "Understand legal considerations for psychiatric transport"
    ],
    keyTerms: ["De-escalation", "Psychiatric Emergency", "Involuntary Hold", "Restraints", "Suicidal Ideation", "Psychosis"],
    criticalConcepts: [
      "Scene safety is the highest priority in behavioral emergencies",
      "Medical causes must be ruled out before psychiatric diagnosis",
      "De-escalation is more effective than restraints when possible"
    ],
    clinicalDecisionRules: [
      "Altered mental status: rule out medical causes first",
      "Imminent danger to self/others: consider restraints and law enforcement"
    ],
    commonMisconceptions: [
      "Psychiatric patients are always violent or unpredictable",
      "Restraints are the primary method of managing agitated patients",
      "Behavioral emergencies don't require medical evaluation"
    ],
    examTips: [
      "Know the medical conditions that can mimic psychiatric emergencies",
      "Understand the legal requirements for involuntary psychiatric holds"
    ],
    sections: [
      {
        title: "Assessment and De-escalation",
        content: [
          "**Scene safety assessment** includes evaluating for weapons, escape routes, and potential for violence.",
          "**De-escalation techniques** involve calm verbal communication, active listening, and maintaining non-threatening body language.",
          "**Medical screening** to rule out hypoglycemia, hypoxia, drug intoxication, or other medical causes of altered behavior."
        ],
        clinicalPearls: [
          "Medical conditions cause 25% of psychiatric presentations",
          "Therapeutic communication is more effective than confrontation"
        ],
        mnemonics: [
          "**LEAP**: Listen, Empathize, Affirm, Partner (de-escalation approach)"
        ],
        fieldApplications: [
          "Position yourself between patient and exit",
          "Remove potential weapons from patient area",
          "Speak slowly and clearly with simple instructions"
        ]
      },
      {
        title: "Legal and Ethical Considerations",
        content: [
          "**Involuntary transport** requires specific legal criteria: danger to self, danger to others, or gravely disabled.",
          "**Restraint use** should be last resort, properly applied, and continuously monitored.",
          "**Documentation** must clearly justify interventions and transport decisions."
        ],
        commonPitfalls: [
          "Using restraints without proper justification",
          "Inadequate documentation of behavioral emergency interventions",
          "Failing to consider medical causes of behavior changes"
        ]
      }
    ],
    flashcards: [
      { front: "What does LEAP stand for in de-escalation?", back: "Listen, Empathize, Affirm, Partner", category: "protocol" },
      { front: "What percentage of psychiatric presentations have medical causes?", back: "Approximately 25%", category: "clinical" },
      { front: "What are the criteria for involuntary transport?", back: "Danger to self, danger to others, or gravely disabled", category: "definition" },
      { front: "What is suicidal ideation?", back: "Thoughts of harming oneself or ending one's life", category: "definition" },
      { front: "What is psychosis?", back: "Loss of contact with reality, hallucinations, delusions", category: "definition" },
      { front: "What are de-escalation techniques?", back: "Calm voice, active listening, non-threatening posture, respect", category: "protocol" },
      { front: "What medical conditions mimic psychiatric emergencies?", back: "Hypoglycemia, hypoxia, drug intoxication, head injury", category: "clinical" },
      { front: "When should restraints be used?", back: "Last resort when patient poses imminent danger to self/others", category: "protocol" },
      { front: "What is the most important priority in behavioral emergencies?", back: "Scene safety for all involved", category: "protocol" },
      { front: "What is depression?", back: "Persistent sadness, loss of interest, impaired daily functioning", category: "definition" },
      { front: "What are signs of elder abuse?", back: "Unexplained injuries, poor hygiene, fear of caregiver, malnutrition", category: "clinical" },
      { front: "What is bipolar disorder?", back: "Mood disorder with alternating manic and depressive episodes", category: "definition" },
      { front: "How should you communicate with psychiatric patients?", back: "Calm, respectful, clear communication while maintaining safety", category: "protocol" },
      { front: "What is the difference between anxiety and panic?", back: "Panic is intense, sudden fear; anxiety is persistent worry", category: "definition" },
      { front: "What documentation is needed for behavioral emergencies?", back: "Objective observations, quotes, interventions used, justifications", category: "protocol" }
    ]
  };*/

  /*const chapter24StudyNotes: ChapterData = {
    title: "Chapter 24: Gynecologic Emergencies",
    description: "Comprehensive assessment and management of female reproductive health emergencies with cultural sensitivity and dignity",
    module: "9",
    scope: "EMT-B",
    protocols: ["Gynecologic Assessment", "Vaginal Bleeding", "Privacy Protection", "Cultural Sensitivity", "Emergency Transport"],
    learningObjectives: [
      "Understand the anatomy and physiology of the female reproductive system",
      "Recognize signs and symptoms of gynecologic emergencies",
      "Understand the assessment of gynecologic complaints with sensitivity",
      "Identify life-threatening gynecologic conditions",
      "Apply appropriate management for gynecologic bleeding",
      "Understand sexual assault examination considerations",
      "Recognize complications of gynecologic infections",
      "Apply cultural sensitivity in gynecologic emergency care"
    ],
    keyTerms: [
      "Menstruation",
      "Menorrhagia",
      "Metrorrhagia", 
      "Amenorrhea",
      "Dysmenorrhea",
      "Ovarian Cyst",
      "Ovarian Torsion",
      "Pelvic Inflammatory Disease",
      "Ectopic Pregnancy",
      "Endometriosis",
      "Vaginal Bleeding",
      "Pelvic Pain",
      "Sexual Assault",
      "Vaginitis",
      "Mittelschmerz",
      "Uterine Fibroids",
      "Cervicitis",
      "Bartholin's Cyst",
      "Vulvovaginitis",
      "Postmenopausal Bleeding",
      "Ovulation",
      "Fallopian Tubes",
      "Cervix",
      "Uterus",
      "Ovaries",
      "Vagina",
      "Vulva",
      "Perineum",
      "Privacy",
      "Dignity",
      "Cultural Sensitivity"
    ],
    sections: [
      {
        title: "Female Reproductive Anatomy and Normal Physiology",
        content: [
          "External genitalia include mons pubis, labia majora and minora, clitoris",
          "Vagina is muscular canal connecting external genitalia to cervix", 
          "Cervix is lower portion of uterus that opens into vagina",
          "Uterus is pear-shaped organ where fetus develops during pregnancy",
          "Fallopian tubes transport eggs from ovaries to uterus",
          "Ovaries produce eggs and female hormones (estrogen, progesterone)",
          "Menstrual cycle averages 28 days with ovulation around day 14",
          "Menstruation is monthly shedding of uterine lining (endometrium)",
          "Normal menstrual flow lasts 3-7 days with 30-40 mL blood loss",
          "Hormones regulate reproductive cycle: FSH, LH, estrogen, progesterone",
          "Reproductive years typically span from menarche to menopause",
          "Pregnancy dramatically alters anatomy and physiology"
        ],
        clinicalPearls: [
          "Normal menstrual cycle varies from 21-35 days in healthy women",
          "Heavy bleeding defined as >1 pad per hour or clots larger than quarter",
          "Mittelschmerz is normal ovulation pain that can mimic appendicitis",
          "Reproductive anatomy has rich blood supply - bleeding can be significant"
        ],
        mnemonics: [
          "Female anatomy: VFUOCV (Vulva, Fallopian tubes, Uterus, Ovaries, Cervix, Vagina)",
          "Menstrual abnormalities: TEAM (Too much, Early, Absent, Missing periods)"
        ]
      },
      {
        title: "Common Gynecologic Emergencies",
        content: [
          "Ovarian torsion: twisting of ovary cutting off blood supply",
          "Sudden severe unilateral pelvic pain, often with nausea and vomiting",
          "Surgical emergency requiring immediate transport",
          "Ectopic pregnancy: pregnancy implanted outside uterus",
          "Classic triad: abdominal pain, vaginal bleeding, missed period",
          "Can cause life-threatening internal hemorrhage",
          "Pelvic inflammatory disease (PID): infection of reproductive organs",
          "Caused by sexually transmitted bacteria ascending from vagina",
          "Ovarian cysts: fluid-filled sacs that can rupture or hemorrhage",
          "Usually cause sudden onset pelvic pain",
          "Uterine fibroids: benign growths causing heavy bleeding and pain",
          "Endometriosis: uterine tissue growing outside uterus causing severe pain"
        ],
        clinicalPearls: [
          "Any woman of childbearing age with abdominal pain - think pregnancy",
          "Ovarian torsion is surgical emergency - don't delay transport",
          "PID often presents with fever, pelvic pain, and abnormal discharge",
          "Ruptured ovarian cyst can cause significant internal bleeding"
        ],
        mnemonics: [
          "Ovarian torsion: Sudden, Severe, Surgical emergency",
          "Ectopic pregnancy: Pain, Bleeding, Missed period"
        ]
      },
      {
        title: "Assessment of Gynecologic Complaints",
        content: [
          "Obtain history with sensitivity and privacy",
          "Last menstrual period (LMP) essential information",
          "Character of vaginal bleeding: amount, color, clots, duration",
          "Associated symptoms: pain, fever, nausea, dizziness",
          "Sexual history may be relevant but approach sensitively",
          "Pregnancy history: gravida (pregnancies), para (births)",
          "Medications: birth control, hormones, antibiotics",
          "Physical assessment focuses on vital signs and pain",
          "Abdominal examination for tenderness, guarding, masses",
          "Pelvic examination usually not performed in prehospital setting",
          "Assess for signs of shock from blood loss",
          "Document objectively using proper medical terminology"
        ],
        clinicalPearls: [
          "Maintain privacy and dignity during gynecologic assessments",
          "Heavy bleeding is >1 pad per hour or passage of large clots",
          "Always consider pregnancy in women of childbearing age",
          "Document findings objectively and professionally"
        ],
        mnemonics: [
          "Gynecologic history: LMP, Pain, Bleeding, Associated symptoms",
          "Assessment priorities: Privacy, Professional, Pregnancy possibility"
        ]
      },
      {
        title: "Management of Gynecologic Bleeding",
        content: [
          "Assess severity: vital signs, amount of bleeding, patient condition",
          "Heavy bleeding: >1 pad per hour or large clots",
          "Signs of shock: tachycardia, hypotension, altered mental status",
          "Large-bore IV access for significant bleeding",
          "Position patient supine with legs elevated if hypotensive",
          "Apply external pads - do not pack vagina",
          "Save any passed tissue for hospital examination",
          "Monitor vital signs frequently during transport",
          "Provide emotional support and reassurance",
          "Rapid transport for hemodynamically unstable patients",
          "Document amount and character of bleeding",
          "Consider pregnancy-related bleeding in appropriate patients"
        ],
        clinicalPearls: [
          "Never pack the vagina - apply external pads only",
          "Save any passed tissue in sterile container for examination",
          "Postmenopausal bleeding is always abnormal and needs evaluation",
          "Pain control important - gynecologic pain can be severe"
        ],
        mnemonics: [
          "Bleeding management: Assess, Access (IV), Apply pads, Transport",
          "Never pack: External pressure only, no internal intervention"
        ]
      },
      {
        title: "Sexual Assault Considerations",
        content: [
          "Sexual assault is any sexual contact without consent",
          "Medical care takes priority over forensic evidence collection",
          "Treat all injuries according to standard trauma protocols",
          "Preserve evidence when possible without compromising care",
          "Do not allow patient to change clothes, shower, or douche",
          "Handle clothing as potential evidence if removal necessary",
          "Provide emotional support and non-judgmental care",
          "Respect patient's right to refuse treatment or examination",
          "Follow local protocols for sexual assault cases",
          "Document objectively and factually without opinion",
          "Maintain strict confidentiality and chain of custody",
          "Consider pregnancy prophylaxis and STD testing at hospital"
        ],
        clinicalPearls: [
          "Medical care always takes priority over evidence preservation",
          "Always consider sexual assault in trauma patients",
          "Provide emotional support and maintain professional demeanor",
          "Follow local protocols for evidence preservation"
        ],
        mnemonics: [
          "Sexual assault care: Medical first, Evidence preserved, Support provided",
          "Documentation: Objective, Factual, No opinions"
        ]
      },
      {
        title: "Cultural and Communication Considerations",
        content: [
          "Respect cultural and religious beliefs about modesty",
          "Some cultures prefer same-gender healthcare providers",
          "Family involvement varies by cultural background",
          "Language barriers require professional interpreters",
          "Age considerations: adolescents may need special approach",
          "Elderly patients may have different comfort levels",
          "LGBTQ+ patients may have specific concerns and needs",
          "Mental health considerations in gynecologic emergencies",
          "Domestic violence screening appropriate in some situations",
          "Pain expression varies by cultural background",
          "Religious beliefs may affect treatment decisions",
          "Maintain dignity and respect throughout care"
        ],
        clinicalPearls: [
          "Cultural sensitivity improves patient cooperation and outcomes",
          "Same-gender providers preferred in many cultures",
          "Use professional interpreters, not family members",
          "Consider domestic violence in unexplained injuries"
        ],
        mnemonics: [
          "Cultural care: Respect, Professional interpreters, Same gender when possible",
          "Communication: Dignity, Sensitivity, Professional"
        ]
      }
    ],
    criticalConcepts: [
      "Always consider pregnancy in women of childbearing age with abdominal pain",
      "Ovarian torsion is surgical emergency requiring immediate transport",
      "Postmenopausal bleeding is always abnormal and needs evaluation",
      "Maintain privacy and dignity during all gynecologic assessments",
      "Heavy bleeding defined as >1 pad per hour or large clots",
      "Sexual assault cases require special protocols and evidence preservation",
      "Cultural sensitivity essential in gynecologic emergency care",
      "Never pack the vagina - apply external pressure only"
    ],
    flashcards: [
      { front: "Classic triad of ectopic pregnancy", back: "Abdominal pain, vaginal bleeding, missed menstrual period", category: "clinical" },
      { front: "What is ovarian torsion and why is it an emergency?", back: "Twisting of ovary cutting off blood supply; surgical emergency requiring immediate transport", category: "clinical" },
      { front: "How do you define heavy menstrual bleeding?", back: "More than 1 pad per hour or passage of clots larger than a quarter", category: "definition" },
      { front: "What should you never do for vaginal bleeding?", back: "Never pack the vagina - only apply external pads and pressure", category: "protocol" },
      { front: "Why is postmenopausal bleeding concerning?", back: "Always abnormal and may indicate cancer or other serious condition", category: "clinical" },
      { front: "Signs of PID (Pelvic Inflammatory Disease)", back: "Pelvic pain, fever, abnormal vaginal discharge, painful urination", category: "clinical" },
      { front: "Priority in sexual assault cases", back: "Medical care takes priority over evidence preservation; treat injuries first", category: "protocol" },
      { front: "What is mittelschmerz?", back: "Normal ovulation pain occurring mid-cycle, can mimic appendicitis", category: "definition" },
      { front: "Essential history question for gynecologic complaints", back: "Last menstrual period (LMP) and possibility of pregnancy", category: "protocol" },
      { front: "Cultural considerations in gynecologic care", back: "Respect modesty, same-gender providers, professional interpreters, religious beliefs", category: "clinical" },
      { front: "When should you suspect ovarian cyst rupture?", back: "Sudden onset severe unilateral pelvic pain, may have signs of internal bleeding", category: "clinical" },
      { front: "Management priorities for gynecologic bleeding", back: "Assess severity, IV access, external pads, monitor vitals, emotional support", category: "protocol" },
      { front: "What tissue should be saved in gynecologic emergencies?", back: "Any passed tissue should be saved in sterile container for hospital examination", category: "protocol" },
      { front: "Why maintain privacy in gynecologic assessment?", back: "Promotes dignity, improves cooperation, respects cultural/religious beliefs", category: "clinical" },
      { front: "Red flags requiring immediate transport", back: "Signs of shock, severe pain, suspected ectopic pregnancy, ovarian torsion", category: "clinical" }
    ],
    crossReferences: [
      "Chapter 19: GI and GU Emergencies - Ectopic pregnancy and reproductive anatomy",
      "Chapter 34: Obstetric Emergencies - Pregnancy-related complications",
      "Chapter 35: Geriatric Emergencies - Postmenopausal bleeding considerations", 
      "Chapter 13: Shock Recognition - Hemorrhagic shock from gynecologic bleeding",
      "Chapter 15: Medical Overview - Sensitive history taking and cultural considerations"
    ]
  };*/

  /*const chapter25StudyNotes: ChapterData = {
    title: "Trauma Overview",
    description: "Understanding trauma systems, mechanisms of injury, and comprehensive trauma patient assessment and management principles",
    module: "Module 9: Special Patient Populations",
    scope: "EMT-B",
    protocols: [
      "Multi-system trauma protocol",
      "Trauma triage criteria", 
      "Spinal immobilization guidelines",
      "Hemorrhage control protocols",
      "Pediatric trauma considerations",
      "Trauma communication requirements"
    ],
    learningObjectives: [
      "Define trauma and understand trauma epidemiology",
      "Describe components of trauma systems and levels of care",
      "Explain kinematics of trauma and mechanism of injury", 
      "Perform systematic trauma patient assessment",
      "Recognize and manage life-threatening trauma conditions",
      "Apply appropriate triage and transport decisions",
      "Understand trauma prevention strategies",
      "Implement trauma quality assurance principles"
    ],
    keyTerms: [
      "Trauma system", "Mechanism of injury", "Kinematics", "Primary survey", "Secondary survey",
      "Golden hour", "Load and go", "Trauma center", "Triage", "Index of suspicion",
      "Multisystem trauma", "Penetrating trauma", "Blunt trauma", "Acceleration", "Deceleration",
      "Cavitation", "Spalling", "Coup-contrecoup", "Newton's laws", "Energy transfer",
      "Trajectory", "Yaw", "Tumbling", "Fragmentation", "Ballistics",
      "Biomechanics", "Force", "Velocity", "Mass", "Compression injury"
    ],
    sections: [
      {
        title: "Introduction to Trauma",
        content: [
          "Trauma is physical injury caused by external force or violence",
          "Leading cause of death in people under 44 years old", 
          "Fourth leading cause of death overall in United States",
          "Major cause of disability and healthcare costs",
          "Preventable deaths can be reduced through proper care",
          "Time-sensitive condition requiring rapid assessment and treatment",
          "Blunt trauma involves force distributed over large area",
          "Penetrating trauma occurs when object pierces skin and enters body",
          "Motor vehicle crashes are leading cause of trauma death",
          "Falls most common mechanism in elderly patients",
          "Violence significant cause in urban areas",
          "Alcohol involvement factor in many trauma cases"
        ],
        clinicalPearls: [
          "Mechanism of injury helps predict what injuries to expect",
          "High-energy mechanisms require index of suspicion for multiple injuries",
          "Age and comorbidities significantly influence injury severity and outcomes",
          "Environmental factors can modify typical injury patterns"
        ],
        mnemonics: [
          "TRAUMA: Time critical, Rapid assessment, Assessment systematic, Understand mechanism, Manage ABCs, Act decisively",
          "MECHANISM: Motor vehicle, Energy transfer, Crush injuries, Height of fall, Age factors, Neurologic injury, Injury patterns, Speed and force, Mass involved"
        ],
        decisionTrees: [
          "Trauma Response → Scene Safety → Mechanism Assessment → Resource Needs → Patient Access",
          "Injury Prediction → Mechanism Analysis → Energy Involved → Protective Equipment → Environmental Factors → Index of Suspicion"
        ],
        fieldApplications: [
          "Always ensure scene safety before approaching trauma patients",
          "Use mechanism of injury to guide assessment priorities",
          "Consider need for additional resources early in response",
          "Document mechanism thoroughly for receiving facility"
        ]
      },
      {
        title: "Trauma Systems and Triage",
        content: [
          "Trauma systems include prevention, access, prehospital care, hospital care, rehabilitation, and research",
          "Level I trauma centers provide comprehensive care with all specialties available",
          "Level II hospitals have trauma surgery capabilities", 
          "Level III community hospitals provide basic trauma care",
          "Level IV rural hospitals provide initial stabilization",
          "Field triage determines appropriate destination facility",
          "Physiologic criteria include vital signs and level of consciousness", 
          "Anatomic criteria involve specific injury patterns",
          "Mechanism criteria include high-energy transfer events",
          "Special considerations include age, comorbidities, and pregnancy",
          "Transport decisions involve ground vs air medical options",
          "Time factors critical in transport decisions"
        ],
        clinicalPearls: [
          "Trauma center designation indicates specific capabilities and resources",
          "Field triage should consider patient needs vs available resources",
          "Air medical transport beneficial when time or distance factors significant",
          "Pre-arrival notification allows receiving facility preparation"
        ],
        mnemonics: [
          "LEVELS: Life-saving comprehensive (I), Limited surgery capable (II), Emergency basic care (III), Vital stabilization (IV), Emergency transfer needed, Specialty centers available",
          "TRIAGE: Time sensitive, Resources available, Injury severity, Age considerations, Geography factors, Equipment needs"
        ],
        decisionTrees: [
          "Triage Decision → Physiologic Criteria → Anatomic Criteria → Mechanism Criteria → Special Considerations → Destination",
          "Transport Mode → Distance Factor → Time Factor → Weather Conditions → Patient Stability → Resource Availability"
        ],
        fieldApplications: [
          "Use standardized triage criteria for consistent decisions",
          "Consider bypass protocols for appropriate trauma center transport",
          "Communicate with medical direction when destination unclear",
          "Provide detailed pre-arrival notification to receiving facility"
        ]
      },
      {
        title: "Kinematics and Injury Patterns",
        content: [
          "Newton's first law: objects in motion stay in motion until acted upon by force",
          "Kinetic energy formula KE = ½mv² shows velocity exponentially increases energy transfer",
          "Energy cannot be created or destroyed, only transferred to tissues causing damage",
          "Motor vehicle crashes involve front, side, rear, and rollover impact patterns",
          "Motorcycle crashes include head-on, angular, and ejection patterns",
          "Falls depend on height, landing surface, and body part impacted first",
          "Penetrating injuries from stab wounds and gunshot wounds create different patterns",
          "Blast injuries involve primary, secondary, and tertiary effects",
          "Cavitation in penetrating trauma creates temporary tissue damage beyond wound track",
          "Protective equipment significantly affects injury patterns",
          "Age and comorbidities influence how body responds to trauma forces",
          "Environmental factors modify typical mechanisms and injury patterns"
        ],
        clinicalPearls: [
          "Velocity has much greater impact on energy transfer than mass",
          "Understanding kinematics helps predict occult injuries not immediately apparent",
          "Seatbelts and airbags change typical injury patterns in crashes",
          "Helmet use significantly reduces but doesn't eliminate head injury risk"
        ],
        mnemonics: [
          "KINEMATICS: Kinetic energy, Injury prediction, Newton's laws, Energy transfer, Mechanism analysis, Assessment guidance, Time factors, Impact forces, Compression effects, Speed factors",
          "ENERGY: External force, Newton's laws, Energy transfer, Rapid deceleration, Gravity effects, Young patients"
        ],
        decisionTrees: [
          "Mechanism Analysis → Energy Assessment → Injury Prediction → Assessment Priorities → Treatment Focus",
          "Crash Analysis → Impact Direction → Restraint Use → Vehicle Damage → Occupant Position → Predicted Injuries"
        ],
        fieldApplications: [
          "Examine crash scene for clues about energy transfer and forces involved",
          "Look for starring windshield, bent steering wheel, intrusion into passenger space",
          "Ask about restraint use and airbag deployment in vehicle crashes",
          "Consider multiple injury systems with high-energy mechanisms"
        ]
      },
      {
        title: "Systematic Trauma Assessment",
        content: [
          "Scene size-up includes safety, mechanism, number of patients, resources needed, and environmental factors",
          "Primary survey follows ABCDE approach addressing life threats immediately when found",
          "A - Airway patency with cervical spine control and immobilization",
          "B - Breathing assessment including ventilation rate, quality, and oxygenation",
          "C - Circulation with hemorrhage control and perfusion assessment", 
          "D - Disability involving neurologic function and spinal assessment",
          "E - Exposure with full body examination while preventing hypothermia",
          "Secondary survey involves head-to-toe systematic examination when patient stable",
          "SAMPLE history obtained when patient condition allows", 
          "Vital signs and focused assessments guide ongoing care decisions",
          "Continuous monitoring and reassessment essential throughout care",
          "Documentation of all findings critical for continuity of care"
        ],
        clinicalPearls: [
          "Life threats in primary survey must be addressed immediately before continuing",
          "Cervical spine immobilization maintained throughout entire assessment",
          "Secondary survey only performed after primary survey complete and patient stable",
          "Frequent reassessment needed as trauma patients can deteriorate rapidly"
        ],
        mnemonics: [
          "ABCDE: Airway with c-spine, Breathing and ventilation, Circulation and bleeding, Disability and neurologic, Exposure and environment",
          "SAMPLE: Signs/symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading to injury"
        ],
        decisionTrees: [
          "Trauma Assessment → Primary Survey → Life Threats → Immediate Care → Stability Check → Secondary Survey",
          "ABCDE Approach → Airway Control → Breathing Support → Circulation Control → Disability Assessment → Exposure Examination"
        ],
        fieldApplications: [
          "Approach patient systematically without skipping steps in primary survey",
          "Control external bleeding immediately when discovered during circulation assessment", 
          "Assess mental status and motor function for disability evaluation",
          "Remove clothing as needed for complete exposure while maintaining dignity and warmth"
        ]
      },
      {
        title: "Trauma Management Principles",
        content: [
          "Golden hour concept: first hour after injury critical for survival",
          "Time starts at moment of injury, not EMS arrival at scene",
          "Load and go approach appropriate for time-critical trauma patients",
          "Minimize scene time for patients requiring immediate surgical intervention",
          "Life-saving interventions performed during transport when possible",
          "Control life-threatening hemorrhage immediately with direct pressure or tourniquet",
          "Maintain airway patency with appropriate spinal immobilization techniques",
          "Ensure adequate ventilation and oxygenation with supplemental oxygen",
          "Treat shock with appropriate fluid management and positioning",
          "Prevent hypothermia with warming measures and environmental control",
          "Provide pain management when appropriate and patient condition allows",
          "Pre-hospital notification to receiving facility allows preparation for arrival"
        ],
        clinicalPearls: [
          "Rapid transport more important than perfect stabilization for critical trauma",
          "Shock can be present even with initially normal blood pressure",
          "Hypothermia significantly worsens outcomes in trauma patients",
          "Pain management should not delay transport but can be provided en route"
        ],
        mnemonics: [
          "GOLDEN: Get to hospital, Optimal care time, Life-saving priority, Don't delay transport, Emergency interventions, New damage prevention",
          "LOAD GO: Life threats controlled, Optimal transport decision, Airway secured, Don't delay scene time, Get moving quickly, Ongoing care en route"
        ],
        decisionTrees: [
          "Treatment Decision → Life Threat Assessment → Scene Intervention vs Transport → Load and Go vs Stay and Play",
          "Transport Decision → Patient Stability → Distance Factor → Available Resources → Time Sensitivity → Destination Choice"
        ],
        fieldApplications: [
          "Control major bleeding immediately with direct pressure or hemorrhage control devices",
          "Secure airway and provide spinal immobilization during initial assessment",
          "Make early transport decision based on patient condition and injury severity",
          "Perform additional interventions during transport rather than delaying on scene"
        ]
      },
      {
        title: "Special Population Considerations",
        content: [
          "Pediatric trauma involves different injury patterns due to anatomical differences",
          "Children have larger head-to-body ratio affecting injury mechanisms and patterns",
          "Pediatric patients compensate well initially then decompensate rapidly",
          "Special equipment sizing and medication dosing required for children",
          "Family presence and psychological support important in pediatric trauma care",
          "Geriatric trauma patients have increased fragility and slower healing",
          "Medications may affect older adults' response to injury and treatment",
          "Comorbidities complicate assessment and management in elderly patients",
          "Higher mortality rates from similar injuries compared to younger patients",
          "Pregnancy involves physiologic changes affecting trauma assessment and management",
          "Fetal well-being depends on maternal stability and adequate perfusion",
          "Left lateral positioning prevents supine hypotensive syndrome in pregnant patients"
        ],
        clinicalPearls: [
          "Children may not show obvious signs of serious injury until decompensation occurs",
          "Elderly patients often take medications that mask typical physiologic responses",
          "Pregnant patients have increased blood volume affecting shock assessment",
          "Consider abuse and neglect in pediatric and geriatric trauma patients"
        ],
        mnemonics: [
          "PEDIATRIC: Physical differences, Equipment sizing, Dosing by weight, Injury patterns different, Assessment gentle, Temperature control, Rapid decompensation, Initial compensation, Caregiver involvement",
          "GERIATRIC: Gradual changes, Evaluation thorough, Medications multiple, Injury complications, Assessment detailed, Treatment modified, Risk factors increased, Illness concurrent"
        ],
        decisionTrees: [
          "Pediatric Trauma → Age Assessment → Size-Appropriate Equipment → Dosing Calculation → Family Involvement → Specialized Transport",
          "Geriatric Trauma → Baseline Function → Medication Review → Comorbidity Assessment → Modified Management → Enhanced Support"
        ],
        fieldApplications: [
          "Use pediatric equipment and follow weight-based dosing protocols",
          "Allow family presence when possible during pediatric trauma care",
          "Obtain comprehensive medication history in elderly trauma patients", 
          "Position pregnant patients in left lateral recumbent position for transport"
        ]
      }
    ],
    criticalConcepts: [
      "Mechanism of injury helps predict what injuries to expect",
      "The golden hour starts at time of injury, not hospital arrival", 
      "Shock can be present even with normal blood pressure initially",
      "Load and go for time-critical trauma patients",
      "Always consider spine injury with significant trauma",
      "High-energy mechanisms require trauma center transport",
      "Rapid transport is more important than perfect stabilization",
      "Trauma patients can deteriorate quickly - monitor closely"
    ],
    flashcards: [
      { front: "What is the golden hour in trauma care?", back: "The first hour after injury when prompt medical care can significantly improve survival outcomes. Time starts at the moment of injury, not EMS arrival.", category: "definition" },
      { front: "What does the acronym ABCDE stand for in trauma assessment?", back: "A-Airway (with c-spine), B-Breathing, C-Circulation (hemorrhage control), D-Disability (neurologic), E-Exposure (with warmth prevention).", category: "protocol" },
      { front: "What is the kinetic energy formula and why is it important in trauma?", back: "KE = ½mv². Velocity is squared, so doubling speed quadruples energy transfer. This explains why high-speed crashes cause more severe injuries.", category: "clinical" },
      { front: "What are the levels of trauma centers?", back: "Level I: Comprehensive with all specialties, Level II: Surgery capable, Level III: Community basic care, Level IV: Rural stabilization.", category: "definition" },
      { front: "When should you use 'load and go' approach?", back: "For time-critical trauma patients with life-threatening injuries where rapid transport to definitive care is more important than scene stabilization.", category: "protocol" },
      { front: "What is index of suspicion in trauma?", back: "Your awareness and concern for potentially serious injuries based on mechanism of injury, even if not immediately apparent on examination.", category: "clinical" },
      { front: "What are Newton's laws as they apply to trauma?", back: "Objects in motion stay in motion until acted upon by force. In crashes, occupants continue moving until something stops them, causing injury.", category: "clinical" },
      { front: "What is the difference between blunt and penetrating trauma?", back: "Blunt: Force distributed over large area (crashes, falls). Penetrating: Object pierces skin entering body (stab wounds, gunshots).", category: "definition" },
      { front: "What factors determine trauma center transport decisions?", back: "Physiologic criteria (vital signs), anatomic criteria (injury patterns), mechanism criteria (high energy), and special considerations (age, pregnancy).", category: "protocol" },
      { front: "Why is spinal immobilization important in trauma?", back: "Significant mechanisms can cause spinal injury. Movement without proper immobilization can worsen neurologic damage or cause paralysis.", category: "protocol" },
      { front: "What are the components of a trauma system?", back: "Prevention, access (911), prehospital care, hospital care, rehabilitation, and research working together to reduce trauma deaths.", category: "definition" },
      { front: "How do you assess for early shock in trauma patients?", back: "Tachycardia, altered mental status, delayed capillary refill, weak pulse quality, and skin changes before blood pressure drops.", category: "clinical" },
      { front: "What is cavitation in penetrating trauma?", back: "Temporary cavity created by projectile as it passes through tissue. Tissue stretches beyond elastic limits causing damage beyond wound track.", category: "clinical" },
      { front: "What special considerations apply to pediatric trauma?", back: "Different injury patterns, larger head-to-body ratio, children compensate well then decompensate rapidly, special equipment needs.", category: "clinical" },
      { front: "What is the primary goal of prehospital trauma care?", back: "Rapidly identify and treat life-threatening conditions while providing quick transport to appropriate trauma facility for definitive care.", category: "protocol" }
    ],
    crossReferences: [
      "Chapter 26: Head and Spine Injuries - Neurologic trauma assessment and spinal immobilization techniques",
      "Chapter 27: Chest Injuries - Thoracic trauma management and respiratory compromise",
      "Chapter 28: Abdominal Injuries - Internal bleeding assessment and shock management",
      "Chapter 29: Musculoskeletal Injuries - Extremity trauma care and immobilization",
      "Chapter 13: Shock Recognition - Hemorrhagic shock pathophysiology and treatment",
      "Chapter 30: Soft Tissue Injuries - Wound assessment and bleeding control techniques"
    ]
  };*/

  /*const chapter26StudyNotes: ChapterData = {
    title: "Bleeding Control",
    description: "Comprehensive management of external and internal bleeding including hemorrhage control techniques, shock recognition, and bleeding emergencies",
    module: "Module 10: Trauma",
    scope: "EMT-B",
    protocols: [
      "External bleeding control protocol",
      "Tourniquet application guidelines",
      "Hemorrhagic shock management",
      "Internal bleeding assessment",
      "Pressure point techniques",
      "Hemostatic agent protocols"
    ],
    learningObjectives: [
      "Understand anatomy and physiology of cardiovascular system",
      "Recognize types and severity of bleeding",
      "Apply appropriate bleeding control techniques",
      "Understand pathophysiology of hemorrhagic shock",
      "Recognize signs and symptoms of internal bleeding",
      "Apply appropriate management for hemorrhagic shock",
      "Understand special considerations for bleeding control",
      "Apply tourniquet and hemostatic agents appropriately"
    ],
    keyTerms: [
      "Hemorrhage", "External bleeding", "Internal bleeding", "Arterial bleeding", "Venous bleeding",
      "Capillary bleeding", "Hemostasis", "Coagulation", "Hypovolemic shock", "Tourniquet",
      "Hemostatic agent", "Pressure point", "Hematoma", "Ecchymosis", "Perfusion",
      "Direct pressure", "Elevation", "Pressure bandage", "Spurting", "Pulsatile",
      "Compensated shock", "Decompensated shock", "Pulse pressure", "Epistaxis", "Anticoagulants"
    ],
    sections: [
      {
        title: "Cardiovascular System and Hemostasis",
        content: [
          "Arteries carry oxygenated blood away from heart under high pressure",
          "Veins carry deoxygenated blood back to heart under low pressure",
          "Capillaries are microscopic vessels where gas and nutrient exchange occurs",
          "Blood pressure is the force of blood against vessel walls",
          "Perfusion is adequate blood flow to organs and tissues",
          "Red blood cells carry oxygen using hemoglobin protein",
          "Platelets are essential for blood clotting and hemostasis",
          "Plasma is liquid portion containing proteins and nutrients",
          "Normal blood volume is approximately 7% of body weight",
          "Hemostasis involves vascular spasm, platelet plug formation, and coagulation",
          "Coagulation cascade forms fibrin clot to stop bleeding",
          "Factors affecting clotting include age, medications, and diseases"
        ],
        clinicalPearls: [
          "Arterial bleeding is bright red and spurts with pulse",
          "Venous bleeding is dark red with steady flow",
          "Capillary bleeding usually stops spontaneously",
          "Blood volume loss tolerance varies by age and health status"
        ],
        mnemonics: [
          "BLEEDING: Bright red spurting (arterial), Low pressure dark (venous), Elevated position helps, Evaluation continuous, Direct pressure first, Inspect for source, Never remove first dressing, Go to hospital quickly",
          "HEMOSTASIS: Hold pressure, Elevate if possible, Monitor vital signs, Oxygen therapy, Stop the bleeding, Treat for shock, Apply tourniquet if needed, Support circulation, Immobilize fractures, Secure dressings"
        ],
        decisionTrees: [
          "Bleeding Assessment → External vs Internal → Severity Assessment → Control Method Selection",
          "Hemorrhage Control → Direct Pressure → Pressure Point → Elevation → Tourniquet → Transport"
        ],
        fieldApplications: [
          "Apply direct pressure immediately to all external bleeding",
          "Use sterile gauze when available, any clean cloth if necessary",
          "Don't remove initial dressing - add more on top if soaked through",
          "Control bleeding before addressing other injuries unless life-threatening"
        ]
      },
      {
        title: "Types and Assessment of Bleeding",
        content: [
          "External bleeding is visible outside the body and easier to assess",
          "Internal bleeding occurs inside body cavities and may not be visible",
          "Arterial bleeding is bright red, spurting, and pulsatile with heartbeat",
          "Venous bleeding is dark red with steady, continuous flow",
          "Capillary bleeding is slow oozing that usually stops spontaneously",
          "Class I hemorrhage involves less than 15% blood loss with minimal signs",
          "Class II hemorrhage involves 15-30% loss with compensated shock signs",
          "Class III hemorrhage involves 30-40% loss with decompensated shock",
          "Class IV hemorrhage involves greater than 40% loss with profound shock",
          "Rate of blood loss is more important than total amount lost",
          "Signs of blood loss include obvious bleeding, shock signs, and skin changes",
          "Internal bleeding signs include mechanism of injury and shock without visible bleeding"
        ],
        clinicalPearls: [
          "Rapid blood loss is more dangerous than gradual loss",
          "Children and elderly tolerate blood loss differently than adults",
          "Early shock signs include anxiety, thirst, and restlessness",
          "Look for internal bleeding when shock signs present without external bleeding"
        ],
        mnemonics: [
          "SHOCK SIGNS: Skin pale/cool, Heart rate up, Oxygen needs increase, Consciousness altered, Kidneys decrease output, Systolic pressure down, Increased respirations, Glucose needs increase, Nervous system affected, Sweating increases",
          "INTERNAL: Injury mechanism, Never visible externally, Tachycardia present, Evaluate for shock, Rapid transport needed, Neurologic changes, Abdominal distension, Look for bruising"
        ],
        decisionTrees: [
          "Bleeding Type → Arterial (bright, spurting) → Venous (dark, steady) → Capillary (oozing) → Treatment Selection",
          "Shock Assessment → Compensated → Decompensated → Irreversible → Intervention Urgency"
        ],
        fieldApplications: [
          "Assess bleeding type to predict severity and select appropriate control method",
          "Monitor vital signs closely for early shock development",
          "Document estimated blood loss and patient response to treatment",
          "Consider internal bleeding in all high-energy trauma mechanisms"
        ]
      },
      {
        title: "External Bleeding Control Techniques",
        content: [
          "Direct pressure is the most effective method for most external bleeding",
          "Apply firm, steady pressure directly over the wound site",
          "Use sterile gauze preferred, but any clean cloth acceptable in emergency",
          "Maintain continuous pressure without removing initial dressings",
          "Add additional dressings on top if blood soaks through original",
          "Pressure bandage secures dressing with circumferential wrap",
          "Pressure points are locations where arteries pass over bones",
          "Brachial artery pressure point controls upper arm bleeding",
          "Femoral artery pressure point controls lower extremity bleeding",
          "Elevation uses gravity to help reduce blood flow to extremities",
          "Elevation contraindicated with suspected fractures or spinal injury",
          "Splinting helps control bleeding from fracture sites by stabilizing bone ends"
        ],
        clinicalPearls: [
          "Never remove the first dressing - it may disturb clot formation",
          "Pressure points are adjuncts to direct pressure, not replacements",
          "Elevation is most effective when limb raised above heart level",
          "Femur fractures can cause significant internal bleeding into thigh"
        ],
        mnemonics: [
          "PRESSURE: Place dressing directly, Rescue breathing if needed, Elevate if possible, Secure with bandage, Support circulation, Use clean materials, Remove jewelry, Evaluate response",
          "DIRECT: Don't remove dressing, Immediate pressure application, Rescue airway if needed, Evaluate circulation, Control bleeding first, Transport quickly"
        ],
        decisionTrees: [
          "External Bleeding → Direct Pressure → Adequate Control → Pressure Bandage → Monitor",
          "Inadequate Control → Add Pressure Point → Still Bleeding → Consider Tourniquet → Transport"
        ],
        fieldApplications: [
          "Apply pressure with palm of hand over large area initially",
          "Use fingertip pressure for small, precise bleeding sources",
          "Maintain pressure during patient movement and transport",
          "Check circulation distal to pressure dressings regularly"
        ]
      },
      {
        title: "Tourniquets and Advanced Bleeding Control",
        content: [
          "Tourniquets indicated for severe extremity hemorrhage uncontrolled by pressure",
          "Use in multiple casualty situations when resources are limited",
          "Indicated in tactical situations when direct pressure not feasible",
          "Traumatic amputations often require immediate tourniquet application",
          "Apply tourniquet 2-3 inches above wound, over bone if possible",
          "Tighten until bleeding stops completely - partial pressure ineffective",
          "Record application time clearly and communicate to receiving facility",
          "Secure tourniquet to prevent loosening during transport",
          "Never remove tourniquet in prehospital setting",
          "Commercial tourniquets more effective than improvised versions",
          "CAT and SOF-T tourniquets are most commonly used types",
          "Hemostatic agents promote clotting when packed directly into wounds"
        ],
        clinicalPearls: [
          "Tourniquet pain is severe - this is normal and expected",
          "One tourniquet per extremity - don't apply multiple on same limb",
          "Document exact time of application for surgical planning",
          "Tourniquets save lives when applied quickly and properly"
        ],
        mnemonics: [
          "TOURNIQUET: Time documented, Over bone placement, Until bleeding stops, Record application time, Never remove prehospital, Immediate for amputation, Quick application saves life, Uncontrolled bleeding indication, Emergency last resort, Transport rapidly",
          "CAT: Combat Application Tourniquet, Above wound placement, Tighten until stops"
        ],
        decisionTrees: [
          "Severe Extremity Bleeding → Direct Pressure → Inadequate → Tourniquet → Time Documentation",
          "Tourniquet Decision → Life-threatening bleeding → Other methods failed → Apply → Transport"
        ],
        fieldApplications: [
          "Practice tourniquet application regularly to maintain proficiency",
          "Keep commercial tourniquets easily accessible on all units",
          "Apply over clothing if necessary to save time",
          "Communicate tourniquet presence prominently to receiving facility"
        ]
      },
      {
        title: "Internal Bleeding and Hemorrhagic Shock",
        content: [
          "Internal bleeding cannot be controlled in prehospital environment",
          "Suspect with high-energy trauma mechanism and shock signs",
          "Common sites include chest, abdomen, pelvis, and retroperitoneum",
          "Abdominal signs include distension, rigidity, and tenderness",
          "Chest signs include shortness of breath and decreased breath sounds",
          "Pelvic signs include instability and pain with compression",
          "Neurological signs include altered mental status and unequal pupils",
          "Assessment requires inspection, palpation, and vital sign monitoring",
          "Management focuses on supportive care and rapid transport",
          "Establish large-bore IV access for fluid resuscitation",
          "Provide high-flow oxygen to all patients with suspected internal bleeding",
          "Position supine with legs elevated if no spinal injury suspected"
        ],
        clinicalPearls: [
          "Internal bleeding is often more dangerous than obvious external bleeding",
          "Shock signs without external bleeding should raise suspicion",
          "Femur fractures can cause 1-2 liters of blood loss into thigh",
          "Pelvic fractures can cause massive retroperitoneal bleeding"
        ],
        mnemonics: [
          "INTERNAL: Injury mechanism high energy, Never visible bleeding, Tachycardia develops, Evaluate for shock, Rapid transport critical, Neurologic changes, Abdominal distension, Look for bruising",
          "SHOCK: Skin pale and cool, Heart rate increases, Oxygen delivery decreased, Confusion develops, Kidneys reduce output"
        ],
        decisionTrees: [
          "Trauma Patient → High Energy Mechanism → Shock Signs → Suspect Internal Bleeding → Rapid Transport",
          "Shock Assessment → Compensated → Decompensated → Fluid Resuscitation → Surgical Intervention"
        ],
        fieldApplications: [
          "Maintain high index of suspicion with appropriate mechanisms",
          "Perform serial assessments to monitor for deterioration",
          "Avoid delays in transport for patients with internal bleeding",
          "Communicate suspicion of internal bleeding to receiving facility"
        ]
      },
      {
        title: "Special Bleeding Situations",
        content: [
          "Nosebleeds may be anterior (common, traumatic) or posterior (serious, medical)",
          "Manage nosebleeds by pinching soft part of nose and leaning forward",
          "Apply ice to bridge of nose and consider nasal packing if uncontrolled",
          "Bleeding from ears may indicate skull fracture and should not be stopped",
          "Bleeding from nose with clear fluid may indicate cerebrospinal fluid leak",
          "Don't pack bleeding from body orifices - allow drainage",
          "Anticoagulated patients have increased bleeding from minor trauma",
          "Medications like warfarin, heparin make bleeding control difficult",
          "Use same techniques but be more aggressive with anticoagulated patients",
          "Pediatric patients have smaller blood volume and compensate differently",
          "Children compensate well initially but decompensate rapidly when it occurs",
          "Use age-appropriate vital signs for assessment in pediatric patients"
        ],
        clinicalPearls: [
          "Posterior nosebleeds are medical emergencies requiring hospital treatment",
          "Never pack ears or nose if skull fracture suspected",
          "Anticoagulated patients may need reversal agents at hospital",
          "Small children can lose critical blood volume quickly"
        ],
        mnemonics: [
          "NOSEBLEED: No packing if skull fracture, Observe for clear fluid, Sit forward position, Eyes for signs of fracture, Breathing maintain airway, Lean forward, Elevate head, Emergency if uncontrolled, Direct pressure on soft part",
          "PEDIATRIC: Proportionally higher oxygen need, Emergency decompensation, Decreased blood volume, Increased surface area, Anxiety from bleeding, Temperature regulation poor, Rapid compensation initially, Immediate intervention needed, Careful fluid management"
        ],
        decisionTrees: [
          "Nosebleed → Anterior vs Posterior → Treatment Method → Transport Decision",
          "Anticoagulated Patient → Minor Trauma → Major Bleeding → Aggressive Control → Hospital Notification"
        ],
        fieldApplications: [
          "Ask about anticoagulant medications in all bleeding patients",
          "Use appropriate pediatric equipment and assessment techniques",
          "Be prepared for rapid decompensation in special populations",
          "Modify techniques based on patient age and medical history"
        ]
      }
    ],
    criticalConcepts: [
      "Direct pressure controls most external bleeding effectively",
      "Don't remove the first dressing - add more on top if needed",
      "Internal bleeding is often more dangerous than external",
      "Early shock signs include anxiety and thirst",
      "Tourniquets save lives when properly applied",
      "Rapid transport is crucial for hemorrhagic shock",
      "Small children can lose blood volume quickly",
      "Time of tourniquet application must be documented"
    ],
    flashcards: [
      { front: "What is the most effective method for controlling most external bleeding?", back: "Direct pressure applied firmly and steadily over the wound site using sterile gauze or clean cloth.", category: "protocol" },
      { front: "What are the characteristics of arterial bleeding?", back: "Bright red color, spurting pattern that pulses with heartbeat, high pressure flow that is difficult to control.", category: "clinical" },
      { front: "When should a tourniquet be applied?", back: "For severe extremity hemorrhage that cannot be controlled with direct pressure, traumatic amputations, or resource-limited situations.", category: "protocol" },
      { front: "What are the four classes of hemorrhagic shock?", back: "Class I: <15% loss, Class II: 15-30% loss, Class III: 30-40% loss, Class IV: >40% loss with each having progressive severity.", category: "clinical" },
      { front: "How should you position a patient with suspected internal bleeding?", back: "Supine with legs elevated if no spinal injury is suspected, provide high-flow oxygen and prepare for rapid transport.", category: "protocol" },
      { front: "What is the proper technique for tourniquet application?", back: "Place 2-3 inches above wound over bone, tighten until bleeding stops completely, document time, secure to prevent loosening, never remove.", category: "protocol" },
      { front: "What are early signs of hemorrhagic shock?", back: "Anxiety, thirst, restlessness, tachycardia, cool and clammy skin, before blood pressure drops significantly.", category: "clinical" },
      { front: "How do you manage a nosebleed?", back: "Pinch soft part of nose, lean patient forward, apply ice to bridge of nose, don't pack if skull fracture suspected.", category: "protocol" },
      { front: "What makes bleeding control difficult in anticoagulated patients?", back: "Medications like warfarin and heparin interfere with normal clotting mechanisms, causing increased bleeding from minor trauma.", category: "clinical" },
      { front: "Why shouldn't you remove the first dressing from a bleeding wound?", back: "Removing disrupts clot formation that has begun, which can restart or worsen bleeding. Add more dressings on top instead.", category: "protocol" },
      { front: "What pressure points are most useful for bleeding control?", back: "Brachial artery for upper extremity bleeding and femoral artery for lower extremity bleeding, applied over bony prominences.", category: "clinical" },
      { front: "How is pediatric bleeding different from adult bleeding?", back: "Children have smaller blood volume, compensate well initially but decompensate rapidly, and blood loss percentages are more critical.", category: "clinical" },
      { front: "What indicates internal bleeding in a trauma patient?", back: "Shock signs without obvious external bleeding, high-energy mechanism, abdominal distension, chest injury signs, altered mental status.", category: "clinical" },
      { front: "What is the difference between compensated and decompensated shock?", back: "Compensated: body maintains blood pressure through increased heart rate. Decompensated: blood pressure drops and organ perfusion fails.", category: "clinical" },
      { front: "When should elevation be used for bleeding control?", back: "As adjunct to direct pressure for extremity bleeding, only if no fracture or spinal injury suspected, elevate above heart level.", category: "protocol" }
    ],
    crossReferences: [
      "Chapter 25: Trauma Overview - Assessment priorities and mechanism of injury",
      "Chapter 13: Shock Recognition - Pathophysiology and management of hemorrhagic shock",
      "Chapter 27: Chest Injuries - Internal bleeding from thoracic trauma",
      "Chapter 28: Abdominal Injuries - Internal bleeding assessment and management",
      "Chapter 29: Musculoskeletal Injuries - Bleeding from fracture sites and splinting techniques",
      "Chapter 30: Soft Tissue Injuries - Wound assessment and bleeding control techniques"
    ]
  };*/

  /*const chapter27StudyNotes: ChapterData = {
    title: "Soft-Tissue Injuries",
    description: "Comprehensive assessment and management of soft-tissue trauma including wounds, burns, and specialized injury patterns",
    module: "Module 10: Trauma",
    scope: "EMT-B",
    protocols: [
      "Wound assessment protocol",
      "Bleeding control techniques",
      "Burn management guidelines",
      "Dressing and bandaging procedures",
      "Infection prevention protocols",
      "Special injury management"
    ],
    learningObjectives: [
      "Understand anatomy and physiology of the integumentary system",
      "Classify types of soft-tissue injuries and their characteristics",
      "Apply appropriate wound assessment and management techniques",
      "Understand principles of wound healing and infection prevention",
      "Recognize and manage burns of various types and severities",
      "Apply appropriate dressings and bandaging techniques",
      "Understand special considerations for soft-tissue injuries",
      "Recognize complications of soft-tissue trauma"
    ],
    keyTerms: [
      "Integumentary system", "Epidermis", "Dermis", "Subcutaneous", "Abrasion",
      "Laceration", "Puncture", "Avulsion", "Amputation", "Contusion",
      "Hematoma", "Crush injury", "Degloving", "Evisceration", "Hemostasis",
      "Coagulation", "Sterile technique", "Occlusive dressing", "Pressure dressing", "Bandage",
      "Superficial burn", "Partial thickness", "Full thickness", "Rule of nines", "Chemical burn"
    ],
    sections: [
      {
        title: "Anatomy and Physiology of the Skin",
        content: [
          "Epidermis is the outermost layer providing waterproof barrier protection",
          "Dermis is the deeper layer containing blood vessels, nerves, and glands",
          "Subcutaneous tissue is the fat layer providing insulation and protection",
          "Hair follicles produce hair and are potential sites for infection",
          "Sweat glands regulate temperature through perspiration",
          "Sebaceous glands produce oils to keep skin moist",
          "Skin functions include protection, temperature regulation, sensation, and vitamin D production",
          "Rich blood supply allows for healing and temperature regulation",
          "Nerve endings provide pain, touch, and temperature sensation",
          "Age affects blood supply with decreased circulation in elderly",
          "Chronic diseases like diabetes and vascular disease affect healing",
          "Factors affecting wound healing include age, nutrition, blood supply, infection, and medications"
        ],
        clinicalPearls: [
          "Younger patients heal faster than older patients",
          "Good circulation is essential for proper wound healing",
          "Steroids and chemotherapy medications slow healing process",
          "Diabetic patients have increased infection risk and slower healing"
        ],
        mnemonics: [
          "SKIN FUNCTIONS: Sensation, Keeping temperature, Immunity protection, Nutrition (vitamin D)",
          "HEALING FACTORS: Age, Nutrition, Blood supply, Infection prevention, Medications, Environment"
        ],
        decisionTrees: [
          "Skin Assessment → Layer Involvement → Wound Classification → Treatment Selection",
          "Healing Assessment → Age Factor → Circulation Status → Risk Factors → Management Plan"
        ],
        fieldApplications: [
          "Assess wound depth by examining which skin layers are involved",
          "Consider patient age and medical history when predicting healing",
          "Look for signs of infection including redness, warmth, and pus",
          "Document wound characteristics thoroughly for hospital communication"
        ]
      },
      {
        title: "Types of Soft-Tissue Injuries",
        content: [
          "Contusions (bruises) involve bleeding under intact skin from blunt trauma",
          "Hematomas are collections of blood in tissues forming visible swelling",
          "Crush injuries cause damage from compression between two objects",
          "Abrasions are scraping injuries affecting only the epidermis layer",
          "Lacerations are cuts through skin and underlying tissues with various edge patterns",
          "Puncture wounds create small openings from sharp objects with high infection risk",
          "Avulsions involve skin flaps torn partially or completely away from body",
          "Amputations are complete severing of body parts requiring special care",
          "Smooth-edged lacerations result from sharp objects like knives",
          "Jagged lacerations occur from blunt trauma or broken glass",
          "Stellate lacerations have star-shaped patterns from blunt impact",
          "Gaping wounds have edges that separate due to skin tension"
        ],
        clinicalPearls: [
          "Puncture wounds have high infection risk due to difficulty cleaning",
          "Avulsed skin flaps should be replaced in anatomical position",
          "Crush injuries may have more internal damage than visible externally",
          "Bite wounds have extremely high infection risk from bacteria"
        ],
        mnemonics: [
          "CLOSED INJURIES: Contusion, Hematoma, Crush injury",
          "OPEN INJURIES: Abrasion, Laceration, Puncture, Avulsion, Amputation",
          "LACERATION TYPES: Smooth (sharp), Jagged (blunt), Stellate (impact), Gaping (tension)"
        ],
        decisionTrees: [
          "Injury Assessment → Closed vs Open → Specific Type → Severity Level → Treatment Protocol",
          "Puncture Wound → Depth Assessment → Foreign Body Check → Tetanus Status → Infection Prevention"
        ],
        fieldApplications: [
          "Examine wound edges to determine mechanism of injury",
          "Look for foreign bodies in puncture and laceration wounds",
          "Assess blood supply to avulsed tissue flaps",
          "Document exact mechanism and wound characteristics"
        ]
      },
      {
        title: "Wound Assessment and Management",
        content: [
          "Initial assessment includes mechanism of injury and wound characteristics",
          "Measure wound size including length, width, and depth when possible",
          "Assess location as anatomical position affects healing and function",
          "Check for contamination including dirt, debris, and foreign material",
          "Evaluate bleeding type and severity requiring immediate control",
          "Look for associated injuries to underlying structures",
          "Irrigate wounds with normal saline or clean water when available",
          "Remove visible debris but don't scrub as this damages tissue",
          "Control bleeding as primary concern during wound cleaning",
          "Use sterile technique when possible to prevent infection",
          "Don't delay transport for extensive wound cleaning procedures",
          "Document wound location, size, appearance, mechanism, contamination, and treatment provided"
        ],
        clinicalPearls: [
          "Control bleeding before focusing on wound cleaning",
          "Don't remove impaled objects - stabilize them in place",
          "Time factors are critical - don't delay transport for perfect cleaning",
          "Sterile technique reduces infection risk when properly applied"
        ],
        mnemonics: [
          "WOUND ASSESSMENT: Width, Open vs closed, Underlying damage, Nerve function, Depth, Assessment complete",
          "CLEANING PRINCIPLES: Clean gently, Irrigate thoroughly, Remove debris, Control bleeding, Sterile technique, Time considerations"
        ],
        decisionTrees: [
          "Wound Discovery → Immediate Bleeding Control → Assessment → Cleaning → Dressing → Transport",
          "Contaminated Wound → Irrigation → Debris Removal → Infection Prevention → Dressing Application"
        ],
        fieldApplications: [
          "Control active bleeding immediately before detailed assessment",
          "Use gentle irrigation rather than scrubbing contaminated wounds",
          "Save time by cleaning during transport rather than on scene",
          "Document tetanus vaccination status when possible"
        ]
      },
      {
        title: "Dressings and Bandaging Techniques",
        content: [
          "Sterile gauze dressings are standard for most wound applications",
          "Non-adherent dressings won't stick to wound surface during removal",
          "Occlusive dressings prevent air and water penetration for special wounds",
          "Hemostatic dressings contain agents to promote blood clotting",
          "Pressure dressings provide direct pressure for bleeding control",
          "Apply dressings using sterile technique when materials available",
          "Ensure adequate coverage extending beyond wound edges",
          "Provide sufficient absorbent capacity to handle expected drainage",
          "Secure dressings so they won't fall off during patient transport",
          "Avoid dressings so tight they compromise circulation",
          "Circumferential bandaging wraps around body parts completely",
          "Spiral bandaging uses overlapping turns moving up or down extremities"
        ],
        clinicalPearls: [
          "Never apply tape circumferentially as swelling can create tourniquet effect",
          "Check circulation distal to bandages regularly during transport",
          "Bulky dressings may be needed for heavily draining wounds",
          "Elastic bandages provide compression but must be applied carefully"
        ],
        mnemonics: [
          "DRESSING TYPES: Sterile gauze, Non-adherent, Occlusive, Hemostatic, Pressure",
          "BANDAGING: Circumferential, Spiral, Figure-eight, Triangular, Elastic, Tape securing"
        ],
        decisionTrees: [
          "Dressing Selection → Wound Type → Drainage Level → Security Needs → Application Method",
          "Bandaging → Body Part → Mobility Needs → Circulation Check → Secure Attachment"
        ],
        fieldApplications: [
          "Choose dressing size based on wound size plus adequate margin",
          "Layer multiple dressings for heavily bleeding wounds",
          "Use triangular bandages for versatile applications",
          "Monitor for signs of circulation compromise from tight bandages"
        ]
      },
      {
        title: "Burns and Thermal Injuries",
        content: [
          "Thermal burns result from heat sources including fire, hot liquids, and hot objects",
          "Chemical burns occur from acids, bases, and other corrosive substances",
          "Electrical burns result from electrical current passing through body",
          "Radiation burns come from sun exposure or radioactive materials",
          "Superficial burns affect epidermis only with red, painful appearance",
          "Partial thickness burns extend into dermis causing blisters and severe pain",
          "Full thickness burns destroy all skin layers appearing white or charred",
          "Rule of nines divides body into sections of 9% or 18% for burn size estimation",
          "Patient's palm equals approximately 1% of total body surface area",
          "Stop burning process immediately by removing from heat source",
          "Cool burns with room temperature water for 10-20 minutes",
          "Remove jewelry before swelling occurs but don't break intact blisters"
        ],
        clinicalPearls: [
          "Cool water, not ice, prevents further tissue damage",
          "Electrical burns may have more internal damage than visible externally",
          "Chemical burns require copious water irrigation regardless of chemical type",
          "Inhalation injury is suspected with facial burns and enclosed space fires"
        ],
        mnemonics: [
          "BURN TYPES: Thermal, Chemical, Electrical, Radiation",
          "BURN DEPTH: Superficial (red), Partial (blisters), Full thickness (white/charred)",
          "BURN CARE: Stop burning, Cool with water, Remove jewelry, Don't break blisters, Cover sterile, Pain management"
        ],
        decisionTrees: [
          "Burn Assessment → Type → Depth → Size → Location → Severity Classification",
          "Chemical Burn → Brush Off Dry → Irrigate Copiously → Remove Clothing → Continue Irrigation → Transport"
        ],
        fieldApplications: [
          "Use rule of nines or palm method for burn size estimation",
          "Look for signs of inhalation injury including facial burns and soot",
          "Irrigate chemical burns continuously during transport",
          "Consider pain management for conscious burn patients"
        ]
      },
      {
        title: "Special Soft-Tissue Injuries",
        content: [
          "Avulsion injuries require replacing skin flaps in anatomical position",
          "Assess blood supply viability to determine if tissue can be saved",
          "Keep avulsed tissue moist with sterile dressings during transport",
          "Complete amputations require bleeding control from stump site",
          "Wrap amputated parts in sterile gauze and keep cool but don't freeze",
          "Transport both patient and amputated part to appropriate facility",
          "Crush injuries cause extensive damage to muscle, bone, and vessels",
          "Compartment syndrome develops when swelling increases pressure in muscle compartments",
          "Degloving injuries strip skin away like removing a glove",
          "Pediatric patients have thinner skin more susceptible to injury",
          "Geriatric patients have fragile skin that tears easily from minor trauma",
          "High-risk wounds include bites, punctures, crush injuries, and contaminated wounds"
        ],
        clinicalPearls: [
          "Amputated parts should be kept cool but never placed directly on ice",
          "Compartment syndrome requires immediate surgical intervention",
          "Human bite wounds have higher infection risk than animal bites",
          "Consider child abuse with suspicious injury patterns in pediatric patients"
        ],
        mnemonics: [
          "AMPUTATION CARE: Control bleeding, Wrap part sterile, Keep cool not frozen, Transport both",
          "HIGH RISK WOUNDS: Bites, Punctures, Crush injuries, Contaminated, Facial, Hand injuries"
        ],
        decisionTrees: [
          "Avulsion → Assess Viability → Replace Anatomically → Moist Dressing → Transport",
          "Amputation → Control Stump Bleeding → Preserve Part → Rapid Transport → Surgical Reattachment"
        ],
        fieldApplications: [
          "Save all tissue in traumatic amputations for potential reattachment",
          "Check pulses, sensation, and movement in crush injury patients",
          "Use age-appropriate assessment techniques for pediatric patients",
          "Consider tetanus prophylaxis needs for puncture and dirty wounds"
        ]
      }
    ],
    criticalConcepts: [
      "Don't remove impaled objects - stabilize in place",
      "Cool burns with room temperature water, not ice",
      "The palm of the hand equals about 1% body surface area",
      "Electrical burns may have more internal damage than visible",
      "Avulsed skin flaps should be replaced in anatomical position",
      "Chemical burns require copious water irrigation",
      "Circumferential bandages can become tourniquets if swelling occurs",
      "Always consider tetanus status with puncture wounds"
    ],
    flashcards: [
      { front: "What are the three layers of skin?", back: "Epidermis (outer), dermis (middle with blood vessels/nerves), subcutaneous (fat layer for insulation).", category: "definition" },
      { front: "What is the difference between abrasion, laceration, and puncture wounds?", back: "Abrasion: scraping of epidermis. Laceration: cut through skin layers. Puncture: small opening from sharp object.", category: "clinical" },
      { front: "How should you cool a thermal burn?", back: "Use room temperature water for 10-20 minutes. Never use ice as it can cause further tissue damage.", category: "protocol" },
      { front: "What is the rule of nines for burn assessment?", back: "Method dividing body into sections of 9% or 18% of total body surface area to estimate burn size.", category: "clinical" },
      { front: "How should impaled objects be managed?", back: "Stabilize in place with bulky dressings. Never remove impaled objects in the field.", category: "protocol" },
      { front: "What is the proper care for an avulsed skin flap?", back: "Replace in anatomical position, keep moist with sterile dressing, assess blood supply viability.", category: "protocol" },
      { front: "How should amputated parts be preserved?", back: "Wrap in sterile gauze, keep cool but don't freeze, transport with patient for potential reattachment.", category: "protocol" },
      { front: "What percentage of body surface area does the palm represent?", back: "Approximately 1% of total body surface area, useful for estimating burn size.", category: "clinical" },
      { front: "What are the signs of full thickness burns?", back: "White or charred appearance, leathery texture, little to no pain due to nerve destruction.", category: "clinical" },
      { front: "How should chemical burns be treated?", back: "Brush off dry chemicals first, then irrigate copiously with water, remove contaminated clothing.", category: "protocol" },
      { front: "What wound types have the highest infection risk?", back: "Puncture wounds, bite wounds (especially human), contaminated wounds, and crush injuries.", category: "clinical" },
      { front: "When should you suspect compartment syndrome?", back: "Crush injuries with severe pain, swelling, loss of pulses/sensation distal to injury site.", category: "clinical" },
      { front: "What is degloving injury?", back: "Skin stripped away from underlying tissue like removing a glove, often with poor blood supply to degloved skin.", category: "definition" },
      { front: "Why shouldn't you break blisters on burns?", back: "Intact blisters provide natural protection against infection and should be left alone.", category: "protocol" },
      { front: "What are the functions of the skin?", back: "Protection, temperature regulation, sensation, vitamin D production, excretion, and immunity.", category: "definition" }
    ],
    crossReferences: [
      "Chapter 25: Trauma Overview - Systematic trauma assessment and triage",
      "Chapter 26: Bleeding Control - Hemorrhage control techniques and shock management",
      "Chapter 28: Chest Injuries - Penetrating trauma considerations",
      "Chapter 29: Abdominal Injuries - Evisceration and penetrating trauma",
      "Chapter 30: Orthopedic Injuries - Associated soft tissue trauma",
      "Chapter 13: Shock Recognition - Fluid loss and shock from burns"
    ]
  };*/

  /*const chapter28StudyNotes: ChapterData = {
    title: "Chest Injuries",
    description: "Recognition and management of thoracic trauma including breathing difficulties, pneumothorax, and cardiovascular emergencies",
    module: "Module 10: Trauma",
    scope: "EMT-B",
    protocols: [
      "Chest trauma assessment protocol",
      "Breathing support procedures",
      "Pneumothorax management",
      "Penetrating chest wound care",
      "Cardiovascular trauma response",
      "Emergency ventilation techniques"
    ],
    learningObjectives: [
      "Understand anatomy and physiology of the thoracic cavity",
      "Recognize signs and symptoms of chest trauma",
      "Classify types of chest injuries and their mechanisms",
      "Understand pathophysiology of pneumothorax and hemothorax",
      "Apply appropriate emergency management for chest trauma",
      "Recognize life-threatening thoracic injuries",
      "Understand principles of chest wound management",
      "Apply appropriate ventilation support techniques"
    ],
    keyTerms: [
      "Thoracic cavity", "Pneumothorax", "Tension pneumothorax", "Hemothorax", "Flail chest",
      "Sucking chest wound", "Cardiac tamponade", "Commotio cordis", "Pulmonary contusion", "Aortic rupture",
      "Occlusive dressing", "Three-sided dressing", "Paradoxical motion", "Subcutaneous emphysema", "Crepitus",
      "Beck's triad", "Pulsus paradoxus", "Tracheal deviation", "Jugular vein distension", "Mediastinum"
    ],
    sections: [
      {
        title: "Thoracic Anatomy and Physiology",
        content: [
          "Thoracic cavity is protected by rib cage, sternum, and thoracic vertebrae",
          "Pleural space is potential space between visceral and parietal pleura",
          "Negative pressure in pleural space keeps lungs expanded during breathing",
          "Heart is located in mediastinum between the two lungs",
          "Great vessels include aorta, vena cava, and pulmonary vessels",
          "Diaphragm separates thoracic cavity from abdominal cavity",
          "Intercostal muscles assist with breathing and protect intercostal vessels",
          "Pericardium is fibrous sac surrounding the heart",
          "Trachea and bronchi provide airway to lungs",
          "Esophagus passes through posterior mediastinum to stomach",
          "Normal breathing requires intact chest wall, pleural space, and diaphragm",
          "Trauma can disrupt any component affecting ventilation and circulation"
        ],
        clinicalPearls: [
          "Loss of negative pressure in pleural space causes lung collapse",
          "Heart and great vessels are most vulnerable in penetrating trauma",
          "Diaphragm injury can allow abdominal contents into chest",
          "Rib fractures in elderly can be life-threatening due to poor healing"
        ],
        mnemonics: [
          "CHEST ANATOMY: Chest wall, Heart, Esophagus, Spine, Trachea",
          "PLEURAL SPACES: Visceral (on lung), Parietal (on chest wall)"
        ],
        decisionTrees: [
          "Chest Trauma → Airway/Breathing → Circulation → Disability → Exposure/Environment",
          "Breathing Problem → Chest Wall Integrity → Pleural Space → Lung Function → Ventilation Support"
        ],
        fieldApplications: [
          "Look for signs of chest wall integrity including paradoxical motion",
          "Listen for equal breath sounds on both sides of chest",
          "Palpate for subcutaneous emphysema indicating air leak",
          "Assess for signs of cardiovascular compromise from chest trauma"
        ]
      },
      {
        title: "Types of Chest Injuries",
        content: [
          "Blunt trauma results from motor vehicle crashes, falls, and crushing injuries",
          "Penetrating trauma includes stab wounds, gunshot wounds, and impaled objects",
          "Rib fractures are common in blunt trauma and may lacerate organs",
          "Flail chest occurs when multiple adjacent ribs are fractured in multiple places",
          "Pneumothorax is air in pleural space causing lung collapse",
          "Tension pneumothorax occurs when air enters but cannot escape pleural space",
          "Hemothorax is blood in pleural space from vessel injury",
          "Pulmonary contusion is bruising of lung tissue affecting gas exchange",
          "Cardiac contusion results from blunt impact to chest wall",
          "Aortic rupture can occur from deceleration injuries",
          "Sucking chest wounds allow air to enter pleural space through chest wall",
          "Pericardial tamponade occurs when blood fills pericardial sac compressing heart"
        ],
        clinicalPearls: [
          "Tension pneumothorax is immediately life-threatening requiring rapid decompression",
          "Flail chest causes paradoxical chest wall motion during breathing",
          "Small pneumothorax may not cause symptoms initially",
          "Cardiac tamponade presents with Beck's triad: hypotension, distended neck veins, muffled heart sounds"
        ],
        mnemonics: [
          "CHEST INJURIES: Rib fractures, Pneumothorax, Hemothorax, Flail chest, Cardiac trauma",
          "BECK'S TRIAD: Blood pressure low, Elevated neck veins, Cardiac sounds muffled"
        ],
        decisionTrees: [
          "Chest Injury → Blunt vs Penetrating → Specific Type → Severity Assessment → Management Protocol",
          "Pneumothorax → Simple vs Tension → Signs/Symptoms → Decompression Needs → Transport Priority"
        ],
        fieldApplications: [
          "Look for mechanism suggesting specific injury patterns",
          "Assess chest wall motion for paradoxical movement",
          "Monitor for progressive respiratory distress indicating tension pneumothorax",
          "Document entrance and exit wounds in penetrating trauma"
        ]
      },
      {
        title: "Assessment of Chest Trauma",
        content: [
          "Primary assessment focuses on airway, breathing, and circulation",
          "Look for obvious deformity, open wounds, and chest wall motion",
          "Listen for breath sounds comparing both sides of chest",
          "Feel for subcutaneous emphysema, crepitus, and chest wall stability",
          "Assess for jugular vein distension indicating increased central pressure",
          "Check for tracheal deviation away from affected side",
          "Monitor vital signs for signs of shock or respiratory compromise",
          "Observe skin color and work of breathing",
          "Palpate peripheral pulses and assess perfusion",
          "Look for signs of hypoxia including cyanosis and altered mental status",
          "Document mechanism of injury and timing of symptom onset",
          "Reassess frequently as chest injuries can deteriorate rapidly"
        ],
        clinicalPearls: [
          "Tracheal deviation is late sign of tension pneumothorax",
          "Decreased breath sounds may be difficult to hear in noisy environment",
          "Subcutaneous emphysema feels like bubble wrap under skin",
          "Muffled heart sounds are difficult to assess in field conditions"
        ],
        mnemonics: [
          "CHEST ASSESSMENT: Look, Listen, Feel, Vital signs, Perfusion check",
          "TENSION PNEUMOTHORAX: Tracheal deviation, Respiratory distress, Absent breath sounds, Shock, Subcutaneous emphysema"
        ],
        decisionTrees: [
          "Chest Assessment → Primary Survey → Secondary Exam → Ongoing Assessment → Transport Decision",
          "Respiratory Distress → Airway Clear → Breathing Assessment → Circulation Check → Intervention Needs"
        ],
        fieldApplications: [
          "Use hands to assess chest wall stability and motion",
          "Compare breath sounds on both sides systematically",
          "Look for subtle signs like use of accessory muscles",
          "Monitor pulse oximetry and capnography when available"
        ]
      },
      {
        title: "Management of Open Chest Wounds",
        content: [
          "Sucking chest wounds allow air to enter pleural space through chest wall",
          "Apply occlusive dressing sealed on three sides leaving fourth side open",
          "Three-sided seal allows air to escape but prevents entry",
          "Monitor patient for development of tension pneumothorax",
          "If tension develops, briefly lift dressing to release pressure",
          "Stabilize impaled objects in place with bulky dressings",
          "Never remove impaled objects from chest wounds",
          "Control bleeding around penetrating objects with direct pressure",
          "Position patient in position of comfort if spinal injury not suspected",
          "Provide high-flow oxygen and support ventilation as needed",
          "Prepare for rapid transport to trauma center",
          "Document entrance and exit wounds if present"
        ],
        clinicalPearls: [
          "Commercial chest seals are preferred but improvised occlusive dressings work",
          "Plastic wrap, aluminum foil, or petroleum gauze can create occlusive seal",
          "Never seal all four sides as this can create tension pneumothorax",
          "Monitor closely for signs of increasing respiratory distress"
        ],
        mnemonics: [
          "THREE-SIDED SEAL: Top, Right, Left sealed - Bottom open for air escape",
          "IMPALED OBJECTS: Stabilize, Don't remove, Control bleeding, Rapid transport"
        ],
        decisionTrees: [
          "Open Chest Wound → Sucking Sound → Three-Sided Seal → Monitor Breathing → Adjust as Needed",
          "Impaled Object → Stabilize Position → Control Bleeding → Protect During Transport → Hospital Removal"
        ],
        fieldApplications: [
          "Use chest seal products when available for optimal care",
          "Tape dressing securely but allow for chest wall movement",
          "Have patient hold dressing if unable to secure adequately",
          "Position for optimal breathing while maintaining spinal immobilization"
        ]
      },
      {
        title: "Pneumothorax and Hemothorax Management",
        content: [
          "Simple pneumothorax may be managed with oxygen and monitoring",
          "Tension pneumothorax requires immediate decompression if trained and authorized",
          "Needle decompression performed at second intercostal space midclavicular line",
          "Hemothorax requires aggressive fluid resuscitation for shock",
          "Large hemothorax can cause hypovolemic shock from blood loss",
          "Combined pneumohemothorax has features of both conditions",
          "Position patient sitting upright if no spinal injury suspected",
          "Provide positive pressure ventilation for respiratory failure",
          "Monitor for development of tension pneumothorax during transport",
          "Prepare for emergency decompression if patient deteriorates",
          "Document initial findings and response to treatment",
          "Communicate findings to receiving hospital early"
        ],
        clinicalPearls: [
          "Tension pneumothorax can develop from positive pressure ventilation",
          "Patient position affects venous return and breathing comfort",
          "Large hemothorax may require blood transfusion at hospital",
          "Bilateral tension pneumothorax is immediately fatal without treatment"
        ],
        mnemonics: [
          "TENSION PNEUMOTHORAX: Tracheal deviation, Respiratory distress, Absent sounds, Shock, Subcutaneous air",
          "NEEDLE DECOMPRESSION: Second space, Midclavicular line, Above rib, Rush of air expected"
        ],
        decisionTrees: [
          "Pneumothorax → Simple vs Tension → Severity Assessment → Decompression Decision → Monitor Response",
          "Hemothorax → Volume Assessment → Shock Signs → Fluid Resuscitation → Transport Priority"
        ],
        fieldApplications: [
          "Recognize progressive respiratory distress indicating tension",
          "Know local protocols for needle decompression authorization",
          "Position patient to optimize breathing and circulation",
          "Prepare decompression equipment if deterioration likely"
        ]
      },
      {
        title: "Cardiac and Great Vessel Injuries",
        content: [
          "Cardiac contusion results from blunt trauma causing heart muscle bruising",
          "Cardiac tamponade occurs when blood fills pericardial sac",
          "Beck's triad includes hypotension, distended neck veins, and muffled heart sounds",
          "Aortic rupture occurs from deceleration injuries and is often fatal",
          "Commotio cordis results from blunt impact during vulnerable cardiac cycle",
          "Penetrating cardiac wounds have high mortality without immediate surgery",
          "Pericardiocentesis may be life-saving but requires advanced training",
          "Monitor for signs of cardiogenic shock from cardiac injury",
          "Great vessel injuries cause massive hemorrhage and rapid exsanguination",
          "Widened mediastinum on chest X-ray suggests aortic injury",
          "Blood pressure differentials between arms suggest aortic injury",
          "Rapid transport to trauma center is essential for survival"
        ],
        clinicalPearls: [
          "Beck's triad may be incomplete or absent in field conditions",
          "Cardiac tamponade requires surgical drainage for definitive treatment",
          "Aortic rupture has brief window for surgical repair",
          "Commotio cordis may cause sudden cardiac arrest in young athletes"
        ],
        mnemonics: [
          "BECK'S TRIAD: Blood pressure decreased, Elevated neck veins, Cardiac sounds muffled",
          "AORTIC RUPTURE: Chest pain, Blood pressure differences, Pulse deficits, Mediastinal widening"
        ],
        decisionTrees: [
          "Cardiac Injury → Mechanism Assessment → Beck's Triad Check → Shock Management → Rapid Transport",
          "Great Vessel Injury → Massive Hemorrhage → Shock Treatment → Blood Pressure Support → Emergency Surgery"
        ],
        fieldApplications: [
          "Check blood pressure in both arms for aortic injury",
          "Look for jugular vein distension in upright patient",
          "Monitor for sudden deterioration requiring aggressive resuscitation",
          "Communicate high acuity to receiving trauma center"
        ]
      }
    ],
    criticalConcepts: [
      "Tension pneumothorax is immediately life-threatening",
      "Seal open chest wounds on three sides only, leaving fourth side open",
      "Never remove impaled objects from the chest",
      "Beck's triad indicates cardiac tamponade requiring surgery",
      "Flail chest causes paradoxical chest wall motion",
      "Tracheal deviation is a late sign of tension pneumothorax",
      "Aortic rupture requires immediate transport to trauma center",
      "Positive pressure ventilation can worsen pneumothorax"
    ],
    flashcards: [
      { front: "What is the proper technique for sealing a sucking chest wound?", back: "Apply occlusive dressing sealed on three sides, leaving fourth side open to allow air escape while preventing entry.", category: "protocol" },
      { front: "What are the signs of tension pneumothorax?", back: "Respiratory distress, absent breath sounds, tracheal deviation, hypotension, and subcutaneous emphysema.", category: "clinical" },
      { front: "What is Beck's triad and what does it indicate?", back: "Hypotension, distended neck veins, muffled heart sounds - indicates cardiac tamponade from pericardial blood.", category: "clinical" },
      { front: "How should impaled objects in the chest be managed?", back: "Stabilize in place with bulky dressings, control bleeding around object, never remove in field.", category: "protocol" },
      { front: "What is flail chest and how does it present?", back: "Multiple adjacent rib fractures in multiple places causing paradoxical chest wall motion during breathing.", category: "definition" },
      { front: "Where is needle decompression performed for tension pneumothorax?", back: "Second intercostal space at midclavicular line, just above the third rib to avoid vessels.", category: "protocol" },
      { front: "What is the difference between pneumothorax and hemothorax?", back: "Pneumothorax: air in pleural space. Hemothorax: blood in pleural space from vessel injury.", category: "definition" },
      { front: "Why might positive pressure ventilation worsen pneumothorax?", back: "Increased airway pressure can force more air into pleural space, converting simple to tension pneumothorax.", category: "clinical" },
      { front: "What is subcutaneous emphysema and how does it feel?", back: "Air under the skin from pneumothorax, feels like bubble wrap or Rice Krispies when palpated.", category: "clinical" },
      { front: "What mechanism commonly causes aortic rupture?", back: "Rapid deceleration injuries like high-speed motor vehicle crashes or falls from significant height.", category: "clinical" },
      { front: "What is commotio cordis?", back: "Sudden cardiac arrest from blunt chest impact during vulnerable period of cardiac cycle, often in young athletes.", category: "definition" },
      { front: "How should a patient with chest trauma be positioned?", back: "Position of comfort (usually sitting up) if no spinal injury suspected, to optimize breathing.", category: "protocol" },
      { front: "What signs suggest great vessel injury?", back: "Blood pressure differences between arms, absent pulses, massive chest bleeding, widened mediastinum.", category: "clinical" },
      { front: "Why is tracheal deviation a late sign in tension pneumothorax?", back: "Requires significant pressure buildup to shift mediastinal structures, patient may arrest before this develops.", category: "clinical" },
      { front: "What is the priority for hemothorax management?", back: "Treat for shock with fluid resuscitation while providing oxygen and rapid transport for surgical control.", category: "protocol" }
    ],
    crossReferences: [
      "Chapter 25: Trauma Overview - Primary and secondary trauma assessment",
      "Chapter 26: Bleeding Control - Hemorrhage control and shock management",
      "Chapter 27: Soft-Tissue Injuries - Open wound management principles",
      "Chapter 13: Shock Recognition - Recognizing and treating traumatic shock",
      "Chapter 15: Respiratory Emergencies - Ventilation support techniques",
      "Chapter 17: Cardiovascular Emergencies - Cardiac emergency management"
    ]
  };*/

  /*const chapter29StudyNotes: ChapterData = {
    title: "Chapter 31: Abdominal & GU Trauma Essentials",
    description: "Comprehensive assessment and management of abdominal and genitourinary trauma with evidence-based protocols",
    module: "12",
    scope: "EMT-B",
    protocols: ["Abdominal Trauma Assessment", "Genitourinary Injury Management", "Evisceration Care", "Internal Bleeding Control"],
    learningObjectives: [
      "Recognize signs of abdominal trauma and internal bleeding",
      "Apply appropriate assessment techniques for genitourinary injuries",
      "Demonstrate proper evisceration management protocols",
      "Understand transport priorities for abdominal trauma"
    ],
    keyTerms: ["Evisceration", "Peritonitis", "Retroperitoneal", "Guarding", "Rebound Tenderness", "Hematuria"],
    criticalConcepts: [
      "Abdominal trauma often presents with delayed symptoms",
      "Eviscerated organs should never be pushed back into the abdomen",
      "Internal bleeding may not show external signs initially"
    ],
    clinicalDecisionRules: [
      "Mechanism of injury + abdominal pain = high suspicion for trauma",
      "Distension + rigid abdomen = possible internal bleeding"
    ],
    commonMisconceptions: [
      "Absence of external wounds means no internal injury",
      "Normal vital signs rule out significant abdominal trauma"
    ],
    examTips: [
      "Know the difference between penetrating and blunt abdominal trauma management",
      "Remember that genitourinary injuries often accompany pelvic fractures"
    ],
    sections: [
      {
        title: "Abdominal Trauma Assessment",
        content: [
          "**Mechanism of injury** assessment is crucial for determining potential internal damage patterns.",
          "**Physical examination** includes inspection, palpation, and assessment for signs of internal bleeding.",
          "**Guarding and rebound tenderness** indicate peritoneal irritation and potential internal injury."
        ],
        clinicalPearls: [
          "Children can compensate longer than adults before showing shock signs",
          "Seat belt marks indicate high-energy transfer and internal injury risk"
        ],
        mnemonics: [
          "**PQRST**: Provocation, Quality, Region, Severity, Time (pain assessment)"
        ],
        fieldApplications: [
          "Position patient supine unless spinal injury suspected",
          "Cover eviscerated organs with moist sterile dressings",
          "Monitor closely for signs of developing shock"
        ]
      }
    ],
    flashcards: [
      { front: "What is evisceration?", back: "Protrusion of internal organs through an open wound", category: "definition" },
      { front: "How should eviscerated organs be managed?", back: "Cover with moist sterile dressings, never push back in", category: "protocol" },
      { front: "What is guarding?", back: "Involuntary tensing of abdominal muscles due to pain or irritation", category: "definition" },
      { front: "What is rebound tenderness?", back: "Pain when pressure is suddenly released from the abdomen", category: "clinical" },
      { front: "What does hematuria indicate?", back: "Blood in urine, suggesting genitourinary trauma", category: "clinical" },
      { front: "What is retroperitoneal bleeding?", back: "Bleeding behind the peritoneum, often from kidney or major vessel injury", category: "definition" },
      { front: "What position should abdominal trauma patients be placed?", back: "Supine with knees flexed if no spinal injury", category: "protocol" },
      { front: "What are signs of internal abdominal bleeding?", back: "Distension, rigidity, hypotension, tachycardia, altered mental status", category: "clinical" },
      { front: "What is peritonitis?", back: "Inflammation of the peritoneum, often due to infection or trauma", category: "definition" },
      { front: "How do you assess for internal bleeding?", back: "Check vital signs, look for distension, assess for shock signs", category: "protocol" },
      { front: "What mechanism suggests high abdominal injury risk?", back: "High-speed MVCs, falls >20 feet, penetrating trauma", category: "scenario" },
      { front: "What are late signs of abdominal trauma?", back: "Shock, altered mental status, severe pain", category: "clinical" },
      { front: "How should penetrating objects be managed?", back: "Stabilize in place, do not remove", category: "protocol" },
      { front: "What is Cullen's sign?", back: "Bruising around umbilicus indicating internal bleeding", category: "clinical" },
      { front: "What transport priority for evisceration?", back: "High priority, rapid transport with continuous monitoring", category: "protocol" }
    ]
  };*/

  /*const chapter32StudyNotes: ChapterData = {
    title: "Chapter 32: Orthopedic Injury Management",
    description: "Professional management of musculoskeletal injuries with evidence-based splinting and immobilization techniques",
    module: "12",
    scope: "EMT-B",
    protocols: ["Fracture Assessment", "Splinting Techniques", "Joint Injury Management", "Neurovascular Assessment"],
    learningObjectives: [
      "Recognize different types of fractures and dislocations",
      "Apply appropriate splinting techniques for various injuries",
      "Perform neurovascular assessments before and after splinting",
      "Understand pain management and transport considerations"
    ],
    keyTerms: ["Fracture", "Dislocation", "Sprain", "Strain", "Neurovascular", "Crepitus", "Angulation"],
    criticalConcepts: [
      "Neurovascular assessment is mandatory before and after splinting",
      "Splint injuries in position found if severe deformity present",
      "Pain management improves patient outcomes and cooperation"
    ],
    clinicalDecisionRules: [
      "Unable to bear weight + point tenderness = possible fracture",
      "Loss of pulse/sensation after splinting = immediate readjustment needed"
    ],
    commonMisconceptions: [
      "All fractures require realignment before splinting",
      "Sprains and strains don't require immobilization"
    ],
    examTips: [
      "Know the 5 Ps of neurovascular assessment",
      "Remember that open fractures are orthopedic emergencies"
    ],
    sections: [
      {
        title: "Fracture Assessment and Management",
        content: [
          "**Open fractures** involve bone penetrating the skin and require immediate sterile dressing and antibiotic consideration.",
          "**Closed fractures** may have significant internal bleeding and swelling requiring careful monitoring.",
          "**Angulated fractures** should generally be splinted in position found unless circulation is compromised."
        ],
        clinicalPearls: [
          "Femur fractures can lose 1-2 units of blood internally",
          "Children's bones bend before breaking (greenstick fractures)"
        ],
        mnemonics: [
          "**5 Ps**: Pain, Pallor, Paresthesias, Pulses, Paralysis (neurovascular assessment)",
          "**RICE**: Rest, Ice, Compression, Elevation (soft tissue injury management)"
        ],
        decisionTrees: [
          "Injury → Assessment → Splinting → Neurovascular check → Transport → Reassessment"
        ]
      }
    ],
    flashcards: [
      { front: "What are the 5 Ps of neurovascular assessment?", back: "Pain, Pallor, Paresthesias, Pulses, Paralysis", category: "protocol" },
      { front: "What is crepitus?", back: "Grating sound or feeling from broken bone ends rubbing together", category: "definition" },
      { front: "How should open fractures be managed?", back: "Control bleeding, sterile dressing, splint, monitor for shock", category: "protocol" },
      { front: "What is the difference between sprain and strain?", back: "Sprain affects ligaments, strain affects muscles/tendons", category: "definition" },
      { front: "When should angulated fractures be realigned?", back: "Only if no pulse present and medical direction authorizes", category: "protocol" },
      { front: "What does RICE stand for?", back: "Rest, Ice, Compression, Elevation", category: "protocol" },
      { front: "How much blood can a femur fracture lose?", back: "1-2 units (500-1000mL) internally", category: "clinical" },
      { front: "What is a greenstick fracture?", back: "Incomplete fracture in children where bone bends and cracks", category: "definition" },
      { front: "What indicates compartment syndrome?", back: "Severe pain, pallor, paresthesias, pulselessness, paralysis", category: "clinical" },
      { front: "How should dislocations be managed?", back: "Splint in position found, check neurovascular status", category: "protocol" },
      { front: "What is angulation?", back: "Abnormal position or alignment of fractured bone", category: "definition" },
      { front: "When is traction splinting indicated?", back: "Closed mid-shaft femur fractures with no joint involvement", category: "protocol" },
      { front: "What are signs of fracture?", back: "Pain, swelling, deformity, loss of function, crepitus", category: "clinical" },
      { front: "How often should neurovascular status be checked?", back: "Before splinting, after splinting, and every 15 minutes during transport", category: "protocol" },
      { front: "What is a pathologic fracture?", back: "Fracture through diseased or weakened bone from minimal force", category: "definition" }
    ]
  };*/

  /*const chapter33StudyNotes: ChapterData = {
    title: "Chapter 33: Environmental Exposure Protocols",
    description: "Expert management of temperature-related and environmental emergencies with evidence-based treatment protocols",
    module: "12",
    scope: "EMT-B",
    protocols: ["Hypothermia Management", "Hyperthermia Treatment", "Drowning Protocols", "Lightning Strike Care"],
    learningObjectives: [
      "Recognize and treat various stages of hypothermia",
      "Manage heat-related emergencies including heat stroke",
      "Apply appropriate drowning resuscitation protocols",
      "Understand lightning strike and electrical injury management"
    ],
    keyTerms: ["Hypothermia", "Hyperthermia", "Heat Stroke", "Heat Exhaustion", "Frostbite", "Core Temperature"],
    criticalConcepts: [
      "Core temperature determines severity of temperature emergencies",
      "Aggressive rewarming can cause dangerous arrhythmias",
      "Heat stroke is a medical emergency requiring rapid cooling"
    ],
    clinicalDecisionRules: [
      "Core temp <95°F (35°C) = hypothermia",
      "Core temp >104°F (40°C) + altered mental status = heat stroke"
    ],
    commonMisconceptions: [
      "All drowning victims need aggressive warming",
      "Frostbite should be rapidly rewarmed in the field"
    ],
    examTips: [
      "Know the stages of hypothermia and appropriate treatments",
      "Remember that drowning can occur in minimal water"
    ],
    sections: [
      {
        title: "Temperature Emergencies",
        content: [
          "**Hypothermia** stages progress from mild (shivering) to severe (altered mental status, cardiac arrest risk).",
          "**Heat exhaustion** presents with profuse sweating, weakness, and normal mental status.",
          "**Heat stroke** involves altered mental status, hot dry skin, and core temperature >104°F."
        ],
        clinicalPearls: [
          "Hypothermic patients are not dead until they're warm and dead",
          "Elderly and very young are at highest risk for temperature emergencies"
        ],
        mnemonics: [
          "**COLD**: Cover, Oxygen, Low manipulation, Dry (hypothermia care)",
          "**HOT**: High oxygen, Outside cooling, Transport rapidly (heat stroke)"
        ],
        fieldApplications: [
          "Remove from environmental exposure immediately",
          "Handle hypothermic patients gently to prevent arrhythmias",
          "Cool heat stroke patients aggressively during transport"
        ]
      }
    ],
    flashcards: [
      { front: "At what core temperature does hypothermia begin?", back: "Below 95°F (35°C)", category: "definition" },
      { front: "What does COLD stand for in hypothermia care?", back: "Cover, Oxygen, Low manipulation, Dry", category: "protocol" },
      { front: "What distinguishes heat exhaustion from heat stroke?", back: "Heat stroke has altered mental status and higher core temp", category: "clinical" },
      { front: "What is the core temperature threshold for heat stroke?", back: "Above 104°F (40°C) with altered mental status", category: "definition" },
      { front: "How should hypothermic patients be handled?", back: "Gently, to prevent ventricular fibrillation", category: "protocol" },
      { front: "What are signs of severe hypothermia?", back: "Altered mental status, decreased shivering, bradycardia", category: "clinical" },
      { front: "How should frostbite be treated in the field?", back: "Protect area, do not rub or rewarm, transport", category: "protocol" },
      { front: "What is the diving reflex?", back: "Protective response that slows metabolism in cold water", category: "definition" },
      { front: "How should drowning victims be managed?", back: "C-spine precautions, aggressive ventilation, hypothermia prevention", category: "protocol" },
      { front: "What are heat exhaustion symptoms?", back: "Profuse sweating, weakness, nausea, normal mental status", category: "clinical" },
      { front: "What cooling methods are used for heat stroke?", back: "Ice packs to neck/groin/armpits, fan, wet sheets", category: "protocol" },
      { front: "Why avoid aggressive rewarming of hypothermia?", back: "Can cause afterdrop and dangerous arrhythmias", category: "clinical" },
      { front: "What is trench foot?", back: "Prolonged exposure to cold, wet conditions causing tissue damage", category: "definition" },
      { front: "How long can cold water drowning victims survive?", back: "Up to 45-60 minutes due to diving reflex", category: "clinical" },
      { front: "What are lightning strike injury priorities?", back: "Cardiac monitoring, spinal immobilization, burn care", category: "protocol" }
    ]
  };*/

  /*const chapter34StudyNotes: ChapterData = {
    title: "Chapter 34: Obstetric & Neonatal Emergencies",
    description: "Professional management of pregnancy emergencies and neonatal care with evidence-based delivery protocols",
    module: "13",
    scope: "EMT-B",
    protocols: ["Emergency Delivery", "Neonatal Resuscitation", "Pregnancy Complications", "Postpartum Care"],
    learningObjectives: [
      "Recognize signs of imminent delivery and birth complications",
      "Perform emergency field delivery with proper techniques",
      "Apply neonatal resuscitation protocols including APGAR scoring",
      "Manage pregnancy-related emergencies and complications"
    ],
    keyTerms: ["APGAR", "Crowning", "Placenta", "Umbilical Cord", "Breech Presentation", "Eclampsia"],
    criticalConcepts: [
      "Most births are normal and require minimal intervention",
      "Neonatal resuscitation follows specific protocols different from adults",
      "Pregnancy complications can be life-threatening for mother and baby"
    ],
    clinicalDecisionRules: [
      "Crowning visible = delivery imminent, prepare for field delivery",
      "APGAR <7 at 1 minute = consider resuscitation interventions"
    ],
    commonMisconceptions: [
      "All deliveries require immediate cord cutting",
      "Breech deliveries always require emergency transport"
    ],
    examTips: [
      "Know the components of APGAR scoring",
      "Remember the steps of neonatal resuscitation"
    ],
    sections: [
      {
        title: "Emergency Delivery Procedures",
        content: [
          "**Normal delivery** occurs in three stages: labor, delivery of baby, delivery of placenta.",
          "**Crowning** indicates imminent delivery and field delivery preparation should begin.",
          "**Cord care** involves clamping and cutting after pulsations stop or baby begins breathing."
        ],
        clinicalPearls: [
          "Never delay delivery by attempting transport if crowning occurs",
          "Most neonates will begin breathing spontaneously"
        ],
        mnemonics: [
          "**APGAR**: Appearance, Pulse, Grimace, Activity, Respiratory effort",
          "**ABC**: Airway, Breathing, Circulation (neonatal priorities)"
        ],
        fieldApplications: [
          "Prepare delivery kit if signs of imminent birth present",
          "Support baby's head during delivery, do not pull",
          "Keep mother and baby warm after delivery"
        ]
      }
    ],
    flashcards: [
      { front: "What does APGAR assess?", back: "Appearance, Pulse, Grimace, Activity, Respiratory effort", category: "protocol" },
      { front: "When should you prepare for field delivery?", back: "When crowning is visible or delivery is imminent", category: "protocol" },
      { front: "What is crowning?", back: "When the baby's head becomes visible at the vaginal opening", category: "definition" },
      { front: "How should the umbilical cord be managed?", back: "Clamp and cut after pulsations stop or baby breathes", category: "protocol" },
      { front: "What is a normal APGAR score?", back: "7-10 (scores 0-2 for each of 5 categories)", category: "clinical" },
      { front: "What is eclampsia?", back: "Seizures in pregnant women, usually related to high blood pressure", category: "definition" },
      { front: "How should a breech delivery be managed?", back: "Support body, allow natural delivery, do not pull on baby", category: "protocol" },
      { front: "What are the three stages of labor?", back: "Dilation, delivery of baby, delivery of placenta", category: "definition" },
      { front: "When does neonatal resuscitation begin?", back: "If baby doesn't breathe after stimulation and warming", category: "protocol" },
      { front: "What is the normal fetal heart rate?", back: "120-160 beats per minute", category: "clinical" },
      { front: "How should cord prolapse be managed?", back: "Position mother with hips elevated, do not push cord back", category: "protocol" },
      { front: "What indicates placental delivery?", back: "Cord lengthening, gush of blood, uterine contractions", category: "clinical" },
      { front: "What is preeclampsia?", back: "High blood pressure during pregnancy with protein in urine", category: "definition" },
      { front: "How often is APGAR assessed?", back: "At 1 minute and 5 minutes after birth", category: "protocol" },
      { front: "What temperature should neonates be kept?", back: "Warm and dry, normal body temperature 97-99°F", category: "clinical" }
    ]
  };*/

  /*const chapter35StudyNotes: ChapterData = {
    title: "Chapter 35: Pediatric Emergency Response",
    description: "Specialized pediatric emergency care with age-appropriate assessment and treatment protocols",
    module: "13",
    scope: "EMT-B",
    protocols: ["Pediatric Assessment Triangle", "Age-Specific Vital Signs", "Pediatric Airway Management", "Child Abuse Recognition"],
    learningObjectives: [
      "Apply pediatric assessment triangle for rapid evaluation",
      "Recognize normal and abnormal pediatric vital signs by age",
      "Demonstrate age-appropriate airway and breathing interventions",
      "Identify signs of child abuse and neglect"
    ],
    keyTerms: ["PAT", "Pediatric Assessment Triangle", "Febrile Seizure", "Respiratory Distress", "Dehydration"],
    criticalConcepts: [
      "Children are not small adults - physiology and responses differ",
      "Pediatric Assessment Triangle provides rapid initial evaluation",
      "Children compensate well initially but decompensate rapidly"
    ],
    clinicalDecisionRules: [
      "Abnormal PAT = immediate intervention needed",
      "Respiratory rate >60 in infant = respiratory distress"
    ],
    commonMisconceptions: [
      "Normal vital signs mean child is stable",
      "Febrile seizures always indicate serious illness"
    ],
    examTips: [
      "Know normal vital sign ranges for different age groups",
      "Understand the components of the Pediatric Assessment Triangle"
    ],
    sections: [
      {
        title: "Pediatric Assessment and Care",
        content: [
          "**Pediatric Assessment Triangle** evaluates appearance, work of breathing, and circulation to skin.",
          "**Age-specific considerations** include different normal vital signs, medication doses, and equipment sizes.",
          "**Family-centered care** involves keeping child with caregivers when possible and age-appropriate communication."
        ],
        clinicalPearls: [
          "A quiet child may be more concerning than a crying child",
          "Capillary refill >2 seconds is abnormal in children"
        ],
        mnemonics: [
          "**PAT**: Pediatric Assessment Triangle (Appearance, Work of breathing, Circulation)",
          "**CHILD**: Check pulse, Heart rate, Identify problems, Look at breathing, Determine skin signs"
        ],
        fieldApplications: [
          "Use appropriate-sized equipment for pediatric patients",
          "Position airway carefully - children have large heads",
          "Involve caregivers in care when possible"
        ]
      }
    ],
    flashcards: [
      { front: "What does PAT assess?", back: "Appearance, Work of breathing, Circulation to skin", category: "protocol" },
      { front: "What is normal heart rate for newborn?", back: "120-160 beats per minute", category: "clinical" },
      { front: "What is normal respiratory rate for infant?", back: "30-60 breaths per minute", category: "clinical" },
      { front: "What indicates respiratory distress in children?", back: "Increased work of breathing, abnormal sounds, poor color", category: "clinical" },
      { front: "What is a febrile seizure?", back: "Seizure caused by rapid rise in body temperature in children", category: "definition" },
      { front: "What are signs of dehydration in children?", back: "Decreased skin turgor, dry mucous membranes, sunken fontanelles", category: "clinical" },
      { front: "How should pediatric airways be positioned?", back: "Neutral position due to large occiput in infants", category: "protocol" },
      { front: "What is normal blood pressure for school-age child?", back: "Approximately 80 + (2 × age in years) systolic", category: "clinical" },
      { front: "What are concerning appearance signs in PAT?", back: "Lethargy, poor eye contact, inability to be consoled", category: "clinical" },
      { front: "How should child abuse be documented?", back: "Quote patient/caregiver statements, photograph injuries if protocol allows", category: "protocol" },
      { front: "What is normal capillary refill in children?", back: "Less than 2 seconds", category: "clinical" },
      { front: "What size ET tube for 5-year-old?", back: "5.0mm (age + 4 divided by 4)", category: "protocol" },
      { front: "What are red flags for child abuse?", back: "Inconsistent history, unusual injury patterns, delayed care seeking", category: "clinical" },
      { front: "How do children's airways differ from adults?", back: "Larger tongue, higher larynx, smaller trachea, larger occiput", category: "definition" },
      { front: "What is grunting in children?", back: "Expiratory sound indicating respiratory distress and PEEP attempt", category: "clinical" }
    ]
  };*/

  /*const chapter36StudyNotes: ChapterData = {
    title: "Chapter 36: Geriatric Emergency Care",
    description: "Specialized geriatric emergency care addressing age-related physiological changes and complex medical conditions",
    module: "13",
    scope: "EMT-B",
    protocols: ["Polypharmacy Assessment", "Fall Risk Evaluation", "Geriatric Abuse Recognition", "Age-Related Changes"],
    learningObjectives: [
      "Recognize normal aging changes versus pathological conditions",
      "Assess medication interactions and polypharmacy effects",
      "Identify elder abuse and neglect indicators", 
      "Apply age-appropriate communication and care techniques"
    ],
    keyTerms: ["Polypharmacy", "Elder Abuse", "Activities of Daily Living", "Cognitive Impairment", "Frailty"],
    criticalConcepts: [
      "Normal aging changes affect assessment and treatment",
      "Multiple medications increase adverse reaction risks",
      "Elder abuse is often underrecognized and underreported"
    ],
    clinicalDecisionRules: [
      "Fall + inability to get up = possible serious injury",
      "Sudden mental status change = rule out medical causes first"
    ],
    commonMisconceptions: [
      "Confusion is normal in elderly patients",
      "All elderly patients have hearing problems"
    ],
    examTips: [
      "Know the normal physiological changes of aging",
      "Understand how aging affects medication metabolism"
    ],
    sections: [
      {
        title: "Geriatric Assessment Considerations",
        content: [
          "**Normal aging changes** include decreased cardiac output, reduced lung capacity, and slower metabolism.",
          "**Polypharmacy** effects include increased drug interactions, adverse reactions, and compliance issues.",
          "**Communication strategies** should account for sensory impairments while maintaining dignity and respect."
        ],
        clinicalPearls: [
          "Sudden confusion in elderly often indicates serious medical problem",
          "Elderly patients may not show typical signs of infection"
        ],
        mnemonics: [
          "**ELDER**: Examine carefully, Look for abuse, Determine medications, Evaluate mental status, Respect dignity"
        ],
        fieldApplications: [
          "Speak clearly and face the patient when communicating",
          "Allow extra time for position changes and movement",
          "Assess home environment for safety hazards"
        ]
      }
    ],
    flashcards: [
      { front: "What is polypharmacy?", back: "Use of multiple medications, typically 5 or more", category: "definition" },
      { front: "What are normal aging cardiovascular changes?", back: "Decreased cardiac output, arterial stiffening, slower heart rate", category: "clinical" },
      { front: "What respiratory changes occur with aging?", back: "Decreased lung elasticity, reduced vital capacity, weaker cough", category: "clinical" },
      { front: "What are signs of elder abuse?", back: "Unexplained injuries, poor hygiene, malnutrition, fear of caregiver", category: "clinical" },
      { front: "What is sundown syndrome?", back: "Increased confusion and agitation in evening hours", category: "definition" },
      { front: "How does aging affect drug metabolism?", back: "Slower metabolism, increased sensitivity, prolonged effects", category: "clinical" },
      { front: "What are activities of daily living (ADL)?", back: "Basic self-care tasks: eating, bathing, dressing, toileting", category: "definition" },
      { front: "What causes orthostatic hypotension in elderly?", back: "Medications, dehydration, prolonged bed rest, age-related changes", category: "clinical" },
      { front: "What is different about pain in elderly?", back: "May be diminished, atypical presentation, undertreated", category: "clinical" },
      { front: "How should you communicate with hearing-impaired elderly?", back: "Face patient, speak clearly, use gestures, write if needed", category: "protocol" },
      { front: "What infection signs may be absent in elderly?", back: "Fever, elevated white blood cell count", category: "clinical" },
      { front: "What are fall risk factors in elderly?", back: "Medications, vision problems, environmental hazards, weakness", category: "clinical" },
      { front: "What is frailty syndrome?", back: "Age-related decline in multiple body systems, increased vulnerability", category: "definition" },
      { front: "How do you assess capacity in elderly?", back: "Evaluate understanding, reasoning, appreciation of consequences", category: "protocol" },
      { front: "What are signs of medication noncompliance?", back: "Pill organizers, expired medications, confusion about dosing", category: "clinical" }
    ]
  };

  /*const bodySystem2StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 2: Tissues & Organs 🩸",
    description: "Organization of cells into tissues, organs, and organ systems",
    module: "Body Systems", 
    scope: "EMT-B",
    protocols: ["Tissue Types", "Organ Formation", "System Integration"],
    learningObjectives: [
      "Identify four basic tissue types",
      "Understand organ formation from tissues", 
      "Recognize tissue injury patterns",
      "Apply tissue concepts to trauma assessment"
    ],
    keyTerms: ["Epithelial", "Connective", "Muscle", "Nervous", "Organs"],
    criticalConcepts: [
      "Tissues work together to form functional organs",
      "Tissue type determines injury and healing patterns",
      "Understanding tissue organization helps predict injury severity"
    ],
    sections: [
      {
        title: "Tissue Organization",
        content: [
          "**Epithelial tissue** covers surfaces and forms glands 🩸",
          "**Connective tissue** provides structural support",
          "**Muscle tissue** enables movement and contraction"
        ]
      }
    ],
    flashcards: [
      { front: "What are the four basic tissue types?", back: "Epithelial, connective, muscle, and nervous tissue", category: "definition" },
      { front: "What tissue type covers body surfaces?", back: "Epithelial tissue - forms protective barriers", category: "definition" },
      { front: "What tissue provides structural support?", back: "Connective tissue - includes bone, cartilage, blood", category: "definition" },
      { front: "What tissue enables body movement?", back: "Muscle tissue - skeletal, cardiac, and smooth", category: "definition" },
      { front: "What tissue carries electrical impulses?", back: "Nervous tissue - neurons and supporting cells", category: "definition" }
    ]
  };*/

  // BONUS Module 2: Human Body Systems - Enhanced Chapters
  const bodySystem2StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 2: Tissues & Organs",
    description: "Comprehensive study of tissue types, organ formation, and system integration in human anatomy",
    module: "BONUS: Human Body Systems",
    scope: "EMT-B" as const,
    protocols: ["Tissue Classification", "Organ Formation", "System Integration", "Pathophysiology"],
    learningObjectives: [
      "Identify and classify the four basic tissue types and their functions",
      "Understand how tissues combine to form organs and organ systems",
      "Recognize tissue injury patterns and healing processes",
      "Apply tissue knowledge to patient assessment and treatment",
      "Understand tissue response to trauma and disease processes"
    ],
    keyTerms: [
      "Epithelial Tissue", "Connective Tissue", "Muscle Tissue", "Nervous Tissue",
      "Organs", "Organ Systems", "Histology", "Cellular Matrix", "Basement Membrane",
      "Collagen", "Elastin", "Smooth Muscle", "Cardiac Muscle", "Skeletal Muscle",
      "Neurons", "Neuroglia", "Tissue Repair", "Inflammation", "Regeneration"
    ],
    sections: [
      {
        title: "Epithelial Tissue Types and Functions",
        content: [
          "Epithelial tissue covers body surfaces and forms protective barriers",
          "Simple epithelium has single cell layer for absorption and secretion",
          "Stratified epithelium has multiple layers for protection from wear",
          "Squamous cells are flat for diffusion, cuboidal for secretion, columnar for absorption",
          "Glandular epithelium forms exocrine and endocrine glands",
          "Basement membrane anchors epithelium to underlying connective tissue",
          "Rapid regeneration allows quick healing of surface injuries",
          "Loss of epithelial integrity leads to infection and fluid loss"
        ],
        clinicalPearls: [
          "Epithelial damage is first sign of many disease processes",
          "Skin breakdown creates infection risk and fluid loss",
          "Mucous membranes protect against pathogen invasion"
        ]
      },
      {
        title: "Connective Tissue Structure and Support",
        content: [
          "Connective tissue provides structural framework throughout the body",
          "Extracellular matrix contains collagen fibers for strength",
          "Elastin fibers provide flexibility and stretch properties",
          "Bone tissue provides rigid support and mineral storage",
          "Cartilage cushions joints and supports flexible structures",
          "Blood is specialized connective tissue for transport",
          "Adipose tissue stores energy and provides insulation",
          "Connective tissue healing involves scar formation"
        ],
        clinicalPearls: [
          "Connective tissue disorders affect multiple body systems",
          "Poor nutrition impairs collagen synthesis and healing",
          "Age-related changes reduce tissue elasticity and strength"
        ]
      },
      {
        title: "Muscle Tissue Contraction and Movement",
        content: [
          "Skeletal muscle attaches to bones for voluntary movement",
          "Cardiac muscle forms heart wall for involuntary pumping",
          "Smooth muscle in organs for involuntary regulation",
          "Actin and myosin filaments enable muscle contraction",
          "Calcium regulation controls contraction strength",
          "ATP provides energy for muscle fiber contraction",
          "Muscle fatigue occurs with prolonged activity",
          "Muscle injury can affect organ function significantly"
        ],
        clinicalPearls: [
          "Cardiac muscle damage leads to heart failure",
          "Smooth muscle spasm causes organ dysfunction",
          "Muscle weakness may indicate neurological problems"
        ]
      },
      {
        title: "Nervous Tissue Communication and Control",
        content: [
          "Neurons transmit electrical signals throughout the body",
          "Neuroglia support and protect nervous tissue",
          "Action potentials carry information rapidly",
          "Synapses allow communication between neurons",
          "Myelination increases signal transmission speed",
          "Nervous tissue has limited regeneration capacity",
          "Damage disrupts communication and control",
          "Integration centers process and coordinate responses"
        ],
        clinicalPearls: [
          "Nervous tissue damage often permanent",
          "Loss of myelin affects signal transmission",
          "Neurotransmitter imbalances affect behavior and function"
        ]
      }
    ],
    criticalConcepts: [
      "Four tissue types work together to form functional organs",
      "Tissue type determines injury patterns and healing potential",
      "Understanding tissue organization helps predict disease progression",
      "Tissue damage affects organ function and patient outcomes"
    ],
    flashcards: [
      { front: "What are the four basic tissue types?", back: "Epithelial, connective, muscle, and nervous tissue", category: "definition" },
      { front: "What tissue type covers body surfaces?", back: "Epithelial tissue - forms protective barriers and glands", category: "definition" },
      { front: "What tissue provides structural support?", back: "Connective tissue - includes bone, cartilage, blood, and adipose", category: "definition" },
      { front: "What tissue enables body movement?", back: "Muscle tissue - skeletal, cardiac, and smooth muscle types", category: "definition" },
      { front: "What tissue carries electrical impulses?", back: "Nervous tissue - neurons and supporting neuroglia", category: "definition" },
      { front: "What is the extracellular matrix?", back: "Non-cellular component of connective tissue containing collagen and elastin", category: "definition" },
      { front: "What is the difference between simple and stratified epithelium?", back: "Simple has one cell layer, stratified has multiple layers for protection", category: "clinical" },
      { front: "What provides energy for muscle contraction?", back: "ATP (adenosine triphosphate) powers actin-myosin interaction", category: "clinical" },
      { front: "What limits nervous tissue repair?", back: "Limited regeneration capacity, especially in central nervous system", category: "clinical" },
      { front: "What anchors epithelial tissue?", back: "Basement membrane connects epithelium to underlying connective tissue", category: "definition" }
    ]
  };

  /*const bodySystem3StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 3: Skeletal System 🦴",
    description: "Bone structure, joint function, and musculoskeletal support framework",
    module: "Body Systems",
    scope: "EMT-B", 
    protocols: ["Bone Structure", "Joint Classification", "Fracture Patterns"],
    learningObjectives: [
      "Identify major bones and bone markings",
      "Classify joint types and movements",
      "Recognize fracture patterns and implications",
      "Apply skeletal anatomy to trauma assessment"
    ],
    keyTerms: ["Compact Bone", "Spongy Bone", "Joint", "Cartilage", "Fracture"],
    criticalConcepts: [
      "Bones provide structural support and protect organs",
      "Joint type determines movement and injury patterns",
      "Bone healing follows predictable stages"
    ],
    sections: [
      {
        title: "Bone and Joint Structure", 
        content: [
          "**Compact bone** provides strength and protection 🦴",
          "**Spongy bone** produces blood cells in red marrow",
          "**Joints** allow movement between bones"
        ]
      }
    ],
    flashcards: [
      { front: "How many bones are in the adult human body?", back: "206 bones in the adult skeleton", category: "definition" },
      { front: "What are the two types of bone tissue?", back: "Compact (dense) and spongy (cancellous) bone", category: "definition" },
      { front: "Where is red bone marrow found?", back: "In spongy bone - produces blood cells", category: "definition" },
      { front: "What are the three types of joints?", back: "Immovable (fibrous), slightly movable (cartilaginous), freely movable (synovial)", category: "definition" },
      { front: "What is a fracture?", back: "A break or crack in bone continuity", category: "definition" }
    ]
  };*/

  const bodySystem3StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 3: Skeletal System",
    description: "Comprehensive study of bone structure, joint mechanics, and musculoskeletal framework supporting body function",
    module: "BONUS: Human Body Systems",
    scope: "EMT-B" as const,
    protocols: ["Bone Assessment", "Joint Evaluation", "Fracture Recognition", "Musculoskeletal Support"],
    learningObjectives: [
      "Identify major bones, landmarks, and anatomical structures",
      "Classify joint types and understand movement mechanisms",
      "Recognize fracture patterns and their clinical implications",
      "Apply skeletal anatomy knowledge to trauma assessment and treatment",
      "Understand bone healing processes and factors affecting recovery"
    ],
    keyTerms: [
      "Compact Bone", "Spongy Bone", "Periosteum", "Endosteum", "Osteoblasts",
      "Osteoclasts", "Osteocytes", "Red Bone Marrow", "Yellow Bone Marrow",
      "Diaphysis", "Epiphysis", "Metaphysis", "Growth Plate", "Synovial Joint",
      "Cartilaginous Joint", "Fibrous Joint", "Synovial Fluid", "Articular Cartilage",
      "Ligaments", "Tendons", "Fracture", "Dislocation", "Subluxation"
    ],
    sections: [
      {
        title: "Bone Structure and Composition",
        content: [
          "Compact bone forms dense outer layer providing strength and protection",
          "Spongy bone contains trabeculae creating lightweight internal structure",
          "Periosteum is outer membrane containing blood vessels and nerve fibers",
          "Endosteum lines internal bone surfaces and contains bone-forming cells",
          "Osteoblasts build new bone tissue during growth and repair",
          "Osteoclasts break down old bone tissue for remodeling",
          "Osteocytes maintain bone tissue and respond to mechanical stress",
          "Bone matrix consists of collagen fibers and calcium phosphate minerals"
        ],
        clinicalPearls: [
          "Adult skeleton contains 206 bones after growth plate closure",
          "Bone remodeling continues throughout life in response to stress",
          "Calcium and vitamin D essential for bone strength and healing"
        ]
      },
      {
        title: "Bone Marrow and Blood Cell Production",
        content: [
          "Red bone marrow produces blood cells through hematopoiesis",
          "Found in spongy bone of skull, vertebrae, ribs, and pelvis",
          "Yellow bone marrow stores fat in long bone cavities",
          "Can convert to red marrow during increased blood cell demand",
          "Produces red blood cells, white blood cells, and platelets",
          "Bone marrow function affected by disease and medications",
          "Bone marrow biopsy may be needed for blood disorders",
          "Radiation and chemotherapy can suppress marrow function"
        ],
        clinicalPearls: [
          "Bone marrow produces 500 billion blood cells daily",
          "Decreased marrow function leads to anemia and bleeding",
          "Bone pain may indicate marrow involvement in disease"
        ]
      },
      {
        title: "Joint Classification and Movement",
        content: [
          "Fibrous joints are immovable connected by dense connective tissue",
          "Cartilaginous joints are slightly movable with cartilage connections",
          "Synovial joints are freely movable with synovial fluid lubrication",
          "Ball-and-socket joints allow movement in all directions",
          "Hinge joints permit flexion and extension movements only",
          "Pivot joints enable rotational movement around single axis",
          "Gliding joints allow sliding movements between flat surfaces",
          "Articular cartilage reduces friction and absorbs shock"
        ],
        clinicalPearls: [
          "Joint type determines injury patterns and treatment approaches",
          "Synovial joints most commonly affected by arthritis",
          "Joint immobilization leads to stiffness and muscle weakness"
        ]
      },
      {
        title: "Fracture Types and Healing Process",
        content: [
          "Simple fractures don't break through skin surface",
          "Compound fractures communicate with external environment",
          "Comminuted fractures have multiple bone fragments",
          "Greenstick fractures are incomplete breaks in children",
          "Pathological fractures occur through diseased bone",
          "Stress fractures develop from repetitive loading",
          "Fracture healing involves inflammation, repair, and remodeling phases",
          "Age, nutrition, and blood supply affect healing rate"
        ],
        clinicalPearls: [
          "Compound fractures require immediate surgical intervention",
          "Children's bones heal faster due to active growth",
          "Poor healing may indicate infection or inadequate stabilization"
        ]
      }
    ],
    criticalConcepts: [
      "Skeletal system provides structural support and protects vital organs",
      "Bone is living tissue that constantly remodels and adapts",
      "Joint type determines movement capabilities and injury patterns",
      "Fracture healing is complex process requiring proper conditions",
      "Understanding bone anatomy essential for trauma assessment"
    ],
    flashcards: [
      { front: "How many bones are in the adult human body?", back: "206 bones in the adult skeleton after growth plate closure", category: "definition" },
      { front: "What are the two types of bone tissue?", back: "Compact (dense outer layer) and spongy (cancellous inner structure)", category: "definition" },
      { front: "Where is red bone marrow found?", back: "In spongy bone of skull, vertebrae, ribs, and pelvis - produces blood cells", category: "definition" },
      { front: "What are the three types of joints?", back: "Fibrous (immovable), cartilaginous (slightly movable), synovial (freely movable)", category: "definition" },
      { front: "What is a compound fracture?", back: "A fracture that communicates with the external environment through skin break", category: "definition" },
      { front: "What cells build new bone tissue?", back: "Osteoblasts - bone-forming cells active during growth and repair", category: "definition" },
      { front: "What cells break down old bone tissue?", back: "Osteoclasts - bone-resorbing cells involved in remodeling", category: "definition" },
      { front: "What is the periosteum?", back: "Outer bone membrane containing blood vessels and nerve fibers", category: "definition" },
      { front: "What produces blood cells in bones?", back: "Red bone marrow through the process of hematopoiesis", category: "clinical" },
      { front: "What type of joint allows movement in all directions?", back: "Ball-and-socket joint (like hip and shoulder)", category: "clinical" }
    ]
  };

  const bodySystem4StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 4: Muscular System",
    description: "Comprehensive study of muscle types, contraction mechanisms, and movement coordination in human physiology",
    module: "BONUS: Human Body Systems",
    scope: "EMT-B" as const,
    protocols: ["Muscle Assessment", "Contraction Analysis", "Movement Evaluation", "Strength Testing"],
    learningObjectives: [
      "Distinguish between skeletal, cardiac, and smooth muscle types and functions",
      "Understand muscle contraction mechanisms at cellular and molecular level",
      "Recognize muscle injury patterns and their clinical implications",
      "Apply muscle physiology knowledge to patient assessment and treatment",
      "Understand factors affecting muscle function and performance"
    ],
    keyTerms: [
      "Skeletal Muscle", "Cardiac Muscle", "Smooth Muscle", "Actin", "Myosin",
      "Sarcomere", "Motor Unit", "Neuromuscular Junction", "Acetylcholine",
      "Calcium", "ATP", "Creatine Phosphate", "Muscle Fatigue", "Tetanus",
      "Isotonic Contraction", "Isometric Contraction", "Tendons", "Fascia",
      "Muscle Fiber Types", "Fast Twitch", "Slow Twitch", "Hypertrophy", "Atrophy"
    ],
    sections: [
      {
        title: "Skeletal Muscle Structure and Function",
        content: [
          "Skeletal muscle enables voluntary movement under conscious control",
          "Composed of muscle fibers containing contractile proteins",
          "Sarcomeres are functional units containing actin and myosin",
          "Motor units consist of motor neuron and muscle fibers it innervates",
          "Neuromuscular junction transmits nerve signals to muscle",
          "Calcium release triggers actin-myosin binding and contraction",
          "ATP provides energy for muscle contraction and relaxation",
          "Muscle fatigue occurs when energy demand exceeds supply"
        ],
        clinicalPearls: [
          "Skeletal muscle makes up 40-50% of total body weight",
          "Type I fibers are slow-twitch for endurance activities",
          "Type II fibers are fast-twitch for power and speed"
        ]
      },
      {
        title: "Cardiac Muscle Properties",
        content: [
          "Cardiac muscle found only in heart wall myocardium",
          "Involuntary muscle with intrinsic rhythmic contractions",
          "Intercalated discs connect cardiac muscle cells",
          "Gap junctions allow electrical signal transmission",
          "Coronary circulation supplies oxygen and nutrients",
          "Cannot regenerate significantly after injury",
          "Sensitive to oxygen deprivation and toxins",
          "Damaged cardiac muscle replaced by scar tissue"
        ],
        clinicalPearls: [
          "Cardiac muscle damage is often permanent",
          "Heart muscle has high oxygen requirements",
          "Electrical conduction system coordinates contractions"
        ]
      },
      {
        title: "Smooth Muscle Control and Function",
        content: [
          "Smooth muscle controls involuntary organ functions",
          "Found in blood vessels, airways, and digestive tract",
          "Controlled by autonomic nervous system",
          "Can maintain sustained contractions with less energy",
          "Responds to hormones and local chemical factors",
          "Slower contraction and relaxation than skeletal muscle",
          "Can change length without losing tension",
          "Essential for blood pressure and organ function regulation"
        ],
        clinicalPearls: [
          "Smooth muscle spasm causes organ dysfunction",
          "Blood vessel smooth muscle controls blood pressure",
          "Airway smooth muscle affects breathing"
        ]
      },
      {
        title: "Muscle Injury and Disease",
        content: [
          "Muscle strains involve fiber tearing from overstretching",
          "Contusions cause bleeding within muscle tissue",
          "Muscle cramps result from involuntary sustained contractions",
          "Rhabdomyolysis involves muscle breakdown releasing toxins",
          "Compartment syndrome increases pressure within muscle compartments",
          "Muscle atrophy occurs from disuse or denervation",
          "Muscle weakness may indicate neurological problems",
          "Recovery depends on severity and treatment timing"
        ],
        clinicalPearls: [
          "Severe muscle injury can cause kidney damage",
          "Compartment syndrome requires emergency treatment",
          "Muscle weakness patterns help locate neurological problems"
        ]
      }
    ],
    criticalConcepts: [
      "Three muscle types serve different physiological functions",
      "Muscle contraction requires energy, calcium, and nerve stimulation",
      "Understanding muscle physiology helps assess injury severity",
      "Muscle damage can affect organ function and patient outcomes"
    ],
    flashcards: [
      { front: "What are the three types of muscle tissue?", back: "Skeletal (voluntary), cardiac (heart), and smooth (involuntary organ)", category: "definition" },
      { front: "Which muscle type is under voluntary control?", back: "Skeletal muscle - controlled by somatic nervous system", category: "definition" },
      { front: "Where is cardiac muscle found?", back: "Only in the heart wall (myocardium) - involuntary pumping", category: "definition" },
      { front: "What controls smooth muscle?", back: "Autonomic nervous system - involuntary organ functions", category: "definition" },
      { front: "What connects muscle to bone?", back: "Tendons - strong fibrous connective tissue", category: "definition" },
      { front: "What are the contractile proteins in muscle?", back: "Actin (thin filaments) and myosin (thick filaments)", category: "definition" },
      { front: "What triggers muscle contraction?", back: "Calcium release allows actin-myosin binding in presence of ATP", category: "clinical" },
      { front: "What is a motor unit?", back: "Motor neuron and all muscle fibers it innervates", category: "definition" },
      { front: "What is rhabdomyolysis?", back: "Muscle breakdown releasing toxins that can damage kidneys", category: "clinical" },
      { front: "What connects cardiac muscle cells?", back: "Intercalated discs with gap junctions for electrical transmission", category: "definition" }
    ]
  };

  const bodySystem5StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 5: Cardiovascular System",
    description: "Comprehensive study of heart structure, blood vessels, and circulation physiology",
    module: "BONUS: Human Body Systems",
    scope: "EMT-B" as const,
    protocols: ["Cardiac Assessment", "Circulation Evaluation", "Blood Pressure Monitoring", "Conduction Analysis", "Perfusion Assessment"],
    learningObjectives: [
      "Identify heart chambers, valves, and major blood vessels with anatomical landmarks",
      "Explain systemic, pulmonary, and coronary circulation pathways and pressure gradients",
      "Interpret cardiac conduction system components and their clinical presentations",
      "Relate stroke volume, heart rate, and vascular resistance to cardiac output",
      "Apply cardiovascular physiology to shock recognition and transport decisions"
    ],
    keyTerms: [
      "Right Atrium", "Left Ventricle", "Tricuspid Valve", "Mitral Valve", "Aorta",
      "Pulmonary Artery", "Coronary Arteries", "Stroke Volume", "Cardiac Output",
      "Preload", "Afterload", "Contractility", "Ejection Fraction", "Perfusion",
      "Mean Arterial Pressure", "Sinoatrial Node", "Atrioventricular Node", "Purkinje Fibers",
      "Baroreceptors", "Systemic Vascular Resistance"
    ],
    sections: [
      {
        title: "Cardiac Architecture and Blood Flow",
        content: [
          "Four cardiac chambers create serial circulation: right heart pumps to lungs, left heart to systemic circulation",
          "Atrioventricular valves (tricuspid, mitral) preserve forward flow during ventricular squeeze",
          "Semilunar valves (pulmonic, aortic) open when ventricular pressure exceeds outflow tract pressure",
          "Coronary arteries originate from aortic root supplying the myocardium during diastole",
          "Coronary venous blood drains into coronary sinus and returns to right atrium"
        ],
        clinicalPearls: [
          "Left ventricular failure leads to pulmonary congestion, right ventricular failure to systemic edema",
          "Valve dysfunction produces characteristic murmurs and alters perfusion",
          "Diastolic coronary perfusion time shortens with tachycardia"
        ]
      },
      {
        title: "Electrical Conduction and Rhythm Control",
        content: [
          "Sinoatrial node establishes intrinsic rate 60-100 bpm and responds to autonomic tone",
          "Atrioventricular node delays impulse allowing ventricular filling before contraction",
          "Bundle branches and Purkinje network distribute depolarization for coordinated contraction",
          "Action potentials rely on sequential sodium influx, calcium plateau, and potassium efflux",
          "Conduction blocks or ectopy appear on ECG as rate, rhythm, or morphology changes"
        ],
        clinicalPearls: [
          "Wide-complex tachycardia may indicate ventricular origin requiring emergent intervention",
          "High vagal tone or medications can create AV nodal blocks recognized by dropped beats",
          "Hypoxia, electrolyte imbalances, and ischemia commonly precipitate dysrhythmias"
        ]
      },
      {
        title: "Hemodynamics and Perfusion",
        content: [
          "Cardiac output (CO) equals stroke volume (SV) multiplied by heart rate (HR)",
          "Preload reflects ventricular end-diastolic volume influenced by venous return",
          "Afterload represents resistance the ventricle must overcome, approximated by systemic vascular resistance",
          "Contractility is intrinsic pumping strength modulated by sympathetic stimulation",
          "Mean arterial pressure approximated by (systolic + 2 × diastolic) / 3 guides perfusion assessment"
        ],
        clinicalPearls: [
          "Narrow pulse pressure suggests decreased stroke volume or tamponade",
          "Cool, clammy skin indicates peripheral vasoconstriction during shock",
          "Capillary refill longer than 2 seconds may reflect poor perfusion in pediatric patients"
        ]
      },
      {
        title: "Blood Vessels and Microcirculation",
        content: [
          "Arteries carry oxygenated blood under high pressure with muscular elastic walls",
          "Arterioles regulate distribution through smooth muscle tone and resistance",
          "Capillaries allow nutrient and gas exchange via single-cell-thick walls",
          "Veins contain valves and capacitance reservoirs returning blood at low pressure",
          "Lymphatic vessels recover interstitial fluid and support immune surveillance"
        ],
        clinicalPearls: [
          "Loss of vascular tone in distributive shock causes warm, flushed skin initially",
          "Edema indicates imbalance between hydrostatic and oncotic pressures",
          "Peripheral IV placement succeeds by selecting dilated, valve-free venous segments"
        ]
      }
    ],
    criticalConcepts: [
      "Perfusion depends on adequate cardiac output and vascular resistance",
      "Electrical conduction abnormalities often precede mechanical failure",
      "Coronary perfusion occurs primarily during ventricular diastole",
      "Blood pressure trends combined with clinical signs guide shock management"
    ],
    flashcards: [
      { front: "What formula defines cardiac output?", back: "Cardiac output = stroke volume × heart rate", category: "definition" },
      { front: "Which valve separates the left atrium and ventricle?", back: "Mitral (bicuspid) valve", category: "definition" },
      { front: "Where does coronary artery perfusion originate?", back: "From the aortic root during diastole", category: "clinical" },
      { front: "What does a widened pulse pressure typically indicate?", back: "High stroke volume or decreased systemic vascular resistance", category: "clinical" },
      { front: "What is the intrinsic rate of the sinoatrial node?", back: "Approximately 60-100 beats per minute", category: "definition" },
      { front: "How is mean arterial pressure estimated in the field?", back: "(Systolic + 2 × Diastolic) ÷ 3", category: "protocol" },
      { front: "Which conduction structure delays impulses to allow ventricular filling?", back: "Atrioventricular (AV) node", category: "definition" },
      { front: "What are common causes of decreased preload?", back: "Hemorrhage, dehydration, obstructive shock", category: "clinical" },
      { front: "Which vessels act as the body's reservoir?", back: "Veins due to high capacitance and valves", category: "definition" },
      { front: "How does tachycardia affect coronary perfusion?", back: "Shortens diastole and reduces coronary blood flow", category: "clinical" }
    ]
  };

  const bodySystem6StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 6: Respiratory System",
    description: "Comprehensive study of respiratory anatomy, gas exchange, and breathing mechanics",
    module: "BONUS: Human Body Systems",
    scope: "EMT-B" as const,
    protocols: ["Airway Assessment", "Breathing Evaluation", "Gas Exchange Analysis", "Oxygenation Support", "Ventilation Monitoring"],
    learningObjectives: [
      "Identify conducting and respiratory airway structures with clinical landmarks",
      "Explain mechanics of ventilation including pressure gradients and compliance",
      "Differentiate ventilation, oxygenation, and perfusion in patient assessment",
      "Interpret respiratory regulation via chemoreceptors and neural control",
      "Apply respiratory physiology to manage failure and monitor interventions"
    ],
    keyTerms: [
      "Upper Airway", "Lower Airway", "Carina", "Alveoli", "Surfactant",
      "Tidal Volume", "Minute Ventilation", "Residual Volume", "Dead Space",
      "Compliance", "Elastance", "Ventilation-Perfusion Ratio", "Diffusion",
      "Hypoxemia", "Hypercapnia", "Accessory Muscles", "Capnography"
    ],
    sections: [
      {
        title: "Airway Anatomy and Structure",
        content: [
          "Upper airway (nose, mouth, pharynx, larynx) conditions air and protects lower tract",
          "Carina marks bifurcation into right and left mainstem bronchi; right mainstem is more vertical",
          "Conducting zone terminates at terminal bronchioles, moving air without gas exchange",
          "Respiratory zone begins at respiratory bronchioles leading to alveolar sacs",
          "Type I pneumocytes facilitate gas diffusion; type II cells produce surfactant"
        ],
        clinicalPearls: [
          "Airway obstruction most often occurs above the carina, emphasizing positioning and suction",
          "Right mainstem intubation causes unilateral breath sounds and hypoxia",
          "Loss of surfactant increases surface tension causing alveolar collapse"
        ]
      },
      {
        title: "Ventilation Mechanics",
        content: [
          "Inspiration is active: diaphragm contracts, thoracic cavity expands, intrathoracic pressure drops",
          "Expiration is normally passive as elastic recoil pushes air outward",
          "Compliance reflects lung and chest wall stretch; stiffness increases work of breathing",
          "Accessory muscle use indicates increased work and impending fatigue",
          "Minute ventilation equals tidal volume × respiratory rate and determines CO2 clearance"
        ],
        clinicalPearls: [
          "Decreased compliance in pulmonary edema or ARDS requires higher pressures to ventilate",
          "Severe asthma increases expiratory resistance causing air trapping and hyperinflation",
          "BVM ventilation should target visible chest rise to avoid gastric insufflation"
        ]
      },
      {
        title: "Gas Exchange and Transport",
        content: [
          "Diffusion across alveolar-capillary membrane depends on surface area, thickness, and partial pressure gradients",
          "Ventilation-perfusion (V/Q) matching ensures oxygen delivery and CO2 removal",
          "Oxygen transport primarily via hemoglobin; small fraction dissolved in plasma",
          "Carbon dioxide carried as bicarbonate, carbaminohemoglobin, and dissolved gas",
          "Capnography waveform reflects ventilation, perfusion, and metabolism in real time"
        ],
        clinicalPearls: [
          "V/Q mismatch is the leading cause of hypoxemia in respiratory illness",
          "Pulse oximetry lags behind clinical status; monitor trends with patient presentation",
          "End-tidal CO2 drop may indicate sudden decrease in perfusion such as shock or cardiac arrest"
        ]
      },
      {
        title: "Respiratory Regulation and Clinical Indicators",
        content: [
          "Medullary respiratory centers generate rhythmic breathing, modulated by the pons",
          "Central chemoreceptors respond to CO2/pH changes in cerebrospinal fluid",
          "Peripheral chemoreceptors in carotid and aortic bodies respond to hypoxemia",
          "Stretch, irritant, and J receptors adjust pattern during disease or mechanical ventilation",
          "Clinical assessment integrates rate, rhythm, depth, sounds, and accessory muscle use"
        ],
        clinicalPearls: [
          "Loss of CO2 drive in chronic COPD heightens reliance on hypoxic drive",
          "Rapid shallow breathing reduces tidal volume and promotes hypoventilation",
          "Tripod positioning and pursed-lip breathing indicate compensatory mechanisms"
        ]
      }
    ],
    criticalConcepts: [
      "Ventilation and oxygenation are distinct processes requiring separate assessment",
      "Respiratory failure develops when work of breathing exceeds muscular capacity",
      "V/Q mismatch and diffusion impairment are primary causes of hypoxemia",
      "Timely airway positioning and clearance preceded effective oxygen delivery"
    ],
    flashcards: [
      { front: "What is minute ventilation?", back: "Tidal volume multiplied by respiratory rate", category: "definition" },
      { front: "Which bronchus is more prone to mainstem intubation?", back: "Right mainstem bronchus due to its more vertical angle", category: "clinical" },
      { front: "How does surfactant prevent atelectasis?", back: "Reduces surface tension within alveoli to keep them open", category: "definition" },
      { front: "What range defines normal end-tidal CO2?", back: "35-45 mmHg", category: "clinical" },
      { front: "What term describes low oxygen in arterial blood?", back: "Hypoxemia", category: "definition" },
      { front: "How do central chemoreceptors influence breathing?", back: "Respond to CO2-driven pH changes in cerebrospinal fluid", category: "definition" },
      { front: "Why is accessory muscle use concerning?", back: "Signals increased work of breathing and impending fatigue", category: "clinical" },
      { front: "What does a sudden drop in capnography indicate during resuscitation?", back: "Loss of perfusion or effective compressions", category: "clinical" },
      { front: "How does COPD affect CO2 drive?", back: "Chronic CO2 retention may blunt central chemoreceptor response", category: "clinical" },
      { front: "What are normal adult tidal volumes at rest?", back: "Approximately 500 mL per breath", category: "definition" }
    ]
  };

  const bodySystem7StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 7: Nervous System 🧠",
    description: "Central and peripheral nervous system structure and function",
    module: "Body Systems",
    scope: "EMT-B", 
    protocols: ["CNS Structure", "PNS Function", "Neurological Assessment", "Stroke Recognition", "Spinal Precautions"],
    learningObjectives: [
      "Differentiate central, peripheral, and autonomic nervous system components",
      "Describe neuron structure, impulse conduction, and synaptic transmission",
      "Correlate spinal cord tracts with motor and sensory findings",
      "Recognize autonomic responses and implications for vital sign trends",
      "Apply neurological assessment benchmarks to emergent decision-making"
    ],
    keyTerms: [
      "Frontal Lobe", "Brainstem", "Cerebellum", "Spinal Tracts", "Dermatome",
      "Neuron", "Synapse", "Neurotransmitter", "Myelin", "Action Potential",
      "Autonomic Nervous System", "Sympathetic", "Parasympathetic", "Reflex Arc",
      "Glasgow Coma Scale", "Cranial Nerves", "Motor Unit", "Reticular Activating System"
    ],
    criticalConcepts: [
      "Neurological deficits localize to specific brain or spinal regions",
      "Loss of airway protective reflexes accompanies declining consciousness",
      "Autonomic imbalance affects heart rate, blood pressure, and perfusion",
      "Early recognition of stroke and spinal cord injury preserves function"
    ],
    sections: [
      {
        title: "Central Nervous System Anatomy",
        content: [
          "Cerebrum controls higher functions such as thought, speech, and voluntary movement",
          "Brainstem (midbrain, pons, medulla) houses vital respiratory and cardiovascular centers",
          "Cerebellum coordinates balance, posture, and fine motor control",
          "Spinal cord transmits ascending sensory and descending motor tracts",
          "Meninges (dura, arachnoid, pia) protect CNS and contain cerebrospinal fluid"
        ],
        clinicalPearls: [
          "Brain herniation signs include unequal pupils and Cushing triad",
          "High cervical spinal injuries threaten diaphragm innervation (C3-C5)",
          "Altered mentation may arise from metabolic or structural causes—assess both"
        ]
      },
      {
        title: "Peripheral and Autonomic Nervous Systems",
        content: [
          "Peripheral nerves include 31 spinal nerve pairs and 12 cranial nerves",
          "Dermatomes map sensory distribution aiding spinal level identification",
          "Somatic nerves control voluntary skeletal muscle activity",
          "Autonomic system divides into sympathetic (fight-or-flight) and parasympathetic (rest-and-digest)",
          "Enteric nervous system regulates gastrointestinal motility and secretion"
        ],
        clinicalPearls: [
          "Sympathetic activation raises heart rate, blood pressure, and dilates pupils",
          "Vagus nerve stimulation can cause bradycardia and hypotension",
          "Spinal shock presents with temporary autonomic dysfunction below injury"
        ]
      },
      {
        title: "Neurophysiology and Signal Transmission",
        content: [
          "Neurons maintain resting membrane potential via sodium-potassium pumps",
          "Depolarization occurs when threshold reached, generating action potential",
          "Saltatory conduction increases speed along myelinated axons",
          "Synaptic transmission involves neurotransmitter release and receptor binding",
          "Excitatory and inhibitory inputs integrate to determine neuronal firing"
        ],
        clinicalPearls: [
          "Hypoglycemia and hypoxia rapidly impair neuronal function",
          "Demyelinating conditions slow conduction causing weakness and paresthesia",
          "Benzodiazepines enhance inhibitory neurotransmission to stop seizures"
        ]
      },
      {
        title: "Neurological Assessment Essentials",
        content: [
          "Glasgow Coma Scale evaluates eye opening, verbal, and motor responses",
          "Pupil size and reactivity assess cranial nerves II and III and intracranial pressure",
          "Motor strength graded 0-5; asymmetry localizes to contralateral brain hemisphere",
          "Sensation testing compares bilateral dermatomes for spinal involvement",
          "Speech changes (dysarthria, aphasia) indicate cortical or cranial nerve dysfunction"
        ],
        clinicalPearls: [
          "Sudden focal deficits require rapid stroke assessment and transport",
          "Posturing (decorticate, decerebrate) signals severe brain injury",
          "Serial neurological exams track deterioration or improvement"
        ]
      }
    ],
    flashcards: [
      { front: "What functions are controlled by the frontal lobe?", back: "Executive function, voluntary motor control, expressive language", category: "definition" },
      { front: "Which cranial nerve controls pupil constriction?", back: "Oculomotor nerve (CN III)", category: "clinical" },
      { front: "What score range on the Glasgow Coma Scale indicates severe injury?", back: "GCS 3-8", category: "protocol" },
      { front: "Where do sympathetic preganglionic fibers originate?", back: "Thoracolumbar spinal cord (T1-L2)", category: "definition" },
      { front: "What is the significance of dermatomes?", back: "Map sensory innervation to identify spinal cord levels", category: "clinical" },
      { front: "How does myelin affect nerve conduction?", back: "Enables faster saltatory conduction between nodes of Ranvier", category: "definition" },
      { front: "What is the reticular activating system responsible for?", back: "Maintaining wakefulness and consciousness", category: "definition" },
      { front: "Which spinal roots innervate the diaphragm?", back: "C3, C4, and C5 via the phrenic nerve", category: "clinical" },
      { front: "What signs make up Cushing reflex?", back: "Hypertension, bradycardia, irregular respirations indicative of rising ICP", category: "clinical" },
      { front: "What does unilateral pupil dilation suggest?", back: "Possible cranial nerve III compression from intracranial pressure", category: "clinical" }
    ]
  };

  const bodySystem8StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 8: Endocrine System 🏥",
    description: "Hormone production, regulation, and endocrine gland functions",
    module: "Body Systems",
    scope: "EMT-B",
    protocols: ["Hormone Function", "Gland Locations", "Endocrine Disorders", "Glucose Emergencies", "Adrenal Crisis Support"],
    learningObjectives: [
      "Map major endocrine glands, hormones, and feedback mechanisms",
      "Explain glucose metabolism and counter-regulatory hormone responses",
      "Differentiate hyperthyroid, hypothyroid, and thyroid storm presentations",
      "Describe adrenal cortex and medulla hormone functions in stress physiology",
      "Integrate endocrine assessment findings into emergency care planning"
    ],
    keyTerms: [
      "Hormone", "Receptor", "Hypothalamic-Pituitary Axis", "Insulin", "Glucagon",
      "Cortisol", "Aldosterone", "Antidiuretic Hormone", "Thyroxine", "Triiodothyronine",
      "Parathyroid Hormone", "Calcitonin", "Negative Feedback", "Diabetic Ketoacidosis",
      "Thyroid Storm", "Adrenal Crisis", "Addisonian Crisis", "Hyperosmolar Hyperglycemic State"
    ],
    criticalConcepts: [
      "Hormone release is tightly regulated by feedback loops to maintain homeostasis",
      "Brain depends on continuous glucose supply; endocrine failure threatens neurologic status",
      "Acute endocrine crises (DKA, thyroid storm, adrenal crisis) are life-threatening and subtle",
      "Medication history and compliance often reveal endocrine emergency triggers"
    ],
    sections: [
      {
        title: "Endocrine Glands and Feedback Control",
        content: [
          "Hypothalamus links nervous and endocrine systems through releasing hormones",
          "Anterior pituitary secretes TSH, ACTH, growth hormone, prolactin, LH, FSH",
          "Posterior pituitary stores and releases ADH and oxytocin produced in hypothalamus",
          "Negative feedback regulates hormone levels to prevent extremes",
          "Circadian rhythms influence cortisol and melatonin secretion"
        ],
        clinicalPearls: [
          "Pituitary tumors may present with visual changes and hormonal imbalance",
          "Water balance disorders (SIADH, diabetes insipidus) stem from ADH dysregulation",
          "Endocrine causes should be considered in unexplained altered mental status"
        ]
      },
      {
        title: "Glucose Regulation and Pancreatic Function",
        content: [
          "Pancreatic beta cells release insulin in response to elevated blood glucose",
          "Glucagon from alpha cells raises blood glucose during fasting or stress",
          "Counter-regulatory hormones (epinephrine, cortisol, growth hormone) oppose insulin",
          "Type 1 diabetes is autoimmune beta-cell destruction; type 2 involves resistance",
          "Severe hypoglycemia mimics neurological emergencies and requires rapid correction"
        ],
        clinicalPearls: [
          "Check glucose on any patient with altered mental status or seizure",
          "Oral hypoglycemics can cause prolonged hypoglycemia compared to insulin",
          "DKA presents with polyuria, polydipsia, Kussmaul respirations, and fruity odor"
        ]
      },
      {
        title: "Thyroid and Parathyroid Physiology",
        content: [
          "Thyroid hormones increase metabolic rate, heat production, and sympathetic sensitivity",
          "TSH from pituitary regulates T3/T4 production via negative feedback",
          "Hypothyroidism causes bradycardia, cold intolerance, weight gain, lethargy",
          "Thyroid storm manifests as tachycardia, hyperthermia, and altered mental status",
          "Parathyroid hormone elevates serum calcium while calcitonin lowers it"
        ],
        clinicalPearls: [
          "Neck surgery can precipitate hypocalcemia due to parathyroid injury",
          "Thyroid patients on beta blockers may mask tachycardia despite crisis",
          "Hoarseness or airway compromise may follow rapidly enlarging goiter"
        ]
      },
      {
        title: "Adrenal Hormones and Stress Response",
        content: [
          "Adrenal cortex produces mineralocorticoids (aldosterone), glucocorticoids (cortisol), and androgens",
          "Aldosterone controls sodium retention and potassium excretion affecting blood pressure",
          "Cortisol mobilizes glucose, suppresses inflammation, and maintains vascular tone",
          "Adrenal medulla releases epinephrine and norepinephrine for rapid fight-or-flight response",
          "Addisonian crisis presents with hypotension, hyponatremia, hyperkalemia, and shock"
        ],
        clinicalPearls: [
          "Long-term steroid therapy suppresses adrenal response and increases infection risk",
          "Patients with adrenal insufficiency require stress-dose steroids during illness",
          "Unexplained refractory hypotension should prompt consideration of adrenal crisis"
        ]
      }
    ],
    flashcards: [
      { front: "What hormone lowers blood glucose and where is it produced?", back: "Insulin from pancreatic beta cells", category: "definition" },
      { front: "Which hormone triggers fight-or-flight responses?", back: "Epinephrine from adrenal medulla", category: "definition" },
      { front: "What are classic signs of diabetic ketoacidosis?", back: "Polyuria, polydipsia, abdominal pain, Kussmaul respirations, fruity breath", category: "clinical" },
      { front: "How does aldosterone affect electrolytes?", back: "Increases sodium reabsorption and potassium excretion in kidneys", category: "definition" },
      { front: "What is the primary cause of thyroid storm?", back: "Uncontrolled hyperthyroidism precipitated by stress, infection, or trauma", category: "clinical" },
      { front: "Which hormone maintains serum calcium levels?", back: "Parathyroid hormone increases calcium by acting on bone, kidneys, intestine", category: "definition" },
      { front: "What vital sign pattern suggests adrenal crisis?", back: "Refractory hypotension with possible tachycardia and electrolyte imbalance", category: "clinical" },
      { front: "What is the primary stimulus for insulin release?", back: "Rising blood glucose after carbohydrate intake", category: "definition" },
      { front: "Why are beta blockers used in thyroid storm?", back: "To control tachycardia and sympathetic symptoms", category: "clinical" },
      { front: "What does ADH do?", back: "Promotes water reabsorption in kidneys to maintain fluid balance", category: "definition" }
    ]
  };

  const bodySystem9StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 9: Digestive System 🍎",
    description: "Digestive tract anatomy, digestion processes, and nutrient absorption",
    module: "Body Systems",
    scope: "EMT-B",
    protocols: ["GI Anatomy", "Digestion Process", "Abdominal Assessment", "Bleeding Evaluation", "Nausea/Vomiting Management"],
    learningObjectives: [
      "Trace digestive tract anatomy and accessory organ contributions",
      "Differentiate mechanical and chemical digestion phases",
      "Relate abdominal quadrant pain patterns to underlying organs",
      "Recognize signs of GI bleeding, obstruction, and inflammatory disorders",
      "Apply focused history and exam techniques to gastrointestinal complaints"
    ],
    keyTerms: [
      "Peristalsis", "Sphincter", "Chyme", "Villi", "Mesentery",
      "Portal Circulation", "Bile", "Pancreatic Enzymes", "Small Intestine",
      "Large Intestine", "Peptic Ulcer", "Appendicitis", "Gastroenteritis",
      "Upper GI Bleed", "Lower GI Bleed", "Melena", "Hematochezia"
    ],
    criticalConcepts: [
      "GI bleeding may be occult—monitor vital signs and perfusion trends",
      "Pain location and quality help differentiate hollow vs solid organ involvement",
      "Fluid shifts and vomiting can rapidly create electrolyte disturbances",
      "Abdominal emergencies often require surgical intervention—rapid transport matters"
    ],
    sections: [
      {
        title: "Digestive Anatomy and Function",
        content: [
          "Mouth initiates mechanical breakdown with mastication and chemical digestion via salivary amylase",
          "Esophagus uses peristalsis to deliver bolus to stomach through lower esophageal sphincter",
          "Stomach secretes acid and enzymes to convert food into chyme",
          "Small intestine (duodenum, jejunum, ileum) performs majority of digestion and absorption",
          "Large intestine reabsorbs water, forms stool, and houses gut microbiota"
        ],
        clinicalPearls: [
          "Esophageal varices can hemorrhage massively in liver disease patients",
          "Persistent vomiting risks aspiration and metabolic alkalosis",
          "Listen for bowel sounds to evaluate motility" 
        ]
      },
      {
        title: "Accessory Organs and Nutrient Processing",
        content: [
          "Liver produces bile, detoxifies blood, stores glycogen, synthesizes clotting factors",
          "Gallbladder concentrates and releases bile to emulsify fats",
          "Pancreas secretes digestive enzymes (lipase, amylase, proteases) and bicarbonate",
          "Portal venous system transports nutrient-rich blood from intestines to liver",
          "Spleen filters blood and aids immune response though not a digestive organ"
        ],
        clinicalPearls: [
          "Gallstones may cause right upper quadrant pain radiating to shoulder",
          "Pancreatitis presents with epigastric pain radiating to back and elevated lipase",
          "Liver failure leads to coagulopathy and portal hypertension"
        ]
      },
      {
        title: "GI Emergencies and Assessment",
        content: [
          "Upper GI bleeding manifests as hematemesis or melena; lower GI bleeding as hematochezia",
          "Appendicitis typically begins periumbilical then localizes to right lower quadrant",
          "Bowel obstruction causes cramping pain, distention, vomiting, and absent distal bowel movements",
          "Peritoneal irritation produces rebound tenderness, guarding, and rigid abdomen",
          "Gastroenteritis combines nausea, vomiting, diarrhea, and fluid depletion"
        ],
        clinicalPearls: [
          "Vital sign changes (tachycardia, hypotension) may be earliest indicators of hemorrhage",
          "Pain out of proportion to exam suggests mesenteric ischemia",
          "Pregnant patients require consideration of obstetric causes of abdominal pain"
        ]
      },
      {
        title: "Assessment Strategies and Documentation",
        content: [
          "Use OPQRST to characterize abdominal pain and associated symptoms",
          "Inspect, auscultate, then palpate quadrants systematically",
          "Ask about recent travel, diet, medications (NSAIDs, anticoagulants)",
          "Evaluate hydration status via mucous membranes, skin turgor, intake/output",
          "Document stool characteristics (color, consistency, blood) for trend analysis"
        ],
        clinicalPearls: [
          "Elderly patients may have muted peritoneal signs due to decreased immune response",
          "Hematemesis with coffee-ground appearance indicates partially digested blood",
          "Rectal bleeding with anticoagulant use demands urgent evaluation"
        ]
      }
    ],
    flashcards: [
      { front: "What structure prevents acid reflux into the esophagus?", back: "Lower esophageal (cardiac) sphincter", category: "definition" },
      { front: "Where are bile and pancreatic enzymes released?", back: "Into the duodenum via the ampulla of Vater", category: "definition" },
      { front: "What does melena indicate?", back: "Upper GI bleeding resulting in black, tarry stools", category: "clinical" },
      { front: "What quadrant houses the appendix?", back: "Right lower quadrant", category: "definition" },
      { front: "How does pancreatitis typically present?", back: "Severe epigastric pain radiating to the back with nausea/vomiting", category: "clinical" },
      { front: "What is the primary role of the large intestine?", back: "Reabsorb water and electrolytes, form feces", category: "definition" },
      { front: "Which organ stores and concentrates bile?", back: "Gallbladder", category: "definition" },
      { front: "What signs suggest peritoneal irritation?", back: "Rebound tenderness, guarding, rigid abdomen", category: "clinical" },
      { front: "What is hematochezia?", back: "Bright red blood per rectum typically from lower GI source", category: "definition" },
      { front: "Why is portal hypertension dangerous?", back: "Leads to variceal bleeding and ascites due to increased venous pressure", category: "clinical" }
    ]
  };

  const bodySystem10StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 10: Urinary System 💧",
    description: "Kidney function, urine formation, and fluid-electrolyte balance",
    module: "Body Systems",
    scope: "EMT-B",
    protocols: ["Kidney Function", "Urine Formation", "Fluid Balance", "Renal Failure Assessment", "Dialysis Considerations"],
    learningObjectives: [
      "Describe renal anatomy including cortex, medulla, and nephron segments",
      "Explain filtration, reabsorption, secretion, and excretion processes",
      "Assess fluid status and electrolyte imbalances linked to renal function",
      "Differentiate acute kidney injury from chronic kidney disease presentations",
      "Support dialysis patients and manage complications within EMT scope"
    ],
    keyTerms: [
      "Renal Cortex", "Renal Medulla", "Nephron", "Glomerulus", "Bowman Capsule",
      "Proximal Tubule", "Loop of Henle", "Distal Tubule", "Collecting Duct",
      "Glomerular Filtration Rate", "Renin", "Erythropoietin", "Diuresis", "Azotemia",
      "Oliguria", "Anuria", "Hemodialysis", "Peritoneal Dialysis", "Uremia"
    ],
    criticalConcepts: [
      "Kidneys regulate fluid volume, electrolyte balance, acid-base status, and blood pressure",
      "Declining filtration permits toxin accumulation leading to uremic symptoms",
      "Renal failure alters potassium handling and can precipitate lethal dysrhythmias",
      "Dialysis access requires protection and infection prevention during EMS care"
    ],
    sections: [
      {
        title: "Renal Anatomy and Blood Supply",
        content: [
          "Kidneys lie retroperitoneally at T12-L3 protected by ribs and perirenal fat",
          "Renal artery branches into afferent arterioles feeding glomerular capillaries",
          "Afferent and efferent arteriole tone regulates filtration pressure",
          "Juxtaglomerular apparatus secretes renin to control blood pressure",
          "Renal vein drains filtered blood back to systemic circulation"
        ],
        clinicalPearls: [
          "Renal trauma may present with flank pain and hematuria",
          "Hypotension reduces renal perfusion prompting acute kidney injury",
          "ACE inhibitors influence efferent arteriole tone and filtration"
        ]
      },
      {
        title: "Nephron Function and Urine Formation",
        content: [
          "Glomerulus filters plasma producing ultrafiltrate based on size and charge",
          "Proximal tubule reabsorbs majority of water, sodium, glucose, amino acids",
          "Loop of Henle establishes countercurrent gradient concentrating urine",
          "Distal tubule and collecting duct adjust sodium, potassium, and water under hormonal control",
          "Antidiuretic hormone increases water reabsorption; aldosterone promotes sodium retention"
        ],
        clinicalPearls: [
          "Glucose in urine indicates saturation of proximal tubule transport (diabetes)",
          "Loop diuretics act on ascending limb disrupting sodium reabsorption",
          "Absence of ADH effect results in large volumes of dilute urine (diabetes insipidus)"
        ]
      },
      {
        title: "Fluid, Electrolyte, and Acid-Base Balance",
        content: [
          "Kidneys regulate extracellular fluid volume by adjusting sodium and water excretion",
          "Potassium balance primarily maintained by distal nephron secretion",
          "Bicarbonate reabsorption and hydrogen secretion maintain acid-base equilibrium",
          "Urea and creatinine serve as markers of renal clearance",
          "Edema forms when renal sodium retention expands intravascular volume"
        ],
        clinicalPearls: [
          "Hyperkalemia (>5.5 mEq/L) causes peaked T waves and conduction blocks",
          "Metabolic acidosis from renal failure presents with Kussmaul respirations",
          "Daily weights best reflect fluid shifts in chronic renal patients"
        ]
      },
      {
        title: "Renal Failure and Dialysis Considerations",
        content: [
          "Acute kidney injury develops rapidly from hypoperfusion, toxins, or obstruction",
          "Chronic kidney disease progresses over months with anemia, pruritus, and bone pain",
          "Hemodialysis removes waste via vascular access (fistula, graft, catheter)",
          "Peritoneal dialysis uses abdominal cavity for diffusion through peritoneal membrane",
          "Complications include hypotension, infection (peritonitis), disequilibrium syndrome"
        ],
        clinicalPearls: [
          "Never place BP cuff or IV on extremity with dialysis fistula",
          "Dialysis patients often present with fluid overload or pulmonary edema",
          "Uremic frost, ammonia breath, and confusion reflect advanced disease"
        ]
      }
    ],
    flashcards: [
      { front: "What is the functional unit of the kidney?", back: "The nephron consisting of glomerulus and tubules", category: "definition" },
      { front: "What hormone stimulates red blood cell production from the kidney?", back: "Erythropoietin", category: "definition" },
      { front: "How much urine output indicates adequate perfusion in adults?", back: "At least 0.5 mL/kg/hour (about 30 mL/hour)", category: "clinical" },
      { front: "What ECG change suggests hyperkalemia?", back: "Peaked T waves and widened QRS complexes", category: "clinical" },
      { front: "Why must dialysis fistulas be protected?", back: "They provide critical vascular access and can bleed or clot with trauma", category: "protocol" },
      { front: "What is azotemia?", back: "Accumulation of nitrogenous wastes (urea, creatinine) in blood", category: "definition" },
      { front: "How does ADH affect urine?", back: "Promotes water reabsorption producing concentrated urine", category: "definition" },
      { front: "What symptoms suggest uremia?", back: "Nausea, vomiting, pruritus, altered mental status, pericardial rub", category: "clinical" },
      { front: "What is anuria?", back: "Urine output less than 100 mL in 24 hours", category: "definition" },
      { front: "What is the EMS priority for dialysis-related hypotension?", back: "Supine positioning, gentle fluid challenge per protocol, rapid transport", category: "protocol" }
    ]
  };

  const bonus2StudyNotes: ChapterData = {
    title: "BONUS 2: EMT Advanced Life Support Team Integration 🚑", 
    description: "Professional EMT support roles in advanced life support interventions with evidence-based protocols and seamless team integration",
    module: "ALS Integration",
    scope: "EMT-B",
    protocols: ["ALS Team Support", "IV Setup Assistance", "Medication Preparation", "Cardiac Monitoring", "Advanced Airway Support"],
    learningObjectives: [
      "Execute EMT support roles during ALS interventions within scope of practice",
      "Demonstrate proper IV setup assistance and equipment preparation",
      "Apply systematic medication preparation and administration protocols", 
      "Provide effective cardiac monitoring and airway management support",
      "Integrate pediatric considerations into ALS team support roles"
    ],
    keyTerms: ["ALS Integration", "IV Setup", "Medication Preparation", "Cardiac Monitoring", "Team Communication", "SBAR", "Six Rights"],
    criticalConcepts: [
      "EMTs provide critical support during ALS interventions while maintaining scope of practice",
      "Effective communication and anticipation enhance team performance",
      "Pediatric patients require specialized equipment sizing and weight-based dosing"
    ],
    clinicalDecisionRules: [
      "Six Rights verification prevents medication errors: Patient, Medication, Dose, Route, Time, Documentation",
      "SBAR communication ensures comprehensive patient handoff: Situation, Background, Assessment, Recommendation"
    ],
    commonMisconceptions: [
      "EMTs can perform all tasks paramedics request without scope limitations",
      "IV setup assistance includes starting IVs and adjusting drip rates",
      "Pediatric dosing is simply reduced adult dosing rather than weight-based calculations"
    ],
    examTips: [
      "Know the difference between EMT-authorized medications and ALS drug preparation",
      "Remember pediatric equipment sizing uses Broselow tape or weight-based calculations",
      "Understand that EMTs assist with but do not interpret cardiac monitoring"
    ],
    sections: [
      {
        title: "ALS Team Integration and Scope of Practice",
        content: [
          "**EMT scope of practice** in ALS support includes IV setup assistance, medication preparation, cardiac monitoring electrode placement, and basic airway management while assisting with advanced procedures.",
          "**Communication protocols** require clear, concise language using closed-loop communication to confirm orders and report patient status changes.",
          "**Team dynamics** involve anticipating paramedic needs, maintaining situational awareness, and adhering to established protocols and scope limitations."
        ],
        clinicalPearls: [
          "Effective ALS teams operate with predictable communication patterns and role clarity",
          "EMT preparation of equipment before requests improves response times",
          "Understanding pathophysiology helps EMTs anticipate needed interventions"
        ],
        mnemonics: [
          "**AIDS**: Airway (suction, adjuncts), IV (setup, prime), Drugs (prepare, administer EMT meds), Support (monitoring, communication)",
          "**SBAR**: Situation, Background, Assessment, Recommendation (handoff protocol)"
        ],
        fieldApplications: [
          "Prepare IV equipment immediately upon recognizing shock states",
          "Have naloxone readily available for altered mental status calls",
          "Set up cardiac monitoring equipment for chest pain complaints"
        ]
      },
      {
        title: "IV Setup and Medication Support",
        content: [
          "**IV setup assistance** involves gathering supplies (appropriate gauge catheter, saline bags, tubing), spiking IV bags, priming tubing to eliminate air, and assisting with site preparation without inserting catheters.",
          "**Medication preparation** includes opening vials and packages for ALS medications under paramedic supervision, verifying Six Rights, and administering EMT-authorized medications per protocol.",
          "**Pediatric considerations** require weight-based fluid calculations (20 mL/kg bolus), smaller catheter gauges (22-24G), and pediatric-specific auto-injectors and dosing."
        ],
        clinicalPearls: [
          "Always check IV bags for clarity, expiration dates, and proper fluid type",
          "Pediatric IV access is more difficult - prepare multiple catheter sizes",
          "EMT medications require the same Six Rights verification as ALS drugs"
        ],
        decisionTrees: [
          "Shock recognition → IV setup → Fluid bolus → Monitor response → Repeat if needed",
          "Medication order → Verify Six Rights → Prepare/administer → Monitor effects → Document"
        ]
      },
      {
        title: "Cardiac Monitoring and Airway Management Support", 
        content: [
          "**Cardiac monitoring support** includes proper electrode placement for 3-lead, 4-lead, and 12-lead ECGs, ensuring skin preparation and electrode adhesion, and assisting with defibrillator pad placement.",
          "**Advanced airway support** involves maintaining basic airway management, providing bag-valve-mask ventilation during intubation attempts, and assisting with equipment preparation and tube securing.",
          "**Patient monitoring** requires continuous assessment of vital signs, oxygen saturation, capnography waveforms (if trained), and immediate reporting of changes to the paramedic."
        ],
        clinicalPearls: [
          "Clean, dry skin ensures proper electrode contact and reduces artifacts",
          "BVM ventilation during intubation requires coordination with paramedic timing",
          "Capnography provides real-time feedback on ventilation effectiveness"
        ],
        fieldApplications: [
          "Apply defibrillator pads early in cardiac arrest situations",
          "Maintain suction readiness during advanced airway procedures",
          "Position patient appropriately for airway visualization during intubation"
        ]
      }
    ],
    flashcards: [
      { front: "What does the AIDS mnemonic represent for ALS support?", back: "Airway, IV, Drugs, Support - key EMT assistance roles", category: "protocol" },
      { front: "What are the Six Rights of medication administration?", back: "Patient, Medication, Dose, Route, Time, Documentation", category: "protocol" },
      { front: "What IV catheter sizes are appropriate for adults vs pediatrics?", back: "Adults: 18-20G, Pediatrics: 22-24G", category: "clinical" },
      { front: "What is the pediatric fluid bolus calculation?", back: "20 mL/kg for initial bolus in shock states", category: "protocol" },
      { front: "What does SBAR stand for in patient handoff?", back: "Situation, Background, Assessment, Recommendation", category: "protocol" },
      { front: "What EMT medications can be administered without paramedic supervision?", back: "Naloxone, epinephrine, albuterol, oral glucose, aspirin, oxygen per protocol", category: "protocol" },
      { front: "What is the adult naloxone dose for opioid overdose?", back: "0.4-2 mg IN/IM, titrated to respiratory effort", category: "protocol" },
      { front: "What is the pediatric naloxone dose?", back: "0.1 mg/kg (maximum 2 mg total dose)", category: "protocol" },
      { front: "How do you prime IV tubing?", back: "Spike bag, open roller clamp, flush tubing until air is eliminated", category: "protocol" },
      { front: "What are standard 3-lead ECG electrode placements?", back: "RA (right arm, white), LA (left arm, black), LL (left leg, red)", category: "protocol" },
      { front: "What is the appropriate BVM ventilation rate for adults?", back: "1 breath every 5-6 seconds (10-12 breaths per minute)", category: "protocol" },
      { front: "What is the pediatric BVM ventilation rate?", back: "1 breath every 3-5 seconds (12-20 breaths per minute)", category: "protocol" },
      { front: "What are contraindications to oral glucose?", back: "Unconscious patient, suspected hyperglycemia, inability to swallow", category: "clinical" },
      { front: "What defibrillator pad placement is used for adults?", back: "Anterior-apex (right chest, left lateral) or anterior-posterior", category: "protocol" },
      { front: "What is the epinephrine dose for adult anaphylaxis?", back: "0.3 mg IM (1:1000 concentration) in vastus lateralis", category: "protocol" },
      { front: "What is the pediatric epinephrine dose for anaphylaxis?", back: "0.15 mg IM for patients <30 kg (EpiPen Jr.)", category: "protocol" },
      { front: "How often should you reassess a patient during ALS interventions?", back: "Continuously during procedures, formal reassessment every 5 minutes", category: "protocol" },
      { front: "What information is included in an SBAR handoff?", back: "Chief complaint, interventions performed, current status, recommendations", category: "clinical" },
      { front: "What are signs of IV infiltration?", back: "Swelling, coolness, pain at IV site, decreased flow rate", category: "clinical" },
      { front: "What is closed-loop communication?", back: "Confirming orders by repeating back what was heard", category: "definition" },
      { front: "What EMT tasks are NOT within scope during ALS support?", back: "Starting IVs, interpreting ECGs, administering ALS medications, intubation", category: "clinical" },
      { front: "What is the albuterol dose for adult bronchospasm?", back: "2.5 mg nebulized over 5-10 minutes", category: "protocol" },
      { front: "What is the pediatric albuterol dose?", back: "2.5 mg (>2 years) or 1.25 mg (<2 years) nebulized", category: "protocol" },
      { front: "How do you size a pediatric OPA?", back: "Measure from corner of mouth to angle of jaw", category: "protocol" },
      { front: "What is the aspirin dose for suspected MI?", back: "160-325 mg chewed (typically 4 baby aspirin)", category: "protocol" }
    ]
  };

  /*// Convert imported chapter data to ChapterData format
  const chapter30StudyNotes: ChapterData = {
    title: chapter30Data.chapterTitle,
    description: "Recognition and management of thoracic trauma including breathing difficulties, pneumothorax, and cardiovascular emergencies",
    module: "Module 11: Trauma",
    scope: "EMT-B",
    protocols: [
      "Chest trauma assessment protocol",
      "Breathing support procedures", 
      "Pneumothorax management",
      "Penetrating chest wound care"
    ],
    learningObjectives: chapter30Data.objectives,
    keyTerms: Object.keys(chapter30Data.keyTerms || {}),
    sections: chapter30Data.sections?.map((section: any) => ({
      title: section.title,
      content: section.content?.map((item: any) => 
        typeof item === 'string' ? item : item.subtitle + ': ' + item.points?.join(', ')
      ) || [],
      clinicalPearls: section.clinicalPearls || [],
      mnemonics: section.mnemonics || [],
      fieldApplications: section.fieldApplications || []
    })) || [],
    criticalConcepts: (chapter30Data as any).clinicalPearls || [],
    flashcards: [
      { front: "What is a tension pneumothorax?", back: "Life-threatening condition where air accumulates in pleural space under pressure", category: "definition" },
      { front: "How do you manage a sucking chest wound?", back: "Apply three-sided occlusive dressing to allow air to escape", category: "protocol" },
      { front: "What are signs of chest trauma?", back: "Difficulty breathing, chest pain, visible wounds, asymmetrical chest movement", category: "clinical" }
    ],
    crossReferences: ["Chapter 27: Soft-Tissue Injuries", "Chapter 29: Musculoskeletal Care"]
  };*/

  /*const chapter31StudyNotes: ChapterData = {
    title: chapter31Data.chapterTitle,
    description: "Comprehensive assessment and management of abdominal and genitourinary trauma with evidence-based protocols",
    module: "Module 12: Trauma",
    scope: "EMT-B",
    protocols: [
      "Abdominal trauma assessment",
      "Evisceration management",
      "Internal bleeding recognition",
      "Genitourinary injury care"
    ],
    learningObjectives: chapter31Data.objectives,
    keyTerms: Object.keys(chapter31Data.keyTerms || {}),
    sections: chapter31Data.sections?.map((section: any) => ({
      title: section.title,
      content: section.content?.map((item: any) => 
        typeof item === 'string' ? item : item.subtitle + ': ' + item.points?.join(', ')
      ) || [],
      clinicalPearls: section.clinicalPearls || [],
      mnemonics: section.mnemonics || [],
      fieldApplications: section.fieldApplications || []
    })) || [],
    criticalConcepts: (chapter31Data as any).clinicalPearls || [],
    flashcards: [
      { front: "How do you manage eviscerated organs?", back: "Cover with moist sterile dressing, never push back into abdomen", category: "protocol" },
      { front: "What are signs of internal abdominal bleeding?", back: "Abdominal pain, distension, guarding, signs of shock", category: "clinical" },
      { front: "What is the priority in abdominal trauma?", back: "Recognition of internal bleeding and rapid transport", category: "protocol" }
    ],
    crossReferences: ["Chapter 26: Bleeding Control", "Chapter 29: Musculoskeletal Care"]
  };*/

  /*const chapter37StudyNotes: ChapterData = {
    title: "Special Challenges",
    description: "Caring for patients with disabilities, chronic conditions, and special population considerations",
    module: "Module 13: Special Populations and Challenges",
    scope: "EMT-B",
    protocols: [
      "Disability accommodation protocols",
      "Sensory impairment communication techniques",
      "Bariatric patient management",
      "Cultural competency guidelines"
    ],
    learningObjectives: [
      "Understand challenges in caring for patients with disabilities",
      "Apply appropriate techniques for patients with sensory impairments",
      "Recognize needs of patients with chronic conditions",
      "Apply principles of care for patients with mental health conditions"
    ],
    keyTerms: [
      "Disability", "Sensory impairment", "Bariatric", "Cultural competency",
      "Language barrier", "Health literacy", "Therapeutic communication", "Assistive technology"
    ],
    sections: [
      {
        title: "Patients with Physical Disabilities",
        content: [
          "Ask patients how they usually transfer rather than assuming",
          "Bring patient's assistive devices when possible",
          "Maintain patient's usual positioning for comfort",
          "Don't assume cognitive impairment based on physical disability"
        ],
        clinicalPearls: [
          "Patient is the expert on their own condition",
          "Always ask before touching assistive devices"
        ],
        mnemonics: [
          "DISABILITY: Dignity, Independence, Safety, Assistance, Bring equipment, Include patient"
        ],
        decisionTrees: [
          "Disability → Assess Function → Ask Preferences → Accommodate → Maintain Dignity"
        ],
        fieldApplications: [
          "Always introduce yourself and explain actions",
          "Ask permission before moving equipment"
        ]
      }
    ],
    criticalConcepts: [
      "Always ask patients about their needs rather than assuming",
      "Patients with disabilities are experts on their own conditions"
    ],
    flashcards: [
      { front: "How should you approach a patient with a guide dog?", back: "Don't pet the guide dog - it's working. Ask permission before touching.", category: "protocol" },
      { front: "What is the proper way to lead a blind patient?", back: "Offer your arm rather than grabbing theirs", category: "protocol" }
    ],
    crossReferences: [
      "Chapter 23: Behavioral Crisis Protocols",
      "Chapter 32: Pediatric Emergencies"
    ]
  };*/

  /*const chapter38StudyNotes: ChapterData = {
    title: "Incident Management",
    description: "Understanding incident command system, mass casualty incidents, and emergency response coordination",
    module: "Module 14: Operations",
    scope: "EMT-B", 
    protocols: [
      "Incident command system procedures",
      "Mass casualty incident protocols",
      "Triage procedures",
      "Scene safety assessment"
    ],
    learningObjectives: [
      "Understand incident command system structure",
      "Apply triage principles in mass casualty incidents",
      "Recognize hazardous materials situations",
      "Understand EMS role in disaster response"
    ],
    keyTerms: [
      "Incident command system", "Mass casualty incident", "Triage", "START triage",
      "Incident commander", "Unified command", "Span of control", "Chain of command"
    ],
    sections: [
      {
        title: "Incident Command System",
        content: [
          "ICS provides organizational structure for emergency response",
          "Incident commander has overall authority and responsibility",
          "Span of control should not exceed 5-7 people per supervisor",
          "Unity of command means each person reports to only one supervisor"
        ],
        clinicalPearls: [
          "Follow chain of command during incidents",
          "Clear communication prevents confusion"
        ],
        mnemonics: [
          "ICS: Incident commander, Command structure, Safety officer"
        ],
        decisionTrees: [
          "Incident → Assess → Establish Command → Assign Resources"
        ],
        fieldApplications: [
          "Report to staging area when assigned",
          "Follow orders from incident commander"
        ]
      }
    ],
    criticalConcepts: [
      "Follow incident command structure",
      "Triage saves the most lives possible"
    ],
    flashcards: [
      { front: "What does START triage stand for?", back: "Simple Triage And Rapid Treatment", category: "definition" },
      { front: "What is span of control in ICS?", back: "Number of people one supervisor can effectively manage (3-7)", category: "definition" }
    ],
    crossReferences: [
      "Chapter 39: Ambulance Operations",
      "Chapter 40: Highway Safety"
    ]
  };*/

  /*const chapter39StudyNotes: ChapterData = {
    title: "Ambulance Operations",
    description: "Safe ambulance operations, equipment management, and patient transport procedures",
    module: "Module 14: Operations",
    scope: "EMT-B",
    protocols: [
      "Ambulance safety procedures",
      "Equipment inspection protocols", 
      "Patient transport procedures",
      "Emergency vehicle operations"
    ],
    learningObjectives: [
      "Understand ambulance safety procedures",
      "Apply proper equipment inspection techniques",
      "Recognize factors affecting patient transport",
      "Apply safe emergency vehicle operation principles"
    ],
    keyTerms: [
      "Emergency vehicle", "Due regard", "Right of way", "Ambulance inspection",
      "Medical equipment", "Patient compartment", "Emergency response"
    ],
    sections: [
      {
        title: "Ambulance Safety",
        content: [
          "Due regard means driving with consideration for public safety",
          "Emergency vehicles don't automatically have right of way",
          "Complete stop required at red lights and stop signs",
          "Safety belts required for all occupants"
        ],
        clinicalPearls: [
          "Arrive safely to help patients",
          "Speed doesn't save significant time"
        ],
        mnemonics: [
          "SAFETY: Stop at lights, All wear seatbelts, Follow traffic laws"
        ],
        decisionTrees: [
          "Emergency Response → Assess Route → Drive Safely → Arrive Intact"
        ],
        fieldApplications: [
          "Complete daily equipment checks",
          "Maintain situational awareness while driving"
        ]
      }
    ],
    criticalConcepts: [
      "Due regard for public safety is required",
      "Complete stop at all red lights and stop signs"
    ],
    flashcards: [
      { front: "What does 'due regard' mean in emergency vehicle operation?", back: "Operating with consideration for public safety despite emergency status", category: "definition" },
      { front: "When must emergency vehicles come to complete stop?", back: "At red lights, stop signs, and when crossing traffic", category: "protocol" }
    ],
    crossReferences: [
      "Chapter 38: Incident Management",
      "Chapter 40: Highway Safety"
    ]
  };*/

  /*const chapter40StudyNotes: ChapterData = {
    title: "Highway Safety and Vehicle Extrication",
    description: "Scene safety, traffic control, and vehicle extrication principles in roadway emergencies",
    module: "Module 14: Operations",
    scope: "EMT-B",
    protocols: [
      "Highway safety procedures",
      "Traffic control measures",
      "Vehicle extrication support",
      "Scene stabilization techniques"
    ],
    learningObjectives: [
      "Apply highway safety principles",
      "Understand traffic control procedures", 
      "Recognize vehicle extrication hazards",
      "Apply scene safety assessment skills"
    ],
    keyTerms: [
      "Highway safety", "Traffic control", "Extrication", "Scene safety",
      "High visibility clothing", "Traffic cones", "Flares", "Scene perimeter"
    ],
    sections: [
      {
        title: "Highway Safety Procedures",
        content: [
          "Park ambulance to create barrier between traffic and scene",
          "Wear high visibility clothing at all roadway scenes",
          "Use traffic cones and flares to direct traffic",
          "Establish scene perimeter for safety"
        ],
        clinicalPearls: [
          "Be visible to oncoming traffic",
          "Position ambulance as shield"
        ],
        mnemonics: [
          "HIGHWAY: High visibility, Identify hazards, Guard the scene"
        ],
        decisionTrees: [
          "Roadway Scene → Park Safely → Control Traffic → Treat Patients"
        ],
        fieldApplications: [
          "Always wear reflective vest on roadways",
          "Position vehicle to block lane if needed"
        ]
      }
    ],
    criticalConcepts: [
      "Wear high visibility clothing on all roadway calls",
      "Position ambulance as traffic barrier"
    ],
    flashcards: [
      { front: "How should ambulance be positioned at highway accident?", back: "As barrier between traffic and scene, at angle to deflect impact", category: "protocol" },
      { front: "What safety equipment is required on highway scenes?", back: "High visibility clothing, traffic cones, warning devices", category: "protocol" }
    ],
    crossReferences: [
      "Chapter 38: Incident Management",
      "Chapter 39: Ambulance Operations"
    ]
  };*/

  /*const chapter41StudyNotes: ChapterData = {
    title: "Terrorism and Disaster Response",
    description: "Recognition of terrorist incidents, weapons of mass destruction, and disaster response procedures",
    module: "Module 14: Operations",
    scope: "EMT-B",
    protocols: [
      "Terrorism recognition procedures",
      "WMD response protocols",
      "Decontamination procedures",
      "Disaster response coordination"
    ],
    learningObjectives: [
      "Recognize potential terrorist incidents",
      "Understand weapons of mass destruction",
      "Apply decontamination principles",
      "Understand EMS role in disaster response"
    ],
    keyTerms: [
      "Terrorism", "Weapons of mass destruction", "CBRNE", "Decontamination",
      "Hot zone", "Warm zone", "Cold zone", "Personal protective equipment"
    ],
    sections: [
      {
        title: "Terrorism Recognition",
        content: [
          "Look for suspicious circumstances and unusual injury patterns",
          "Multiple casualties with similar symptoms suggest chemical agent",
          "Unusual odors or visible clouds may indicate chemical release",
          "Stay upwind and uphill from suspected contamination"
        ],
        clinicalPearls: [
          "Scene safety is paramount in suspected terrorism",
          "Early recognition prevents responder contamination"
        ],
        mnemonics: [
          "CBRNE: Chemical, Biological, Radiological, Nuclear, Explosive"
        ],
        decisionTrees: [
          "Suspicious Scene → Assess Safety → Establish Zones → Decontaminate"
        ],
        fieldApplications: [
          "Maintain situational awareness",
          "Report suspicious findings immediately"
        ]
      }
    ],
    criticalConcepts: [
      "Scene safety takes priority over patient care",
      "Decontamination prevents spread of contamination"
    ],
    flashcards: [
      { front: "What does CBRNE stand for?", back: "Chemical, Biological, Radiological, Nuclear, Explosive", category: "definition" },
      { front: "What are the three zones in hazmat incident?", back: "Hot zone (contaminated), Warm zone (decon), Cold zone (safe)", category: "definition" }
    ],
    crossReferences: [
      "Chapter 38: Incident Management",
      "Chapter 39: Ambulance Operations"
    ]
  };*/

  // Chapter selection and data management
  const chapters = {
    chapter1: chapter1StudyNotes,
    chapter2: chapter2StudyNotes,
    chapter3: chapter3StudyNotes,
    chapter4: chapter4StudyNotes,
    chapter5: chapter5StudyNotes,
    chapter6: chapter6StudyNotes,
    chapter7: chapter7StudyNotes,
    chapter8: chapter8StudyNotes,
    chapter9: chapter9StudyNotes,
    chapter10: chapter10StudyNotes,
    chapter11: chapter11StudyNotes,
    chapter12: chapter12StudyNotes,
    chapter13: chapter13StudyNotes,
    chapter14: chapter14StudyNotes,
    chapter15: chapter15StudyNotes,
    chapter16: chapter16StudyNotes,
    chapter17: chapter17StudyNotes,
    chapter18: chapter18StudyNotes,
    chapter19: chapter19StudyNotes,
    chapter20: chapter20StudyNotes,
    chapter21: chapter21StudyNotes,
    chapter22: chapter22StudyNotes,
    chapter23: chapter23StudyNotes,
    chapter24: chapter24StudyNotes,
    chapter25: chapter25StudyNotes,
    chapter26: chapter26StudyNotes,
    chapter27: chapter27StudyNotes,
    chapter28: chapter28StudyNotes,
    chapter29: chapter29StudyNotes,
    chapter30: chapter30StudyNotes,
    chapter31: chapter31StudyNotes,
    chapter32: chapter32StudyNotes,
    chapter33: chapter33StudyNotes,
    chapter34: chapter34StudyNotes,
    chapter35: chapter35StudyNotes,
    chapter36: chapter36StudyNotes,
    chapter37: chapter37StudyNotes,
    chapter38: chapter38StudyNotes,
    chapter39: chapter39StudyNotes,
    chapter40: chapter40StudyNotes,
    chapter41: chapter41StudyNotes,
    chapter42: chapter42StudyNotes,
    chapter43: chapter43StudyNotes,
    chapter44: chapter44StudyNotes,
    chapter45: chapter45StudyNotes,
    bonus: bonusStudyNotes,
    bodySystem2: bodySystem2StudyNotes,
    bodySystem3: bodySystem3StudyNotes,
    bodySystem4: bodySystem4StudyNotes,
    bodySystem5: bodySystem5StudyNotes,
    bodySystem6: bodySystem6StudyNotes,
    bodySystem7: bodySystem7StudyNotes,
    bodySystem8: bodySystem8StudyNotes,
    bodySystem9: bodySystem9StudyNotes,
    bodySystem10: bodySystem10StudyNotes,
    bonus2: bonus2StudyNotes
  };

  const currentChapter = chapters[activeChapter as keyof typeof chapters] || chapter2StudyNotes;

  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Download Functions
  const generateTextContent = () => {
    let textContent = `${currentChapter.title}\\n`;
    textContent += `${currentChapter.description}\\n\\n`;
    
    textContent += "LEARNING OBJECTIVES:\\n";
    currentChapter.learningObjectives.forEach((objective, index) => {
      textContent += `${index + 1}. ${objective}\\n`;
    });
    textContent += "\\n";

    textContent += "KEY TERMS:\\n";
    currentChapter.keyTerms.forEach((termObj) => {
      if (typeof termObj === 'string') {
        textContent += `• ${termObj}\\n`;
      } else {
        textContent += `• ${termObj.term}: ${termObj.definition}\\n`;
      }
    });
    textContent += "\\n";

    if (currentChapter.protocols && currentChapter.protocols.length > 0) {
      textContent += "PROTOCOLS:\\n";
      currentChapter.protocols.forEach((protocol) => {
        textContent += `• ${protocol}\\n`;
      });
      textContent += "\\n";
    }

    textContent += "STUDY CONTENT:\\n\\n";
    currentChapter.sections.forEach((section) => {
      textContent += `${section.title}\\n`;
      textContent += "=".repeat(section.title.length) + "\\n";
      section.content.forEach(paragraph => {
        const cleanParagraph = paragraph.replace(/\\*\\*(.*?)\\*\\*/g, '$1');
        textContent += `${cleanParagraph}\\n`;
      });
      
      if (section.clinicalPearls && section.clinicalPearls.length > 0) {
        textContent += "\\nClinical Pearls:\\n";
        section.clinicalPearls.forEach(pearl => textContent += `• ${pearl}\\n`);
      }
      
      if (section.mnemonics && section.mnemonics.length > 0) {
        textContent += "\\nMnemonics:\\n";
        section.mnemonics.forEach(mnemonic => textContent += `• ${mnemonic}\\n`);
      }
      
      textContent += "\\n";
    });

    if (currentChapter.criticalConcepts && currentChapter.criticalConcepts.length > 0) {
      textContent += "CRITICAL CONCEPTS:\\n";
      currentChapter.criticalConcepts.forEach((concept, index) => {
        textContent += `${index + 1}. ${concept}\\n`;
      });
      textContent += "\\n";
    }

    textContent += `---\\nGenerated from EMT-B Study Notes - ${new Date().toLocaleDateString()}\\n`;
    return textContent;
  };

  const downloadAsText = () => {
    const content = generateTextContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EMT-B_${activeChapter}_Study_Notes.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return currentChapter.sections;
    
    return currentChapter.sections.filter(section =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.some(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, currentChapter.sections]);

  // Global search across ALL platform content
  const globalSearchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const searchLower = searchTerm.toLowerCase();
    const results: Array<{
      type: string;
      chapterTitle: string;
      chapterKey: string;
      title: string;
      content: string;
      category?: string;
    }> = [];

    // Search all chapters
    Object.entries(chapters).forEach(([chapterKey, chapterData]) => {
      const chapter = chapterData as ChapterData;

      // Search chapter title and description
      if (chapter.title.toLowerCase().includes(searchLower) || 
          chapter.description.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Chapter Overview',
          chapterTitle: chapter.title,
          chapterKey,
          title: chapter.title,
          content: chapter.description
        });
      }

      // Search learning objectives
      chapter.learningObjectives?.forEach(objective => {
        if (objective.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Learning Objective',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Learning Objective',
            content: objective
          });
        }
      });

      // Search key terms
      chapter.keyTerms?.forEach(term => {
        if (typeof term === 'string') {
          if (term.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Key Term',
              chapterTitle: chapter.title,
              chapterKey,
              title: term,
              content: `Key medical term: ${term}`
            });
          }
        } else {
          if (term.term.toLowerCase().includes(searchLower) || 
              term.definition.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Key Term',
              chapterTitle: chapter.title,
              chapterKey,
              title: term.term,
              content: term.definition
            });
          }
        }
      });

      // Search protocols
      chapter.protocols?.forEach(protocol => {
        if (protocol.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Protocol',
            chapterTitle: chapter.title,
            chapterKey,
            title: protocol,
            content: `Clinical protocol: ${protocol}`
          });
        }
      });

      // Search sections content
      chapter.sections?.forEach(section => {
        if (section.title.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Section',
            chapterTitle: chapter.title,
            chapterKey,
            title: section.title,
            content: section.content?.[0] || 'Section content'
          });
        }

        section.content?.forEach(content => {
          if (content.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Content',
              chapterTitle: chapter.title,
              chapterKey,
              title: section.title,
              content: content
            });
          }
        });

        // Search clinical pearls
        section.clinicalPearls?.forEach(pearl => {
          if (pearl.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Clinical Pearl',
              chapterTitle: chapter.title,
              chapterKey,
              title: section.title,
              content: pearl
            });
          }
        });

        // Search mnemonics
        section.mnemonics?.forEach(mnemonic => {
          if (mnemonic.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Mnemonic',
              chapterTitle: chapter.title,
              chapterKey,
              title: section.title,
              content: mnemonic
            });
          }
        });

        // Search decision trees
        section.decisionTrees?.forEach(tree => {
          if (tree.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Decision Tree',
              chapterTitle: chapter.title,
              chapterKey,
              title: section.title,
              content: tree
            });
          }
        });

        // Search field applications
        section.fieldApplications?.forEach(application => {
          if (application.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Field Application',
              chapterTitle: chapter.title,
              chapterKey,
              title: section.title,
              content: application
            });
          }
        });
      });

      // Search critical concepts
      chapter.criticalConcepts?.forEach(concept => {
        if (concept.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Critical Concept',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Critical Concept',
            content: concept
          });
        }
      });

      // Search clinical decision rules
      chapter.clinicalDecisionRules?.forEach(rule => {
        if (rule.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Clinical Decision Rule',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Decision Rule',
            content: rule
          });
        }
      });

      // Search common misconceptions
      chapter.commonMisconceptions?.forEach(misconception => {
        if (misconception.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Common Misconception',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Misconception',
            content: misconception
          });
        }
      });

      // Search exam tips
      chapter.examTips?.forEach(tip => {
        if (tip.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Exam Tip',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Exam Tip',
            content: tip
          });
        }
      });

      // Search cross references
      chapter.crossReferences?.forEach(ref => {
        if (ref.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Cross Reference',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Cross Reference',
            content: ref
          });
        }
      });

      // Search flashcards
      chapter.flashcards?.forEach(flashcard => {
        if (flashcard.front.toLowerCase().includes(searchLower) || 
            flashcard.back.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Flashcard',
            chapterTitle: chapter.title,
            chapterKey,
            title: flashcard.front,
            content: flashcard.back,
            category: flashcard.category
          });
        }
      });
    });

    // Search medications database
    medicationsData.forEach(medication => {
      // Search medication name and generic name
      if (medication.name.toLowerCase().includes(searchLower) || 
          medication.genericName.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Medication',
          chapterTitle: 'Medication Database',
          chapterKey: 'medications',
          title: `${medication.name} (${medication.genericName})`,
          content: `${medication.category} - ${medication.dosage} ${medication.route} - ${medication.indications[0] || 'Multiple indications'}`,
          category: medication.category
        });
      }

      // Search medication indications
      medication.indications?.forEach(indication => {
        if (indication.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Medication Indication',
            chapterTitle: 'Medication Database',
            chapterKey: 'medications',
            title: medication.name,
            content: `Indication: ${indication}`,
            category: medication.category
          });
        }
      });

      // Search medication contraindications
      medication.contraindications?.forEach(contraindication => {
        if (contraindication.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Medication Contraindication',
            chapterTitle: 'Medication Database',
            chapterKey: 'medications',
            title: medication.name,
            content: `Contraindication: ${contraindication}`,
            category: medication.category
          });
        }
      });

      // Search medication side effects
      medication.sideEffects?.forEach(sideEffect => {
        if (sideEffect.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Medication Side Effect',
            chapterTitle: 'Medication Database',
            chapterKey: 'medications',
            title: medication.name,
            content: `Side Effect: ${sideEffect}`,
            category: medication.category
          });
        }
      });

      // Search medication category
      if (medication.category.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Medication Category',
          chapterTitle: 'Medication Database',
          chapterKey: 'medications',
          title: medication.name,
          content: `Category: ${medication.category} - ${medication.dosage}`,
          category: medication.category
        });
      }

      // Search administration notes
      if (medication.administrationNotes?.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Administration Note',
          chapterTitle: 'Medication Database',
          chapterKey: 'medications',
          title: medication.name,
          content: `Administration: ${medication.administrationNotes}`,
          category: medication.category
        });
      }

      // Search certification level
      if (medication.certificationLevel?.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Certification Level',
          chapterTitle: 'Medication Database',
          chapterKey: 'medications',
          title: medication.name,
          content: `Certification Required: ${medication.certificationLevel}`,
          category: medication.category
        });
      }
    });

    // Search EMS protocols
    emsProtocols.forEach(protocol => {
      // Search protocol name
      if (protocol.name.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'EMS Protocol',
          chapterTitle: 'EMS Protocols',
          chapterKey: 'protocols',
          title: protocol.name,
          content: `${protocol.category} protocol - ${protocol.certificationLevel} level`,
          category: protocol.category
        });
      }

      // Search protocol indications
      protocol.indications?.forEach(indication => {
        if (indication.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Protocol Indication',
            chapterTitle: 'EMS Protocols',
            chapterKey: 'protocols',
            title: protocol.name,
            content: `Indication: ${indication}`,
            category: protocol.category
          });
        }
      });

      // Search protocol interventions
      protocol.interventions?.forEach(intervention => {
        if (intervention.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Protocol Intervention',
            chapterTitle: 'EMS Protocols',
            chapterKey: 'protocols',
            title: protocol.name,
            content: `Intervention: ${intervention}`,
            category: protocol.category
          });
        }
      });

      // Search protocol medications
      protocol.medications?.forEach(medication => {
        if (medication.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Protocol Medication',
            chapterTitle: 'EMS Protocols',
            chapterKey: 'protocols',
            title: protocol.name,
            content: `Medication: ${medication}`,
            category: protocol.category
          });
        }
      });

      // Search assessment steps
      protocol.assessment?.forEach(assessment => {
        if (assessment.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Protocol Assessment',
            chapterTitle: 'EMS Protocols',
            chapterKey: 'protocols',
            title: protocol.name,
            content: `Assessment: ${assessment}`,
            category: protocol.category
          });
        }
      });
    });

    // Search emergency scenarios
    emergencyScenarios.forEach(scenario => {
      // Search scenario title and chief complaint
      if (scenario.title.toLowerCase().includes(searchLower) || 
          scenario.chiefComplaint.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Emergency Scenario',
          chapterTitle: 'Training Scenarios',
          chapterKey: 'scenarios',
          title: scenario.title,
          content: `${scenario.type} scenario - ${scenario.chiefComplaint}`,
          category: scenario.type
        });
      }

      // Search patient presentation
      if (scenario.patientPresentation.appearance.toLowerCase().includes(searchLower) ||
          scenario.patientPresentation.mentalStatus.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Patient Presentation',
          chapterTitle: 'Training Scenarios',
          chapterKey: 'scenarios',
          title: scenario.title,
          content: `Presentation: ${scenario.patientPresentation.appearance}`,
          category: scenario.type
        });
      }

      // Search differential diagnosis
      scenario.differentialDiagnosis?.forEach(diagnosis => {
        if (diagnosis.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Differential Diagnosis',
            chapterTitle: 'Training Scenarios',
            chapterKey: 'scenarios',
            title: scenario.title,
            content: `Diagnosis: ${diagnosis}`,
            category: scenario.type
          });
        }
      });

      // Search critical actions
      scenario.criticalActions?.forEach(action => {
        if (action.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Critical Action',
            chapterTitle: 'Training Scenarios',
            chapterKey: 'scenarios',
            title: scenario.title,
            content: `Critical Action: ${action}`,
            category: scenario.type
          });
        }
      });

      // Search learning objectives
      scenario.learningObjectives?.forEach(objective => {
        if (objective.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Learning Objective',
            chapterTitle: 'Training Scenarios',
            chapterKey: 'scenarios',
            title: scenario.title,
            content: `Objective: ${objective}`,
            category: scenario.type
          });
        }
      });
    });

    return results.slice(0, 100); // Limit to 100 results for performance
  }, [searchTerm, chapters]);

  const renderGlobalSearchResults = () => {
    if (!searchTerm.trim() || globalSearchResults.length === 0) return null;

    return (
      <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Search className="h-5 w-5 text-yellow-600 mr-2" />
          <h3 className="text-lg font-semibold text-yellow-800">
            Global Search Results ({globalSearchResults.length} found)
          </h3>
        </div>
        <div className="text-base text-yellow-700 mb-3">
          Showing results from all chapters, protocols, medications, flashcards, and clinical content
        </div>
        <div className="max-h-96 overflow-y-auto space-y-3">
          {globalSearchResults.map((result, index) => (
            <div
              key={index}
              className="bg-white border border-yellow-300 rounded-lg p-3 cursor-pointer hover:bg-yellow-50 transition-colors"
              onClick={() => {
                if (chapters[result.chapterKey as keyof typeof chapters]) {
                  setActiveChapter(result.chapterKey);
                  setSearchTerm(''); // Clear search to show full chapter
                } else {
                  // For non-chapter results (medications, protocols, scenarios), keep search active
                  // This will show the filtered results relevant to the search term
                  setSearchTerm(result.title.split(' ')[0]); // Set search to first word of the result
                }
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {result.type}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {result.chapterTitle}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{result.title}</h4>
              <p className="text-base text-gray-600 overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const
              }}>
                {result.content}
              </p>
              {result.category && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 mt-2">
                  {result.category}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 text-sm text-yellow-600">
          <div className="font-semibold mb-1">Comprehensive Platform Search Includes:</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-sm">
            <div>• Study chapters & sections</div>
            <div>• Medications & dosages</div>
            <div>• EMS protocols & procedures</div>
            <div>• Emergency scenarios</div>
            <div>• Clinical pearls & tips</div>
            <div>• Flashcards & definitions</div>
            <div>• Decision trees & algorithms</div>
            <div>• Field applications</div>
          </div>
          <div className="mt-1">Click any result to navigate to relevant content or refine search.</div>
        </div>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <AlertCircle className="h-6 w-6 text-blue-400 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              {currentChapter.title}
            </h3>
            <p className="text-blue-700">
              {currentChapter.description}
            </p>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-blue-600 text-base font-medium">
                📚 Module {currentChapter.module}
              </span>
              <span className="text-blue-600 text-base font-medium">
                🎯 Scope: {currentChapter.scope}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <Heart className="h-8 w-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Learning Objectives</h3>
          <ul className="space-y-2 text-green-700">
            {currentChapter.learningObjectives.map((objective, index) => (
              <li key={index} className="text-base flex items-start leading-relaxed">
                <span className="text-green-500 mr-3 mt-1">•</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <Shield className="h-8 w-8 text-red-600 mb-3" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Key Terms</h3>
          <div className="grid grid-cols-1 gap-2 text-red-700">
            {currentChapter.keyTerms.map((termObj, index) => (
              <div key={index} className="text-base leading-relaxed">
                {typeof termObj === 'string' ? (
                  <div className="font-medium flex items-center">
                    <span className="text-red-500 mr-3">•</span>
                    <span>{termObj}</span>
                  </div>
                ) : (
                  <>
                    <div className="font-semibold text-red-800 mb-1 flex items-start">
                      <span className="text-red-500 mr-3 mt-1">•</span>
                      <span>{termObj.term}</span>
                    </div>
                    <div className="text-red-600 text-base ml-6 leading-relaxed">
                      {termObj.definition}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Protocols Section */}
      {currentChapter.protocols && currentChapter.protocols.length > 0 && (
        <div className="bg-orange-50 p-4 rounded-lg">
          <Activity className="h-8 w-8 text-orange-600 mb-3" />
          <h3 className="text-lg font-semibold text-orange-800 mb-2">Protocols & Procedures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-orange-700">
            {currentChapter.protocols.map((protocol, index) => (
              <div key={index} className="text-base font-medium flex items-center">
                <span className="text-orange-500 mr-3">📋</span>
                <span>{protocol}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flashcards Preview */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <Activity className="h-8 w-8 text-purple-600 mb-3" />
        <h3 className="text-lg font-semibold text-purple-800 mb-2">Flashcards Available</h3>
        <p className="text-purple-700 text-base mb-3">
          {currentChapter.flashcards.length} flashcards available for this chapter
        </p>
        <button
          onClick={() => setActiveTab('flashcards')}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-base transition-colors"
        >
          Practice Flashcards
        </button>
      </div>
    </div>
  );

  const renderStudyMaterial = () => (
    <div className="space-y-6">
      {/* Historical Overview */}
      {currentChapter.historicalOverview && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">{currentChapter.historicalOverview.title}</h3>
          
          {/* Military Influence */}
          {currentChapter.historicalOverview.militaryInfluence && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">Military Influence</h4>
              <p className="text-blue-800 text-lg leading-relaxed font-roboto mb-4">
                {currentChapter.historicalOverview.militaryInfluence.description}
              </p>
              <ul className="space-y-2">
                {currentChapter.historicalOverview.militaryInfluence.keyDevelopments.map((development, index) => (
                  <li key={index} className="text-blue-700 text-lg leading-relaxed font-roboto flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span>{development}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Civilian Development Timeline */}
          {currentChapter.historicalOverview.civilianDevelopment && (
            <div>
              <h4 className="text-lg font-semibold text-blue-700 mb-3">Civilian Development Timeline</h4>
              <div className="space-y-3">
                {Object.entries(currentChapter.historicalOverview.civilianDevelopment).map(([year, description]) => (
                  <div key={year} className="flex items-start">
                    <span className="font-semibold text-blue-600 text-lg mr-4 flex-shrink-0">{year}:</span>
                    <p className="text-blue-800 text-lg leading-relaxed font-roboto">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* System Components */}
      {currentChapter.systemComponents && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r">
          <h3 className="text-xl font-semibold text-green-800 mb-4">EMS System Components</h3>
          
          {Object.entries(currentChapter.systemComponents).map(([key, component]) => (
            <div key={key} className="mb-6 last:mb-0">
              <h4 className="text-lg font-semibold text-green-700 mb-3">{component.component || component.title}</h4>
              <p className="text-green-800 text-lg leading-relaxed font-roboto mb-4">
                {component.description}
              </p>
              
              {/* Handle different component structures */}
              {component.levels && (
                <div className="space-y-3">
                  {Object.entries(component.levels).map(([level, details]) => (
                    <div key={level} className="bg-white p-3 rounded border-l-2 border-green-300">
                      <h5 className="font-semibold text-green-700 text-lg mb-2">{level}</h5>
                      <div className="space-y-1 text-green-700 text-base">
                        <p><strong>Scope:</strong> {details.scope}</p>
                        <p><strong>Training:</strong> {details.training}</p>
                        <p><strong>Certification:</strong> {details.certification}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {component.keyPerformanceIndicators && (
                <div>
                  <h5 className="font-semibold text-green-700 mb-2">Key Performance Indicators:</h5>
                  <ul className="space-y-1">
                    {component.keyPerformanceIndicators.map((indicator, index) => (
                      <li key={index} className="text-green-700 text-lg leading-relaxed font-roboto flex items-start">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span>{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Sections Display for all other chapters */}
      {filteredSections.length > 0 && (
        <div className="space-y-6">
          {filteredSections.map((section, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h3>
              
              {/* Handle different section content formats */}
              
              {/* Format 1: Array of content strings (Chapter 3 style) */}
              {Array.isArray(section.content) && section.content.length > 0 && (
                <div className="space-y-3 mb-4">
                  {section.content.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-gray-800 text-lg leading-relaxed font-roboto"
                       dangerouslySetInnerHTML={{ 
                         __html: item.replace(/\\*\\*(.*?)\\*\\*/g, '<strong class="font-semibold text-blue-700">$1</strong>') 
                       }} 
                    />
                  ))}
                </div>
              )}
              
              {/* Format 2: Single content string (Chapter 2 style) */}
              {typeof section.content === 'string' && section.content && (
                <p className="text-gray-800 text-lg leading-relaxed font-roboto mb-4">
                  {section.content}
                </p>
              )}
              
              {/* Key Points (Chapter 2 style) */}
              {section.keyPoints && section.keyPoints.length > 0 && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r mb-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Key Points</h4>
                  <ul className="space-y-2">
                    {section.keyPoints.map((point, pointIndex) => (
                      <li key={pointIndex} className="text-blue-700 text-lg leading-relaxed font-roboto flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Clinical Note (Chapter 2 style) */}
              {section.clinicalNote && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r mb-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    💡 Clinical Note
                  </h4>
                  <p className="text-green-700 text-lg leading-relaxed font-roboto">
                    {section.clinicalNote}
                  </p>
                </div>
              )}
              
              {/* Remember This (Chapter 2 style) */}
              {section.rememberThis && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    🎯 Remember This
                  </h4>
                  <p className="text-yellow-700 text-lg leading-relaxed font-roboto font-medium">
                    {section.rememberThis}
                  </p>
                </div>
              )}

              {/* Clinical Pearls */}
              {section.clinicalPearls && section.clinicalPearls.length > 0 && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r mb-4">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center text-base">
                    💎 Clinical Pearls
                  </h4>
                  <ul className="space-y-2">
                    {section.clinicalPearls.map((pearl, pearlIndex) => (
                      <li key={pearlIndex} className="text-green-700 text-base flex items-start leading-relaxed">
                        <span className="text-green-500 mr-3 mt-1">•</span>
                        <span>{pearl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mnemonics */}
              {section.mnemonics && section.mnemonics.length > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r mb-4">
                  <h4 className="font-semibold text-yellow-800 mb-3 flex items-center text-base">
                    🧠 Mnemonics
                  </h4>
                  <ul className="space-y-2">
                    {section.mnemonics.map((mnemonic, mnemonicIndex) => (
                      <li key={mnemonicIndex} className="text-yellow-700 text-base leading-relaxed">
                        <span 
                          dangerouslySetInnerHTML={{ 
                            __html: mnemonic.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>') 
                          }} 
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Field Applications */}
              {section.fieldApplications && section.fieldApplications.length > 0 && (
                <div className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded-r">
                  <h4 className="font-semibold text-teal-800 mb-3 flex items-center text-base">
                    🚑 Field Applications
                  </h4>
                  <ul className="space-y-2">
                    {section.fieldApplications.map((app, appIndex) => (
                      <li key={appIndex} className="text-teal-700 text-base flex items-start leading-relaxed">
                        <span className="text-teal-500 mr-3 mt-1">•</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCriticalConcepts = () => (
    <div className="space-y-4">
      {/* Critical Concepts */}
      {currentChapter.criticalConcepts && currentChapter.criticalConcepts.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🚨 Critical Concepts</h3>
          {currentChapter.criticalConcepts.map((concept, index) => (
            <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 shadow-sm rounded-r-lg">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-yellow-800 text-base font-medium leading-relaxed" 
                   dangerouslySetInnerHTML={{ __html: concept.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>') }} />
              </div>
            </div>
          ))}
        </>
      )}

      {/* Clinical Decision Rules */}
      {currentChapter.clinicalDecisionRules && currentChapter.clinicalDecisionRules.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">📋 Clinical Decision Rules</h3>
          {currentChapter.clinicalDecisionRules.map((rule, index) => (
            <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 shadow-sm rounded-r-lg">
              <p className="text-blue-800 text-base font-medium leading-relaxed"
                 dangerouslySetInnerHTML={{ __html: rule.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>') }} />
            </div>
          ))}
        </>
      )}

      {/* Common Misconceptions */}
      {currentChapter.commonMisconceptions && currentChapter.commonMisconceptions.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">❌ Common Misconceptions</h3>
          {currentChapter.commonMisconceptions.map((misconception, index) => (
            <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 shadow-sm rounded-r-lg">
              <p className="text-red-800 text-base font-medium leading-relaxed">
                {misconception}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Exam Tips */}
      {currentChapter.examTips && currentChapter.examTips.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">📝 Exam Tips</h3>
          {currentChapter.examTips.map((tip, index) => (
            <div key={index} className="bg-green-50 border-l-4 border-green-400 p-4 shadow-sm rounded-r-lg">
              <p className="text-green-800 text-base font-medium leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Cross References */}
      {currentChapter.crossReferences && currentChapter.crossReferences.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">🔗 Cross References</h3>
          {currentChapter.crossReferences.map((ref, index) => (
            <div key={index} className="bg-purple-50 border-l-4 border-purple-400 p-4 shadow-sm rounded-r-lg">
              <p className="text-purple-800 text-base font-medium leading-relaxed">
                {ref}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );

  const renderFlashcards = () => {
    const flashcards = currentChapter.flashcards;
    if (!flashcards || flashcards.length === 0) {
      return <div className="text-center text-gray-500">No flashcards available for this chapter.</div>;
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Flashcard {currentFlashcard + 1} of {flashcards.length}
            {flashcards[currentFlashcard].category && (
              <span className="ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                {flashcards[currentFlashcard].category}
              </span>
            )}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentFlashcard(Math.max(0, currentFlashcard - 1))}
              disabled={currentFlashcard === 0}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded text-base"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentFlashcard(Math.min(flashcards.length - 1, currentFlashcard + 1))}
              disabled={currentFlashcard === flashcards.length - 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded text-base"
            >
              Next
            </button>
          </div>
        </div>

        <div 
          className="bg-white border-2 border-gray-200 rounded-lg p-8 min-h-48 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="text-center">
            <div className="text-base text-gray-500 mb-4">
              {isFlipped ? 'Answer' : 'Question'} - Click to flip
            </div>
            <div className="text-lg text-gray-900">
              {isFlipped ? flashcards[currentFlashcard].back : flashcards[currentFlashcard].front}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {isFlipped ? 'Show Question' : 'Show Answer'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 pb-20 lg:pb-6 font-roboto">
      {/* Medical Disclaimer */}
      <MedicalDisclaimer variant="inline" />
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">EMT-B Study Notes</h1>
              <p className="text-gray-600 mt-1">{currentChapter.title}</p>
            </div>
          </div>
          
          {/* Chapter Selection */}
          <div className="flex items-center gap-4">
            <select
              value={activeChapter}
              onChange={(e) => setActiveChapter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {/* Module 1: Foundations of EMS Practice */}
              <option value="chapter1">Chapter 1: EMS System Fundamentals</option>
              <option value="chapter2">Chapter 2: Responder Safety & Resilience</option>
              <option value="chapter3">Chapter 3: EMS Law & Ethical Practice</option>
              <option value="chapter4">Chapter 4: Emergency Communication Protocols</option>
              
              {/* Module 2: Clinical Foundations */}
              <option value="chapter5">Chapter 5: Medical Language for Responders</option>
              <option value="chapter6">Chapter 6: Anatomy for Emergency Care</option>
              <option value="chapter7">Chapter 7: Developmental Considerations in EMS</option>
              <option value="chapter8">Chapter 8: Patient Movement & Handling</option>
              <option value="chapter9">Chapter 9: Interprofessional EMS Teams</option>
              
              {/* Module 3: Patient Assessment Mastery */}
              <option value="chapter10">Chapter 10: Comprehensive Patient Evaluation</option>
              
              {/* Module 4: Airway & Ventilatory Management */}
              <option value="chapter11">Chapter 11: Advanced Airway Interventions</option>
              
              {/* Module 5: Pharmacological Principles */}
              <option value="chapter12">Chapter 12: Medication Administration Standards</option>
              
              {/* Module 6: Shock & Circulatory Emergencies */}
              <option value="chapter13">Chapter 13: Shock Recognition & Management</option>
              <option value="chapter14">Chapter 14: BLS Life Support Protocols</option>
              
              {/* Module 7: Medical Emergency Response */}
              <option value="chapter15">Chapter 15: Medical Crisis Assessment</option>
              <option value="chapter16">Chapter 16: Respiratory Emergency Protocols</option>
              <option value="chapter17">Chapter 17: Cardiovascular Emergency Management</option>
              
              {/* Module 8: Neurological & Systemic Emergencies */}
              <option value="chapter18">Chapter 18: Neurological Crisis Intervention</option>
              <option value="chapter19">Chapter 19: Abdominal Emergency Protocols</option>
              <option value="chapter20">Chapter 20: Metabolic & Hematologic Emergencies</option>
              
              {/* Module 9: Specialized Emergency Care */}
              <option value="chapter21">Chapter 21: Allergic & Anaphylactic Response</option>
              <option value="chapter22">Chapter 22: Toxicological Emergencies</option>
              <option value="chapter23">Chapter 23: Behavioral Crisis Protocols</option>
              <option value="chapter24">Chapter 24: Gynecological Emergency Care</option>
              
              {/* Module 10: Trauma Response Principles */}
              <option value="chapter25">Chapter 25: Trauma System Fundamentals</option>
              <option value="chapter26">Chapter 26: Hemorrhage Control Techniques</option>
              <option value="chapter27">Chapter 27: Soft Tissue Trauma Management</option>
              
              {/* Module 11: Traumatic Injury Management */}
              <option value="chapter28">Chapter 28: Craniofacial Trauma Response</option>
              <option value="chapter29">Chapter 29: Spinal Trauma Protocols</option>
              <option value="chapter30">Chapter 30: Thoracic Injury Interventions</option>
              
              {/* Module 12: Environmental & Musculoskeletal Emergencies */}
              <option value="chapter31">Chapter 31: Abdominal & GU Trauma Essentials</option>
              <option value="chapter32">Chapter 32: Orthopedic Injury Management</option>
              <option value="chapter33">Chapter 33: Environmental Exposure Protocols</option>
              
              {/* Module 13: Special Patient Populations */}
              <option value="chapter34">Chapter 34: Obstetric & Neonatal Emergencies</option>
              <option value="chapter35">Chapter 35: Pediatric Emergency Response</option>
              <option value="chapter36">Chapter 36: Geriatric Emergency Care</option>
              <option value="chapter37">Chapter 37: Patients with Unique Needs</option>
              
              {/* Module 14: EMS Operations & Disaster Response */}
              <option value="chapter38">Chapter 38: Medical Transport Operations</option>
              <option value="chapter39">Chapter 39: Technical Rescue Protocols</option>
              <option value="chapter40">Chapter 40: Incident Command Systems</option>
              <option value="chapter41">Chapter 41: Mass Casualty Incident Response</option>
              <option value="chapter42">Chapter 42: Advanced Cardiovascular Anatomy 🔬</option>
              <option value="chapter43">Chapter 43: Advanced Respiratory Physiology 🫁</option>
              <option value="chapter44">Chapter 44: Nervous System in Depth 🧠</option>
              <option value="chapter45">Chapter 45: Endocrine and Metabolic Systems ⚗️</option>
              <option value="bonus">BONUS: Human Body Systems - Chapter 1: Cellular Structure & Function 🧬</option>
              <option value="bodySystem2">BONUS: Human Body Systems - Chapter 2: Tissues & Organs 🩸</option>
              <option value="bodySystem3">BONUS: Human Body Systems - Chapter 3: Skeletal System 🦴</option>
              <option value="bodySystem4">BONUS: Human Body Systems - Chapter 4: Muscular System 💪</option>
              <option value="bodySystem5">BONUS: Human Body Systems - Chapter 5: Cardiovascular System ❤️</option>
              <option value="bodySystem6">BONUS: Human Body Systems - Chapter 6: Respiratory System 🫁</option>
              <option value="bodySystem7">BONUS: Human Body Systems - Chapter 7: Nervous System 🧠</option>
              <option value="bodySystem8">BONUS: Human Body Systems - Chapter 8: Endocrine System 🏥</option>
              <option value="bodySystem9">BONUS: Human Body Systems - Chapter 9: Digestive System 🍎</option>
              <option value="bodySystem10">BONUS: Human Body Systems - Chapter 10: Urinary System 💧</option>
              <option value="bonus2">BONUS 2: EMT Advanced Life Support Team Integration 🚑</option>
            </select>
          
            {/* Download Button */}
            <div className="relative" ref={downloadMenuRef}>
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-md"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              
              {/* Download Menu */}
              {showDownloadMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        downloadAsText();
                        setShowDownloadMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Text File (.txt)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative mb-4 md:mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search everything - chapters, protocols, medications, flashcards, clinical content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('study')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'study'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Study Material
          </button>
          <button
            onClick={() => setActiveTab('critical')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
              activeTab === 'critical'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Critical Concepts
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
              activeTab === 'flashcards'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Zap className="h-4 w-4 mr-2" />
            Flashcards
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 border touch-manipulation">
        {renderGlobalSearchResults()}
        
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'study' && renderStudyMaterial()}
        {activeTab === 'critical' && renderCriticalConcepts()}
        {activeTab === 'flashcards' && renderFlashcards()}
      </div>
    </div>
  );
};

export default EMTBStudyNotes;

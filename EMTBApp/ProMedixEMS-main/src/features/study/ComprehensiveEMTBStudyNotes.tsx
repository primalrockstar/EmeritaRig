import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, BookOpen, AlertCircle, Heart, Shield, Stethoscope, ChevronDown, ChevronUp, Download, FileText, Activity, Zap, ChevronLeft, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import MedicalDisclaimer from '../../../components/MedicalDisclaimer';
import GlassCard from '../../components/ui/GlassCard';
import GlassContainer from '../../components/ui/GlassContainer';
import Badge from '../../components/ui/Badge';

interface StudySection {
  title: string;
  content: string[];
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
  scope?: 'EMT-B' | 'AEMT' | 'Paramedic';
  learningObjectives: string[];
  keyTerms: string[];
  protocols?: string[];
  sections: StudySection[];
  criticalConcepts?: string[];
  clinicalDecisionRules?: string[];
  commonMisconceptions?: string[];
  examTips?: string[];
  crossReferences?: string[];
  flashcards: Flashcard[];
}

const ComprehensiveEMTBStudyNotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeChapter, setActiveChapter] = useState('chapter1');
  const [activeModule, setActiveModule] = useState('module1');
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  // Module and Chapter Structure
  const moduleStructure = {
    module1: {
      title: "Module 1: Foundations of EMS Practice",
      chapters: ['chapter1', 'chapter2', 'chapter3', 'chapter4'],
      description: "Core fundamentals of emergency medical services"
    },
    module2: {
      title: "Module 2: Clinical Foundations", 
      chapters: ['chapter5', 'chapter6', 'chapter7', 'chapter8', 'chapter9'],
      description: "Essential clinical knowledge and skills"
    },
    module3: {
      title: "Module 3: Patient Assessment",
      chapters: ['chapter10'],
      description: "Systematic patient evaluation techniques"
    },
    module4: {
      title: "Module 4: Airway Management",
      chapters: ['chapter11'], 
      description: "Airway assessment and intervention skills"
    },
    module5: {
      title: "Module 5: Pharmacology",
      chapters: ['chapter12'],
      description: "Medication administration principles"
    },
    module6: {
      title: "Module 6: Shock & Circulatory Emergencies",
      chapters: ['chapter13', 'chapter14'],
      description: "Recognition and management of shock"
    },
    module7: {
      title: "Module 7: Medical Emergency Response",
      chapters: ['chapter15', 'chapter16', 'chapter17'],
      description: "Medical emergency assessment and care"
    },
    module8: {
      title: "Module 8: Neurological & Systemic Emergencies", 
      chapters: ['chapter18', 'chapter19', 'chapter20'],
      description: "Neurologic and systemic emergency management"
    },
    module9: {
      title: "Module 9: Specialized Emergency Care",
      chapters: ['chapter21', 'chapter22', 'chapter23', 'chapter24'],
      description: "Special population and condition management"
    },
    module10: {
      title: "Module 10: Trauma Response Principles",
      chapters: ['chapter25', 'chapter26', 'chapter27'],
      description: "Systematic approach to trauma care"
    },
    module11: {
      title: "Module 11: Traumatic Injury Management",
      chapters: ['chapter28', 'chapter29', 'chapter30'],
      description: "Specific injury patterns and treatments"
    },
    module12: {
      title: "Module 12: Environmental & Musculoskeletal",
      chapters: ['chapter31', 'chapter32', 'chapter33'],
      description: "Environmental and musculoskeletal emergencies"
    },
    module13: {
      title: "Module 13: Special Patient Populations",
      chapters: ['chapter34', 'chapter35', 'chapter36', 'chapter37'],
      description: "Pediatric, geriatric, and special needs patients"
    },
    module14: {
      title: "Module 14: EMS Operations & Disaster Response",
      chapters: ['chapter38', 'chapter39', 'chapter40', 'chapter41'],
      description: "Operational procedures and emergency response"
    }
  };

  // Sample chapter data (simplified structure for demonstration)
  const chapterData = {
    chapter1: {
      title: "Chapter 1: EMS System Fundamentals",
      description: "Overview of Emergency Medical Services systems and structure",
      module: "1",
      learningObjectives: [
        "Define Emergency Medical Services and its key components",
        "Identify the four levels of EMS training",
        "Explain medical direction concepts",
        "Understand quality improvement processes"
      ],
      keyTerms: ["EMS", "Medical Direction", "Scope of Practice", "Quality Improvement"],
      sections: [
        {
          title: "Introduction to EMS",
          content: [
            "Emergency Medical Services (EMS) is a comprehensive system providing emergency medical care",
            "Comprises emergency medical dispatch, first responders, EMTs, paramedics, and receiving facilities",
            "Integrated with public safety agencies and healthcare systems"
          ]
        }
      ],
      flashcards: [
        { front: "What are the four levels of EMS training?", back: "EMR, EMT, AEMT, Paramedic" },
        { front: "What is medical direction?", back: "Physician oversight of EMS patient care aspects" }
      ]
    },
    chapter2: {
      title: "Chapter 2: Workforce Safety & Wellness",
      description: "Safety protocols and wellness strategies for EMS personnel",
      module: "1",
      learningObjectives: [
        "Understand occupational hazards in EMS",
        "Apply stress management techniques",
        "Implement proper body mechanics",
        "Use appropriate PPE"
      ],
      keyTerms: ["PPE", "Standard Precautions", "Stress Management", "Body Mechanics"],
      sections: [
        {
          title: "Personal Protective Equipment",
          content: [
            "PPE protects against exposure to bloodborne pathogens",
            "Proper donning sequence: Gown → Mask → Goggles → Gloves",
            "Proper doffing sequence: Gloves → Goggles → Gown → Mask"
          ]
        }
      ],
      flashcards: [
        { front: "What is the proper PPE donning sequence?", back: "Gown → Mask → Goggles → Gloves" },
        { front: "What does eustress mean?", back: "Beneficial stress that improves performance" }
      ]
    }
    // Additional chapters would be added here following the same pattern
  };

  const currentModule = moduleStructure[activeModule as keyof typeof moduleStructure];
  const currentChapter = chapterData[activeChapter as keyof typeof chapterData];

  // Get all chapters in order for navigation
  const allChapters = Object.keys(chapterData).sort((a, b) => {
    const numA = parseInt(a.replace('chapter', ''));
    const numB = parseInt(b.replace('chapter', ''));
    return numA - numB;
  });

  const currentChapterIndex = allChapters.indexOf(activeChapter);
  const previousChapter = currentChapterIndex > 0 ? allChapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < allChapters.length - 1 ? allChapters[currentChapterIndex + 1] : null;

  // Navigation functions
  const goToPreviousChapter = () => {
    if (previousChapter) {
      setActiveChapter(previousChapter);
      setCurrentFlashcard(0);
      setIsFlipped(false);
      // Update active module based on chapter
      const chapterNum = parseInt(previousChapter.replace('chapter', ''));
      const moduleKey = Object.keys(moduleStructure).find(key => {
        const module = moduleStructure[key as keyof typeof moduleStructure];
        return module.chapters.includes(previousChapter);
      });
      if (moduleKey) setActiveModule(moduleKey);
    }
  };

  const goToNextChapter = () => {
    if (nextChapter) {
      setActiveChapter(nextChapter);
      setCurrentFlashcard(0);
      setIsFlipped(false);
      // Update active module based on chapter
      const chapterNum = parseInt(nextChapter.replace('chapter', ''));
      const moduleKey = Object.keys(moduleStructure).find(key => {
        const module = moduleStructure[key as keyof typeof moduleStructure];
        return module.chapters.includes(nextChapter);
      });
      if (moduleKey) setActiveModule(moduleKey);
    }
  };

  // Completion tracking
  const markChapterComplete = () => {
    setCompletedChapters(prev => new Set([...prev, activeChapter]));
    setShowCompletionDialog(true);
    setTimeout(() => setShowCompletionDialog(false), 3000);
  };

  const toggleChapterCompletion = () => {
    setCompletedChapters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activeChapter)) {
        newSet.delete(activeChapter);
      } else {
        newSet.add(activeChapter);
      }
      return newSet;
    });
  };

  // Calculate progress
  const completionPercentage = Math.round((completedChapters.size / allChapters.length) * 100);

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

  // Filter sections based on search term
  const filteredSections = useMemo(() => {
    if (!searchTerm || !currentChapter) return currentChapter?.sections || [];
    
    return currentChapter.sections.filter(section =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.some(content => content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, currentChapter]);

  const downloadAsText = () => {
    if (!currentChapter) return;
    
    let content = `${currentChapter.title}\n${'='.repeat(currentChapter.title.length)}\n\n`;
    content += `${currentChapter.description}\n\n`;
    
    content += `Learning Objectives:\n`;
    currentChapter.learningObjectives.forEach((obj, index) => {
      content += `${index + 1}. ${obj}\n`;
    });
    content += '\n';

    currentChapter.sections.forEach(section => {
      content += `${section.title}\n${'-'.repeat(section.title.length)}\n`;
      section.content.forEach(item => content += `• ${item}\n`);
      content += '\n';
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentChapter.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsHTML = () => {
    if (!currentChapter) return;
    
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${currentChapter.title}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
            h1 { color: #2563eb; border-bottom: 2px solid #2563eb; }
            h2 { color: #374151; margin-top: 30px; }
            ul { margin: 10px 0; }
            li { margin: 5px 0; }
        </style>
    </head>
    <body>
        <h1>${currentChapter.title}</h1>
        <p><strong>${currentChapter.description}</strong></p>
        
        <h2>Learning Objectives</h2>
        <ul>`;
    
    currentChapter.learningObjectives.forEach(obj => {
      html += `<li>${obj}</li>`;
    });
    
    html += `</ul>`;

    currentChapter.sections.forEach(section => {
      html += `<h2>${section.title}</h2><ul>`;
      section.content.forEach(item => html += `<li>${item}</li>`);
      html += `</ul>`;
    });

    html += `</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentChapter.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentChapter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Chapter Not Found</h2>
          <p className="text-gray-600">The selected chapter is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <GlassContainer className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">EMT-B Study Notes</h1>
                  <p className="text-gray-600 mt-1">{currentChapter.title}</p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    Progress: {completedChapters.size}/{allChapters.length} chapters
                  </div>
                  <div className="text-xs text-gray-500">{completionPercentage}% complete</div>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            
            {/* Module and Chapter Selection */}
            <div className="flex items-center gap-4">
              {/* Module Selector */}
              <select
                value={activeModule}
                onChange={(e) => {
                  setActiveModule(e.target.value);
                  // Set first chapter of selected module
                  const newModule = moduleStructure[e.target.value as keyof typeof moduleStructure];
                  if (newModule.chapters.length > 0) {
                    setActiveChapter(newModule.chapters[0]);
                  }
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(moduleStructure).map(([key, module]) => (
                  <option key={key} value={key}>{module.title}</option>
                ))}
              </select>

              {/* Chapter Selector */}
              <select
                value={activeChapter}
                onChange={(e) => setActiveChapter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {currentModule.chapters.map(chapterKey => {
                  const chapter = chapterData[chapterKey as keyof typeof chapterData];
                  return chapter ? (
                    <option key={chapterKey} value={chapterKey}>{chapter.title}</option>
                  ) : null;
                })}
              </select>

              {/* Chapter Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPreviousChapter}
                  disabled={!previousChapter}
                  className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg transition-colors"
                  title={previousChapter ? `Go to ${chapterData[previousChapter as keyof typeof chapterData]?.title}` : 'No previous chapter'}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Previous</span>
                </button>
                
                <button
                  onClick={goToNextChapter}
                  disabled={!nextChapter}
                  className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-lg transition-colors"
                  title={nextChapter ? `Go to ${chapterData[nextChapter as keyof typeof chapterData]?.title}` : 'No next chapter'}
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Completion Toggle */}
              <button
                onClick={toggleChapterCompletion}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  completedChapters.has(activeChapter)
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                {completedChapters.has(activeChapter) ? (
                  <CheckCircle className="h-4 w-4 mr-2" />
                ) : (
                  <Circle className="h-4 w-4 mr-2" />
                )}
                {completedChapters.has(activeChapter) ? 'Completed' : 'Mark Complete'}
              </button>
            
              {/* Download Button */}
              <div className="relative" ref={downloadMenuRef}>
                <button
                  onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-md"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
                
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
                      <button
                        onClick={() => {
                          downloadAsHTML();
                          setShowDownloadMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        HTML File (.html)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Module Description */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">{currentModule.title}</h4>
                <p className="text-sm text-blue-700">{currentModule.description}</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search sections, key points, or terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'flashcards', label: 'Flashcards', icon: Zap }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            {/* Chapter Overview */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentChapter.title}</h2>
              <p className="text-gray-600 mb-6">{currentChapter.description}</p>
              
              {/* Learning Objectives */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Learning Objectives</h3>
                <ul className="space-y-2">
                  {currentChapter.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Terms */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Key Terms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {currentChapter.keyTerms.map((term, index) => (
                    <Badge key={index} label={term} color="blue" />
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Sections */}
            <div className="space-y-4">
              {filteredSections.map((section, index) => (
                <GlassCard key={index}>
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                    {expandedSections.has(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedSections.has(index) && (
                    <div className="px-6 pb-4">
                      <ul className="space-y-2">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        ) : (
          /* Flashcards Tab */
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Flashcards</h2>
              <span className="text-sm text-gray-500">
                {currentFlashcard + 1} of {currentChapter.flashcards.length}
              </span>
            </div>
            
            {currentChapter.flashcards.length > 0 ? (
              <div className="space-y-4">
                {/* Flashcard */}
                <div
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 min-h-[200px] flex items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-md"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className="text-center">
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      {isFlipped ? 'Answer:' : 'Question:'}
                    </p>
                    <p className="text-xl text-gray-800">
                      {isFlipped 
                        ? currentChapter.flashcards[currentFlashcard]?.back 
                        : currentChapter.flashcards[currentFlashcard]?.front
                      }
                    </p>
                    <p className="text-sm text-gray-500 mt-4">Click to flip</p>
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCurrentFlashcard(Math.max(0, currentFlashcard - 1));
                      setIsFlipped(false);
                    }}
                    disabled={currentFlashcard === 0}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-2">
                    {currentChapter.flashcards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentFlashcard(index);
                          setIsFlipped(false);
                        }}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentFlashcard ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => {
                      setCurrentFlashcard(Math.min(currentChapter.flashcards.length - 1, currentFlashcard + 1));
                      setIsFlipped(false);
                    }}
                    disabled={currentFlashcard === currentChapter.flashcards.length - 1}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No flashcards available for this chapter.</p>
              </div>
            )}
          </GlassCard>
        )}

        {/* Completion Notification */}
        {showCompletionDialog && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Chapter marked as complete!</span>
          </div>
        )}

        <MedicalDisclaimer />
    </GlassContainer>
  );
};

export default ComprehensiveEMTBStudyNotes;
// Enhanced AI Companion Module - Optimized for EMT-B Training and Clinical Support
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  X, 
  Brain,
  Book,
  AlertTriangle,
  Pill,
  Heart,
  Stethoscope,
  MapPin,
  TrendingUp,
  Bot
} from 'lucide-react';

// Import optimized data sources
// import { // // emtbChapterFlashcards, // getFlashcardsByChapter, // getFlashcardsByModule } from '../data/emtb-flashcards';
import { emsFormulary } from '../data/drug-calculator';
import { emsProtocols } from '../data/ems-protocols';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  source?: string;
  confidence?: number;
  category?: 'medication' | 'protocol' | 'assessment' | 'study' | 'scenario' | 'general';
  relatedActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    action: () => void;
    priority?: 'high' | 'medium' | 'low';
  }>;
  metadata?: {
    chapterNumber?: number;
    moduleNumber?: number;
    difficulty?: 'Basic' | 'Intermediate' | 'Advanced';
  };
}

interface LearningContext {
  currentChapter?: number;
  currentModule?: number;
  difficultyLevel: 'Basic' | 'Intermediate' | 'Advanced';
  learningGoals: string[];
  completedTopics: string[];
  strugglingTopics: string[];
}

interface Props {
  setActiveTab: (tab: string) => void;
  currentContext?: {
    page?: string;
    chapter?: number;
    module?: number;
  };
}

export default function OptimizedEMSChatbot({ setActiveTab, currentContext }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      type: 'bot',
      content: `🚑 **Welcome to your EMT-B AI Study Companion!**

I'm here to help you master EMT-B concepts with:
• **Smart Chapter Navigation** - Ask about any of the 41 study chapters
• **Personalized Flashcards** - Adaptive learning based on your progress
• **Clinical Scenarios** - Practice real-world decision making
• **Protocol Guidance** - Quick access to emergency procedures
• **Study Planning** - Organized learning paths

*What would you like to study today?*`,
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [learningContext, setLearningContext] = useState<LearningContext>({
    difficultyLevel: 'Basic',
    learningGoals: [],
    completedTopics: [],
    strugglingTopics: []
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced speech recognition with better error handling
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        
        setTimeout(() => {
          if (transcript.trim()) {
            handleSendMessage(transcript);
          }
        }, 100);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          addSystemMessage('Microphone access denied. Please enable microphone permissions.');
        } else if (event.error !== 'no-speech') {
          addSystemMessage('Speech recognition error. Please try typing your question.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const addSystemMessage = (content: string) => {
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'system',
      content,
      timestamp: new Date(),
      category: 'general'
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  // Enhanced AI processing with context awareness
  const processQuery = useCallback((query: string): ChatMessage => {
    const lowerQuery = query.toLowerCase();
    const keywords = lowerQuery.split(' ').filter(word => word.length > 2);
    
    // Add to conversation history for context
    setConversationHistory(prev => [...prev.slice(-10), query]); // Keep last 10 queries
    
    // Chapter-specific queries (aligned with our 41 study chapters)
    const chapterMatch = lowerQuery.match(/chapter\s*(\d+)|ch\s*(\d+)/);
    if (chapterMatch) {
      const chapterNum = parseInt(chapterMatch[1] || chapterMatch[2]);
      if (chapterNum >= 1 && chapterNum <= 41) {
        // const chapterCards = getFlashcardsByChapter(chapterNum);
        const chapterCards = [];
        const chapterTitle = `Chapter ${chapterNum}`;
        
        return {
          id: Date.now().toString(),
          type: 'bot',
          content: `📚 **${chapterTitle}** (Chapter ${chapterNum})

I found ${chapterCards.length} study cards for this chapter:
• **Module**: ${chapterCards[0]?.moduleNumber || 'N/A'}
• **Difficulty Levels**: Basic, Intermediate, Advanced
• **Topics**: ${chapterCards.slice(0, 3).map(card => card.tags[0]).join(', ')}...

*Would you like to start studying this chapter or take a quick quiz?*`,
          timestamp: new Date(),
          category: 'study',
          confidence: 95,
          metadata: {
            chapterNumber: chapterNum,
            moduleNumber: chapterCards[0]?.moduleNumber
          },
          relatedActions: [
            {
              label: 'Study Chapter',
              icon: <Book className="w-4 h-4" />,
              action: () => setActiveTab('study'),
              priority: 'high'
            },
            {
              label: 'Chapter Flashcards',
              icon: <Brain className="w-4 h-4" />,
              action: () => setActiveTab('flashcards'),
              priority: 'high'
            },
            {
              label: 'Practice Quiz',
              icon: <TrendingUp className="w-4 h-4" />,
              action: () => setActiveTab('quiz'),
              priority: 'medium'
            }
          ]
        };
      }
    }

    // Module-specific queries
    const moduleMatch = lowerQuery.match(/module\s*(\d+)/);
    if (moduleMatch) {
      const moduleNum = parseInt(moduleMatch[1]);
      if (moduleNum >= 1 && moduleNum <= 14) {
        // const moduleCards = getFlashcardsByModule(moduleNum);
        const moduleCards = [];
        const moduleChapters = [];

        return {
          id: Date.now().toString(),
          type: 'bot',
          content: `📖 **Module ${moduleNum} Overview**

This module contains ${moduleChapters.length} chapters with ${moduleCards.length} total study cards:
${moduleChapters.map(ch => `• Chapter ${ch}`).join('\n')}

*Which chapter would you like to focus on first?*`,
          timestamp: new Date(),
          category: 'study',
          confidence: 90,
          metadata: {
            moduleNumber: moduleNum
          },
          relatedActions: [
            {
              label: 'Module Study Plan',
              icon: <MapPin className="w-4 h-4" />,
              action: () => setActiveTab('study'),
              priority: 'high'
            },
            {
              label: 'Module Flashcards',
              icon: <Brain className="w-4 h-4" />,
              action: () => setActiveTab('flashcards'),
              priority: 'medium'
            }
          ]
        };
      }
    }

    // Enhanced medication queries
    for (const med of emsFormulary) {
      const medMatches = [
        med.name.toLowerCase(),
        med.genericName?.toLowerCase(),
        ...(med.name.toLowerCase() === 'epinephrine' ? ['epi', 'adrenaline'] : []),
        ...(med.name.toLowerCase().includes('naloxone') ? ['narcan'] : []),
        ...(med.name.toLowerCase().includes('albuterol') ? ['proventil', 'ventolin'] : [])
      ].filter(Boolean);

      if (medMatches.some(medName => keywords.some(keyword => medName?.includes(keyword)))) {
        return {
          id: Date.now().toString(),
          type: 'bot',
          content: `💊 **${med.name}** ${med.genericName ? `(${med.genericName})` : ''}

**📋 Primary Use:**
${med.indication}

**👨‍⚕️ Adult Dose:** ${med.adultDose}
**👶 Pediatric Dose:** ${med.pediatricDose}

**⚠️ Contraindications:**
${med.contraindications.map((contra: string) => `• ${contra}`).join('\n')}

${med.warnings ? `**🚨 Critical Warnings:**\n${med.warnings.map((warn: string) => `• ${warn}`).join('\n')}` : ''}

*Always verify dosing with local protocols and medical control.*`,
          timestamp: new Date(),
          category: 'medication',
          confidence: 95,
          source: 'EMT-B Formulary Database',
          relatedActions: [
            {
              label: 'Drug Calculator',
              icon: <Pill className="w-4 h-4" />,
              action: () => setActiveTab('medications'),
              priority: 'high'
            },
            {
              label: 'AR Visualization',
              icon: <Stethoscope className="w-4 h-4" />,
              action: () => setActiveTab('ar-visualization'),
              priority: 'medium'
            },
            {
              label: 'Related Scenarios',
              icon: <AlertTriangle className="w-4 h-4" />,
              action: () => setActiveTab('scenarios'),
              priority: 'medium'
            }
          ]
        };
      }
    }

    // Enhanced protocol queries with confidence scoring
    const protocolKeywords = [
      { terms: ['cardiac arrest', 'cpr', 'asystole', 'vfib'], confidence: 95 },
      { terms: ['chest pain', 'heart attack', 'mi', 'myocardial'], confidence: 90 },
      { terms: ['stroke', 'cva', 'fast', 'neurologic'], confidence: 90 },
      { terms: ['airway', 'intubation', 'bvm', 'obstruction'], confidence: 85 },
      { terms: ['respiratory', 'breathing', 'dyspnea', 'asthma'], confidence: 85 },
      { terms: ['trauma', 'bleeding', 'hemorrhage', 'shock'], confidence: 90 },
      { terms: ['anaphylaxis', 'allergic reaction', 'epipen'], confidence: 95 },
      { terms: ['overdose', 'poisoning', 'toxicology'], confidence: 85 },
      { terms: ['seizure', 'convulsion', 'epilepsy'], confidence: 90 }
    ];

    for (const protocolGroup of protocolKeywords) {
      if (protocolGroup.terms.some(term => lowerQuery.includes(term))) {
        const matchingProtocol = emsProtocols.find(p => 
          protocolGroup.terms.some(term => 
            p.name.toLowerCase().includes(term) || 
            p.indications.some(indication => indication.toLowerCase().includes(term)) ||
            p.category.toLowerCase().includes(term)
          )
        );
        
        if (matchingProtocol) {
          return {
            id: Date.now().toString(),
            type: 'bot',
            content: `🚨 **${matchingProtocol.name}**

**📊 Category:** ${matchingProtocol.category}
**👨‍⚕️ Certification Level:** ${matchingProtocol.certificationLevel}
**⏱️ Time Critical:** ${protocolGroup.confidence > 90 ? 'HIGH PRIORITY' : 'Standard'}

**🎯 Indications:**
${matchingProtocol.indications.map(indication => `• ${indication}`).join('\n')}

**📖 Assessment:**
${matchingProtocol.assessment.map(step => `• ${step}`).join('\n')}

**🔄 Interventions:**
${matchingProtocol.interventions.slice(0, 4).map(intervention => `• ${intervention}`).join('\n')}

**📍 Source:** EMT-B Protocol Database`,
            timestamp: new Date(),
            category: 'protocol',
            confidence: protocolGroup.confidence,
            source: 'Platform Protocol Database',
            relatedActions: [
              {
                label: 'Full Protocol',
                icon: <Book className="w-4 h-4" />,
                action: () => setActiveTab('protocols'),
                priority: 'high'
              },
              {
                label: 'Practice Scenario',
                icon: <AlertTriangle className="w-4 h-4" />,
                action: () => setActiveTab('scenarios'),
                priority: 'high'
              },
              {
                label: 'Related Medications',
                icon: <Pill className="w-4 h-4" />,
                action: () => setActiveTab('medications'),
                priority: 'medium'
              }
            ]
          };
        }
      }
    }

    // Study and learning assistance
    if (lowerQuery.includes('study') || lowerQuery.includes('learn') || lowerQuery.includes('practice') || lowerQuery.includes('quiz')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `🎓 **EMT-B Study Resources**

**📚 Available Content:**
• **41 Study Chapters** - Complete EMT-B curriculum
• **615+ Flashcards** - 15 cards per chapter
• **10 Modules** - Organized learning progression
• **Interactive Scenarios** - Real-world practice

**🎯 Study Recommendations:**
${learningContext.strugglingTopics.length > 0 
  ? `• Focus on: ${learningContext.strugglingTopics.slice(0, 3).join(', ')}`
  : '• Start with Module 1: Preparatory'
}
• Practice with ${learningContext.difficultyLevel} level content
• Review completed topics regularly

**📈 Your Progress:**
• Completed: ${learningContext.completedTopics.length} topics
• Current Level: ${learningContext.difficultyLevel}

*Which study area interests you most?*`,
        timestamp: new Date(),
        category: 'study',
        confidence: 85,
        relatedActions: [
          {
            label: 'Personalized Study Plan',
            icon: <MapPin className="w-4 h-4" />,
            action: () => setActiveTab('study'),
            priority: 'high'
          },
          {
            label: 'Chapter Flashcards',
            icon: <Brain className="w-4 h-4" />,
            action: () => setActiveTab('flashcards'),
            priority: 'high'
          },
          {
            label: 'Practice Scenarios',
            icon: <AlertTriangle className="w-4 h-4" />,
            action: () => setActiveTab('scenarios'),
            priority: 'medium'
          },
          {
            label: 'Progress Tracking',
            icon: <TrendingUp className="w-4 h-4" />,
            action: () => setActiveTab('progress'),
            priority: 'low'
          }
        ]
      };
    }

    // Assessment and vital signs
    if (keywords.some(k => ['assessment', 'vital', 'gcs', 'glasgow', 'apgar', 'pain'].includes(k))) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `📊 **Clinical Assessment Tools**

**🧠 Neurological Assessment:**
• **Glasgow Coma Scale (GCS)**: Eye (4) + Verbal (5) + Motor (6) = 3-15
• **FAST Stroke Assessment**: Face, Arms, Speech, Time
• **Pupil Assessment**: Size, reactivity, symmetry

**💓 Vital Signs (Adult Normal Ranges):**
• **Heart Rate**: 60-100 bpm
• **Blood Pressure**: <120/80 mmHg
• **Respirations**: 12-20/min
• **SpO2**: >95%
• **Temperature**: 98.6°F (37°C)

**⚡ Critical Values:**
• GCS <8: Severe brain injury
• SBP <90: Hypotension
• HR >150 or <50: Abnormal
• RR >30 or <8: Respiratory distress

*Need help with a specific assessment?*`,
        timestamp: new Date(),
        category: 'assessment',
        confidence: 90,
        relatedActions: [
          {
            label: 'Assessment Tools',
            icon: <Stethoscope className="w-4 h-4" />,
            action: () => setActiveTab('calculators'),
            priority: 'high'
          },
          {
            label: 'Practice Scenarios',
            icon: <AlertTriangle className="w-4 h-4" />,
            action: () => setActiveTab('scenarios'),
            priority: 'medium'
          }
        ]
      };
    }

    // Contextual help based on current page
    if (currentContext?.page && keywords.includes('help')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `🔧 **Help for ${currentContext.page}**

I can see you're currently on the ${currentContext.page} section. Here's how I can help:

• **Ask specific questions** about content you're viewing
• **Request explanations** for complex topics
• **Get practice scenarios** related to this section
• **Find related study materials** in other modules

*What specific aspect would you like help with?*`,
        timestamp: new Date(),
        category: 'general',
        confidence: 80,
        relatedActions: [
          {
            label: 'Related Content',
            icon: <Book className="w-4 h-4" />,
            action: () => setActiveTab('study'),
            priority: 'medium'
          }
        ]
      };
    }

    // Default intelligent response
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: `🤔 I'm here to help with your EMT-B studies! I can assist with:

**💊 Medications** - "Tell me about epinephrine"
**📋 Protocols** - "Chest pain protocol"  
**📚 Study Content** - "Chapter 5" or "Module 2"
**🧠 Assessments** - "GCS scale" or "vital signs"
**🎯 Practice** - "Quiz me" or "practice scenarios"

**💡 Smart Tips:**
• Be specific with your questions
• Ask about chapter numbers (1-41)
• Request practice scenarios for hands-on learning

*Try asking: "What's in Chapter 12?" or "Quiz me on medications"*`,
      timestamp: new Date(),
      category: 'general',
      confidence: 70,
      relatedActions: [
        {
          label: 'Browse Study Chapters',
          icon: <Book className="w-4 h-4" />,
          action: () => setActiveTab('study'),
          priority: 'high'
        },
        {
          label: 'Start Flashcards',
          icon: <Brain className="w-4 h-4" />,
          action: () => setActiveTab('flashcards'),
          priority: 'high'
        },
        {
          label: 'View Protocols',
          icon: <AlertTriangle className="w-4 h-4" />,
          action: () => setActiveTab('protocols'),
          priority: 'medium'
        }
      ]
    };
  }, [currentContext, learningContext]);

  const handleSendMessage = useCallback((messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing time with realistic delay
    setTimeout(() => {
      const botResponse = processQuery(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 1000 + 500); // 500-1500ms delay
  }, [input, processQuery]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      addSystemMessage('🎙️ Speech recognition not supported. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Speech recognition error:', error);
        addSystemMessage('🎙️ Unable to start voice recognition. Please check microphone permissions.');
      }
    }
  };

  const quickActions = [
    { label: 'Study Chapter', query: 'study chapter 1', icon: <Book className="w-3 h-3" /> },
    { label: 'Medications', query: 'medication dosing', icon: <Pill className="w-3 h-3" /> },
    { label: 'Protocols', query: 'emergency protocols', icon: <Heart className="w-3 h-3" /> },
    { label: 'Quiz Me', query: 'quiz me on basics', icon: <Brain className="w-3 h-3" /> }
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
          title="EMT-B AI Study Companion"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </button>
        
        {/* Floating hint */}
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          AI Study Assistant Ready
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50 overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">EMT-B AI Assistant</h3>
            <p className="text-xs text-red-100 opacity-90">Smart Study Companion</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 hover:bg-red-700/50 rounded-lg transition-colors"
          title="Close Assistant"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(action.query);
                setTimeout(() => handleSendMessage(action.query), 100);
              }}
              className="flex items-center space-x-2 px-3 py-2 text-xs bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:shadow-sm"
            >
              {action.icon}
              <span className="font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-sm'
                  : message.type === 'system'
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Message header for bot messages */}
              {message.type === 'bot' && (
                <div className="flex items-center justify-between mb-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Bot className="w-3 h-3" />
                    <span>{message.category}</span>
                  </div>
                  {message.confidence && (
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{message.confidence}%</span>
                    </div>
                  )}
                </div>
              )}

              <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
              
              {/* Enhanced action buttons */}
              {message.relatedActions && (
                <div className="mt-3 space-y-2">
                  {message.relatedActions
                    .sort((a, b) => {
                      const priorityOrder = { high: 0, medium: 1, low: 2 };
                      return (priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium']);
                    })
                    .map((action, idx) => (
                      <button
                        key={idx}
                        onClick={action.action}
                        className={`flex items-center space-x-2 text-left text-xs px-3 py-2 rounded-lg transition-all duration-200 w-full ${
                          action.priority === 'high'
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                            : action.priority === 'medium'  
                            ? 'bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-200'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {action.icon}
                        <span className="font-medium">{action.label}</span>
                      </button>
                    ))}
                </div>
              )}
              
              {/* Message metadata */}
              {message.source && (
                <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 italic">
                  📊 {message.source}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Listening indicator */}
        {isListening && (
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50 text-red-800 dark:text-red-200 rounded-lg px-4 py-3 text-sm flex items-center space-x-3 shadow-sm">
              <div className="relative">
                <Mic className="w-4 h-4 animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-red-500 opacity-25 animate-ping"></div>
              </div>
              <span className="font-medium">Listening... Speak clearly</span>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-2">
              <Bot className="w-4 h-4 text-gray-400" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleVoiceInput}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              isListening 
                ? 'bg-red-600 text-white shadow-lg animate-pulse' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md'
            }`}
            title={isListening ? 'Listening... Click to stop' : 'Voice input (click to start)'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
            placeholder={isListening ? "Listening..." : "Ask about chapters, medications, protocols..."}
            className={`flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm transition-all duration-200 ${
              isListening ? 'bg-red-50 dark:bg-red-900/20 border-red-300' : ''
            }`}
            disabled={isListening}
          />
          
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isListening}
            className="p-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}




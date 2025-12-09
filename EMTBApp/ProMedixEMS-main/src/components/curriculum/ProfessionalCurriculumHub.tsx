import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Clock,
  CheckCircle,
  PlayCircle,
  BookOpen,
  BarChart3,
  Users,
  Star,
  ArrowRight,
  TestTube,
  Heart,
  Shield,
  Truck,
  AlertTriangle,
  Cpu
} from 'lucide-react';

interface ProfessionalCurriculumHubProps {
  isDarkMode?: boolean;
}

const ProfessionalCurriculumHub: React.FC<ProfessionalCurriculumHubProps> = ({ isDarkMode = false }) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // Professional Curriculum Modules matching your excellent content
  const curriculumModules = [
    {
      id: 'module-1',
      title: 'Foundations of EMS Practice',
      shortTitle: 'EMS Foundations',
      description: 'Master the fundamental principles of emergency medical services, including system operations, safety protocols, legal frameworks, and communication standards.',
      icon: Shield,
      color: 'blue',
      duration: '4 weeks',
      chapters: [
        'Ch 1: EMS Ecosystem Essentials',
        'Ch 2: Safety Protocols for Responders', 
        'Ch 3: Legal Frameworks in Emergency Care',
        'Ch 4: Documentation & Field Reporting'
      ],
      competencies: ['System Navigation', 'Safety Protocols', 'Legal Compliance', 'Professional Communication'],
      assessments: 3,
      practicals: 2,
      difficulty: 'Fundamental',
      prerequisite: 'None',
      route: '/emtb/study-notes'
    },
    {
      id: 'module-2',
      title: 'Clinical Foundations',
      shortTitle: 'Clinical Basics',
      description: 'Build essential clinical knowledge including medical terminology, anatomy, patient development, and interprofessional teamwork.',
      icon: BookOpen,
      color: 'green',
      duration: '5 weeks',
      chapters: [
        'Ch 5: Essential Terminology for Responders',
        'Ch 6: Body Systems for Emergency Care',
        'Ch 7: Lifespan Considerations in EMS',
        'Ch 8: Safe Transport Techniques',
        'Ch 9: Healthcare Team Dynamics'
      ],
      competencies: ['Medical Terminology', 'Anatomical Knowledge', 'Lifespan Development', 'Team Collaboration'],
      assessments: 4,
      practicals: 3,
      difficulty: 'Fundamental',
      prerequisite: 'Module 1',
      route: '/emtb/study-notes'
    },
    {
      id: 'module-3',
      title: 'Patient Assessment Mastery',
      shortTitle: 'Assessment',
      description: 'Develop comprehensive patient evaluation skills through systematic assessment protocols and clinical reasoning.',
      icon: Users,
      color: 'purple',
      duration: '3 weeks',
      chapters: ['Ch 10: Comprehensive Patient Assessment'],
      competencies: ['Primary Assessment', 'Secondary Assessment', 'Clinical Reasoning', 'Documentation'],
      assessments: 2,
      practicals: 4,
      difficulty: 'Intermediate',
      prerequisite: 'Module 2',
      route: '/emtb/study-notes'
    },
    {
      id: 'module-4',
      title: 'Airway & Ventilatory Management',
      shortTitle: 'Airway Management',
      description: 'Master advanced airway management techniques and ventilatory support for critically ill patients.',
      icon: TestTube,
      color: 'red',
      duration: '4 weeks',
      chapters: ['Ch 11: Airway Management Techniques'],
      competencies: ['Airway Assessment', 'Basic Airways', 'Advanced Airways', 'Ventilatory Support'],
      assessments: 3,
      practicals: 5,
      difficulty: 'Advanced',
      prerequisite: 'Module 3',
      route: '/emtb/study-notes'
    }
  ];

  const getDifficultyColor = (difficulty: string, isDark: boolean) => {
    const colors = {
      'Fundamental': isDark ? 'text-green-400 bg-green-900/20' : 'text-green-700 bg-green-100',
      'Intermediate': isDark ? 'text-yellow-400 bg-yellow-900/20' : 'text-yellow-700 bg-yellow-100',
      'Advanced': isDark ? 'text-red-400 bg-red-900/20' : 'text-red-700 bg-red-100'
    };
    return colors[difficulty as keyof typeof colors];
  };

  const getModuleColor = (color: string, isDark: boolean) => {
    const colors = {
      blue: isDark ? 'from-blue-600 to-blue-800' : 'from-blue-500 to-blue-700',
      green: isDark ? 'from-green-600 to-green-800' : 'from-green-500 to-green-700',
      purple: isDark ? 'from-purple-600 to-purple-800' : 'from-purple-500 to-purple-700',
      red: isDark ? 'from-red-600 to-red-800' : 'from-red-500 to-red-700'
    };
    return colors[color as keyof typeof colors];
  };

  // Mock progress data (would come from user progress tracking)
  const userProgress = {
    completedModules: 1,
    currentModule: 'module-2',
    totalModules: 14,
    overallProgress: 15
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header Section */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Professional EMT-B Curriculum
              </h1>
              <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                14 Advanced Professional Modules • Evidence-Based Training • National Standards
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {userProgress.completedModules}/{userProgress.totalModules}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Modules Complete
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {userProgress.overallProgress}%
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Overall Progress
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
                style={{ width: `${userProgress.overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Current Module Highlight */}
        <div className={`mb-8 p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Continue Learning
              </h2>
              <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Pick up where you left off
              </p>
            </div>
            <Link
              to="/emtb/study-notes"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <PlayCircle className="h-5 w-5" />
              <span>Continue Module 2</span>
            </Link>
          </div>
        </div>

        {/* Curriculum Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculumModules.map((module, index) => {
            const Icon = module.icon;
            const isCompleted = index < userProgress.completedModules;
            const isCurrent = module.id === userProgress.currentModule;
            const isLocked = index > userProgress.completedModules;

            return (
              <div
                key={module.id}
                className={`relative rounded-xl border transition-all duration-200 hover:shadow-lg ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } ${isCompleted ? 'ring-2 ring-green-500' : ''} ${isCurrent ? 'ring-2 ring-blue-500' : ''}`}
              >
                {/* Module Header */}
                <div className={`h-32 rounded-t-xl bg-gradient-to-br ${getModuleColor(module.color, isDarkMode)} p-6 relative overflow-hidden`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <Icon className="h-8 w-8 text-white mb-2" />
                      <h3 className="text-lg font-semibold text-white">
                        Module {index + 1}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {module.shortTitle}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      {isCompleted && (
                        <CheckCircle className="h-6 w-6 text-white" />
                      )}
                      {isCurrent && (
                        <div className="h-3 w-3 bg-white rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty, false)}`}>
                      {module.difficulty}
                    </span>
                  </div>
                </div>

                {/* Module Content */}
                <div className="p-6">
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {module.title}
                  </h4>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {module.description}
                  </p>

                  {/* Module Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {module.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {module.chapters.length} Chapters
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {module.assessments} Assessments
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {module.practicals} Practicals
                      </span>
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div className="mb-4">
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Prerequisite: {module.prerequisite}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={isLocked ? '#' : module.route}
                    className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                      isLocked
                        ? isDarkMode
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : isCompleted
                        ? isDarkMode
                          ? 'bg-green-700 hover:bg-green-600 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                        : isCurrent
                        ? isDarkMode
                          ? 'bg-blue-700 hover:bg-blue-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    }`}
                    onClick={(e) => isLocked && e.preventDefault()}
                  >
                    {isLocked ? (
                      <>
                        <Shield className="h-4 w-4" />
                        <span>Locked</span>
                      </>
                    ) : isCompleted ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span>Review</span>
                      </>
                    ) : isCurrent ? (
                      <>
                        <PlayCircle className="h-4 w-4" />
                        <span>Continue</span>
                      </>
                    ) : (
                      <>
                        <ArrowRight className="h-4 w-4" />
                        <span>Start Module</span>
                      </>
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <GraduationCap className={`h-8 w-8 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Evidence-Based Learning
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Curriculum based on current national standards and best practices in emergency medical services.
            </p>
          </div>

          <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <BarChart3 className={`h-8 w-8 mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Progress Tracking
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Advanced analytics track your learning progress and identify areas for improvement.
            </p>
          </div>

          <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <Star className={`h-8 w-8 mb-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Professional Certification
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Complete modules lead to professional certification and continuing education credits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCurriculumHub;

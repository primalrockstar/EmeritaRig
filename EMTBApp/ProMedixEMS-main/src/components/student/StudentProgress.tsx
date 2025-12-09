import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { 
  BookOpen, CheckCircle, Clock, Lock, Unlock, Play, 
  Brain, FileText, Target, TrendingUp, Award, ChevronRight 
} from 'lucide-react';

interface StudentModule {
  id: number;
  title: string;
  description: string;
  chaptersTotal: number;
  chaptersCompleted: number;
  isUnlocked: boolean;
  estimatedHours: number;
  lastAccessed?: string;
}

const StudentProgress: React.FC = () => {
  const { user } = useAuth();
  const [studentModules] = useState<StudentModule[]>([
    {
      id: 1,
      title: "Foundations of EMS Practice",
      description: "Core EMS principles and professional foundations",
      chaptersTotal: 4,
      chaptersCompleted: 3,
      isUnlocked: true,
      estimatedHours: 6,
      lastAccessed: "2 hours ago"
    },
    {
      id: 2,
      title: "Medical Foundations & Assessment", 
      description: "Human anatomy, medical terminology, and patient assessment",
      chaptersTotal: 4,
      chaptersCompleted: 2,
      isUnlocked: true,
      estimatedHours: 8,
      lastAccessed: "1 day ago"
    },
    {
      id: 3,
      title: "Team Communication & Patient Assessment",
      description: "Communication skills and systematic patient evaluation", 
      chaptersTotal: 4,
      chaptersCompleted: 1,
      isUnlocked: true,
      estimatedHours: 7,
      lastAccessed: "3 days ago"
    },
    {
      id: 4,
      title: "Medical Emergencies & Critical Care",
      description: "Emergency medicine principles and critical interventions",
      chaptersTotal: 4,
      chaptersCompleted: 0,
      isUnlocked: false,
      estimatedHours: 9
    },
    {
      id: 5,
      title: "Cardiovascular & Respiratory Care",
      description: "Heart and lung emergency management",
      chaptersTotal: 4,
      chaptersCompleted: 0,
      isUnlocked: false,
      estimatedHours: 8
    }
  ]);

  const totalChapters = studentModules.reduce((sum, module) => sum + module.chaptersTotal, 0);
  const completedChapters = studentModules.reduce((sum, module) => sum + module.chaptersCompleted, 0);
  const overallProgress = Math.round((completedChapters / totalChapters) * 100);

  const getModuleProgress = (module: StudentModule) => {
    return Math.round((module.chaptersCompleted / module.chaptersTotal) * 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600 bg-green-100';
    if (progress >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-blue-600 bg-blue-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name || 'Student'}!
            </h1>
            <p className="text-blue-100">Continue your EMT-B training journey</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{overallProgress}%</div>
            <div className="text-blue-100 text-sm">Overall Progress</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-blue-100 mb-2">
            <span>Course Progress</span>
            <span>{completedChapters} of {totalChapters} chapters completed</span>
          </div>
          <div className="w-full bg-blue-500 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link 
          to="/emtb/study-notes"
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Study Notes</h3>
              <p className="text-sm text-gray-600">Access all 41 chapters</p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
          </div>
        </Link>

        <Link 
          to="/emtb/flashcards"
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Flashcards</h3>
              <p className="text-sm text-gray-600">Interactive study cards</p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
          </div>
        </Link>

        <Link 
          to="/emtb/calculators"
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
              <Target className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Calculators</h3>
              <p className="text-sm text-gray-600">Clinical tools</p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
          </div>
        </Link>
      </div>

      {/* Module Progress */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Your Modules</h2>
          <div className="text-sm text-gray-500">
            {studentModules.filter(m => m.isUnlocked).length} of {studentModules.length} unlocked
          </div>
        </div>

        <div className="space-y-4">
          {studentModules.map((module) => {
            const progress = getModuleProgress(module);
            
            return (
              <div
                key={module.id}
                className={`bg-white border rounded-lg p-6 transition-all ${
                  module.isUnlocked ? 'border-gray-200 hover:shadow-md' : 'border-gray-100 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-2 rounded-lg ${
                      module.isUnlocked ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {module.isUnlocked ? (
                        <Unlock className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Module {module.id}: {module.title}
                        </h3>
                        {module.isUnlocked && progress > 0 && (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getProgressColor(progress)}`}>
                            {progress}% complete
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{module.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {module.chaptersCompleted}/{module.chaptersTotal} chapters
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          ~{module.estimatedHours} hours
                        </div>
                        {module.lastAccessed && (
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Last accessed {module.lastAccessed}
                          </div>
                        )}
                      </div>
                      
                      {module.isUnlocked && (
                        <div className="mb-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {module.isUnlocked ? (
                      <Link
                        to="/emtb/study-notes"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {progress === 0 ? 'Start' : 'Continue'}
                      </Link>
                    ) : (
                      <div className="text-sm text-gray-500 text-center px-4 py-2">
                        <Lock className="h-4 w-4 mx-auto mb-1" />
                        Locked
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <Award className="h-5 w-5 text-yellow-600 mr-2" />
          <div>
            <h4 className="text-sm font-medium text-yellow-900">Keep up the great work!</h4>
            <p className="text-sm text-yellow-700">
              You've completed {completedChapters} chapters. Complete {Math.ceil(totalChapters * 0.7) - completedChapters} more to reach 70% progress milestone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;

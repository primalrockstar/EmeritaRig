import React, { useState } from 'react';
import { BookOpen, Users, Clock, CheckCircle, Lock, Unlock } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

interface Module {
  id: number;
  title: string;
  description: string;
  chaptersCount: number;
  estimatedHours: number;
  isActive: boolean;
  completedStudents: number;
  totalStudents: number;
}

const ModuleManagement: React.FC = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Foundations of EMS Practice",
      description: "Core EMS principles and professional foundations",
      chaptersCount: 4,
      estimatedHours: 6,
      isActive: true,
      completedStudents: 15,
      totalStudents: 25
    },
    {
      id: 2,
      title: "Medical Foundations & Assessment",
      description: "Human anatomy, medical terminology, and patient assessment",
      chaptersCount: 4,
      estimatedHours: 8,
      isActive: true,
      completedStudents: 12,
      totalStudents: 25
    },
    {
      id: 3,
      title: "Team Communication & Patient Assessment",
      description: "Communication skills and systematic patient evaluation",
      chaptersCount: 4,
      estimatedHours: 7,
      isActive: true,
      completedStudents: 10,
      totalStudents: 25
    },
    {
      id: 4,
      title: "Medical Emergencies & Critical Care",
      description: "Emergency medicine principles and critical interventions",
      chaptersCount: 4,
      estimatedHours: 9,
      isActive: false,
      completedStudents: 0,
      totalStudents: 25
    },
    {
      id: 5,
      title: "Cardiovascular & Respiratory Care",
      description: "Heart and lung emergency management",
      chaptersCount: 4,
      estimatedHours: 8,
      isActive: false,
      completedStudents: 0,
      totalStudents: 25
    },
    {
      id: 6,
      title: "Pediatric & Special Population Care",
      description: "Specialized care for children and vulnerable populations",
      chaptersCount: 5,
      estimatedHours: 10,
      isActive: false,
      completedStudents: 0,
      totalStudents: 25
    },
    {
      id: 7,
      title: "Trauma & Emergency Care",
      description: "Trauma assessment and emergency interventions",
      chaptersCount: 5,
      estimatedHours: 12,
      isActive: false,
      completedStudents: 0,
      totalStudents: 25
    }
  ]);

  const toggleModuleAccess = (moduleId: number) => {
    if (user?.role !== 'instructor' && user?.role !== 'admin') return;
    
    setModules(modules.map(module =>
      module.id === moduleId ? { ...module, isActive: !module.isActive } : module
    ));
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const canManageModules = user?.role === 'instructor' || user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Module Management</h2>
          <p className="text-gray-600 mt-1">
            {canManageModules 
              ? "Control student access to curriculum modules and track progress" 
              : "View available curriculum modules and progress"
            }
          </p>
        </div>
        {canManageModules && (
          <div className="text-sm text-gray-500">
            Total Modules: {modules.length} | Active: {modules.filter(m => m.isActive).length}
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className={`bg-white border rounded-lg p-6 transition-all duration-200 ${
              module.isActive ? 'border-green-200 shadow-sm' : 'border-gray-200 opacity-75'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className={`p-2 rounded-lg ${module.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <BookOpen className={`h-6 w-6 ${module.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Module {module.id}: {module.title}
                    </h3>
                    {module.isActive ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Unlock className="h-3 w-3 mr-1" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        <Lock className="h-3 w-3 mr-1" />
                        Locked
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mt-1">{module.description}</p>
                  
                  <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {module.chaptersCount} chapters
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      ~{module.estimatedHours} hours
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {module.completedStudents}/{module.totalStudents} completed
                    </div>
                  </div>
                  
                  {module.isActive && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Student Progress</span>
                        <span className="font-medium">{getProgressPercentage(module.completedStudents, module.totalStudents)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(module.completedStudents, module.totalStudents)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {canManageModules && (
                <button
                  onClick={() => toggleModuleAccess(module.id)}
                  className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    module.isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {module.isActive ? 'Lock Module' : 'Unlock Module'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">Curriculum Status</h4>
            <p className="text-sm text-blue-700">
              Your EMT-B curriculum includes 14 comprehensive modules with 41 detailed chapters plus bonus content. 
              Students can access study materials through the enhanced study notes interface with interactive flashcards, 
              clinical pearls, and assessment tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleManagement;

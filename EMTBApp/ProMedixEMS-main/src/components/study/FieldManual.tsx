import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { studyModules, chapters } from '../../data/curriculum';
import { mockStudyContent } from '../../data/mockStudyContent';
import { ChevronRight, ChevronDown, BookOpen, Star, AlertTriangle } from 'lucide-react';
import TacticalLayout from '../../layouts/TacticalLayout';

const FieldManual: React.FC = () => {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const [selectedModule, setSelectedModule] = useState<any>(null);

  const regularModules = studyModules.filter(module => !module.isBonus);
  const bonusModules = studyModules.filter(module => module.isBonus);

  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const selectModule = (module: any) => {
    setSelectedModule(module);
  };

  return (
    <TacticalLayout>
      <div className="min-h-screen bg-slate-900">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
            {/* Navigation Panel */}
            <div className="lg:col-span-1 bg-slate-800/50 border border-amber-500/20 rounded-lg p-4 overflow-y-auto">
              <h2 className="text-lg font-bold text-amber-400 mb-4 uppercase tracking-wider">
                Mission Modules
              </h2>

              {/* Regular Modules */}
              <div className="space-y-2 mb-6">
                {regularModules.map((module) => (
                  <div key={module.id} className="border border-slate-700 rounded">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <div>
                          <div className="text-sm font-medium text-slate-200">{module.title}</div>
                          <div className="text-xs text-slate-400">{module.chapters.length} chapters</div>
                        </div>
                      </div>
                      {expandedModules.has(module.id) ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {expandedModules.has(module.id) && (
                      <div className="border-t border-slate-700">
                        {chapters.filter(chapter => chapter.moduleId === module.id).map((chapter) => (
                          <Link
                            key={chapter.id}
                            to={`/study/field-manual/${module.id}/${chapter.id}`}
                            className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/30 hover:text-amber-400 transition-colors border-l-2 border-transparent hover:border-amber-500"
                          >
                            {chapter.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bonus Modules */}
              {bonusModules.length > 0 && (
                <div className="border-t border-amber-500/30 pt-4">
                  <h3 className="text-sm font-bold text-amber-400 mb-3 uppercase tracking-wider flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Bonus Modules
                  </h3>
                  <div className="space-y-2">
                    {bonusModules.map((module) => (
                      <div key={module.id} className="border border-amber-500/30 rounded bg-amber-500/5">
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-amber-500/10 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <Star className="w-4 h-4 text-amber-400" />
                            <div>
                              <div className="text-sm font-medium text-amber-200">{module.title.replace('Bonus Module: ', '')}</div>
                              <div className="text-xs text-amber-400/70">{module.chapters.length} topics</div>
                            </div>
                          </div>
                          {expandedModules.has(module.id) ? (
                            <ChevronDown className="w-4 h-4 text-amber-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-amber-400" />
                          )}
                        </button>

                        {expandedModules.has(module.id) && (
                          <div className="border-t border-amber-500/20">
                            {chapters.filter(chapter => chapter.moduleId === module.id).map((chapter) => (
                              <Link
                                key={chapter.id}
                                to={`/study/field-manual/${module.id}/${chapter.id}`}
                                className="block px-4 py-2 text-sm text-amber-200 hover:bg-amber-500/20 hover:text-amber-100 transition-colors border-l-2 border-transparent hover:border-amber-400"
                              >
                                {chapter.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-2 bg-slate-800/50 border border-amber-500/20 rounded-lg p-6 overflow-y-auto">
              {selectedModule ? (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold text-amber-400 mb-2">{selectedModule.title}</h1>
                    <p className="text-slate-300 leading-relaxed">{selectedModule.description}</p>
                  </div>

                  {selectedModule.isBonus && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-medium text-amber-200 mb-1">Advanced Content Warning</h3>
                          <p className="text-xs text-amber-300">
                            This module contains material that exceeds standard EMT-B curriculum scope.
                            Content is provided for educational enhancement and NREMT preparation only.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-slate-200">Chapters in this Module:</h3>
                      <div className="grid gap-2">
                        {chapters.filter(chapter => chapter.moduleId === selectedModule.id).map((chapter, index) => (
                          <Link
                            key={chapter.id}
                            to={`/study/field-manual/${module.id}/${chapter.id}`}
                            className="flex items-center justify-between p-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg hover:border-amber-500/50 transition-colors group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded flex items-center justify-center text-sm font-medium text-amber-400">
                                {index + 1}
                              </div>
                              <span className="text-slate-200 group-hover:text-amber-400 transition-colors">
                                {chapter.title}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Study Content Preview */}
                    {selectedModule.id === 1 && mockStudyContent.foundationsModule && (
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                        <h4 className="text-xl font-bold text-amber-400 mb-4">Study Content Preview</h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-lg font-semibold text-slate-200 mb-2">EMS System Fundamentals</h5>
                            <div className="text-sm text-slate-300 space-y-2">
                              <p><strong>Objectives:</strong> Describe components and functions of EMS system, explain EMT roles, understand quality improvement</p>
                              <p><strong>Key Concepts:</strong> Public access systems, communication networks, clinical care continuum, healthcare integration</p>
                              <p><strong>Clinical Pearl:</strong> The EMS system is only as strong as its weakest link - all components must function effectively</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <Link
                      to={`/study/field-manual/${selectedModule.id}/${chapters.find(chapter => chapter.moduleId === selectedModule.id)?.id}`}
                      className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      OPEN MODULE
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Study Notes Overview */}
                  <div className="text-center space-y-4 pb-6 border-b border-slate-700">
                    <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto">
                      <BookOpen className="w-8 h-8 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-amber-400 mb-2">EMT-B Study Notes</h2>
                      <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Comprehensive study materials organized by module following the National EMS Education Standards.
                        Select any module from the navigation panel to explore detailed content, clinical pearls, and study guides.
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 text-center">
                      <div className="text-2xl font-bold text-amber-400">{regularModules.length + bonusModules.length}</div>
                      <div className="text-sm text-slate-300">Total Modules</div>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 text-center">
                      <div className="text-2xl font-bold text-amber-400">{chapters.length}</div>
                      <div className="text-sm text-slate-300">Study Chapters</div>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 text-center">
                      <div className="text-2xl font-bold text-amber-400">45+</div>
                      <div className="text-sm text-slate-300">Hours Content</div>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 text-center">
                      <div className="text-2xl font-bold text-amber-400">NREMT</div>
                      <div className="text-sm text-slate-300">Aligned</div>
                    </div>
                  </div>

                  {/* Module Overview */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-200">Available Study Modules</h3>
                    <div className="grid gap-3">
                      {regularModules.slice(0, 6).map((module) => (
                        <div
                          key={module.id}
                          onClick={() => selectModule(module)}
                          className="bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600 hover:border-amber-500/50 rounded-lg p-4 cursor-pointer transition-all duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/30 rounded flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-amber-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-200">{module.title}</h4>
                                <p className="text-sm text-slate-400">{module.chapters.length} chapters • {module.estimatedHours} hours</p>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {bonusModules.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-slate-700">
                        <h4 className="text-lg font-semibold text-amber-400 mb-3 flex items-center">
                          <Star className="w-5 h-5 mr-2" />
                          Advanced Modules
                        </h4>
                        <div className="grid gap-3">
                          {bonusModules.map((module) => (
                            <div
                              key={module.id}
                              onClick={() => selectModule(module)}
                              className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400 rounded-lg p-4 cursor-pointer transition-all duration-200"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-amber-500/20 border border-amber-400 rounded flex items-center justify-center">
                                    <Star className="w-5 h-5 text-amber-400" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-amber-200">{module.title}</h4>
                                    <p className="text-sm text-amber-400/70">{module.chapters.length} chapters • {module.estimatedHours} hours</p>
                                  </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-amber-400" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Getting Started Guide */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-300 mb-3">🚀 Getting Started</h3>
                    <div className="space-y-3 text-sm text-blue-200">
                      <p><strong>1. Choose a Module:</strong> Click on any module in the navigation panel or from the list above</p>
                      <p><strong>2. Explore Chapters:</strong> Each module contains detailed study chapters with clinical content</p>
                      <p><strong>3. Access Resources:</strong> Use the Flashcards and Quiz buttons to test your knowledge</p>
                      <p><strong>4. Track Progress:</strong> Complete chapters and monitor your learning journey</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TacticalLayout>
  );
};

export default FieldManual;
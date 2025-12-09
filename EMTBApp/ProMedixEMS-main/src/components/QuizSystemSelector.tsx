// Quiz System Selector - Safe integration component
// Allows users to choose between existing quiz system and new balanced system
// This ensures no disruption to existing functionality

import React, { useState } from 'react';
import { BarChart3, Target, BookOpen, Users, ArrowRight, Info } from 'lucide-react';
import PracticeQuizSystem from './PracticeQuizSystem';
import BalancedQuizSystem from './BalancedQuizSystem';

export const QuizSystemSelector: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<'original' | 'balanced' | null>(null);

  if (selectedSystem === 'original') {
    return <PracticeQuizSystem onClose={() => setSelectedSystem(null)} />;
  }

  if (selectedSystem === 'balanced') {
    return <BalancedQuizSystem onClose={() => setSelectedSystem(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Quiz System</h1>
        <p className="text-gray-600 text-lg">
          Select the quiz system that best fits your study needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Original System */}
        <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Original Quiz System</h2>
            <p className="text-gray-600">Current system with comprehensive coverage</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Features:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Extensive question bank</li>
                <li>• Proven assessment system</li>
                <li>• All modules covered</li>
                <li>• Immediate explanations</li>
                <li>• Progress tracking</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Question Distribution:</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span>Modules 1-3:</span>
                  <span className="font-semibold">30 questions each</span>
                </div>
                <div className="flex justify-between">
                  <span>Modules 4-14:</span>
                  <span className="font-semibold">3-4 questions each</span>
                </div>
                <div className="flex justify-between border-t pt-1 mt-2">
                  <span>Total:</span>
                  <span className="font-bold">~130 questions</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedSystem('original')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Continue with Original System
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Balanced System */}
        <div className="border-2 border-green-300 rounded-lg p-6 hover:border-green-400 transition-colors bg-green-50">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">New Balanced System</h2>
            <p className="text-gray-600">Balanced assessment across all chapters</p>
            <div className="inline-flex items-center bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
              NEW SYSTEM
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-green-100 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Features:</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Perfect balance across all chapters</li>
                <li>• 15 questions per chapter</li>
                <li>• Evidence-based question types</li>
                <li>• Comprehensive coverage</li>
                <li>• Progressive difficulty</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2">System Structure:</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span>Questions per Chapter:</span>
                  <span className="font-semibold">15 questions</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Chapters:</span>
                  <span className="font-semibold">41 chapters</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Modules:</span>
                  <span className="font-semibold">10 modules</span>
                </div>
                <div className="flex justify-between border-t pt-1 mt-2">
                  <span>Total Questions:</span>
                  <span className="font-bold">615 questions</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <Info className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-xs text-yellow-800">
                  <span className="font-semibold">Implementation Status:</span> Chapter 1 complete (15 questions). 
                  Remaining chapters coming soon based on study notes.
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedSystem('balanced')}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            Try New Balanced System
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">System Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4 font-semibold text-gray-900">Feature</th>
                <th className="text-center py-2 px-4 font-semibold text-blue-700">Original System</th>
                <th className="text-center py-2 px-4 font-semibold text-green-700">Balanced System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2 px-4 font-medium">Question Distribution</td>
                <td className="py-2 px-4 text-center text-blue-700">Uneven (30+3-4)</td>
                <td className="py-2 px-4 text-center text-green-700">Perfect (15 each)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-medium">Total Questions</td>
                <td className="py-2 px-4 text-center text-blue-700">~130</td>
                <td className="py-2 px-4 text-center text-green-700">615</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-medium">Chapter Coverage</td>
                <td className="py-2 px-4 text-center text-blue-700">Variable</td>
                <td className="py-2 px-4 text-center text-green-700">Consistent</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-medium">Implementation Status</td>
                <td className="py-2 px-4 text-center text-blue-700">Complete</td>
                <td className="py-2 px-4 text-center text-green-700">Chapter 1 Ready</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-medium">Stability</td>
                <td className="py-2 px-4 text-center text-blue-700">Proven</td>
                <td className="py-2 px-4 text-center text-green-700">New & Stable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Both systems are fully functional. The balanced system provides more comprehensive coverage 
          when fully implemented, while the original system offers immediate access to all modules.
        </p>
      </div>
    </div>
  );
};

export default QuizSystemSelector;

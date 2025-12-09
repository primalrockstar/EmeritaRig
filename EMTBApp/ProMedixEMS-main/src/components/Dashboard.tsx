import React from 'react';

interface DashboardProps {
  progress: any;
}

const Dashboard: React.FC<DashboardProps> = ({ progress }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">EMT-B Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your progress and continue learning</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Progress Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
            <div className="text-2xl font-bold text-blue-600">
              {progress?.completed || 0}%
            </div>
            <p className="text-gray-600">Modules Completed</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={() => window.location.href = '/modules'}
                className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                📚 Study Modules
              </button>
              <button 
                onClick={() => window.location.href = '/protocols'}
                className="w-full text-left px-3 py-2 text-green-600 hover:bg-green-50 rounded"
              >
                📋 Protocols
              </button>
              <button 
                onClick={() => window.location.href = '/tools'}
                className="w-full text-left px-3 py-2 text-purple-600 hover:bg-purple-50 rounded"
              >
                🛠️ Tools
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <p className="text-gray-600">Continue where you left off</p>
            <button 
              onClick={() => window.location.href = '/modules'}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

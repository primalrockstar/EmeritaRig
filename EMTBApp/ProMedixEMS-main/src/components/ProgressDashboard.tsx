import React, { useState, useEffect } from 'react';
import { 
  getProgress, 
  getStatistics, 
  exportProgress, 
  importProgress, 
  clearAllProgress 
} from '../utils/progressTracking';
import { Download, Upload, Trash2, TrendingUp, Award, Clock, Target } from 'lucide-react';

const ProgressDashboard: React.FC = () => {
  const [stats, setStats] = useState(getStatistics());
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportedData, setExportedData] = useState('');

  useEffect(() => {
    // Refresh stats every time component mounts
    setStats(getStatistics());
  }, []);

  const handleExport = () => {
    const data = exportProgress();
    setExportedData(data);
    setShowExportModal(true);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const jsonData = event.target?.result as string;
          if (importProgress(jsonData)) {
            alert('Progress imported successfully!');
            setStats(getStatistics());
          } else {
            alert('Failed to import progress. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearAll = () => {
    if (window.confirm('⚠️ Are you sure you want to clear ALL your progress? This cannot be undone!')) {
      if (window.confirm('This will delete all quiz scores, flashcard progress, PCR practices, and study time. Are you ABSOLUTELY sure?')) {
        clearAllProgress();
        setStats(getStatistics());
        alert('All progress has been cleared.');
      }
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111', marginBottom: '8px' }}>
            Your Progress Dashboard
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Track your learning journey and achievements
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          
          {/* Total Study Time */}
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                backgroundColor: '#dbeafe', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <Clock style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: '600' }}>
                  Total Study Time
                </div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#111' }}>
                  {formatTime(stats.totalStudyTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Performance */}
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                backgroundColor: '#d1fae5', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <Target style={{ width: '24px', height: '24px', color: '#10b981' }} />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: '600' }}>
                  Quiz Average
                </div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#111' }}>
                  {stats.averageQuizScore ? `${(stats.averageQuizScore * 100).toFixed(0)}%` : 'N/A'}
                </div>
                <div style={{ fontSize: '11px', color: '#999' }}>
                  {stats.totalQuizzesTaken} quizzes taken
                </div>
              </div>
            </div>
          </div>

          {/* Study Streak */}
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                backgroundColor: '#fef3c7', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <TrendingUp style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: '600' }}>
                  Study Streak
                </div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#111' }}>
                  {stats.streak} {stats.streak === 1 ? 'day' : 'days'}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                backgroundColor: '#ede9fe', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <Award style={{ width: '24px', height: '24px', color: '#8b5cf6' }} />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: '600' }}>
                  Achievements
                </div>
                <div style={{ fontSize: '14px', color: '#111', marginTop: '4px' }}>
                  <div>{stats.chaptersCompleted} chapters completed</div>
                  <div>{stats.flashcardsMastered} flashcards mastered</div>
                  <div>{stats.totalPCRPractices} PCR practices</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111', marginBottom: '16px' }}>
            Recent Activity
          </h2>
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stats.recentActivity.map((activity, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    padding: '12px', 
                    borderRadius: '8px', 
                    backgroundColor: '#f9fafb', 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: '600', color: '#111', textTransform: 'capitalize' }}>
                      {activity.type.replace('-', ' ')}
                    </span>
                    <span style={{ color: '#666', marginLeft: '12px', fontSize: '14px' }}>
                      {new Date(activity.date).toLocaleDateString()} at {new Date(activity.date).toLocaleTimeString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {formatTime(activity.duration)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#999', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
              No recent activity yet. Start learning to see your progress!
            </p>
          )}
        </div>

        {/* Data Management */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111', marginBottom: '16px' }}>
            Data Management
          </h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
            Your progress is automatically saved to your browser. You can export it for backup or import from a previous export.
          </p>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleExport}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #3b82f6',
                backgroundColor: 'white',
                color: '#3b82f6',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Download style={{ width: '16px', height: '16px' }} />
              Export Progress
            </button>
            
            <button
              onClick={handleImport}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #10b981',
                backgroundColor: 'white',
                color: '#10b981',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Upload style={{ width: '16px', height: '16px' }} />
              Import Progress
            </button>
            
            <button
              onClick={handleClearAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #ef4444',
                backgroundColor: 'white',
                color: '#ef4444',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Trash2 style={{ width: '16px', height: '16px' }} />
              Clear All Data
            </button>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowExportModal(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111', marginBottom: '16px' }}>
              Export Progress Data
            </h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
              Copy this data and save it to a file for backup. You can import it later.
            </p>
            <textarea
              value={exportedData}
              readOnly
              style={{
                width: '100%',
                height: '300px',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '12px',
                fontFamily: 'monospace',
                marginBottom: '16px'
              }}
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(exportedData);
                  alert('Copied to clipboard!');
                }}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #3b82f6',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  backgroundColor: 'white',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressDashboard;

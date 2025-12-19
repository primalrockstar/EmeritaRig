import React, { useState, useEffect } from 'react';

const TopStatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800 text-slate-300 font-mono text-xs">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="text-neon-500 font-bold">
          UNIT: RIG-1
        </div>
        <div className="text-center">
          SHIFT TIME: {formatTime(currentTime)}
        </div>
        <div className="text-green-400">
          NET: ONLINE
        </div>
      </div>
    </div>
  );
};

export default TopStatusBar;
import React from 'react';
import { Link } from 'react-router-dom';

interface DispatchTicketProps {
  id: string;
  type: 'Scenario' | 'Quiz';
  title: string;
  status: 'Pending' | 'Complete';
  priority: 'High' | 'Medium' | 'Low';
}

const DispatchTicket: React.FC<DispatchTicketProps> = ({ id, type, title, status, priority }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'border-red-500';
      case 'Medium': return 'border-amber-500';
      case 'Low': return 'border-green-500';
      default: return 'border-slate-600';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Complete' ? 'text-green-400' : 'text-amber-400';
  };

  return (
    <Link
      to={type === 'Scenario' ? '/scenarios' : '/enhanced-quiz'}
      className={`block border-l-4 ${getPriorityColor(priority)} bg-slate-900/50 hover:bg-slate-800/70 transition-colors p-4 rounded-md font-mono text-sm`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-neon-500 font-bold">#{id}</span>
        <span className={`text-xs ${getStatusColor(status)}`}>{status.toUpperCase()}</span>
      </div>
      <div className="text-slate-300 mb-1">{title}</div>
      <div className="text-xs text-slate-500">{type} • Priority: {priority}</div>
    </Link>
  );
};

export default DispatchTicket;
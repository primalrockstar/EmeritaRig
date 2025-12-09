import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ClipboardList, CheckSquare, Gamepad2, Users, Settings, BookOpen } from 'lucide-react';
import ModuleManagement from '../components/curriculum/ModuleManagement';

const TabButton: React.FC<{ id: string; active: string; setActive: (id: string) => void; icon: any; label: string; }>=({ id, active, setActive, icon: Icon, label }) => (
  <button onClick={() => setActive(id)} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${active === id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
    <Icon className="w-4 h-4" /> {label}
  </button>
);

const ListRow: React.FC<{ title: string; subtitle?: string; right?: React.ReactNode }>=({ title, subtitle, right }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-100">
    <div>
      <div className="font-medium text-gray-900">{title}</div>
      {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
    </div>
    <div>{right}</div>
  </div>
);

const InstructorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [active, setActive] = useState('quizzes');

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}, {user?.name}</h1>
          <div className="text-sm text-gray-500">Role: {user?.role}</div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/" className="px-3 py-2 rounded border">Go to Dashboard</Link>
          <button onClick={logout} className="px-3 py-2 rounded bg-gray-900 text-white">Sign out</button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 overflow-x-auto">
        <TabButton id="quizzes" active={active} setActive={setActive} icon={ClipboardList} label="Quizzes" />
        <TabButton id="tests" active={active} setActive={setActive} icon={CheckSquare} label="Tests" />
        <TabButton id="modules" active={active} setActive={setActive} icon={BookOpen} label="Modules" />
        <TabButton id="games" active={active} setActive={setActive} icon={Gamepad2} label="Games" />
        <TabButton id="roster" active={active} setActive={setActive} icon={Users} label="Class Roster" />
        <TabButton id="settings" active={active} setActive={setActive} icon={Settings} label="Settings" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {active === 'quizzes' && (
          <div>
            <ListRow title="EMT-B Chapter 1 Quiz" subtitle="15 questions â€¢ Last edited 2 days ago" right={<button className="px-3 py-1 rounded border">Manage</button>} />
            <ListRow title="Pharmacology Basics" subtitle="10 questions â€¢ Draft" right={<button className="px-3 py-1 rounded border">Manage</button>} />
            <div className="p-4"><button className="px-4 py-2 rounded bg-blue-600 text-white">Create new quiz</button></div>
          </div>
        )}
        {active === 'tests' && (
          <div>
            <ListRow title="Midterm Exam" subtitle="50 questions â€¢ Published" right={<button className="px-3 py-1 rounded border">Manage</button>} />
            <ListRow title="Final Practical" subtitle="Stations setup" right={<button className="px-3 py-1 rounded border">Manage</button>} />
            <div className="p-4"><button className="px-4 py-2 rounded bg-blue-600 text-white">Create new test</button></div>
          </div>
        )}
        {active === 'modules' && (
          <div>
            <ModuleManagement />
          </div>
        )}
        {active === 'games' && (
          <div>
            <ListRow title="Medication Bingo" subtitle="12 cards â€¢ Draft" right={<button className="px-3 py-1 rounded border">Launch</button>} />
            <ListRow title="Airway Jeopardy" subtitle="5 categories â€¢ Published" right={<button className="px-3 py-1 rounded border">Launch</button>} />
            <div className="p-4"><button className="px-4 py-2 rounded bg-blue-600 text-white">Create new game</button></div>
          </div>
        )}
        {active === 'roster' && (
          <div>
            <ListRow title="Spring EMT Cohort" subtitle="24 students" right={<button className="px-3 py-1 rounded border">View</button>} />
            <ListRow title="AEMT Evening" subtitle="16 students" right={<button className="px-3 py-1 rounded border">View</button>} />
            <div className="p-4"><button className="px-4 py-2 rounded bg-blue-600 text-white">Add class</button></div>
          </div>
        )}
        {active === 'settings' && (
          <div className="p-4 text-sm text-gray-600">
            <div>Organization: Emerita Clinical</div>
            <div>Default grading scheme: 70% passing</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default InstructorDashboard;


import React, { useState } from 'react';
import { ALL_SCENARIOS, getAvailableDomains } from '../data/scenarios/index';

const SimpleDebugScenarios: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const domains = getAvailableDomains();

  const filteredScenarios = selectedDomain === 'all'
    ? ALL_SCENARIOS
    : ALL_SCENARIOS.filter(s => s.category === selectedDomain);

  // Determine TEI Type based on scenario content
  const getTeiType = (scenario: any) => {
    if (scenario.title.toLowerCase().includes('build-a-list')) return 'Build-a-List';
    if (scenario.title.toLowerCase().includes('hotspot')) return 'Hotspot';
    if (scenario.pcr_text.toLowerCase().includes('select all')) return 'Multi-Select';
    return 'Standard MCQ';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Scenario Debug Dashboard</h1>

      <div className="mb-6">
        <label htmlFor="domain-select" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Domain:
        </label>
        <select
          id="domain-select"
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Domains ({ALL_SCENARIOS.length})</option>
          {domains.map(domain => {
            const count = ALL_SCENARIOS.filter(s => s.category === domain).length;
            return (
              <option key={domain} value={domain}>
                {domain} ({count})
              </option>
            );
          })}
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Domain
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TEI Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredScenarios.map((scenario, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  {String(index + 1).padStart(3, '0')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    scenario.category === 'Medical' ? 'bg-blue-100 text-blue-800' :
                    scenario.category === 'Trauma' ? 'bg-red-100 text-red-800' :
                    scenario.category === 'Peds' ? 'bg-green-100 text-green-800' :
                    scenario.category === 'OB' ? 'bg-purple-100 text-purple-800' :
                    scenario.category === 'Operations' ? 'bg-orange-100 text-orange-800' :
                    scenario.category === 'Environmental' ? 'bg-cyan-100 text-cyan-800' :
                    scenario.category === 'Airway' ? 'bg-pink-100 text-pink-800' :
                    scenario.category === 'Breathing' ? 'bg-indigo-100 text-indigo-800' :
                    scenario.category === 'Circulation' ? 'bg-yellow-100 text-yellow-800' :
                    scenario.category === 'Geriatric' ? 'bg-gray-100 text-gray-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {scenario.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={scenario.title}>
                  {scenario.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    getTeiType(scenario) === 'Build-a-List' ? 'bg-purple-100 text-purple-800' :
                    getTeiType(scenario) === 'Hotspot' ? 'bg-blue-100 text-blue-800' :
                    getTeiType(scenario) === 'Multi-Select' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {getTeiType(scenario)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        Showing {filteredScenarios.length} of {ALL_SCENARIOS.length} scenarios
      </div>
    </div>
  );
};

export default SimpleDebugScenarios;
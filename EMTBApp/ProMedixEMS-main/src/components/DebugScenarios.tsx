import React, { useState, useEffect } from 'react';
import { ALL_SCENARIOS } from '../data/scenarios/index';
import { PageContainer } from './ui/ModernGlassComponents';

interface Scenario {
  title: string;
  category: string;
  pcr_text: string;
  correct_error: string;
  chaos_events: string[];
  stress_fto_responses: string[];
  options: Array<{
    text: string;
    is_correct: boolean;
    feedback?: string;
  }>;
  hazards: {
    type: string;
    action: string;
  };
}

const DebugScenarios: React.FC = () => {
  const [scenarios] = useState<Scenario[]>(ALL_SCENARIOS);
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Get unique domains for filter dropdown
  const domains = Array.from(new Set(scenarios.map(s => s.category))).sort();

  // Filter scenarios based on domain and search term
  const filteredScenarios = scenarios.filter(scenario => {
    const matchesDomain = filterDomain === 'all' || scenario.category === filterDomain;
    const matchesSearch = searchTerm === '' ||
      scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scenario.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <PageContainer
      title="Debug Scenarios Dashboard"
      subtitle={`Viewing ${filteredScenarios.length} of ${scenarios.length} total scenarios`}
      gradient="from-slate-50 via-blue-50 to-slate-100"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
          <div className="flex-1">
            <label htmlFor="domain-filter" className="block text-sm font-medium text-slate-700 mb-1">
              Filter by Domain
            </label>
            <select
              id="domain-filter"
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Domains ({scenarios.length})</option>
              {domains.map(domain => {
                const count = scenarios.filter(s => s.category === domain).length;
                return (
                  <option key={domain} value={domain}>
                    {domain} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="search-filter" className="block text-sm font-medium text-slate-700 mb-1">
              Search Scenarios
            </label>
            <input
              id="search-filter"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or domain..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{scenarios.length}</div>
            <div className="text-sm text-slate-600">Total Scenarios</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{domains.length}</div>
            <div className="text-sm text-slate-600">Domains</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{filteredScenarios.length}</div>
            <div className="text-sm text-slate-600">Filtered Results</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((filteredScenarios.length / scenarios.length) * 100)}%
            </div>
            <div className="text-sm text-slate-600">Coverage</div>
          </div>
        </div>

        {/* Scenarios Table */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Domain
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Options
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Correct
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredScenarios.map((scenario, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-mono text-slate-900">
                      {String(index + 1).padStart(3, '0')}
                    </td>
                    <td className="px-4 py-3">
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
                    <td className="px-4 py-3 text-sm text-slate-900 max-w-xs truncate" title={scenario.title}>
                      {scenario.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {scenario.options.length}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        scenario.options.filter(opt => opt.is_correct).length === 1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {scenario.options.filter(opt => opt.is_correct).length === 1 ? 'Single' : 'Multi'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredScenarios.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.966-5.618-2.479.047.058.096.115.147.168l.001.001c.424.424.99.854 1.647 1.168A7.96 7.96 0 0112 21c2.34 0 4.29-.966 5.618-2.479-.047-.058-.096-.115-.147-.168l-.001-.001c-.424-.424-.99-.854-1.647-1.168z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">No scenarios found</h3>
              <p className="text-slate-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>

        {/* Domain Breakdown */}
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Domain Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {domains.map(domain => {
              const count = scenarios.filter(s => s.category === domain).length;
              const percentage = Math.round((count / scenarios.length) * 100);
              return (
                <div key={domain} className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-xl font-bold text-slate-900">{count}</div>
                  <div className="text-sm text-slate-600">{domain}</div>
                  <div className="text-xs text-slate-500">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DebugScenarios;
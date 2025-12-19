import React, { useState, useEffect } from 'react';
import { BarChart3, Clock, Search, Zap, Database, TrendingUp } from 'lucide-react';

interface SearchMetrics {
  totalSearches: number;
  averageSearchTime: number;
  cacheHitRate: number;
  popularQueries: Array<{ query: string; count: number; avgTime: number }>;
  performanceMetrics: {
    fastSearches: number; // < 100ms
    mediumSearches: number; // 100-500ms
    slowSearches: number; // > 500ms
  };
  indexSize: number;
  lastIndexUpdate: string;
}

interface SearchPerformanceMonitorProps {
  className?: string;
  showDetailedMetrics?: boolean;
}

const SearchPerformanceMonitor: React.FC<SearchPerformanceMonitorProps> = ({
  className = "",
  showDetailedMetrics = false
}) => {
  const [metrics, setMetrics] = useState<SearchMetrics>({
    totalSearches: 0,
    averageSearchTime: 0,
    cacheHitRate: 0,
    popularQueries: [],
    performanceMetrics: {
      fastSearches: 0,
      mediumSearches: 0,
      slowSearches: 0
    },
    indexSize: 0,
    lastIndexUpdate: new Date().toISOString()
  });

  const [isVisible, setIsVisible] = useState(false);

  // Load metrics (in a real implementation, this would come from your search engine)
  useEffect(() => {
    // Simulated metrics - replace with actual data from optimizedSearchEngine
    const loadMetrics = () => {
      setMetrics({
        totalSearches: 1247,
        averageSearchTime: 45.2,
        cacheHitRate: 78.5,
        popularQueries: [
          { query: "airway management", count: 156, avgTime: 32.1 },
          { query: "cardiac arrest", count: 134, avgTime: 28.7 },
          { query: "trauma assessment", count: 89, avgTime: 41.3 },
          { query: "medication dosage", count: 76, avgTime: 52.8 },
          { query: "vital signs", count: 67, avgTime: 29.4 }
        ],
        performanceMetrics: {
          fastSearches: 892,
          mediumSearches: 321,
          slowSearches: 34
        },
        indexSize: 15420,
        lastIndexUpdate: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
      });
    };

    loadMetrics();
    const interval = setInterval(loadMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!showDetailedMetrics) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">Search Performance</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{metrics.averageSearchTime.toFixed(1)}ms</span>
            </div>
            <div className="flex items-center space-x-1">
              <Database className="h-3 w-3" />
              <span>{metrics.cacheHitRate.toFixed(1)}% cache</span>
            </div>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {isVisible ? 'Hide' : 'Details'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            Search Performance Analytics
          </h3>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isVisible ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      {isVisible && (
        <div className="p-4 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Searches</p>
                  <p className="text-2xl font-bold text-blue-900">{metrics.totalSearches.toLocaleString()}</p>
                </div>
                <Search className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Avg Response Time</p>
                  <p className="text-2xl font-bold text-green-900">{metrics.averageSearchTime.toFixed(1)}ms</p>
                </div>
                <Clock className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Cache Hit Rate</p>
                  <p className="text-2xl font-bold text-purple-900">{metrics.cacheHitRate.toFixed(1)}%</p>
                </div>
                <Database className="h-8 w-8 text-purple-400" />
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Index Size</p>
                  <p className="text-2xl font-bold text-orange-900">{metrics.indexSize.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-400" />
              </div>
            </div>
          </div>

          {/* Performance Distribution */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">Response Time Distribution</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-600">Fast (&lt;100ms)</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(metrics.performanceMetrics.fastSearches / metrics.totalSearches) * 100}%` 
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-gray-900 font-medium">
                  {metrics.performanceMetrics.fastSearches}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-600">Medium (100-500ms)</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                  <div 
                    className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(metrics.performanceMetrics.mediumSearches / metrics.totalSearches) * 100}%` 
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-gray-900 font-medium">
                  {metrics.performanceMetrics.mediumSearches}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-600">Slow (&gt;500ms)</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                  <div 
                    className="bg-red-500 h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(metrics.performanceMetrics.slowSearches / metrics.totalSearches) * 100}%` 
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-gray-900 font-medium">
                  {metrics.performanceMetrics.slowSearches}
                </div>
              </div>
            </div>
          </div>

          {/* Popular Queries */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Popular Search Terms
            </h4>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="space-y-2">
                {metrics.popularQueries.map((query, index) => (
                  <div key={index} className="flex items-center justify-between py-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500 w-6">
                        #{index + 1}
                      </span>
                      <span className="text-sm text-gray-900">{query.query}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span>{query.count} searches</span>
                      <span>{query.avgTime.toFixed(1)}ms avg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">System Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Last Index Update:</span>
                <span className="ml-2 text-gray-900">
                  {new Date(metrics.lastIndexUpdate).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Search Engine:</span>
                <span className="ml-2 text-green-600 font-medium">Optimized v2.0</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPerformanceMonitor;

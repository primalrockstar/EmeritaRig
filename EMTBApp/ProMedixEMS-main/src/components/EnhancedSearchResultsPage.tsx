import React, { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, SortDesc, Grid, List, BookOpen, Pill, Calculator, FileText, Star, ChevronRight, ExternalLink } from 'lucide-react';
import { optimizedSearchEngine, SearchResult, SearchFilters } from '../utils/optimized-search';
import OptimizedSearchBar from './OptimizedSearchBar';
import SearchPerformanceMonitor from './SearchPerformanceMonitor';

interface EnhancedSearchResultsPageProps {
  initialQuery?: string;
  onResultSelect?: (result: SearchResult) => void;
  onNavigate?: (url: string) => void;
}

const EnhancedSearchResultsPage: React.FC<EnhancedSearchResultsPageProps> = ({
  initialQuery = '',
  onResultSelect,
  onNavigate
}) => {
  // State management
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [loading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'relevance' | 'chapter' | 'type' | 'recent'>('relevance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [activeFilters, setActiveFilters] = useState<Partial<SearchFilters>>({});
  const [showFilters, setShowFilters] = useState(false);
  
  // Statistics
  const [searchStats, setSearchStats] = useState({
    totalResults: 0,
    searchTime: 0,
    resultsByType: {} as Record<string, number>
  });

  // Available filter options
  const [availableFilters, setAvailableFilters] = useState({
    types: [] as string[],
    categories: [] as string[],
    chapters: [] as number[],
    modules: [] as number[],
    difficulties: [] as string[]
  });

  // Load available filters on mount
  useEffect(() => {
    const filterOptions = optimizedSearchEngine.getAvailableFilters();
    setAvailableFilters(filterOptions);
  }, []);

  // Handle search
  const handleSearch = (searchQuery: string, searchResults: SearchResult[]) => {
    setQuery(searchQuery);
    setResults(searchResults);
    
    // Calculate statistics
    const startTime = Date.now();
    const resultsByType = searchResults.reduce((acc, result) => {
      acc[result.type] = (acc[result.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    setSearchStats({
      totalResults: searchResults.length,
      searchTime: Date.now() - startTime,
      resultsByType
    });
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...results];

    // Apply filters
    if (activeFilters.types?.length) {
      filtered = filtered.filter(result => activeFilters.types!.includes(result.type));
    }
    if (activeFilters.chapters?.length) {
      filtered = filtered.filter(result => result.chapter && activeFilters.chapters!.includes(result.chapter));
    }
    if (activeFilters.categories?.length) {
      filtered = filtered.filter(result => activeFilters.categories!.includes(result.category));
    }
    if (activeFilters.difficulties?.length) {
      filtered = filtered.filter(result => result.difficulty && activeFilters.difficulties!.includes(result.difficulty));
    }
    if (activeFilters.minScore) {
      filtered = filtered.filter(result => result.relevanceScore >= activeFilters.minScore!);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'relevance':
          comparison = b.relevanceScore - a.relevanceScore;
          break;
        case 'chapter':
          comparison = (a.chapter || 999) - (b.chapter || 999);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'recent':
          comparison = (new Date(b.lastUpdated || 0).getTime()) - (new Date(a.lastUpdated || 0).getTime());
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredResults(filtered);
  }, [results, activeFilters, sortBy, sortOrder]);

  // Handle filter changes
  const handleFilterChange = (filterType: keyof SearchFilters, value: any) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (Array.isArray(newFilters[filterType])) {
        const currentValues = (newFilters[filterType] as any[]) || [];
        if (currentValues.includes(value)) {
          newFilters[filterType] = currentValues.filter(v => v !== value) as any;
        } else {
          newFilters[filterType] = [...currentValues, value] as any;
        }
      } else {
        newFilters[filterType] = value;
      }
      return newFilters;
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({});
  };

  // Handle result selection
  const handleResultClick = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    } else if (onNavigate) {
      onNavigate(result.url);
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    const icons = {
      'flashcard': <FileText className="h-4 w-4" />,
      'protocol': <BookOpen className="h-4 w-4" />,
      'medication': <Pill className="h-4 w-4" />,
      'calculator': <Calculator className="h-4 w-4" />,
      'chapter': <BookOpen className="h-4 w-4" />,
      'study-notes': <FileText className="h-4 w-4" />
    };
    return icons[type as keyof typeof icons] || <FileText className="h-4 w-4" />;
  };

  // Get type color
  const getTypeColor = (type: string) => {
    const colors = {
      'flashcard': 'bg-blue-100 text-blue-800 border-blue-200',
      'protocol': 'bg-green-100 text-green-800 border-green-200',
      'medication': 'bg-purple-100 text-purple-800 border-purple-200',
      'calculator': 'bg-orange-100 text-orange-800 border-orange-200',
      'chapter': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'study-notes': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Get priority indicator
  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Star className="h-3 w-3 text-yellow-500 fill-current" />;
      case 'medium':
        return <Star className="h-3 w-3 text-gray-400" />;
      default:
        return null;
    }
  };

  const hasActiveFilters = Object.values(activeFilters).some(f => 
    Array.isArray(f) ? f.length > 0 : Boolean(f)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-4">
            <OptimizedSearchBar
              onSearch={handleSearch}
              onResultSelect={onResultSelect}
              placeholder="Search EMT-B materials, protocols, medications..."
              showFilters={false}
              showInstantResults={false}
              size="lg"
            />
          </div>

          {/* Search Stats */}
          {query && (
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                <span className="font-medium">{searchStats.totalResults}</span> results for 
                <span className="font-medium ml-1">"{query}"</span>
                <span className="ml-2 text-gray-400">
                  ({searchStats.searchTime}ms)
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex items-center space-x-1 border border-gray-200 rounded-md">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
                    title="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
                    title="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Controls */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm border border-gray-200 rounded-md px-2 py-1"
                >
                  <option value="relevance">Relevance</option>
                  <option value="chapter">Chapter</option>
                  <option value="type">Type</option>
                  <option value="recent">Recent</option>
                </select>

                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-1.5 border border-gray-200 rounded-md text-gray-400 hover:text-gray-600"
                  title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                >
                  {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </button>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-1 px-3 py-1.5 border rounded-md text-sm transition-colors ${
                    hasActiveFilters 
                      ? 'border-blue-200 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="bg-blue-200 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                      {Object.values(activeFilters).flat().length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-28">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Type Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Content Type</h4>
                  <div className="space-y-2">
                    {availableFilters.types.map(type => {
                      const count = searchStats.resultsByType[type] || 0;
                      return (
                        <label key={type} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={(activeFilters.types || []).includes(type)}
                            onChange={() => handleFilterChange('types', type)}
                            className="mr-2 h-3 w-3"
                          />
                          <span className="flex-1 capitalize">{type}</span>
                          <span className="text-gray-400 text-xs">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Chapter Filter */}
                {availableFilters.chapters.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Chapter</h4>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {availableFilters.chapters.map(chapter => (
                        <label key={chapter} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={(activeFilters.chapters || []).includes(chapter)}
                            onChange={() => handleFilterChange('chapters', chapter)}
                            className="mr-2 h-3 w-3"
                          />
                          <span>Chapter {chapter}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Difficulty Filter */}
                {availableFilters.difficulties.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Difficulty</h4>
                    <div className="space-y-2">
                      {availableFilters.difficulties.map(difficulty => (
                        <label key={difficulty} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={(activeFilters.difficulties || []).includes(difficulty)}
                            onChange={() => handleFilterChange('difficulties', difficulty)}
                            className="mr-2 h-3 w-3"
                          />
                          <span>{difficulty}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Score Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Minimum Relevance</h4>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={activeFilters.minScore || 0}
                    onChange={(e) => handleFilterChange('minScore', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span className="font-medium">{activeFilters.minScore || 0}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Searching...</span>
              </div>
            ) : filteredResults.length === 0 && query ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters
                </p>
              </div>
            ) : (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
                  : 'space-y-4'
                }
              `}>
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`
                      bg-white border border-gray-200 rounded-lg p-4 cursor-pointer
                      hover:border-blue-300 hover:shadow-md transition-all duration-200
                      ${viewMode === 'grid' ? 'h-fit' : ''}
                    `}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`
                        flex-shrink-0 p-2 rounded-lg border
                        ${getTypeColor(result.type)}
                      `}>
                        {getTypeIcon(result.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className="text-base font-semibold text-gray-900 truncate pr-2">
                            {result.title}
                          </h3>
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            {/* Remove priority indicator as it's not in SearchResult interface */}
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {result.snippet}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <span className={`
                              text-xs px-2 py-1 rounded border capitalize
                              ${getTypeColor(result.type)}
                            `}>
                              {result.type}
                            </span>
                            {result.chapter && (
                              <span className="text-xs text-gray-500">
                                Chapter {result.chapter}
                              </span>
                            )}
                            {result.difficulty && (
                              <span className="text-xs text-gray-500">
                                {result.difficulty}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-green-600 font-medium">
                              {Math.round(result.relevanceScore)}% match
                            </span>
                            <ExternalLink className="h-3 w-3 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load more results */}
            {filteredResults.length > 0 && filteredResults.length < results.length && (
              <div className="text-center mt-8">
                <button className="px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                  Show more results ({results.length - filteredResults.length} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSearchResultsPage;

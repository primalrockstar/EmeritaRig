import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Filter, Clock, TrendingUp } from 'lucide-react';
import { searchEngine, SearchResult, SearchFilters } from '../utils/search';

// Simple suggestion type for compatibility
interface SearchSuggestion {
  text: string;
  type?: string;
  icon?: string;
  count?: number;
}

interface EnhancedSearchBarProps {
  placeholder?: string;
  onSearch: (query: string, results: SearchResult[]) => void;
  onResultSelect?: (result: SearchResult) => void;
  className?: string;
  showFilters?: boolean;
  showInstantResults?: boolean;
  maxSuggestions?: number;
  size?: 'sm' | 'md' | 'lg';
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({
  placeholder = "Search EMT-B materials, protocols, medications...",
  onSearch,
  onResultSelect,
  className = "",
  showFilters = true,
  showInstantResults = true,
  maxSuggestions = 8,
  size = 'md'
}) => {
  // State management
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [instantResults, setInstantResults] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [filters, setFilters] = useState<Partial<SearchFilters>>({});
  const [trendingTerms, setTrendingTerms] = useState<string[]>([]);

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Available filter options
  const [availableFilters, setAvailableFilters] = useState({
    types: [] as string[],
    categories: [] as string[],
    chapters: [] as number[],
    modules: [] as number[],
    difficulties: [] as string[]
  });

  // Load trending terms and filters on mount
  useEffect(() => {
    const trending = searchEngine.getPopularSearches();
    setTrendingTerms(trending);
    
    // Set basic filter options since our search engine doesn't have getAvailableFilters
    setAvailableFilters({
      types: ['study-notes', 'flashcard', 'calculator', 'medication', 'protocol', 'scenario'],
      categories: ['Airway', 'Cardiac', 'Pharmacology', 'Trauma', 'Medical'],
      chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      modules: [1, 2, 3, 4, 5],
      difficulties: ['easy', 'medium', 'hard']
    });
  }, []);

  // Debounced search suggestions
  const updateSuggestions = useCallback((searchQuery: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setLoading(true);
        // Generate simple suggestions from popular searches
        const popularSearches = searchEngine.getPopularSearches();
        const matchingSuggestions = popularSearches
          .filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(term => ({ text: term, type: 'suggestion' }));
        setSuggestions(matchingSuggestions.slice(0, maxSuggestions));
        
        if (showInstantResults) {
          const results = await searchEngine.search(searchQuery, filters as any);
          setInstantResults(results.slice(0, 5));
        }
        setLoading(false);
      } else if (searchQuery.length === 0) {
        const defaultSuggestions = searchEngine.getPopularSearches()
          .map(term => ({ text: term, type: 'popular' }));
        setSuggestions(defaultSuggestions.slice(0, maxSuggestions));
        setInstantResults([]);
      } else {
        setSuggestions([]);
        setInstantResults([]);
      }
    }, 300);
  }, [filters, maxSuggestions, showInstantResults]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedSuggestionIndex(-1);
    setShowSuggestions(true);
    updateSuggestions(value);
  };

  // Handle search submission
  const handleSearch = async (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      setLoading(true);
      const results = await searchEngine.search(finalQuery, filters as any);
      onSearch(finalQuery, results);
      setShowSuggestions(false);
      setLoading(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = async (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'content' && onResultSelect) {
      // Find the full result and select it
      const results = await searchEngine.search(suggestion.text);
      const result = results[0];
      if (result) {
        onResultSelect(result);
      }
    } else {
      setQuery(suggestion.text);
      handleSearch(suggestion.text);
    }
    setShowSuggestions(false);
  };

  // Handle instant result selection
  const handleResultSelect = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
    setShowSuggestions(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    const totalItems = suggestions.length + (showInstantResults ? instantResults.length : 0);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < totalItems - 1 ? prev + 1 : 0
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : totalItems - 1
        );
        break;
      
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          if (selectedSuggestionIndex < suggestions.length) {
            handleSuggestionSelect(suggestions[selectedSuggestionIndex]);
          } else {
            const resultIndex = selectedSuggestionIndex - suggestions.length;
            handleResultSelect(instantResults[resultIndex]);
          }
        } else {
          handleSearch();
        }
        break;
      
      case 'Escape':
        setShowSuggestions(false);
        searchInputRef.current?.blur();
        break;
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters };
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
    setFilters(newFilters);
    
    // Re-run search if query exists
    if (query) {
      updateSuggestions(query);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({});
    if (query) {
      updateSuggestions(query);
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Size-based styling
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'h-8 text-sm',
          input: 'text-sm py-1.5 pl-8 pr-8',
          icon: 'h-3.5 w-3.5',
          suggestion: 'px-3 py-1.5 text-sm'
        };
      case 'lg':
        return {
          container: 'h-12 text-lg',
          input: 'text-lg py-3 pl-12 pr-12',
          icon: 'h-5 w-5',
          suggestion: 'px-4 py-3 text-base'
        };
      default:
        return {
          container: 'h-10 text-base',
          input: 'text-base py-2 pl-10 pr-10',
          icon: 'h-4 w-4',
          suggestion: 'px-3 py-2 text-sm'
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const hasActiveFilters = Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : Boolean(f));

  return (
    <div className={`relative ${className}`} ref={suggestionsRef}>
      {/* Main Search Input */}
      <div className={`relative ${sizeClasses.container}`}>
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className={`${sizeClasses.icon} text-gray-400`} />
        </div>
        
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className={`
            w-full ${sizeClasses.input} border border-gray-200 rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200 bg-white
            ${loading ? 'pr-16' : ''}
          `}
        />

        {/* Right side controls */}
        <div className="absolute inset-y-0 right-3 flex items-center space-x-1">
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
          )}
          
          {showFilters && (
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`
                p-1 rounded transition-colors
                ${hasActiveFilters 
                  ? 'text-blue-600 bg-blue-100 hover:bg-blue-200' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }
              `}
              title="Search Filters"
            >
              <Filter className="h-4 w-4" />
            </button>
          )}
          
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setInstantResults([]);
                searchInputRef.current?.focus();
              }}
              className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Menu */}
      {showFilterMenu && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Search Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Content Types */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-2 block">Content Type</label>
              <div className="space-y-1">
                {availableFilters.types.map(type => (
                  <label key={type} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={(filters.types || []).includes(type)}
                      onChange={() => handleFilterChange('types', type)}
                      className="mr-2 h-3 w-3"
                    />
                    <span className="capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Chapters */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-2 block">Chapter</label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {availableFilters.chapters.map(chapter => (
                  <label key={chapter} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={(filters.chapters || []).includes(chapter)}
                      onChange={() => handleFilterChange('chapters', chapter)}
                      className="mr-2 h-3 w-3"
                    />
                    <span>Chapter {chapter}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-2 block">Difficulty</label>
              <div className="space-y-1">
                {availableFilters.difficulties.map(difficulty => (
                  <label key={difficulty} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={(filters.categories || []).includes(difficulty)}
                      onChange={() => handleFilterChange('categories', difficulty)}
                      className="mr-2 h-3 w-3"
                    />
                    <span>{difficulty}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions and Results Dropdown */}
      {showSuggestions && (suggestions.length > 0 || instantResults.length > 0 || query.length === 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-40 max-h-96 overflow-y-auto">
          {/* Recent/Popular searches when no query */}
          {query.length === 0 && suggestions.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center text-xs font-medium text-gray-500 mb-2">
                <Clock className="h-3 w-3 mr-1" />
                Recent & Popular
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={`recent-${index}`}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className={`
                    w-full text-left px-3 py-1.5 text-sm rounded
                    ${selectedSuggestionIndex === index ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}
                    transition-colors flex items-center
                  `}
                >
                  <span className="mr-2">{suggestion.icon}</span>
                  <span>{suggestion.text}</span>
                  {suggestion.count && (
                    <span className="ml-auto text-xs text-gray-400">
                      {suggestion.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Trending terms */}
          {query.length === 0 && trendingTerms.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center text-xs font-medium text-gray-500 mb-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </div>
              <div className="flex flex-wrap gap-1">
                {trendingTerms.slice(0, 6).map((term, index) => (
                  <button
                    key={`trending-${index}`}
                    onClick={() => handleSearch(term)}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search suggestions */}
          {query.length > 0 && suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 mb-1 px-2">Suggestions</div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className={`
                    w-full text-left ${sizeClasses.suggestion} rounded
                    ${selectedSuggestionIndex === index ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}
                    transition-colors flex items-center
                  `}
                >
                  <span className="mr-2">{suggestion.icon}</span>
                  <span>{suggestion.text}</span>
                  <span className="ml-auto text-xs text-gray-400 capitalize">
                    {suggestion.type}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Instant results */}
          {showInstantResults && instantResults.length > 0 && (
            <div className="border-t border-gray-100 p-2">
              <div className="text-xs font-medium text-gray-500 mb-1 px-2">Quick Results</div>
              {instantResults.map((result, index) => {
                const resultIndex = suggestions.length + index;
                return (
                  <button
                    key={`result-${result.id}`}
                    onClick={() => handleResultSelect(result)}
                    className={`
                      w-full text-left p-2 rounded
                      ${selectedSuggestionIndex === resultIndex ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}
                      transition-colors border border-transparent
                    `}
                  >
                    <div className="flex items-start">
                      <span className="mr-2 text-base flex-shrink-0">📄</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {result.snippet}
                        </div>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded capitalize">
                            {result.type}
                          </span>
                          {result.chapter && (
                            <span className="text-xs text-gray-400">
                              Ch. {result.chapter}
                            </span>
                          )}
                          {result.relevanceScore && (
                            <span className="text-xs text-green-600">
                              {Math.round(result.relevanceScore)}% match
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* No results */}
          {query.length > 0 && suggestions.length === 0 && instantResults.length === 0 && !loading && (
            <div className="p-4 text-center text-gray-500 text-sm">
              <Search className="h-6 w-6 mx-auto mb-2 opacity-50" />
              No results found for "{query}"
              <div className="text-xs mt-1">Try different keywords or check spelling</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBar;

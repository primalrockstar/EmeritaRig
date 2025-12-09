import React, { 
  useState, 
  useRef, 
  useEffect, 
  useCallback, 
  useMemo,
  memo
} from 'react';
import { 
  Search, 
  X, 
  Filter, 
  Clock, 
  TrendingUp, 
  Mic, 
  MicOff,
  ArrowUp,
  Loader2,
  Settings,
  History,
  Star
} from 'lucide-react';
import { 
  optimizedSearchEngine, 
  SearchResult, 
  SearchFilters, 
  SearchSuggestion 
} from '../utils/optimized-search';

export interface OptimizedSearchBarProps {
  placeholder?: string;
  onSearch: (query: string, results: SearchResult[]) => void;
  onResultSelect?: (result: SearchResult) => void;
  className?: string;
  variant?: 'minimal' | 'enhanced' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  showFilters?: boolean;
  showInstantResults?: boolean;
  showVoiceSearch?: boolean;
  maxSuggestions?: number;
  autoFocus?: boolean;
  debounceMs?: number;
  cacheResults?: boolean;
  accessibility?: {
    searchLabel?: string;
    clearLabel?: string;
    filterLabel?: string;
    voiceLabel?: string;
  };
}

interface VoiceRecognition {
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => VoiceRecognition;
    SpeechRecognition: new () => VoiceRecognition;
  }
}

const OptimizedSearchBar: React.FC<OptimizedSearchBarProps> = memo(({
  placeholder = "Search EMT-B materials, protocols, medications...",
  onSearch,
  onResultSelect,
  className = "",
  variant = 'enhanced',
  size = 'md',
  showFilters = true,
  showInstantResults = true,
  showVoiceSearch = true,
  maxSuggestions = 8,
  autoFocus = false,
  debounceMs = 300,
  cacheResults = true,
  accessibility = {}
}) => {
  // State management with performance optimizations
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [instantResults, setInstantResults] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // Refs for performance and accessibility
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number>();
  const recognitionRef = useRef<VoiceRecognition | null>(null);
  const abortControllerRef = useRef<AbortController>();

  // Memoized available filters
  const availableFilters = useMemo(() => {
    return optimizedSearchEngine.getAvailableFilters();
  }, []);

  // Memoized size classes
  const sizeClasses = useMemo(() => {
    const classes = {
      sm: {
        container: 'h-10',
        input: 'pl-10 pr-12 py-2 text-sm',
        icon: 'h-4 w-4',
        button: 'h-8 w-8 text-xs'
      },
      md: {
        container: 'h-12',
        input: 'pl-12 pr-16 py-3 text-base',
        icon: 'h-5 w-5',
        button: 'h-10 w-10 text-sm'
      },
      lg: {
        container: 'h-14',
        input: 'pl-14 pr-20 py-4 text-lg',
        icon: 'h-6 w-6',
        button: 'h-12 w-12 text-base'
      }
    };
    return classes[size];
  }, [size]);

  // Check if filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(value => 
      Array.isArray(value) ? value.length > 0 : value !== undefined
    );
  }, [filters]);

  // Initialize voice recognition
  useEffect(() => {
    if (!showVoiceSearch) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const results = Array.from(event.results) as any[];
        const transcript = results
          .map((result: any) => result[0].transcript)
          .join('');
        
        if (event.results[event.results.length - 1].isFinal) {
          setQuery(transcript);
          setIsListening(false);
          if (transcript.trim()) {
            handleSearch(transcript);
          }
        } else {
          setQuery(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [showVoiceSearch]);

  // Load search history on mount
  useEffect(() => {
    const history = optimizedSearchEngine.getRecentSearches(10);
    setSearchHistory(history);
  }, []);

  // Auto-focus if requested
  useEffect(() => {
    if (autoFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [autoFocus]);

  // Debounced search suggestions with abort controller for performance
  const updateSuggestions = useCallback((searchQuery: string) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    debounceRef.current = setTimeout(async () => {
      if (signal.aborted) return;

      try {
        if (searchQuery.length >= 2) {
          setLoading(true);
          
          const newSuggestions = optimizedSearchEngine.getSearchSuggestions(
            searchQuery, 
            maxSuggestions
          );
          
          if (!signal.aborted) {
            setSuggestions(newSuggestions);
            
            if (showInstantResults) {
              const results = optimizedSearchEngine.search(
                searchQuery, 
                filters,
                { limit: 5, includeSnippets: false }
              );
              setInstantResults(results);
            }
          }
        } else if (searchQuery.length === 0) {
          const defaultSuggestions = optimizedSearchEngine.getSearchSuggestions('', maxSuggestions);
          if (!signal.aborted) {
            setSuggestions(defaultSuggestions);
            setInstantResults([]);
          }
        } else {
          if (!signal.aborted) {
            setSuggestions([]);
            setInstantResults([]);
          }
        }
      } catch (error) {
        if (!signal.aborted) {
          console.warn('Search suggestions failed:', error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }, debounceMs);
  }, [filters, maxSuggestions, showInstantResults, debounceMs]);

  // Handle input changes with performance optimization
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedSuggestionIndex(-1);
    setShowSuggestions(true);
    updateSuggestions(value);
  }, [updateSuggestions]);

  // Handle search submission
  const handleSearch = useCallback((searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;

    setLoading(true);
    setShowSuggestions(false);

    try {
      const results = optimizedSearchEngine.search(finalQuery, filters, {
        limit: 50,
        includeSnippets: true,
        fuzzyMatch: true
      });
      
      onSearch(finalQuery, results);
      
      // Update search history
      const updatedHistory = [finalQuery, ...searchHistory.filter(h => h !== finalQuery)].slice(0, 10);
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  }, [query, filters, onSearch, searchHistory]);

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback((suggestion: SearchSuggestion) => {
    if (suggestion.type === 'content' && onResultSelect) {
      const results = optimizedSearchEngine.search(suggestion.text);
      const result = results[0];
      if (result) {
        onResultSelect(result);
        return;
      }
    }
    
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  }, [onResultSelect, handleSearch]);

  // Handle voice search toggle
  const toggleVoiceSearch = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Voice search failed to start:', error);
      }
    }
  }, [isListening]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    const totalSuggestions = suggestions.length + instantResults.length;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < totalSuggestions - 1 ? prev + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : totalSuggestions - 1
        );
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          if (selectedSuggestionIndex < suggestions.length) {
            handleSuggestionSelect(suggestions[selectedSuggestionIndex]);
          } else {
            const resultIndex = selectedSuggestionIndex - suggestions.length;
            const result = instantResults[resultIndex];
            if (result && onResultSelect) {
              onResultSelect(result);
            }
          }
        } else {
          handleSearch();
        }
        break;
        
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  }, [showSuggestions, suggestions, instantResults, selectedSuggestionIndex, handleSuggestionSelect, onResultSelect, handleSearch]);

  // Handle filter changes
  const handleFilterChange = useCallback((filterType: keyof SearchFilters, value: any) => {
    setFilters(prev => {
      const currentValues = prev[filterType] as any[] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [filterType]: newValues };
    });
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Render variant-specific styling
  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-white border border-gray-200 rounded-lg';
      case 'compact':
        return 'bg-gray-50 border border-gray-300 rounded-md';
      case 'enhanced':
      default:
        return 'bg-white border border-gray-200 rounded-xl shadow-lg';
    }
  };

  const { searchLabel, clearLabel, filterLabel, voiceLabel } = accessibility;

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
          aria-label={searchLabel || "Search"}
          aria-expanded={showSuggestions}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          autoComplete="off"
          className={`
            w-full ${sizeClasses.input} ${getVariantClasses()}
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${loading ? 'pr-20' : 'pr-16'}
            ${isListening ? 'ring-2 ring-red-500 border-red-300' : ''}
          `}
        />

        {/* Right side controls */}
        <div className="absolute inset-y-0 right-3 flex items-center space-x-1">
          {loading && (
            <Loader2 className={`${sizeClasses.icon} animate-spin text-blue-500`} />
          )}
          
          {showVoiceSearch && recognitionRef.current && (
            <button
              onClick={toggleVoiceSearch}
              className={`
                p-1 rounded transition-colors
                ${isListening 
                  ? 'text-red-600 bg-red-100 hover:bg-red-200' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }
              `}
              title={voiceLabel || (isListening ? "Stop voice search" : "Start voice search")}
              aria-label={voiceLabel || (isListening ? "Stop voice search" : "Start voice search")}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>
          )}
          
          {showFilters && variant === 'enhanced' && (
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`
                p-1 rounded transition-colors
                ${hasActiveFilters 
                  ? 'text-blue-600 bg-blue-100 hover:bg-blue-200' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }
              `}
              title={filterLabel || "Search filters"}
              aria-label={filterLabel || "Search filters"}
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
              title={clearLabel || "Clear search"}
              aria-label={clearLabel || "Clear search"}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Menu */}
      {showFilterMenu && variant === 'enhanced' && (
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
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {availableFilters.types.map(type => (
                  <label key={type} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={(filters.types || []).includes(type)}
                      onChange={() => handleFilterChange('types', type)}
                      className="mr-2 h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="capitalize">{type.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-2 block">Category</label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {availableFilters.categories.map(category => (
                  <label key={category} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={(filters.categories || []).includes(category)}
                      onChange={() => handleFilterChange('categories', category)}
                      className="mr-2 h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Chapters */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-2 block">Chapter</label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {availableFilters.chapters.slice(0, 10).map(chapter => (
                  <label key={chapter} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={(filters.chapters || []).includes(chapter)}
                      onChange={() => handleFilterChange('chapters', chapter)}
                      className="mr-2 h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Chapter {chapter}</span>
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
          {query.length === 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recent Searches
                </span>
                <History className="h-3 w-3 text-gray-400" />
              </div>
              <div className="space-y-1">
                {searchHistory.slice(0, 5).map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionSelect({ text: term, type: 'recent' })}
                    className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors flex items-center"
                  >
                    <Clock className="w-3 h-3 text-gray-400 mr-2" />
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className={`
                    w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors flex items-center
                    ${selectedSuggestionIndex === index ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
                  `}
                >
                  {suggestion.type === 'popular' ? (
                    <TrendingUp className="w-4 h-4 text-orange-400 mr-3" />
                  ) : suggestion.type === 'recent' ? (
                    <Clock className="w-4 h-4 text-gray-400 mr-3" />
                  ) : (
                    <Search className="w-4 h-4 text-gray-400 mr-3" />
                  )}
                  <span className="truncate flex-1">{suggestion.text}</span>
                  {suggestion.count && (
                    <span className="text-xs text-gray-400 ml-2">
                      {suggestion.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Instant results */}
          {showInstantResults && instantResults.length > 0 && (
            <div className="border-t border-gray-100 p-2">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2">
                Quick Results
              </div>
              {instantResults.map((result, index) => {
                const suggestionIndex = suggestions.length + index;
                return (
                  <button
                    key={result.id}
                    onClick={() => onResultSelect?.(result)}
                    className={`
                      w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors
                      ${selectedSuggestionIndex === suggestionIndex ? 'bg-blue-50' : ''}
                    `}
                  >
                    <div className="flex items-start">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {result.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center space-x-2">
                          <span className="capitalize bg-gray-100 px-1.5 py-0.5 rounded">
                            {result.type}
                          </span>
                          {result.chapter && (
                            <span>Ch. {result.chapter}</span>
                          )}
                          {result.relevanceScore && (
                            <span className="text-green-600">
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
});

OptimizedSearchBar.displayName = 'OptimizedSearchBar';

export default OptimizedSearchBar;

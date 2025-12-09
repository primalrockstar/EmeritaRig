import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Filter, ArrowLeft, Mic, MicOff } from 'lucide-react';
import { 
  optimizedSearchEngine, 
  SearchResult, 
  SearchFilters, 
  SearchSuggestion 
} from '../utils/optimized-search';

interface MobileSearchBarProps {
  placeholder?: string;
  onSearch: (query: string, results: SearchResult[]) => void;
  onResultSelect?: (result: SearchResult) => void;
  onClose?: () => void;
  showBackButton?: boolean;
  showVoiceSearch?: boolean;
  autoFocus?: boolean;
  className?: string;
}

const MobileSearchBar: React.FC<MobileSearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  onResultSelect,
  onClose,
  showBackButton = false,
  showVoiceSearch = true,
  autoFocus = true,
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [instantResults, setInstantResults] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recentSearches] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number>();
  const recognitionRef = useRef<any>(null);

  // Initialize voice recognition
  useEffect(() => {
    if (!showVoiceSearch) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      const recognition = recognitionRef.current;
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        if (transcript.trim()) {
          handleSearch(transcript);
        }
      };

      recognition.onerror = () => {
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

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Small delay to ensure proper focus on mobile
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus]);

  // Debounced suggestions update
  const updateSuggestions = useCallback((searchQuery: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      if (searchQuery.length >= 2) {
        const newSuggestions = optimizedSearchEngine.getSearchSuggestions(searchQuery, 6);
        setSuggestions(newSuggestions);
        
        const results = optimizedSearchEngine.search(searchQuery, {}, { limit: 3, includeSnippets: false });
        setInstantResults(results);
      } else if (searchQuery.length === 0) {
        const defaultSuggestions = optimizedSearchEngine.getSearchSuggestions('', 6);
        setSuggestions(defaultSuggestions);
        setInstantResults([]);
      } else {
        setSuggestions([]);
        setInstantResults([]);
      }
    }, 200); // Faster on mobile
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    updateSuggestions(value);
  };

  const handleSearch = useCallback((searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;

    setLoading(true);
    setShowSuggestions(false);

    try {
      const results = optimizedSearchEngine.search(finalQuery, {}, {
        limit: 50,
        includeSnippets: true,
        fuzzyMatch: true
      });
      
      onSearch(finalQuery, results);
    } catch (error) {
      console.error('Mobile search failed:', error);
    } finally {
      setLoading(false);
    }
  }, [query, onSearch]);

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
  };

  const handleResultSelect = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
    setShowSuggestions(false);
  };

  const toggleVoiceSearch = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Voice search failed:', error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-white z-50 flex flex-col ${className}`}>
      {/* Header with search input */}
      <div className="flex items-center p-4 border-b border-gray-200 bg-white">
        {showBackButton && (
          <button
            onClick={onClose}
            className="mr-3 p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Close search"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholder}
            className={`
              w-full pl-10 pr-20 py-3 text-lg border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${isListening ? 'ring-2 ring-red-500 border-red-300' : ''}
            `}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          
          <div className="absolute inset-y-0 right-3 flex items-center space-x-2">
            {showVoiceSearch && recognitionRef.current && (
              <button
                onClick={toggleVoiceSearch}
                className={`p-1 rounded transition-colors ${
                  isListening 
                    ? 'text-red-600 bg-red-100' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                aria-label={isListening ? "Stop voice search" : "Start voice search"}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            )}
            
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setSuggestions([]);
                  setInstantResults([]);
                  inputRef.current?.focus();
                }}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search suggestions and results */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {showSuggestions && (
          <div className="bg-white">
            {/* Recent searches when no query */}
            {query.length === 0 && recentSearches.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Searches</h3>
                <div className="space-y-2">
                  {recentSearches.slice(0, 5).map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionSelect({ text: term, type: 'recent' })}
                      className="w-full text-left p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center"
                    >
                      <Search className="h-4 w-4 text-gray-400 mr-3" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Suggestions</h3>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="w-full text-left p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center"
                    >
                      <Search className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="flex-1">{suggestion.text}</span>
                      {suggestion.type === 'popular' && (
                        <span className="text-xs text-orange-500 bg-orange-100 px-2 py-1 rounded">
                          Popular
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Instant results */}
            {instantResults.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Results</h3>
                <div className="space-y-3">
                  {instantResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultSelect(result)}
                      className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                    >
                      <div className="font-medium text-gray-900 mb-1">{result.title}</div>
                      <div className="text-sm text-gray-600 line-clamp-2">{result.snippet}</div>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                          {result.type.replace('-', ' ')}
                        </span>
                        {result.chapter && (
                          <span className="text-xs text-gray-500">Chapter {result.chapter}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {query.length > 0 && suggestions.length === 0 && instantResults.length === 0 && !loading && (
              <div className="p-8 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg font-medium mb-1">No results found</p>
                <p className="text-sm">Try different keywords or check spelling</p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
                <p className="text-gray-500">Searching...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSearchBar;

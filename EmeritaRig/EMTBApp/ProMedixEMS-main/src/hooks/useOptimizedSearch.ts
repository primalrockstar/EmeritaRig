import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  optimizedSearchEngine, 
  SearchResult, 
  SearchFilters, 
  SearchSuggestion 
} from '../utils/optimized-search';

export interface UseOptimizedSearchOptions {
  debounceMs?: number;
  maxSuggestions?: number;
  enableInstantResults?: boolean;
  enableCaching?: boolean;
  enableHistory?: boolean;
}

export interface UseOptimizedSearchReturn {
  // State
  query: string;
  results: SearchResult[];
  suggestions: SearchSuggestion[];
  instantResults: SearchResult[];
  loading: boolean;
  error: string | null;
  filters: SearchFilters;
  searchHistory: string[];
  
  // Actions
  setQuery: (query: string) => void;
  search: (query?: string) => Promise<void>;
  updateSuggestions: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  clearFilters: () => void;
  clearCache: () => void;
  clearHistory: () => void;
  
  // Metrics
  searchTime: number;
  resultCount: number;
  cacheHitRate: number;
}

export const useOptimizedSearch = (options: UseOptimizedSearchOptions = {}): UseOptimizedSearchReturn => {
  const {
    debounceMs = 300,
    maxSuggestions = 8,
    enableInstantResults = true,
    enableCaching = true,
    enableHistory = true
  } = options;

  // State
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [instantResults, setInstantResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // Metrics
  const [searchTime, setSearchTime] = useState(0);
  const [resultCount, setResultCount] = useState(0);
  const [cacheHits, setCacheHits] = useState(0);
  const [totalSearches, setTotalSearches] = useState(0);

  // Refs
  const debounceRef = useRef<number>();
  const abortControllerRef = useRef<AbortController>();
  const searchStartTime = useRef<number>(0);

  // Load search history on mount
  useEffect(() => {
    if (enableHistory) {
      const history = optimizedSearchEngine.getRecentSearches(20);
      setSearchHistory(history);
    }
  }, [enableHistory]);

  // Debounced suggestions update
  const updateSuggestions = useCallback((searchQuery: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    debounceRef.current = window.setTimeout(async () => {
      if (signal.aborted) return;

      try {
        if (searchQuery.length >= 2) {
          const newSuggestions = optimizedSearchEngine.getSearchSuggestions(
            searchQuery, 
            maxSuggestions
          );
          
          if (!signal.aborted) {
            setSuggestions(newSuggestions);
            
            if (enableInstantResults) {
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
      } catch (err) {
        if (!signal.aborted) {
          setError(err instanceof Error ? err.message : 'Search suggestions failed');
        }
      }
    }, debounceMs);
  }, [filters, maxSuggestions, enableInstantResults, debounceMs]);

  // Main search function
  const search = useCallback(async (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) {
      setResults([]);
      setResultCount(0);
      return;
    }

    setLoading(true);
    setError(null);
    searchStartTime.current = performance.now();

    try {
      const searchResults = optimizedSearchEngine.search(finalQuery, filters, {
        limit: 100,
        includeSnippets: true,
        fuzzyMatch: true
      });
      
      const endTime = performance.now();
      const duration = endTime - searchStartTime.current;
      
      setResults(searchResults);
      setResultCount(searchResults.length);
      setSearchTime(duration);
      setTotalSearches(prev => prev + 1);
      
      // Update search history
      if (enableHistory) {
        const updatedHistory = [
          finalQuery, 
          ...searchHistory.filter(h => h !== finalQuery)
        ].slice(0, 20);
        setSearchHistory(updatedHistory);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
      setResultCount(0);
    } finally {
      setLoading(false);
    }
  }, [query, filters, searchHistory, enableHistory]);

  // Clear functions
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearCache = useCallback(() => {
    optimizedSearchEngine.clearCache();
    setCacheHits(0);
    setTotalSearches(0);
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    // Note: This doesn't clear the engine's history, just the local state
  }, []);

  // Calculate cache hit rate
  const cacheHitRate = totalSearches > 0 ? (cacheHits / totalSearches) * 100 : 0;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // State
    query,
    results,
    suggestions,
    instantResults,
    loading,
    error,
    filters,
    searchHistory,
    
    // Actions
    setQuery,
    search,
    updateSuggestions,
    setFilters,
    clearFilters,
    clearCache,
    clearHistory,
    
    // Metrics
    searchTime,
    resultCount,
    cacheHitRate
  };
};

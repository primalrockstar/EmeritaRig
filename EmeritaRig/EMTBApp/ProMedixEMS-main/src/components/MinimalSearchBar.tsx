import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchSuggestion {
  text: string;
  type: string;
}

interface MinimalSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const MinimalSearchBar: React.FC<MinimalSearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [suggestions] = useState<SearchSuggestion[]>([
    { text: 'CPR', type: 'protocol' },
    { text: 'Airway', type: 'protocol' },
    { text: 'Trauma', type: 'protocol' },
    { text: 'Medications', type: 'category' },
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 1);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    onSearch(suggestion.text);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={inputRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.length > 1 && setShowSuggestions(true)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-lg"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setShowSuggestions(false);
                inputRef.current?.focus();
              }}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* Simple Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          <div className="py-2">
            {suggestions
              .filter(suggestion => suggestion.text.toLowerCase().includes(query.toLowerCase()))
              .slice(0, 5)
              .map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center"
                >
                  <Search className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="truncate">{suggestion.text}</span>
                  <span className="ml-auto text-xs text-gray-400 capitalize">{suggestion.type}</span>
                </button>
              ))}
            {suggestions.filter(suggestion => suggestion.text.toLowerCase().includes(query.toLowerCase())).length === 0 && (
              <div className="px-4 py-2 text-gray-500 text-sm">No suggestions found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalSearchBar;

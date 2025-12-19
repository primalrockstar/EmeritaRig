// Optimized EMT-B Search Engine
// Performance-focused implementation with proper indexing and caching

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'flashcard' | 'study-notes' | 'calculator' | 'medication' | 'protocol' | 'scenario' | 'chapter';
  category: string;
  chapter?: number;
  module?: number;
  url: string;
  relevanceScore: number;
  snippet: string;
  tags?: string[];
  lastUpdated?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

export interface SearchFilters {
  types?: string[];
  chapters?: number[];
  modules?: number[];
  categories?: string[];
  difficulties?: string[];
  minScore?: number;
  dateRange?: {
    start?: string;
    end?: string;
  };
}

export interface SearchSuggestion {
  text: string;
  type: 'term' | 'content' | 'filter' | 'recent' | 'popular';
  category?: string;
  count?: number;
}

interface IndexedContent {
  id: string;
  title: string;
  content: string;
  type: string;
  category: string;
  chapter?: number;
  module?: number;
  url: string;
  tags?: string[];
  keywords: string[];
  titleWords: string[];
  lastUpdated?: string;
  difficulty?: string;
}

interface SearchIndex {
  words: Map<string, Set<string>>; // word -> document IDs
  documents: Map<string, IndexedContent>; // document ID -> content
  suggestions: Map<string, number>; // suggestion -> frequency
}

class OptimizedSearchEngine {
  private index: SearchIndex;
  private isIndexed = false;
  private searchHistory: string[] = [];
  private popularSearches: Map<string, number> = new Map();
  private cache: Map<string, SearchResult[]> = new Map();
  private readonly MAX_CACHE_SIZE = 100;
  private readonly MAX_HISTORY_SIZE = 50;

  constructor() {
    this.index = {
      words: new Map(),
      documents: new Map(),
      suggestions: new Map()
    };
    this.loadSearchHistory();
    this.initializeAsync();
  }

  private async initializeAsync() {
    try {
      await this.buildIndex();
      this.isIndexed = true;
    } catch (error) {
      console.warn('Search index initialization failed:', error);
    }
  }

  private async buildIndex() {
    const content = await this.loadContent();
    
    // Clear existing index
    this.index.words.clear();
    this.index.documents.clear();
    this.index.suggestions.clear();

    // Build inverted index
    content.forEach(item => {
      const keywords = this.extractKeywords(item.content);
      const titleWords = this.extractKeywords(item.title);
      
      const indexedItem: IndexedContent = {
        ...item,
        keywords,
        titleWords
      };

      this.index.documents.set(item.id, indexedItem);

      // Index all words
      [...keywords, ...titleWords, ...(item.tags || [])].forEach(word => {
        const normalizedWord = word.toLowerCase();
        if (!this.index.words.has(normalizedWord)) {
          this.index.words.set(normalizedWord, new Set());
        }
        this.index.words.get(normalizedWord)!.add(item.id);
      });

      // Build suggestion index
      [item.title, item.category, ...(item.tags || [])].forEach(suggestion => {
        const count = this.index.suggestions.get(suggestion) || 0;
        this.index.suggestions.set(suggestion, count + 1);
      });
    });
  }

  private async loadContent(): Promise<IndexedContent[]> {
    // This would be replaced with actual content loading
    // For now, return sample data
    return [
      {
        id: 'sample-1',
        title: 'Airway Management Basics',
        content: 'Basic airway management techniques for EMT-B level care...',
        type: 'study-notes',
        category: 'Airway',
        chapter: 11,
        module: 3,
        url: '/study/chapter-11',
        tags: ['airway', 'breathing', 'emergency'],
        keywords: [],
        titleWords: [],
        difficulty: 'basic'
      }
      // More content would be loaded here
    ];
  }

  public search(query: string, filters?: SearchFilters, options?: {
    limit?: number;
    includeSnippets?: boolean;
    fuzzyMatch?: boolean;
  }): SearchResult[] {
    if (!this.isIndexed) {
      console.warn('Search index not ready');
      return [];
    }

    const { limit = 50, includeSnippets = true, fuzzyMatch = true } = options || {};
    
    // Check cache first
    const cacheKey = this.createCacheKey(query, filters, options);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    // Update search history
    this.addToSearchHistory(query);

    const queryTerms = this.extractKeywords(normalizedQuery);
    const documentScores = new Map<string, number>();

    // Score documents based on term matches
    queryTerms.forEach(term => {
      const matchingDocs = this.findMatchingDocuments(term, fuzzyMatch);
      matchingDocs.forEach(docId => {
        const currentScore = documentScores.get(docId) || 0;
        const doc = this.index.documents.get(docId);
        if (doc) {
          const termScore = this.calculateTermScore(doc, term, normalizedQuery);
          documentScores.set(docId, currentScore + termScore);
        }
      });
    });

    // Convert to results and apply filters
    let results: SearchResult[] = Array.from(documentScores.entries())
      .map(([docId, score]) => {
        const doc = this.index.documents.get(docId)!;
        return {
          id: doc.id,
          title: doc.title,
          content: doc.content,
          type: doc.type as any,
          category: doc.category,
          chapter: doc.chapter,
          module: doc.module,
          url: doc.url,
          relevanceScore: score,
          snippet: includeSnippets ? this.createSnippet(doc.content, normalizedQuery) : '',
          tags: doc.tags,
          lastUpdated: doc.lastUpdated,
          difficulty: doc.difficulty as any
        } as SearchResult;
      })
      .filter(result => result.relevanceScore > 0);

    // Apply filters
    if (filters) {
      results = this.applyFilters(results, filters);
    }

    // Sort by relevance
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Limit results
    results = results.slice(0, limit);

    // Cache results
    this.cacheResults(cacheKey, results);

    return results;
  }

  private findMatchingDocuments(term: string, fuzzyMatch: boolean): Set<string> {
    const matches = new Set<string>();
    
    // Exact match
    const exactMatch = this.index.words.get(term);
    if (exactMatch) {
      exactMatch.forEach(docId => matches.add(docId));
    }

    // Fuzzy matching
    if (fuzzyMatch && term.length > 3) {
      this.index.words.forEach((docIds, indexedTerm) => {
        if (this.isFuzzyMatch(term, indexedTerm)) {
          docIds.forEach(docId => matches.add(docId));
        }
      });
    }

    return matches;
  }

  private isFuzzyMatch(term: string, indexedTerm: string): boolean {
    // Simple fuzzy matching - can be improved with Levenshtein distance
    if (indexedTerm.includes(term) || term.includes(indexedTerm)) {
      return true;
    }
    
    // Check if terms start with same prefix
    if (term.length > 2 && indexedTerm.startsWith(term.substring(0, 3))) {
      return true;
    }

    return false;
  }

  private calculateTermScore(doc: IndexedContent, term: string, fullQuery: string): number {
    let score = 0;
    const titleLower = doc.title.toLowerCase();
    const contentLower = doc.content.toLowerCase();
    const categoryLower = doc.category.toLowerCase();

    // Exact phrase match gets highest score
    if (titleLower.includes(fullQuery)) score += 100;
    if (contentLower.includes(fullQuery)) score += 50;

    // Title matches are more important
    if (titleLower.includes(term)) score += 25;
    if (doc.titleWords.some(word => word.toLowerCase().includes(term))) score += 20;

    // Content matches
    if (contentLower.includes(term)) score += 10;
    if (doc.keywords.some(word => word.toLowerCase().includes(term))) score += 15;

    // Category and tag matches
    if (categoryLower.includes(term)) score += 15;
    if (doc.tags?.some(tag => tag.toLowerCase().includes(term))) score += 20;

    // Boost for document type relevance
    if (doc.type === 'protocol' && (term.includes('protocol') || term.includes('procedure'))) score += 10;
    if (doc.type === 'medication' && (term.includes('drug') || term.includes('med'))) score += 10;

    return score;
  }

  private applyFilters(results: SearchResult[], filters: SearchFilters): SearchResult[] {
    let filtered = results;

    if (filters.types?.length) {
      filtered = filtered.filter(r => filters.types!.includes(r.type));
    }

    if (filters.chapters?.length) {
      filtered = filtered.filter(r => r.chapter && filters.chapters!.includes(r.chapter));
    }

    if (filters.modules?.length) {
      filtered = filtered.filter(r => r.module && filters.modules!.includes(r.module));
    }

    if (filters.categories?.length) {
      filtered = filtered.filter(r => 
        filters.categories!.some(cat => 
          r.category.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    if (filters.difficulties?.length) {
      filtered = filtered.filter(r => 
        r.difficulty && filters.difficulties!.includes(r.difficulty)
      );
    }

    if (filters.minScore && filters.minScore > 0) {
      filtered = filtered.filter(r => r.relevanceScore >= filters.minScore!);
    }

    return filtered;
  }

  public getSearchSuggestions(query: string, limit: number = 8): SearchSuggestion[] {
    const normalizedQuery = query.toLowerCase().trim();
    const suggestions: SearchSuggestion[] = [];

    if (!normalizedQuery) {
      // Return popular and recent searches when no query
      const popular = this.getPopularSearches(limit / 2);
      const recent = this.getRecentSearches(limit / 2);
      
      return [
        ...popular.map(text => ({ text, type: 'popular' as const })),
        ...recent.map(text => ({ text, type: 'recent' as const }))
      ];
    }

    // Get matching suggestions from index
    const matches = new Map<string, number>();
    
    this.index.suggestions.forEach((count, suggestion) => {
      if (suggestion.toLowerCase().includes(normalizedQuery)) {
        matches.set(suggestion, count);
      }
    });

    // Convert to suggestion objects and sort by frequency
    Array.from(matches.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .forEach(([text, count]) => {
        suggestions.push({
          text,
          type: 'term',
          count
        });
      });

    return suggestions;
  }

  public getPopularSearches(limit: number = 5): string[] {
    return Array.from(this.popularSearches.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([term]) => term);
  }

  public getRecentSearches(limit: number = 5): string[] {
    return this.searchHistory.slice(-limit).reverse();
  }

  public getAvailableFilters(): {
    types: string[];
    categories: string[];
    chapters: number[];
    modules: number[];
    difficulties: string[];
  } {
    const types = new Set<string>();
    const categories = new Set<string>();
    const chapters = new Set<number>();
    const modules = new Set<number>();
    const difficulties = new Set<string>();

    this.index.documents.forEach(doc => {
      types.add(doc.type);
      categories.add(doc.category);
      if (doc.chapter) chapters.add(doc.chapter);
      if (doc.module) modules.add(doc.module);
      if (doc.difficulty) difficulties.add(doc.difficulty);
    });

    return {
      types: Array.from(types).sort(),
      categories: Array.from(categories).sort(),
      chapters: Array.from(chapters).sort((a, b) => a - b),
      modules: Array.from(modules).sort((a, b) => a - b),
      difficulties: Array.from(difficulties).sort()
    };
  }

  private addToSearchHistory(query: string) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || trimmedQuery.length < 2) return;

    // Remove if already exists
    const existingIndex = this.searchHistory.indexOf(trimmedQuery);
    if (existingIndex > -1) {
      this.searchHistory.splice(existingIndex, 1);
    }

    // Add to beginning
    this.searchHistory.unshift(trimmedQuery);

    // Limit size
    if (this.searchHistory.length > this.MAX_HISTORY_SIZE) {
      this.searchHistory = this.searchHistory.slice(0, this.MAX_HISTORY_SIZE);
    }

    // Update popular searches
    const currentCount = this.popularSearches.get(trimmedQuery) || 0;
    this.popularSearches.set(trimmedQuery, currentCount + 1);

    // Save to localStorage
    this.saveSearchHistory();
  }

  private loadSearchHistory() {
    try {
      const saved = localStorage.getItem('emtb_search_history');
      if (saved) {
        this.searchHistory = JSON.parse(saved);
      }

      const savedPopular = localStorage.getItem('emtb_popular_searches');
      if (savedPopular) {
        const popular = JSON.parse(savedPopular);
        this.popularSearches = new Map(popular);
      }
    } catch (error) {
      console.warn('Failed to load search history:', error);
    }
  }

  private saveSearchHistory() {
    try {
      localStorage.setItem('emtb_search_history', JSON.stringify(this.searchHistory));
      localStorage.setItem('emtb_popular_searches', JSON.stringify(Array.from(this.popularSearches.entries())));
    } catch (error) {
      console.warn('Failed to save search history:', error);
    }
  }

  private createCacheKey(query: string, filters?: SearchFilters, options?: any): string {
    return JSON.stringify({ query, filters, options });
  }

  private cacheResults(key: string, results: SearchResult[]) {
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, results);
  }

  private createSnippet(content: string, query: string, maxLength: number = 150): string {
    const queryLower = query.toLowerCase();
    const contentLower = content.toLowerCase();
    const index = contentLower.indexOf(queryLower);

    if (index === -1) {
      return content.length <= maxLength ? content : content.slice(0, maxLength) + '...';
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + query.length + 50);
    
    let snippet = content.slice(start, end);
    
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';

    return snippet;
  }

  private extractKeywords(text: string): string[] {
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those'
    ]);

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .slice(0, 20); // Limit keywords per document
  }

  public clearCache() {
    this.cache.clear();
  }

  public reindex() {
    this.isIndexed = false;
    this.clearCache();
    return this.initializeAsync();
  }
}

// Export singleton instance
export const optimizedSearchEngine = new OptimizedSearchEngine();
export default optimizedSearchEngine;

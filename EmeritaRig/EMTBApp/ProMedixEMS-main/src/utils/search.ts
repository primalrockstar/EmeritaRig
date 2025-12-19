// ProMedix EMS Search Engine (clean minimal version)
export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'flashcard' | 'study-notes' | 'calculator' | 'medication' | 'protocol' | 'scenario';
  category: string;
  chapter?: number;
  url: string;
  relevanceScore: number;
  snippet: string;
  tags?: string[];
}

export interface SearchFilters {
  types: string[];
  chapters: number[];
  categories: string[];
  minScore: number;
}

interface SearchableContent {
  id: string;
  title: string;
  content: string;
  type: string;
  category: string;
  chapter?: number;
  url: string;
  tags?: string[];
}

class SearchEngine {
  private searchableContent: SearchableContent[] = [];
  private isIndexed = false;
  private indexingPromise: Promise<void> | null = null;

  constructor() {
    // Start indexing immediately
    this.indexingPromise = this.indexContent();
  }

  private async ensureIndexed() {
    if (this.indexingPromise) {
      await this.indexingPromise;
      this.indexingPromise = null;
    }
  }

  private async indexContent() {
    // Index all platform content
    const content: SearchableContent[] = [];

    try {
      // Import and index quiz questions
      const { enhancedQuizModules, ENHANCED_QUIZ_STATS } = await import('../data/enhanced-quiz-system');
      const { allScenarioQuestions } = await import('../data/scenario-questions');
      
      // Index knowledge questions from enhanced quiz modules
      enhancedQuizModules.forEach((module) => {
        module.chapters.forEach((chapter) => {
          chapter.questions.forEach((question) => {
            content.push({
              id: question.id,
              title: question.question.substring(0, 100),
              content: `${question.question} ${question.explanation || ''} ${question.options.join(' ')}`,
              type: 'study-notes',
              category: question.category || module.title,
              chapter: chapter.id,
              url: '/enhanced-quiz',
              tags: question.tags || []
            });
          });
        });
      });

      // Index scenario questions
      allScenarioQuestions.forEach((scenario) => {
        content.push({
          id: scenario.id,
          title: scenario.scenario ? scenario.scenario.substring(0, 100) : scenario.question.substring(0, 100),
          content: `${scenario.scenario || ''} ${scenario.question} ${scenario.explanation || ''} ${scenario.options.join(' ')}`,
          type: 'scenario',
          category: scenario.category || 'Scenario Practice',
          chapter: scenario.chapter,
          url: '/enhanced-quiz',
          tags: scenario.tags || []
        });
      });

      // Index medications
      const medicationTopics = [
        'Aspirin - Antiplatelet for cardiac emergencies',
        'Nitroglycerin - Vasodilator for chest pain',
        'Epinephrine - For severe allergic reactions and cardiac arrest',
        'Albuterol - Bronchodilator for respiratory emergencies',
        'Oral Glucose - For hypoglycemia',
        'Activated Charcoal - For poisoning/overdose',
        'Naloxone (Narcan) - Opioid reversal agent',
        'Oxygen - Primary treatment for hypoxia'
      ];

      medicationTopics.forEach((med, idx) => {
        const [name, desc] = med.split(' - ');
        content.push({
          id: `med-${idx}`,
          title: name,
          content: desc,
          type: 'medication',
          category: 'Pharmacology',
          chapter: 7,
          url: '/study-notes',
          tags: ['medication', 'pharmacology', name.toLowerCase()]
        });
      });

      // Index protocols
      const protocolTopics = [
        { title: 'CPR Protocol', content: 'Cardiopulmonary resuscitation for cardiac arrest', category: 'Cardiac' },
        { title: 'Airway Management', content: 'Basic airway techniques, positioning, suctioning, adjuncts', category: 'Airway' },
        { title: 'Trauma Assessment', content: 'Scene safety, primary survey, secondary assessment, DCAP-BTLS', category: 'Trauma' },
        { title: 'Medical Assessment', content: 'OPQRST, SAMPLE history, vital signs, chief complaint', category: 'Medical' },
        { title: 'Bleeding Control', content: 'Direct pressure, tourniquets, hemostatic agents', category: 'Trauma' },
        { title: 'Shock Management', content: 'Recognition and treatment of hypoperfusion', category: 'Medical' },
        { title: 'Spinal Immobilization', content: 'C-spine precautions, backboarding, securing patient', category: 'Trauma' },
        { title: 'Respiratory Emergencies', content: 'Dyspnea assessment, oxygen therapy, assisted ventilation', category: 'Respiratory' }
      ];

      protocolTopics.forEach((protocol, idx) => {
        content.push({
          id: `protocol-${idx}`,
          title: protocol.title,
          content: protocol.content,
          type: 'protocol',
          category: protocol.category,
          url: '/national-protocols',
          tags: ['protocol', protocol.category.toLowerCase()]
        });
      });

      // Index calculators
      const calculatorTopics = [
        { title: 'APGAR Score', content: 'Newborn assessment: Appearance, Pulse, Grimace, Activity, Respiration', category: 'Assessment' },
        { title: 'Glasgow Coma Scale', content: 'Level of consciousness: Eye opening, Verbal response, Motor response', category: 'Assessment' },
        { title: 'Pediatric Dosing', content: 'Weight-based medication calculations for children', category: 'Pediatrics' },
        { title: 'IV Drip Rates', content: 'Calculate drops per minute for IV fluids', category: 'Skills' },
        { title: 'AVPU Scale', content: 'Alert, Verbal, Painful, Unresponsive assessment', category: 'Assessment' }
      ];

      calculatorTopics.forEach((calc, idx) => {
        content.push({
          id: `calc-${idx}`,
          title: calc.title,
          content: calc.content,
          type: 'calculator',
          category: calc.category,
          url: '/tools',
          tags: ['calculator', 'assessment', calc.title.toLowerCase()]
        });
      });

      this.searchableContent = content;
      console.log(`✅ Search index built: ${content.length} items indexed`);
      this.isIndexed = true;
    } catch (error) {
      console.error('Search indexing error:', error);
      // Fallback to minimal content
      this.searchableContent = [
        {
          id: 'airway-1',
          title: 'Airway Management',
          content: 'Basic airway management techniques including positioning, suctioning, and adjuncts',
          type: 'study-notes',
          category: 'Airway',
          chapter: 1,
          url: '/study-notes',
          tags: ['airway', 'breathing', 'basic']
        }
      ];
      this.isIndexed = true;
    }
  }

  async search(query: string, filters?: SearchFilters): Promise<SearchResult[]> {
    await this.ensureIndexed();
    
    const q = (query || '').trim();
    if (q.length < 2) return [];

    const full = q.toLowerCase();
    const terms = this.extractKeywords(full);

    let results = this.searchableContent
      .map((item) => ({
        ...item,
        relevanceScore: this.score(item, terms, full),
      }))
      .filter((i) => i.relevanceScore > 0);

    if (filters) {
      const { types = [], chapters = [], categories = [], minScore = 0 } = filters;
      if (types.length) results = results.filter((i) => types.includes(i.type));
      if (chapters.length) results = results.filter((i) => i.chapter && chapters.includes(i.chapter));
      if (categories.length) results = results.filter((i) => categories.some((c) => i.category.toLowerCase().includes(c.toLowerCase())));
      if (minScore > 0) results = results.filter((i) => i.relevanceScore >= minScore);
    }

    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return results.slice(0, 50).map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      type: item.type as any,
      category: item.category,
      chapter: item.chapter,
      url: item.url,
      relevanceScore: item.relevanceScore,
      snippet: this.snippet(item.content, q),
      tags: item.tags,
    }));
  }

  async getSearchSuggestions(query: string): Promise<string[]> {
    await this.ensureIndexed();
    
    const q = (query || '').trim();
    if (q.length < 2) return [];
    const ql = q.toLowerCase();

    const set = new Set<string>();
    this.searchableContent.forEach((item) => {
      if (item.title.toLowerCase().includes(ql)) set.add(item.title);
      if (item.category.toLowerCase().includes(ql)) set.add(item.category);
      item.tags?.forEach((t) => t.toLowerCase().includes(ql) && set.add(t));
    });

    const common = ['airway management', 'cpr', 'vital signs', 'trauma assessment', 'oxygen therapy'];
    common.forEach((c) => c.includes(ql) && set.add(c));

    return Array.from(set).slice(0, 8);
  }

  getPopularSearches(): string[] {
    return ['airway management', 'cardiac arrest', 'trauma assessment', 'vital signs', 'cpr protocols'];
  }

  private extractKeywords(text: string): string[] {
    const stop = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    return text
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !stop.has(w));
  }

  private score(item: SearchableContent, terms: string[], full: string): number {
    let s = 0;
    const title = item.title.toLowerCase();
    const content = item.content.toLowerCase();
    const tags = (item.tags || []).map((t) => t.toLowerCase());

    if (title.includes(full)) s += 100;
    if (content.includes(full)) s += 50;
    if (tags.some((t) => t.includes(full))) s += 75;

    terms.forEach((t) => {
      if (title.includes(t)) s += 25;
      if (content.includes(t)) s += 10;
      if (tags.some((tg) => tg.includes(t))) s += 20;
      if (item.category.toLowerCase().includes(t)) s += 15;
    });

    return s;
  }

  private snippet(content: string, q: string): string {
    const max = 150;
    const cl = content.toLowerCase();
    const ql = q.toLowerCase();
    const i = cl.indexOf(ql);
    if (i === -1) return content.length <= max ? content : content.slice(0, max) + '...';
    const start = Math.max(0, i - 50);
    const end = Math.min(content.length, i + q.length + 50);
    return (start > 0 ? '...' : '') + content.slice(start, end) + (end < content.length ? '...' : '');
  }
}

export const searchEngine = new SearchEngine();
export default searchEngine;


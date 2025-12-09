export interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
  chapter_id: number;
  difficulty: number;
  image_url?: string;
}

const API_BASE = 'http://localhost:8000/api';

export const getFlashcards = async (category?: string): Promise<Flashcard[]> => {
  const params = category ? `?category=${encodeURIComponent(category)}` : '';
  const res = await fetch(`${API_BASE}/flashcards${params}`);
  if (!res.ok) throw new Error('Failed to fetch flashcards');
  return res.json();
};

export const getCategories = async (): Promise<string[]> => {
  const res = await fetch(`${API_BASE}/flashcards/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};
export interface Category {
  id: number;
  title: string;
  clues_count: number;
}

export interface Clue {
  id: number;
  category: string;
  question: string;
  answer: string;
  value: number;
}

export interface ClueData extends Clue {
  category: Category;
}
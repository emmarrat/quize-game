export interface Clue {
  id: number;
  category: string;
  question: string;
  answer: string;
  value: number;
  isAnswered: boolean;
}

export interface ClueData extends Clue {
  category: Category;
}

export interface ClueCategory {
  id: number;
  title: string;
  clues: ClueData[];
}

export interface ClueCategorySorted extends ClueCategory{
  id: number;
  title: string;
  clues: Clue[];
}

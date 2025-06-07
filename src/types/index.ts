export interface User {
  name: string;
  email: string;
  instagram: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  explanation?: string;
}

export interface Answer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  points: number;
}

export interface GameResult {
  userName: string;
  userEmail: string;
  userInstagram: string;
  score: number;
  correctAnswers: number;
  totalTime: number;
  answers: Answer[];
}

export interface RankingEntry {
  id: number;
  user_name: string;
  user_instagram: string;
  score: number;
  correct_answers: number;
  total_time: number;
  created_at: string;
}
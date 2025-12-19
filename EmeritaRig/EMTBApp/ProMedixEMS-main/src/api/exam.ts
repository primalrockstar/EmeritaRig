import api from './axios';

export interface Question {
  id: string;
  text: string;
  options: { [key: string]: string };
  category?: string;
}

export interface ExamComplete {
  exam_complete: true;
  message: string;
}

export type QuestionOrComplete = Question | ExamComplete;

export interface Feedback {
  correct: boolean;
  explanation: string;
  eloChange: number;
}

export const startExam = async (): Promise<Question> => {
  const response = await api.post('/exam/start');
  return response.data;
};

export const submitAnswer = async (questionId: string, option: string): Promise<Feedback> => {
  const response = await api.post('/exam/submit', { question_id: parseInt(questionId), selected_option: option });
  return response.data;
};

export const getNextQuestion = async (): Promise<QuestionOrComplete> => {
  const response = await api.get('/exam/next');
  return response.data;
};
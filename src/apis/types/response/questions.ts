export interface QuestionResponse {
  id: string;
  question: string;
}

export interface QuestionsResponse {
  questions: QuestionResponse[];
  total: number;
}

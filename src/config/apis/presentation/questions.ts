import {
  QuestionResponse,
  QuestionsResponse,
} from '../types/response/questions';

export class QuestionPresentation implements QuestionResponse {
  question: string;
  id: string;

  private constructor(private response: QuestionResponse) {
    this.question = response.question;
    this.id = response.id;
  }
  static from(response: QuestionResponse) {
    return new QuestionPresentation(response);
  }
}

export class QuestionsPresentation implements QuestionsResponse {
  questions: QuestionResponse[];
  total: number;
  private constructor(private response: QuestionsResponse) {
    this.questions = response.questions;
    this.total = response.total;
  }
  static from(response: QuestionsResponse) {
    return new QuestionsPresentation(response);
  }
}

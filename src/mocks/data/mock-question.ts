import { QuestionResponse } from '@/apis/types/response/questions';
import { faker } from '@faker-js/faker';

const generateData = (): QuestionResponse => {
  return {
    id: faker.string.uuid(),
    question: faker.lorem.sentence(),
  };
};

const mockQuestions = Array.from({ length: 10 }, () => generateData());

export { mockQuestions };

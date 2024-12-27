import { getQuestions } from '@/config/apis/fetchers/questions/get-questions';

export default async function Home() {
  const { data } = await getQuestions();

  return (
    <div>
      <div>No questions available.</div>
    </div>
  );
}

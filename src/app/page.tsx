import { getQuestions } from '@/apis/fetchers/questions/get-questions';

export default async function Home() {
  const { data } = await getQuestions();

  return (
    <div>
      {Array.isArray(data.questions) ? (
        data.questions.map((item) => <div key={item.id}>{item.question}</div>)
      ) : (
        <div>No questions available.</div>
      )}
    </div>
  );
}

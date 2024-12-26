import { getQuestions } from '@/apis/fetchers/questions/get-questions';

export default async function Home() {
  const { data, status } = await getQuestions();
  console.log('data', data);

  return <div>home</div>;
}

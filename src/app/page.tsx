import { getBoard } from '@/config/apis/fetchers/get-board';

export default async function Home() {
  const { data } = await getBoard();
  console.log('data>>>,', data);

  return (
    <div>
      <div>No questions available.</div>
    </div>
  );
}

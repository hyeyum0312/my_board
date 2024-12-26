import { notFound } from 'next/navigation';
import { use } from 'react';

// 게시글 데이터 타입 정의
interface Post {
  id: number;
  title: string;
  content: string;
}

// 게시글 상세 정보를 가져오는 함수
async function fetchPostDetail(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error('게시글을 찾을 수 없습니다.');
  }
  return res.json();
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = use(fetchPostDetail(params.id)); // params.id를 사용하여 게시글 정보 가져오기

  // 게시글이 없으면 404 페이지로 리디렉션
  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

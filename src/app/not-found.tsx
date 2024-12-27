import ErrorFallback from '@/components/ErrorPage';

export default function NotFoundPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ErrorFallback
        title="페이지를 찾을 수 없습니다!"
        message="요청하신 페이지는 존재하지 않거나, 삭제되었을 수 있습니다."
        buttonText="홈으로 돌아가기"
        buttonLink="/"
      />
    </div>
  );
}

import ErrorFallback from '@/components/ErrorPage';

export default function NotFoundPage() {
  return (
    <ErrorFallback
      title="페이지를 찾을 수 없습니다!"
      message="요청하신 페이지는 존재하지 않거나, 삭제되었을 수 있습니다."
      buttonText="새로 고침"
      buttonLink="/"
    />
  );
}

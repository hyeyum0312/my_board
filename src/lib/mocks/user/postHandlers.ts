import { http, delay } from 'msw';

export const postUserHandlers = [
  http.post('/users', async ({ request, res, ctx }) => {
    // 클라이언트 요청 본문 파싱
    const user = await request.json();

    // 응답을 지연시키는 예시 (예: 100ms 후에 응답 반환)
    await delay(100);

    // 사용자 데이터를 응답으로 반환
    return res(
      ctx.status(201),
      ctx.json(user), // 클라이언트가 보낸 사용자 데이터 반환
    );
  }),
];

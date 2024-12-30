import { http } from 'msw';

export const patchUserHandlers = [
  http.patch('/api/users/:id', async ({ request, params, res, ctx }) => {
    const { cartId, orderId } = params; // URL 경로에서 cartId, orderId 추출
    const orderUpdates = await request.json(); // 요청 본문을 JSON 형식으로 파싱

    // 업데이트 후 응답 반환
    return res(
      ctx.status(200), // 응답 상태 코드 설정
      ctx.json({
        message: `Order ${orderId} updated in cart ${cartId}`,
        updatedData: orderUpdates,
      }), // 응답 본문 설정
    );
  }),
];

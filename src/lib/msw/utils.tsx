import { rest } from 'msw'; // 'rest'로 변경
import { HttpResponseResolver } from 'msw';

export const makeHandler = ({
  path,
  resolver,
  method,
}: {
  path: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options';
  resolver: HttpResponseResolver; // 'HttpResponseResolver'는 올바르게 타입이 지정됨
}) => {
  return rest[method ?? 'get'](path, resolver); // 'rest'로 변경
};

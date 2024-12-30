import { MockedRequest } from 'msw';

declare module 'msw' {
  interface MockedRequest {
    json: <T>() => Promise<T>;
  }
}

import { HttpResponseResolver, http } from 'msw';

export const makeHandler = ({
  path,
  resolver,
  method,
}: {
  path: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options';
  resolver: HttpResponseResolver;
}) => {
  return http[method ?? 'get'](path, resolver);
};

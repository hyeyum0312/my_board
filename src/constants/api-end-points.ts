import { ServerEnv } from '@/constants/server-env';

const baseUrl = ServerEnv.backendUrl;

export interface APIEndpoints {
  question: {
    list: {
      method: 'get';
      url: string;
    };
    create: {
      method: 'post';
      url: string;
    };
    delete: {
      method: 'delete';
      url: string;
    };
  };
}

export const APIEndpoints: APIEndpoints = {
  question: {
    list: {
      method: 'get',
      url: `${baseUrl}/questions`, // baseUrl을 포함하여 전체 URL을 구성
    },
    create: {
      method: 'post',
      url: `${baseUrl}/questions/create`, // baseUrl을 포함하여 전체 URL을 구성
    },
    delete: {
      method: 'delete',
      url: `${baseUrl}/questions/:id`, // baseUrl을 포함하여 전체 URL을 구성
    },
  },
} as const;

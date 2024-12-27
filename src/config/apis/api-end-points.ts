import { ServerEnv } from '@/config/env/server-env';

const baseUrl = ServerEnv.backendUrl; // process.env.BACKEND_URL이 올바르게 설정되었는지 확인

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
  board: {
    list: {
      method: 'get';
      url: string;
    };
    create: {
      method: 'post';
      url: string;
    };
    update: {
      method: 'put';
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
      url: `${baseUrl}/questions`,
    },
    create: {
      method: 'post',
      url: `${baseUrl}/questions/create`,
    },
    delete: {
      method: 'delete',
      url: `${baseUrl}/questions/:id`,
    },
  },
  board: {
    list: {
      method: 'get',
      url: process.env.MOCKING === 'true' ? '/board' : `${baseUrl}/board`,
    },
    create: {
      method: 'post',
      url: `${baseUrl}/board/create`,
    },
    update: {
      method: 'put',
      url: `${baseUrl}/board/:id`,
    },
    delete: {
      method: 'delete',
      url: `${baseUrl}/board/:id`,
    },
  },
};

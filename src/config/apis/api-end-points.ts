import { ServerEnv } from '@/config/env/server-env';

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
      url: `${baseUrl}/board`,
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
} as const;

import { ServerEnv } from '@/constants/server-env';

const baseUrl = ServerEnv.backendUrl;

export const APIEndpoints = {
  question: {
    list: {
      method: 'get',
      url: `${baseUrl}/questions`,
    },
  },
} as const;

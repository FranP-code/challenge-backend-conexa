import { request } from '@/common/utils';

export const getUsers = async (
  condition?: {
    email?: string;
  },
  options?: {
    limit?: string;
    page?: string;
  }
) => {
  return await request('get-users', 'GET', 'app', {
    headers: { condition, options }
  });
};

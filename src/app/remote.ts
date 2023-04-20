import { request } from '@/common/utils';

export const getUsers = async (
  condition?: {
    _id?: string;
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

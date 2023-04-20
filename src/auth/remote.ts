import { request } from '@/common/utils';

export const signToken = async (data: any) => {
  return await request('sign-token', 'POST', 'auth', {
    body: { data }
  });
};

export const tokenData = async (data: { authorization: string }) => {
  return await request('token-data', 'GET', 'auth', {
    headers: data
  });
};

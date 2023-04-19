import { request } from '@/common/utils';

export const sign = async (data: any) => {
  return await request('sign', 'POST', 'auth', {
    body: { data: JSON.stringify(data) }
  });
};

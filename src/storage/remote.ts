import { type User, type QueryCondition, type Storage } from '@/common/types';
import { request } from '@/common/utils';

const getUsers = async (condition?: QueryCondition) => {
  return await request('get-users', 'GET', 'store', {
    headers: { condition }
  });
};

const registerUser = async (body: User) => {
  return await request('register-user', 'POST', 'store', { body });
};

export default {
  mutations: {
    registerUser
  },
  queries: {
    getUsers
  }
} satisfies Storage;

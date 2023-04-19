import {
  type Mutations,
  type Options,
  type Queries,
  type QueryCondition,
  type User
} from '@/common/types';
import { request } from '@/common/utils';

const getUsers = async (condition?: QueryCondition, options?: Options) => {
  return await request('get-users', 'GET', 'store', {
    headers: { condition, options }
  });
};

const registerUser = async (body: User) => {
  return await request('register-user', 'POST', 'store', { body });
};

export const mutations = {
  registerUser
} satisfies Mutations;

export const queries = {
  getUsers
} satisfies Queries;

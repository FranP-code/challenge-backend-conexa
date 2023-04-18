import { type Response } from 'node-fetch';

export interface Storage {
  mutations: Mutations;
  queries: Queries;
}

export interface Mutations {
  registerUser: (body: User) => Promise<Response>;
}
export interface Queries {
  getUsers: (condition?: QueryCondition) => Promise<Response>;
}
export interface User {
  email: string;
  name: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type QueryCondition = Object;

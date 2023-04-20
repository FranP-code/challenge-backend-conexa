export interface Storage {
  mutations: Mutations;
  queries: Queries;
}

export interface Mutations {
  registerUser: (body: User) => Promise<User>;
}
export interface Queries {
  getUsers: (condition?: QueryCondition) => Promise<any>;
}
export interface User {
  _id?: string;
  email: string;
  name: string;
  password: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface GetUsersRequiredInput {
  authorization: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type QueryCondition = any;

export interface Options {
  limit?: string;
  page?: string;
}

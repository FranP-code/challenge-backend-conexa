export interface Storage {
  queries: Queries;
}
export interface Queries {
  getUsers: () => Promise<User[]>;
}
export interface User {
  email: string;
  name: string;
  password: string;
}

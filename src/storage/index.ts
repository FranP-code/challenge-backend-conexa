import * as queries from './mongo/queries';
import connection from './mongo/connection';

export const Storage = () => {
  void connection();
  return { queries };
};

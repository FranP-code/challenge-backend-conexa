import { type Storage } from '@/common/types';
import response from '@/network/response';
import { type Request, type Response } from 'express';

export default async (req: Request, res: Response, storage: Storage) => {
  const values = await storage.queries.getUsers();
  console.log(values);
  response.success(res, { hello: 'world' }, 200);
};

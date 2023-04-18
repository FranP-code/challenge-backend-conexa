import { type Storage } from '@/common/types';
import response from '@/network/response';
import { type Request, type Response } from 'express';

export default async (req: Request, res: Response, storage: Storage) => {
  try {
    const values = await storage.queries.getUsers();
    response.success(res, values, 200);
  } catch (error) {
    response.error(res, { error }, 500);
  }
};

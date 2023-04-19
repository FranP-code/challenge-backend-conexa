import { type Request, type Response } from 'express';
import { type User, type Storage } from '@/common/types';
import response from '@/network/response';
import { sign } from '@/auth/remote';
import bcrypt from 'bcrypt';

export default async (req: Request, res: Response, storage: Storage) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error('Missing values email/password');
    }
    const storageResponse = await storage.queries.getUsers({
      email: req.body.email
    });
    const [value] = storageResponse.body as unknown as User[];
    if (!value) {
      throw new Error('User not found');
    }
    const { email, name, password } = value;
    const passwordMatch = await bcrypt.compare(req.body.password, password);
    if (!passwordMatch) {
      throw new Error("Password don't match");
    }
    const token = await sign(value);
    response.success(res, { email, name, token }, 200);
  } catch (error) {
    if (error instanceof Error) {
      response.error(res, { error: error.message }, 400);
      return;
    }
    response.error(res, { error: 'unknown error' }, 500);
  }
};

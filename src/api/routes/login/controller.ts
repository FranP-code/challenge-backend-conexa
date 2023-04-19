import { type Request, type Response } from 'express';
import { type User } from '@/common/types';
import { getUsers } from '@/app/remote';
import { handleError } from '@/common/utils';
import { signToken } from '@/auth/remote';
import bcrypt from 'bcrypt';
import response from '@/network/response';

export default async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error('Missing values email/password');
    }
    const storageResponse = await getUsers({
      email: req.body.email
    });
    const [value] = storageResponse.data as unknown as User[];
    if (!value) {
      throw new Error('User not found');
    }
    const { _id, email, name, password } = value;
    const passwordMatch = await bcrypt.compare(req.body.password, password);
    if (!passwordMatch) {
      throw new Error("Password don't match");
    }
    const { token } = await signToken(_id);
    response.success(res, { email, name, token }, 200);
  } catch (error) {
    handleError(res, error);
  }
};

import { type Request, type Response } from 'express';
import { type User, type UserLoginInput } from '@/common/types';
import { checkObjectType, handleError } from '@/common/utils';
import { getUsers } from '@/app/remote';
import { signToken } from '@/auth/remote';
import bcrypt from 'bcrypt';
import response from '@/network/response';

export default async (req: Request, res: Response) => {
  try {
    checkObjectType<UserLoginInput>({
      email: req.body.email,
      password: req.body.password
    });
    const storageResponse = await getUsers({
      email: req.body.email
    });
    const {
      users: [value]
    } = storageResponse as { users: User[] };
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

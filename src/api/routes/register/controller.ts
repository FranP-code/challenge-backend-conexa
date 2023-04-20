import { type Request, type Response } from 'express';
import { type User } from '@/common/types';
import { checkObjectType, handleError } from '@/common/utils';
import { mutations } from '@/storage/remote';
import response from '@/network/response';

export default async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const data = { email, name, password };
    checkObjectType<User>(data);
    const requestResponse = await mutations.registerUser(data);
    const { email: requestEmail, name: requestName, _id } = requestResponse;
    response.success(res, { _id, email: requestEmail, name: requestName }, 200);
  } catch (error) {
    handleError(res, error);
  }
};

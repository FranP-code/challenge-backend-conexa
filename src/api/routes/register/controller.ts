import { type Request, type Response } from 'express';
import { handleError } from '@/common/utils';
import { mutations } from '@/storage/remote';
import response from '@/network/response';

export default async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const requestResponse = await mutations.registerUser({
      email,
      name,
      password
    });
    const { email: requestEmail, name: requestName, _id } = requestResponse;
    response.success(res, { _id, email: requestEmail, name: requestName }, 200);
  } catch (error) {
    handleError(res, error);
  }
};

import { type GetUsersRequiredInput } from '@/common/types';
import { type Request, type Response } from 'express';
import {
  checkObjectType,
  handleError,
  optionalParseObject
} from '@/common/utils';
import { getUsers } from '@/app/remote';
import { tokenData } from '@/auth/remote';
import response from '@/network/response';

export default async (req: Request, res: Response) => {
  try {
    const { email, limit, page } = req.query;
    const { authorization } = req.headers;
    checkObjectType<GetUsersRequiredInput>({
      authorization
    });
    const tokenDataResponse = await tokenData({
      authorization: authorization as string
    });
    if (tokenDataResponse.id) {
      const {
        users: [user]
      } = await getUsers({ _id: tokenDataResponse.id });
      if (!user) throw new Error('User not found');
    }
    const queryData: Array<Record<string, any>> = [{ email }, { limit, page }];
    const users = {
      users: (await getUsers(...queryData)).users.map((a: any) => ({
        _id: a._id,
        email: a.email,
        name: a.name
      }))
    };
    response.success(res, users, 200);
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, optionalParseObject(error.message));
    } else {
      handleError(res, error);
    }
  }
};

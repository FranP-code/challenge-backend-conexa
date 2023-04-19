import { type Request, type Response } from 'express';
import { getUsers } from '@/app/remote';
import { handleError, optionalParseObject } from '@/common/utils';
import { tokenData } from '@/auth/remote';
import response from '@/network/response';

export default async (req: Request, res: Response) => {
  try {
    const { email, limit, page } = req.query;
    const queryData: Array<Record<string, any>> = [{ email }, { limit, page }];
    const { authorization } = req.headers;
    if (!authorization) throw new Error('No authorization sended');
    const responseData = await tokenData({ authorization });
    if (responseData.status !== 200)
      throw new Error(JSON.stringify(responseData));
    const users = await getUsers(...queryData);
    response.success(res, users, 200);
  } catch (error) {
    if (error instanceof Error) {
      handleError(res, optionalParseObject(error.message));
    } else {
      handleError(res, error);
    }
  }
};

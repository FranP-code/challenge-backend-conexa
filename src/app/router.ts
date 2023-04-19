import { type RequestHandler, Router } from 'express';
import { handleError } from '@/common/utils';
import { queries } from '@/storage/remote';
import response from '@/network/response';

const router = Router();

router.get('/get-users', (async (req, res) => {
  try {
    const { options } = req.headers;
    const optionsValues = options ? JSON.parse(options as string) : {};
    const users = await queries.getUsers(req.headers.condition, optionsValues);
    response.success(res, users, 200);
  } catch (error) {
    handleError(res, error);
  }
}) as RequestHandler);

export default router;

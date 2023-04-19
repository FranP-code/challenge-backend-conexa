import { Router } from 'express';
import { extractToken, handleError } from '@/common/utils';
import config from '@/config';
import jwt from 'jsonwebtoken';
import response from '@/network/response';

const router = Router();

router.post('/sign-token', (req, res) => {
  try {
    const token = jwt.sign({ id: req.body.data }, config.auth.secretValue);
    response.success(res, { token }, 200);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/token-data', (req, res) => {
  try {
    const authorization = req.headers.authorization ?? '';
    const token = extractToken(authorization);
    response.success(
      res,
      { value: jwt.verify(token, config.auth.secretValue) },
      200
    );
  } catch (error) {
    handleError(res, error);
  }
});

export default router;

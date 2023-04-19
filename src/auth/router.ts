import response from '@/network/response';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/sign', (req, res) => {
  try {
    const token = jwt.sign(req.body.data as string, 'secretvalue');
    response.success(res, { token }, 200);
  } catch (error) {
    response.error(res, { error }, 400);
  }
});

export default router;

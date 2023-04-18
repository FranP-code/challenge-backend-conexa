/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { getUsers } from './mongo/queries';
import { queryHandler } from '@/common/utils';
import { registerUser } from './mongo/mutations';

const router = Router();

router.get('/get-users', (req, res) => queryHandler(req, res, getUsers));

router.post('/register-user', (req, res) =>
  queryHandler(req, res, () => registerUser(req.body))
);

export default router;

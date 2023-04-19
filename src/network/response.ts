/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { isProd } from '@/common/utils';
import { type Response } from 'express';

export default {
  error: (res: Response, body: Object, status?: number) => {
    const statusCode = (!isProd() && status) || 500;
    const bodyData = isProd() ? 'Internal Server Error' : body;
    res.status(statusCode).send({
      body: bodyData,
      error: true,
      status: statusCode
    });
  },
  success: (res: Response, body: Object, status: number) => {
    res.status(status).send({
      body,
      error: false,
      status
    });
  }
};

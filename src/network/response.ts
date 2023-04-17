import { isProd } from '@/common/utils';
import { type Response } from 'express';

export default {
  // eslint-disable-next-line @typescript-eslint/ban-types
  error: (res: Response, body: Object, status: number) => {
    const statusCode = (!isProd() && status) || 500;
    const bodyData = isProd() ? 'Internal Server Error' : body;
    res.status(statusCode).send({
      body: bodyData,
      error: true,
      status: statusCode
    });
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  success: (res: Response, body: Object, status: number) => {
    res.status(status).send({
      body,
      error: false,
      status
    });
  }
};

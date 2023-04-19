/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { type Response } from 'express';
import { isProd, optionalParseObject } from '@/common/utils';

export default {
  error: (res: Response, body: Object, status?: number) => {
    const statusCode = (!isProd() && status) || 500;
    const bodyData = isProd()
      ? 'Internal Server Error'
      : optionalParseObject(body);
    res.status(statusCode).send({
      body: bodyData,
      error: true,
      status: statusCode
    });
  },
  success: (res: Response, body: Object, status: number) => {
    let data;
    if (typeof body === 'object' && !Array.isArray(body)) {
      data = body;
    }
    if (typeof body === 'object' && Array.isArray(body)) {
      data = { data: body };
    }
    res.status(status).send({
      ...data,
      error: false,
      status
    });
  }
};

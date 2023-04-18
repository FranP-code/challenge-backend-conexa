import response from '@/network/response';
import { type Request, type Response } from 'express';
import { type MongooseError } from 'mongoose';
import config from '@/config';
import fetch from 'node-fetch';

export const pickRandomValue = (arr: any[]): any =>
  arr[Math.floor(Math.random() * arr.length)];

export const isProd = () => process.env.NODE_ENV === 'production';

export const queryHandler = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/ban-types
  query: (condition?: {}) => Promise<{}>
) => {
  try {
    const queryResponse = await query(req.headers?.condition);
    response.success(res, queryResponse, 200);
  } catch (error) {
    response.error(res, error as MongooseError);
  }
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const removeUndefinedProps = (obj: {}) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  );

export const request = async (
  route: string,
  method: string,
  data?: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    body?: {};
    // eslint-disable-next-line @typescript-eslint/ban-types
    headers?: {};
  }
) => {
  const body = data?.body;
  const headersData = data?.headers ?? {};
  const url = `${config.store.url}/${route}`;
  return await (
    await fetch(url, {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'content-type': 'application/json',
        ...removeUndefinedProps(headersData)
      },
      method
    })
  ).json();
};

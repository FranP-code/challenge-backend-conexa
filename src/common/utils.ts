/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/ban-types */
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
  query: ({}) => Promise<any>
) => {
  try {
    const queryResponse = await query(
      req.headers?.condition ? JSON.parse(req.headers?.condition as string) : {}
    );
    response.success(res, queryResponse, 200);
  } catch (error) {
    response.error(res, error as MongooseError);
  }
};

export const removeUndefinedProps = (obj: {}) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  );
export const stringifyValues = (obj: Record<string, unknown>) => {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = JSON.stringify(value);
  }
  return result;
};

export const request = async (
  route: string,
  method: string,
  service: 'auth' | 'store',
  data?: {
    body?: {};
    headers?: {};
  }
) => {
  const body = data?.body;
  const headersData = data?.headers ?? {};
  const url = `${config[service].url}/${route}`;
  return await (
    await fetch(url, {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...stringifyValues(removeUndefinedProps(headersData))
      },
      method
    })
  ).json();
};

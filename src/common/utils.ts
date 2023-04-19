/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/ban-types */
import { JsonWebTokenError } from 'jsonwebtoken';
import { type MongooseError } from 'mongoose';
import { type Request, type Response } from 'express';
import config from '@/config';
import fetch from 'node-fetch';
import response from '@/network/response';

export const pickRandomValue = (arr: any[]): any =>
  arr[Math.floor(Math.random() * arr.length)];

export const isProd = () => process.env.NODE_ENV === 'production';

export const queryHandler = async (
  req: Request,
  res: Response,
  query: ({}, {}) => Promise<any>
) => {
  try {
    const queryResponse = await query(
      req.headers?.condition
        ? JSON.parse(req.headers?.condition as string)
        : {},
      req.headers?.options ? JSON.parse(req.headers?.options as string) : {}
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
  const result: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = value;
    } else {
      result[key] = value ? JSON.stringify(value) : undefined;
    }
  }
  return result;
};

export const request = async (
  route: string,
  method: string,
  service: 'app' | 'auth' | 'store',
  data?: {
    body?: {};
    headers?: {};
  }
) => {
  const body = data?.body;
  const headersData = data?.headers ?? {};
  const url = `${config[service].url}/${route}`;
  const fetchResult = await fetch(url, {
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...stringifyValues(removeUndefinedProps(headersData))
    },
    method
  });
  if (fetchResult.status >= 400 && fetchResult.status < 600) {
    throw new Error(JSON.stringify((await fetchResult.json()).body));
  }
  return fetchResult.json();
};

export const optionalParseObject = (obj: any) => {
  let errorValue;
  try {
    errorValue = JSON.parse(obj as string);
  } catch (e) {
    errorValue = obj;
  }
  return errorValue;
};

export const handleError = (res: Response, error: unknown) => {
  const errorValue = optionalParseObject(error);

  if (error instanceof Error) {
    response.error(res, { error: errorValue.message }, 400);
    return;
  }
  if (error instanceof JsonWebTokenError) {
    response.error(res, { error: errorValue.name }, 400);
    return;
  }
  response.error(res, error || 'unknown error', 500);
};

export const extractToken = (authorization: string) => {
  const bearerString = 'Bearer ';
  if (!authorization.includes(bearerString)) throw new Error('Invalid format');
  return authorization.replace(bearerString, '');
};

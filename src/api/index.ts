/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-misused-promises */
require('module-alias/register');
import express from 'express';
import { login, register } from './routes';
import config from '../config';
import { Storage } from '@/storage';

const app = express();
const storage = Storage();

app.post('/login', (req, res) => login(req, res, storage));

app.post('/register', (req, res) => register(req, res, storage));

app.listen(config.api.port, () => {
  // eslint-disable-next-line no-console
  console.log('USER up', config.api);
});

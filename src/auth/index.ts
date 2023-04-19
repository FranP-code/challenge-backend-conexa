/* eslint-disable import/first */
require('module-alias/register');
import express from 'express';
import bodyParser from 'body-parser';
import config from '@/config';
import router from './router';

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(config.auth.port, () => {
  // eslint-disable-next-line no-console
  console.log('AUTH up', config.auth);
});

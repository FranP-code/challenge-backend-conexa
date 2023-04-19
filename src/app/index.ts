/* eslint-disable import/first */
require('module-alias/register');
import bodyParser from 'body-parser';
import config from '@/config';
import express from 'express';
import router from './router';

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(config.app.port, () => {
  // eslint-disable-next-line no-console
  console.log('APP up', config.app);
});

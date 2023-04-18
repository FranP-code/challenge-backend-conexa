/* eslint-disable import/first */
require('module-alias/register');
import express from 'express';
import bodyParser from 'body-parser';
import config from '@/config';
import router from './router';
import connection from './mongo/connection';

const app = express();
void connection();

app.use(bodyParser.json());

app.use(router);

app.listen(config.store.port, () => {
  // eslint-disable-next-line no-console
  console.log('STORE up', config.store);
});

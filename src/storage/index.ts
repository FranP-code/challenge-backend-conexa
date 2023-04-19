/* eslint-disable import/first */
require('module-alias/register');
import bodyParser from 'body-parser';
import config from '@/config';
import connection from './mongo/connection';
import express from 'express';
import router from './router';

const app = express();
void connection();

app.use(bodyParser.json());

app.use(router);

app.listen(config.store.port, () => {
  // eslint-disable-next-line no-console
  console.log('STORE up', config.store);
});

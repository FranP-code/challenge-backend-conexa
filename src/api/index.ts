/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-misused-promises */
require('module-alias/register');
import { getUsers, login, register } from './routes';
import config from '../config';
import express from 'express';
import swaggerDoc from './swagger';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());

app.get('/get-users', getUsers);

app.post('/login', login);

app.post('/register', register);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(config.api.port, () => {
  // eslint-disable-next-line no-console
  console.log('API up', config.api);
});

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import routes from './routes';
import database from './config/database';
import logger from './services/logger';

const app = express();

const configureExpress = () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(expressValidator());
  app.use('/', logger, routes);
  return app;
};

export default () => database.connect().then(configureExpress);

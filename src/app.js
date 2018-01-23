import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes';
import database from './config/database';
import logger from './services/logger';

const app = express();

function errorHandler(err, req, res, next) {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).res('BOOM!!', { error: err });
}

const configureExpress = () => {

  app.use(cors());
  app.use(bodyParser.json());
  app.use(errorHandler);
  app.use('/', logger, routes);

  return app;
};

export default () => database.connect().then(configureExpress);

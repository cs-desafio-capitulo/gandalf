import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import database from './config/database';
import logger from './services/logger';

const app = express();

const configureExpress = () => {
  app.use(bodyParser.json());
  app.use('/', logger, routes);
  return app;
};


export default () => database.connect().then(configureExpress);

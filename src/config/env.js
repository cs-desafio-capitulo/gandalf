import dotenv from 'dotenv';

dotenv.config();

export default {
  name: process.env.NODE_ENV,
  app: {
    port: process.env.PORT,
  },
  db: {
    url: process.env.DB_URL,
  },
  externalServices: {
    logService: process.env.LOG_SERVICE,
  },
};

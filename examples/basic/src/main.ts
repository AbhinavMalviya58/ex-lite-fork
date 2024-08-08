import config from './config';
import logger from './logger';
import prisma from './db/prisma';
import { createApp } from './app';

const main = async () => {
  // connect database
  await prisma.$connect();
  // create app from AppClient
  const app = createApp();
  // extend, PORT and HOST
  const { PORT, HOST } = config;
  // Start the server
  app.listen(PORT, HOST, () => {
    logger.info(`http://${HOST}:${PORT}`);
    logger.info('Press CTRL+C to stop');
  });
};

void main();

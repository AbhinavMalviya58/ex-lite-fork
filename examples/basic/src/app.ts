import express from 'express';
import { apisRoutes } from './apis/apis.routes';
import { globalError, notFound } from './middlewares';

export const createApp = () => {
  // Create Application
  const app: express.Express = express();

  // Middlewares
  app.use(express.json({ limit: '30mb' })); // Parse JSON requests
  app.use(express.urlencoded({ extended: true, limit: '30mb' }));

  // Routers
  app.use('/api', apisRoutes());
  app.all('*', notFound);

  // Error Handlers
  app.use(globalError);

  return app;
};

import env from './env';

// server settings
const config = Object.freeze({
  // basic configuration
  NAME: env.NAME,
  PORT: env.PORT,
  HOST: env.HOST,
  NODE_ENV: env.NODE_ENV,
  // database configuration
  DATABASE_URL: env.DATABASE_URL,
});

export default config;

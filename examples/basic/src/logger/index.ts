import winston from 'winston';
import { prettyPrint } from './formate';
import { LEVEL_LABEL, LEVELS } from './constant';

const logger = winston.createLogger({
  level: LEVEL_LABEL,
  levels: LEVELS,
  format: prettyPrint(),
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: 'server.log',
      format: winston.format.uncolorize(),
    }),
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});

export default logger;

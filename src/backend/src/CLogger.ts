import { transports, createLogger, format } from 'winston';
import envvars from './envvars';

const LOGGER = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    // see https://github.com/winstonjs/winston
    new transports.File({ filename: '../log/error.log', level: 'error' }),
    new transports.File({ filename: '../log/combined.log' }),
  ],
});
if (envvars.NODE_ENV !== 'production') {
  LOGGER.add(new transports.Console({
    format: format.simple(),
  }));
}

export default LOGGER;
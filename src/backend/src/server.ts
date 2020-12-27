import express from 'express';

import envvars from './envvars';
import LOGGER from './CLogger';
import personRouter from './routes/person-routes';

const APP = express();
APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
APP.use('/v1', personRouter);

APP.get('/', (req, res) => {
  LOGGER.info('GET Request');
  res.send('Server is running...');
});

APP.listen(envvars.PORT, () => {
  LOGGER.info(`Backend läuft auf Port: ${envvars.PORT}`);
});

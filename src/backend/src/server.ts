import express from 'express';

import { Person, PersonService } from '../backend-lib';
import envvars from './envvars';
import LOGGER from './CLogger';

const APP = express();
APP.use(express.json());

const PERSON_SERVICE: InstanceType<typeof PersonService> = PersonService.getPersonServiceInstance();

APP.get('/', (req, res) => {
  LOGGER.info('GET Request');
  res.send('Hello World!1!');
});

APP.post('/add-person', (req, res) => {
  const personReq = req.body;
  LOGGER.info(`/add-person: ${JSON.stringify(personReq)}`);
  let response = '';

  const person: InstanceType<typeof Person> = new Person(personReq.vorname, personReq.nachname);
  PERSON_SERVICE.validateAndInsert(person)
    .then((val: boolean) => `Person gespeichert mit id: ${val}`,
      () => 'Person konnte nicht gespeichert werden!')
    .then((txt: string) => {
      res.status(400);
      response = `> ${txt}`;
      res.send(response);
    });
});

APP.get('/get-alle-personen', (req, res) => {
  LOGGER.info('/get-person');
  try {
    PERSON_SERVICE.findAllePersonen().then((val: Person[]) => {
      LOGGER.info(val);
      res.json(val);
    });
  } catch (err) {
    res.status(400);
    res.send();
  }
});

APP.get('/get-person-by-id', (req, res) => {
  LOGGER.info('/get-person-by-id');
  try {
    LOGGER.info(JSON.stringify(req.query));
    if (req.query.id === undefined) {
      throw new Error('Die Id der Person muss angegeben sein!');
    }
    const id: number = Number(req.query.id);
    if (Number.isNaN(id)) {
      throw new Error(`Die Id ist keine Zahl: '${req.query.id}'`);
    }
    PERSON_SERVICE.findPersonWithId(id).then((val: Person[]) => {
      LOGGER.info(JSON.stringify(val));
      res.json(val[0]);
    });
  } catch (err) {
    if (err instanceof Error) {
      LOGGER.error(err.message);
    }
    res.status(400);
    res.send();
  }
});

APP.listen(envvars.PORT, () => {
  LOGGER.info(`Backend läuft auf Port: ${envvars.PORT}`);
});

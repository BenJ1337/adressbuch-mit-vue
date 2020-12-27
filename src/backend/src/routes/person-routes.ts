import express from 'express';

import { Person, PersonService } from '../../backend-lib';
import LOGGER from '../CLogger';

const personRouter = express.Router();

const PERSON_SERVICE: InstanceType<typeof PersonService> = PersonService.getPersonServiceInstance();

personRouter.post('/person', (req, res) => {
  const personReq = req.body;
  LOGGER.info(`/person: ${JSON.stringify(personReq)}`);
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

personRouter.get('/personen', (req, res) => {
  LOGGER.info('/personen/');
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

personRouter.get('/personen/:personId', (req, res) => {
  try {
    if (req.params.personId === undefined) {
      throw new Error('Die Id der Person muss angegeben sein!');
    }
    LOGGER.info(`/personen/${req.params.personId}`);
    const id: number = Number(req.params.personId);
    if (Number.isNaN(id)) {
      throw new Error(`Die Id ist keine Zahl: '${req.params.personId}'`);
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

export default personRouter;

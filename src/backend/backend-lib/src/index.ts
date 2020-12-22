import { createConnection } from 'typeorm';

import PersonValidator from './validator/PersonValidator';
import PersonService from './service/PersonService';
import Person from './domain/Person';

export { PersonValidator, PersonService, Person };

createConnection({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [Person],
  synchronize: true,
  logging: false,
});

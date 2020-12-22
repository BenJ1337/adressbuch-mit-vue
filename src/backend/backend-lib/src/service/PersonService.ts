import { getRepository, InsertResult } from 'typeorm';
import Person from '../domain/Person';
import PersonValidator from '../validator/PersonValidator';

export default class PersonService {
  private static personService: PersonService;

  private readonly personValidator: PersonValidator;

  constructor() {
    this.personValidator = new PersonValidator();
  }

  public static getPersonServiceInstance() {
    if (this.personService === undefined) {
      this.personService = new PersonService();
      console.log("PersonService erzeugt.");
    }
    return this.personService;
  }

  public findAllePersonen(): Promise<Person[]> {
    return getRepository(Person).find();
  }

  public findPersonWithId(id: number): Promise<Person[]> {
    return getRepository(Person).find({ where: { id: id } });
  }

  public async validateAndInsert(person: Person): Promise<boolean> {
    const valid = this.personValidator.validate(person);
    if (!valid) {
      return false;
    }
    return this.insertPerson(person)
      .then((ir: InsertResult) => {
        console.log(ir.identifiers[0].Id);
        return true;
      }, () => false);
  }

  private insertPerson(person: Person): Promise<InsertResult> {
    return getRepository(Person).insert(person);
  }
}

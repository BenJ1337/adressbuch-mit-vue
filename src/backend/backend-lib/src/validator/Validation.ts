import Person from '../domain/Person';

export default interface IValidator {
  validate(person: Person): boolean;
}

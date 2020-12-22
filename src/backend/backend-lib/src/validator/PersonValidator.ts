import IValidator from '../validator/Validation';
import Person from '../domain/Person';

export default class PersonValidator implements IValidator {
  public validate(person: Person): boolean {
    let valid = true;

    if (person == null) {
      valid = false;
    }

    if (person.getVorname() == null || person.getVorname() == '') {
      valid = false;
    }

    if (person.getNachname() == null || person.getNachname() == '') {
      valid = false;
    }

    return valid;
  }
}

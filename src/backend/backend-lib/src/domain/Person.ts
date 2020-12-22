import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// see https://typeorm.io/#/
@Entity()
export default class Person {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private vorname: string;

  @Column()
  private nachname: string;

  @Column()
  private geburtsdatum: Date;

  public constructor(vorname: string, nachname: string) {
    this.vorname = vorname;
    this.nachname = nachname;
    this.geburtsdatum = new Date();
  }

  getVorname() {
    return this.vorname;
  }

  getNachname() {
    return this.nachname;
  }

  setVorname(vorname: string) {
    this.vorname = vorname;
  }

  setNachname(nachname: string) {
    this.nachname = nachname;
  }
}

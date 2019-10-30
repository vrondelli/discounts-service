export class User {
  private _id: string;
  public get id(): string {
    return this._id;
  }

  private _firstName: string;
  public get firstName(): string {
    return this._firstName;
  }

  private _lastName: string;
  public get lastName(): string {
    return this._lastName;
  }

  private _dateOfBirth: Date;
  public get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
  ) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._dateOfBirth = dateOfBirth;
  }

  public isBirthday(todayDate: Date): boolean {
    const dayOfBirth = this.dateOfBirth.getDate();
    const monthOfBirth = this.dateOfBirth.getMonth();

    const todayDay = todayDate.getDate();
    const todayMonth = todayDate.getMonth();

    return dayOfBirth === todayDay && monthOfBirth === todayMonth;
  }
}

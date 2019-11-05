import { Entity, Column, PrimaryColumn } from 'typeorm';
import { User } from '../../domain';

@Entity()
export class UserTypeORMEntity {
  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public dateOfBirth: Date;

  public createDomainEntity() {
    return new User(this.id, this.firstName, this.lastName, this.dateOfBirth);
  }
}

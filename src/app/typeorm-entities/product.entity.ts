import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Product } from '../../domain';

@Entity()
export class ProductTypeORMEntity {
  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  public priceInCents: number;

  @Column()
  public title: string;

  @Column('text')
  public description: string;

  public createDomainEntity() {
    return new Product(
      this.id,
      this.priceInCents,
      this.title,
      this.description,
    );
  }
}

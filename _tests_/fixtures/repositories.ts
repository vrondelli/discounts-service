import {
  UserTypeORMEntity,
  ProductTypeORMEntity,
} from '../../src/app/typeorm-entities';
import { Repository } from 'typeorm';

const userDtoFixture = new UserTypeORMEntity();
userDtoFixture.dateOfBirth = new Date();
userDtoFixture.firstName = 'teste';
userDtoFixture.lastName = 'teste';
userDtoFixture.id = 'testId';

export const userRepositoryFixture = ({
  findOne: () => userDtoFixture,
} as any) as Repository<UserTypeORMEntity>;

export const productDtoFixture = new ProductTypeORMEntity();
productDtoFixture.priceInCents = 10000;
productDtoFixture.description = 'test';
productDtoFixture.title = 'test';

export const productRepositoryFixture = ({
  findOne: (productId: string) => {
    productDtoFixture.id = productId;

    return productDtoFixture;
  },
} as any) as Repository<ProductTypeORMEntity>;

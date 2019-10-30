import { User } from '../../src/domain';

const userBirthDate = new Date('10/12/1994');

export const userFixture = new User('testeId', 'João', 'Silva', userBirthDate);

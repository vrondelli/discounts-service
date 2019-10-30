import { User } from '../../../src/domain';

describe('User', () => {
  describe('isBirthday()', () => {
    describe('when is user birthday', () => {
      test('returns true', () => {
        const userBirthDate = new Date('10/12/1994');
        const user = new User('testeId', 'João', 'Silva', userBirthDate);

        const futureBirthday = new Date('10/12/2020');

        const result = user.isBirthday(futureBirthday);

        expect(result).toBe(true);
      });
    });

    describe('when is not user birthday', () => {
      test('returns false', () => {
        const userBirthDate = new Date('10/12/1994');
        const user = new User('testeId', 'João', 'Silva', userBirthDate);

        const today = new Date();

        const result = user.isBirthday(today);

        expect(result).toBe(false);
      });
    });
  });
});

import { User } from '../../../../src/domain';
import { BirthdayDiscountRule } from '../../../../src/domain/entities/discount-rules/birthday-discount-rule';

describe('BirthdayDiscountRule', () => {
  describe('isValid()', () => {
    describe('when is user birthday', () => {
      test('returns true', () => {
        const userBirthDate = new Date('10/12/1994');
        const user = new User('testeId', 'João', 'Silva', userBirthDate);

        const futureBirthday = new Date('10/12/2020');

        const discountValidityContext = {
          user,
          todayDate: futureBirthday,
        };

        const birthdayDiscountRule = new BirthdayDiscountRule();

        const result = birthdayDiscountRule.isValid(discountValidityContext);

        expect(result).toBe(true);
      });
    });

    describe('when is not user birthday', () => {
      test('returns false', () => {
        const userBirthDate = new Date('10/12/1994');
        const user = new User('testeId', 'João', 'Silva', userBirthDate);

        const discountValidityContext = {
          user,
          todayDate: new Date(),
        };

        const birthdayDiscountRule = new BirthdayDiscountRule();

        const result = birthdayDiscountRule.isValid(discountValidityContext);

        expect(result).toBe(false);
      });
    });
  });
});

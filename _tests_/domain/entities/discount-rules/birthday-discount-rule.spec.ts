import { User } from '../../../../src/domain';
import { BirthdayDiscountRule } from '../../../../src/domain/entities/discount-rules/birthday-discount-rule';
import { userFixture } from '../../../fixtures/user';

describe('BirthdayDiscountRule', () => {
  describe('isValid()', () => {
    describe('when is user birthday', () => {
      test('returns true', () => {
        const futureBirthday = new Date('10/12/2020');

        const discountValidityContext = {
          user: userFixture,
          todayDate: futureBirthday,
        };

        const birthdayDiscountRule = new BirthdayDiscountRule();

        const result = birthdayDiscountRule.isValid(discountValidityContext);

        expect(result).toBe(true);
      });
    });

    describe('when is not user birthday', () => {
      test('returns false', () => {
        const discountValidityContext = {
          user: userFixture,
          todayDate: new Date(),
        };

        const birthdayDiscountRule = new BirthdayDiscountRule();

        const result = birthdayDiscountRule.isValid(discountValidityContext);

        expect(result).toBe(false);
      });
    });
  });
});

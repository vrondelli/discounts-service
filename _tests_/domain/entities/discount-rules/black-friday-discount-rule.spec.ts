import {
  BlackFridayDiscountRule,
  User,
  BlackFridayDiscountRuleParameters,
} from '../../../../src/domain';

describe('BlackFridayDiscountRule', () => {
  describe('isValid()', () => {
    describe('when is black friday', () => {
      test('returns true', () => {
        const parameters: BlackFridayDiscountRuleParameters = {
          blackFridayDay: '25',
          blackFridayMonth: '11',
        };

        const blackFridayDiscountRule = new BlackFridayDiscountRule(parameters);
        const userBirthDate = new Date('10/12/1994');
        const user = new User('testeId', 'João', 'Silva', userBirthDate);

        const blackFridayDate = new Date('11/25/2019');

        const discountValidityContext = {
          user,
          todayDate: blackFridayDate,
        };

        const result = blackFridayDiscountRule.isValid(discountValidityContext);

        expect(result).toBe(true);
      });
    });

    describe('when is not black friday', () => {
      test('returns false', () => {
        const parameters: BlackFridayDiscountRuleParameters = {
          blackFridayDay: '25',
          blackFridayMonth: '11',
        };

        const blackFridayDiscountRule = new BlackFridayDiscountRule(parameters);
        const userBirthDate = new Date('10/12/1994');
        const user = new User('testeId', 'João', 'Silva', userBirthDate);

        const blackFridayDate = new Date();

        const discountValidityContext = {
          user,
          todayDate: blackFridayDate,
        };

        const result = blackFridayDiscountRule.isValid(discountValidityContext);

        expect(result).toBe(false);
      });
    });
  });
});

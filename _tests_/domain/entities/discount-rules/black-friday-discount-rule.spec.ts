import {
  BlackFridayDiscountRule,
  User,
  BlackFridayDiscountRuleParameters,
} from '../../../../src/domain';
import { userFixture } from '../../../fixtures/user';

describe('BlackFridayDiscountRule', () => {
  describe('isValid()', () => {
    describe('when is black friday', () => {
      test('returns true', () => {
        const parameters: BlackFridayDiscountRuleParameters = {
          blackFridayDay: '25',
          blackFridayMonth: '11',
        };

        const blackFridayDiscountRule = new BlackFridayDiscountRule(parameters);

        const blackFridayDate = new Date('11/25/2019');

        const discountValidityContext = {
          user: userFixture,
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

        const blackFridayDate = new Date();

        const discountValidityContext = {
          user: userFixture,
          todayDate: blackFridayDate,
        };

        const result = blackFridayDiscountRule.isValid(discountValidityContext);

        expect(result).toBe(false);
      });
    });
  });
});

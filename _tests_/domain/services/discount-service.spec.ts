import { DiscountService } from '../../../src/domain';
import {
  discountRuleTenPercent,
  invalidDiscountRule,
} from '../../fixtures/discount-rules';
import { testDiscountStrategy } from '../../fixtures/discount-strategy';
import { productFixture } from '../../fixtures/product';
import { userFixture } from '../../fixtures/user';

describe('DiscountService', () => {
  describe('getDiscountForProduct()', () => {
    test('calls active discount strategy with valid discounts rules and product', () => {
      const discountRules = [discountRuleTenPercent, invalidDiscountRule];

      const discountService = new DiscountService(
        discountRules,
        testDiscountStrategy,
      );

      const discountValidityContext = {
        user: userFixture,
        todayDate: new Date(),
      };

      discountService.getDiscountForProduct(
        discountValidityContext,
        productFixture,
      );

      expect(testDiscountStrategy.execute).toBeCalledWith(
        [discountRuleTenPercent],
        productFixture,
      );
    });
  });
});

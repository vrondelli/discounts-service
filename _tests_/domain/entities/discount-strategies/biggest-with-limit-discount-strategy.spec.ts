import {
  discountRuleFivePercent,
  discountRuleTenPercent,
} from '../../../fixtures/discount-rules';
import { productFixture } from '../../../fixtures/product';
import {
  Discount,
  BiggestWithLimitDiscountStrategy,
} from '../../../../src/domain';

describe('BiggestWithLimitDiscountStrategy', () => {
  describe('execute()', () => {
    describe('when discount is below the limit', () => {
      test('returns Discount with biggest value in discount rules', () => {
        const parameters = {
          limit: '20',
        };
        const discountRules = [discountRuleFivePercent, discountRuleTenPercent];

        const expectedPercentageValue = discountRuleTenPercent.percentageValue;

        const expectedDiscountMultiplier = expectedPercentageValue / 100;
        const expectedValueInCents =
          productFixture.priceInCents * expectedDiscountMultiplier;

        const expectedDiscount = new Discount(
          expectedPercentageValue,
          expectedValueInCents,
        );
        const strategy = new BiggestWithLimitDiscountStrategy(parameters);

        const result = strategy.execute(discountRules, productFixture);

        expect(result).toStrictEqual(expectedDiscount);
      });
    });

    describe('when discount is above the limit', () => {
      test('returns Discount with limit discount value', () => {
        const parameters = {
          limit: '8',
        };
        const discountRules = [discountRuleFivePercent, discountRuleTenPercent];

        const expectedPercentageValue = parseInt(parameters.limit, 10);

        const expectedDiscountMultiplier = expectedPercentageValue / 100;
        const expectedValueInCents =
          productFixture.priceInCents * expectedDiscountMultiplier;

        const expectedDiscount = new Discount(
          expectedPercentageValue,
          expectedValueInCents,
        );
        const strategy = new BiggestWithLimitDiscountStrategy(parameters);

        const result = strategy.execute(discountRules, productFixture);

        expect(result).toStrictEqual(expectedDiscount);
      });
    });
  });
});

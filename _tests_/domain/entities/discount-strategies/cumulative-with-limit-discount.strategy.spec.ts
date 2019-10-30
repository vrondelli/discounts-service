import {
  discountRuleFivePercent,
  discountRuleTenPercent,
} from '../../../fixtures/discount-rules';
import { productFixture } from '../../../fixtures/product';
import {
  Discount,
  CumulativeWithLimitDiscountStrategy,
} from '../../../../src/domain';

describe('CumulativeWithLimitDiscountStrategy', () => {
  describe('execute()', () => {
    describe('when discount is below the limit', () => {
      test('returns Discount with sum of discount values in discount rules', () => {
        const parameters = {
          limit: '20',
        };
        const discountRules = [discountRuleFivePercent, discountRuleTenPercent];

        const expectedPercentageValue =
          discountRuleFivePercent.percentageValue +
          discountRuleTenPercent.percentageValue;

        const expectedDiscountMultiplier = expectedPercentageValue / 100;
        const expectedValueInCents =
          productFixture.priceInCents * expectedDiscountMultiplier;

        const expectedDiscount = new Discount(
          expectedPercentageValue,
          expectedValueInCents,
        );
        const strategy = new CumulativeWithLimitDiscountStrategy(parameters);

        const result = strategy.execute(discountRules, productFixture);

        expect(result).toStrictEqual(expectedDiscount);
      });
    });

    describe('when discount is above the limit', () => {
      test('returns Discount with limit discount value', () => {
        const parameters = {
          limit: '10',
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
        const strategy = new CumulativeWithLimitDiscountStrategy(parameters);

        const result = strategy.execute(discountRules, productFixture);

        expect(result).toStrictEqual(expectedDiscount);
      });
    });
  });
});

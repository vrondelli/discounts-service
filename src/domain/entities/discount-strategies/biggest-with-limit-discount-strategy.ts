import { IDiscountStrategy, IDiscountRule } from '../../../dsl';
import { Product } from '../product';
import { DiscountStrategy } from '../../../decorators';
import { BiggestWithLimitDiscountStrategyName } from '../../../constants';

export interface BiggestWithLimitDiscountStrategyParameters {
  limit: string;
}

@DiscountStrategy(BiggestWithLimitDiscountStrategyName)
export class BiggestWithLimitDiscountStrategy extends IDiscountStrategy {
  private limit: number;

  constructor(parameters: BiggestWithLimitDiscountStrategyParameters) {
    super();
    this.limit = parseFloat(parameters.limit);
  }

  public execute(discountRules: IDiscountRule[], product: Product) {
    const discountsPercentageValues = discountRules.map(
      rule => rule.percentageValue,
    );

    const biggestDiscountPercentageValue = Math.max(
      ...discountsPercentageValues,
    );

    const discountPercentageValue =
      biggestDiscountPercentageValue >= this.limit
        ? this.limit
        : biggestDiscountPercentageValue;

    return this.applyDiscount(discountPercentageValue, product);
  }
}

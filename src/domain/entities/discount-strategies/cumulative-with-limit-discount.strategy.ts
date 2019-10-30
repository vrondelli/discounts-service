import { IDiscountStrategy, IDiscountRule } from '../../../dsl';
import { Discount } from '../../value-objects';
import { Product } from '../product';

export interface CumulativeWithLimitDiscountStrategyParameters {
  limit: string;
}

export class CumulativeWithLimitDiscountStrategy extends IDiscountStrategy {
  private limit: number;

  constructor(parameters: CumulativeWithLimitDiscountStrategyParameters) {
    super();
    this.limit = parseFloat(parameters.limit);
  }

  public execute(discountRules: IDiscountRule[], product: Product): Discount {
    const discountsPercentageValues = discountRules.map(
      rule => rule.percentageValue,
    );

    const totalDiscountValue = discountsPercentageValues.reduce(
      (previous, current) => {
        const sum = previous + current;

        if (sum >= this.limit) {
          return this.limit;
        }

        return sum;
      },
      0,
    );

    return this.applyDiscount(totalDiscountValue, product);
  }
}

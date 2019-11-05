import {
  IDiscountRule,
  IDiscountStrategy,
  IDiscountValidityContext,
} from '../../dsl';
import { Discount } from '../value-objects';
import { Product } from '../entities';

export class DiscountService {
  constructor(
    private discountRules: IDiscountRule[],
    private discountStrategy: IDiscountStrategy,
  ) {}

  public getDiscountForProduct(
    discountValidityContext: IDiscountValidityContext,
    product: Product,
  ): Discount {
    const validDiscountRules = this.getValidDiscountRules(
      discountValidityContext,
    );

    return this.discountStrategy.execute(validDiscountRules, product);
  }

  private getValidDiscountRules(
    discountValidityContext: IDiscountValidityContext,
  ): IDiscountRule[] {
    return this.discountRules.filter(rule =>
      rule.isValid(discountValidityContext),
    );
  }
}

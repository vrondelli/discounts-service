import { IDiscountRule, IDiscountStrategy } from '../../dsl';
import { Product } from '../entities';
import { Discount } from '../value-objects';

export class DiscountService {
  constructor(
    private discountRules: IDiscountRule[],
    private discountStrategy: IDiscountStrategy,
  ) {}

  public getDiscountForProduct(product: Product): Discount {
    return this.discountStrategy.execute(this.discountRules, product);
  }
}

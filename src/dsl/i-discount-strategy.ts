import { IDiscountRule } from './i-discount-rule';
import { Discount, Product } from '../domain';

export abstract class IDiscountStrategy {
  abstract execute(discountRules: IDiscountRule[], product: Product): Discount;

  protected applyDiscount(percentageValue: number, product: Product): Discount {
    const percentageDivisor = 100;

    const discountMultiplier = percentageValue / percentageDivisor;

    const valueInCents = product.priceInCents * discountMultiplier;

    return new Discount(parseFloat(percentageValue.toString()), valueInCents);
  }
}

import { IDiscountRule } from './i-discount-rule';
import { Product } from '../domain/entities/product';
import { Discount } from '../domain';

export interface IDiscountStrategy {
  execute(discountRules: IDiscountRule[], product: Product): Discount;
}

import { Discount } from '../../src/domain';
import { IDiscountStrategy } from '../../src/dsl';

export const testDiscount = new Discount(10, 1000);

export const testDiscountStrategy = ({
  execute: jest.fn(),
} as any) as IDiscountStrategy;

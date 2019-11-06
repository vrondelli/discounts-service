import { Discount, DiscountService } from '../../src/domain';

export const discountFixture = new Discount(10, 1000);

export const discountServiceFixture = ({
  getDiscountForProduct: () => discountFixture,
} as any) as DiscountService;

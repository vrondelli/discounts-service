import { IDiscountValidityContext } from './i-discount-validity-context';

export interface IDiscountRule {
  readonly percentageValue: number;

  isValid(discountValidityContext: IDiscountValidityContext): boolean;
}

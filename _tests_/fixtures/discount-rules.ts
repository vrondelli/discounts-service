import { IDiscountRule } from '../../src/dsl';

export const discountRuleTenPercent: IDiscountRule = {
  percentageValue: 10,
  isValid: () => true,
};

export const discountRuleFivePercent: IDiscountRule = {
  percentageValue: 5,
  isValid: () => true,
};

export const invalidDiscountRule: IDiscountRule = {
  percentageValue: 5,
  isValid: () => false,
};

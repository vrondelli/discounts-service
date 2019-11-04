import { IDiscountRule, IDiscountValidityContext } from '../../../dsl';

export class BirthdayDiscountRule implements IDiscountRule {
  public readonly percentageValue = 5;

  public isValid(discountValidityContext: IDiscountValidityContext) {
    return discountValidityContext.user.isBirthday(
      discountValidityContext.todayDate,
    );
  }
}

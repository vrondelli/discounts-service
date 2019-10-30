import { IDiscountRule } from '../../../dsl';
import { IDiscountValidityContext } from '../../../dsl/i-discount-validity-context';

export class BirthdayDiscountRule implements IDiscountRule {
  public readonly percentageValue = 5;

  public isValid(discountValidityContext: IDiscountValidityContext) {
    return discountValidityContext.user.isBirthday(
      discountValidityContext.todayDate,
    );
  }
}

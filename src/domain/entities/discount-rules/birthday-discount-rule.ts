import { IDiscountRule, IDiscountValidityContext } from '../../../dsl';
import { DiscountRule } from '../../../decorators';
import { BirthdayDiscountRuleName } from '../../../constants';

@DiscountRule(BirthdayDiscountRuleName)
export class BirthdayDiscountRule implements IDiscountRule {
  public readonly percentageValue = 5;

  public isValid(discountValidityContext: IDiscountValidityContext) {
    return discountValidityContext.user.isBirthday(
      discountValidityContext.todayDate,
    );
  }
}

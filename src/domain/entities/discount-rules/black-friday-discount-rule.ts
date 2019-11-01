import { IDiscountRule, IDiscountValidityContext } from '../../../dsl';
import { DiscountRule } from '../../../decorators';
import { BlackFridayDiscountRuleName } from '../../../constants';

export interface BlackFridayDiscountRuleParameters {
  blackFridayDay: string;
  blackFridayMonth: string;
}

@DiscountRule(BlackFridayDiscountRuleName)
export class BlackFridayDiscountRule implements IDiscountRule {
  public readonly percentageValue = 10;

  private blackFridayDay: number;
  private blackFridayMonth: number;

  constructor(parameters: BlackFridayDiscountRuleParameters) {
    const dateObjectMonthSubtrahend = 1;

    this.blackFridayDay = parseInt(parameters.blackFridayDay, 10);
    this.blackFridayMonth =
      parseInt(parameters.blackFridayMonth, 10) - dateObjectMonthSubtrahend;
  }

  public isValid(discountValidityContext: IDiscountValidityContext) {
    const { todayDate } = discountValidityContext;

    const todayDay = todayDate.getDate();
    const todayMonth = todayDate.getMonth();

    return (
      todayDay === this.blackFridayDay && todayMonth === this.blackFridayMonth
    );
  }
}

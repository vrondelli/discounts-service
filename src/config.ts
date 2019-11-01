import {
  BlackFridayDiscountRuleName,
  BirthdayDiscountRuleName,
  CumulativeWithLimitDiscountStrategyName,
  BiggestWithLimitDiscountStrategyName,
} from './constants';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

export default {
  discountRules: {
    [BlackFridayDiscountRuleName]: {
      enabled: process.env.BLACK_FRIDAY_DISCOUNT_ENABLED,
      parameters: {
        day: process.env.BLACK_FRIDAY_DAY,
        month: process.env.BLACK_FRIDAY_MONTH,
      },
    },
    [BirthdayDiscountRuleName]: {
      enabled: process.env.BIRTHDAY_DISCOUNT_ENABLED,
    },
  },
  discountStrategies: {
    default: CumulativeWithLimitDiscountStrategyName,
    activeStrategyName: process.env.ACTIVE_DISCOUNT_STRATEGY_NAME,
    [CumulativeWithLimitDiscountStrategyName]: {
      parameters: {
        limit: process.env.CUMULATIVE_WITH_LIMIT_STRATEGY_LIMIT,
      },
    },
    [BiggestWithLimitDiscountStrategyName]: {
      parameters: {
        limit: process.env.BIGGEST_WITH_LIMIT_STRATEGY_LIMIT,
      },
    },
  },
};

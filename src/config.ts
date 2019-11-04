import {
  BlackFridayDiscountRule,
  BirthdayDiscountRule,
  CumulativeWithLimitDiscountStrategy,
  BiggestWithLimitDiscountStrategy,
} from './domain';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

export default {
  discountRules: {
    [BlackFridayDiscountRule.name]: {
      enabled: process.env.BLACK_FRIDAY_DISCOUNT_ENABLED,
      parameters: {
        day: process.env.BLACK_FRIDAY_DAY,
        month: process.env.BLACK_FRIDAY_MONTH,
      },
    },
    [BirthdayDiscountRule.name]: {
      enabled: process.env.BIRTHDAY_DISCOUNT_ENABLED,
    },
  },
  discountStrategies: {
    default: CumulativeWithLimitDiscountStrategy.name,
    activeStrategyName: process.env.ACTIVE_DISCOUNT_STRATEGY_NAME,
    [CumulativeWithLimitDiscountStrategy.name]: {
      parameters: {
        limit: process.env.CUMULATIVE_WITH_LIMIT_STRATEGY_LIMIT,
      },
    },
    [BiggestWithLimitDiscountStrategy.name]: {
      parameters: {
        limit: process.env.BIGGEST_WITH_LIMIT_STRATEGY_LIMIT,
      },
    },
  },
};

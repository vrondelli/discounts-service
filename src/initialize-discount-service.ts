import {
  BlackFridayDiscountRule,
  CumulativeWithLimitDiscountStrategy,
  BiggestWithLimitDiscountStrategy,
  BirthdayDiscountRule,
  DiscountService,
} from './domain';
import config from './config';
import { IDiscountRule, IDiscountStrategy } from './dsl';
import { ConcreteType } from '@cashfarm/lang';

const allDiscountRules: Array<ConcreteType<IDiscountRule>> = [
  BirthdayDiscountRule,
  BlackFridayDiscountRule,
];
const allDiscountStrategies: Array<ConcreteType<IDiscountStrategy>> = [
  CumulativeWithLimitDiscountStrategy,
  BiggestWithLimitDiscountStrategy,
];

const parseStringToBoolean = (stringValue: string) =>
  stringValue.toLowerCase() === 'true' ? true : false;

const getEnabledDiscountRules = (
  rules: Array<ConcreteType<IDiscountRule>>,
  discountRulesConfiguration: any,
): IDiscountRule[] => {
  const enabledRules = rules.filter(rule => {
    const discountRuleName = rule.name;

    return parseStringToBoolean(
      discountRulesConfiguration[discountRuleName].enabled,
    );
  });

  return enabledRules.map(Rule => {
    const discountRuleName = Rule.name;
    const ruleParameters =
      discountRulesConfiguration[discountRuleName].parameters;

    return new Rule(ruleParameters);
  });
};

const getActiveDiscountStrategy = (
  strategies: Array<ConcreteType<IDiscountStrategy>>,
  discountStrategiesConfiguration: any,
): IDiscountStrategy => {
  const activeDiscountStrategyName =
    discountStrategiesConfiguration.activeStrategyName ||
    discountStrategiesConfiguration.default;

  const discountStrategyParameters =
    discountStrategiesConfiguration[activeDiscountStrategyName].parameters;

  const ActiveStrategy = strategies.find(strategy => {
    return strategy.name === activeDiscountStrategyName;
  });

  return new ActiveStrategy(discountStrategyParameters);
};

const {
  discountRules: discountRulesConfig,
  discountStrategies: discountStrategiesConfig,
} = config;

const enabledDiscountRules = getEnabledDiscountRules(
  allDiscountRules,
  discountRulesConfig,
);
const activeStrategy = getActiveDiscountStrategy(
  allDiscountStrategies,
  discountStrategiesConfig,
);

export const discountService = new DiscountService(
  enabledDiscountRules,
  activeStrategy,
);

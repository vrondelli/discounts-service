import {
  BlackFridayDiscountRule,
  CumulativeWithLimitDiscountStrategy,
  BiggestWithLimitDiscountStrategy,
  BirthdayDiscountRule,
  DiscountService,
} from './domain';
import config from './config';
import {
  DISCOUNT_RULE_METADATA,
  DISCOUNT_STRATEGY_METADATA,
} from './constants';
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
): IDiscountRule[] => {
  const { discountRules } = config;

  const enabledRules = rules.filter(rule => {
    const discountRuleName = Reflect.getMetadata(DISCOUNT_RULE_METADATA, rule);

    return parseStringToBoolean(discountRules[discountRuleName].enabled);
  });

  return enabledRules.map(Rule => {
    const discountRuleName = Reflect.getMetadata(DISCOUNT_RULE_METADATA, Rule);
    const ruleParameters = config.discountRules[discountRuleName].parameters;

    return new Rule(ruleParameters);
  });
};

const getActiveDiscountStrategy = (
  strategies: Array<ConcreteType<IDiscountStrategy>>,
): IDiscountStrategy => {
  const { discountStrategies } = config;

  const activeDiscountStrategyName =
    Symbol.for(discountStrategies.activeStrategyName) ||
    discountStrategies.default;

  const discountStrategyParameters =
    discountStrategies[activeDiscountStrategyName].parameters;

  const ActiveStrategy = strategies.find(strategy => {
    const discountStrategyName = Reflect.getMetadata(
      DISCOUNT_STRATEGY_METADATA,
      strategy,
    );

    return discountStrategyName === activeDiscountStrategyName;
  });

  return new ActiveStrategy(discountStrategyParameters);
};

const enabledDiscountRules = getEnabledDiscountRules(allDiscountRules);
const activeStrategy = getActiveDiscountStrategy(allDiscountStrategies);

export const discountService = new DiscountService(
  enabledDiscountRules,
  activeStrategy,
);

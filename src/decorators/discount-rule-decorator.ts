import { ConcreteType } from '@cashfarm/lang';
import { IDiscountRule } from '../dsl';
import { DISCOUNT_RULE_METADATA } from '../constants';

export function DiscountRule(name: symbol) {
  // tslint:disable-next-line: only-arrow-functions
  return function(target: ConcreteType<IDiscountRule>) {
    Reflect.defineMetadata(DISCOUNT_RULE_METADATA, name, target);
  };
}

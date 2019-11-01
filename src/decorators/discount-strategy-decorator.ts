import { IDiscountStrategy } from '../dsl';
import { DISCOUNT_STRATEGY_METADATA } from '../constants';
import { ConcreteType } from '@cashfarm/lang';

export function DiscountStrategy(name: symbol) {
  // tslint:disable-next-line: only-arrow-functions
  return function(target: ConcreteType<IDiscountStrategy>) {
    Reflect.defineMetadata(DISCOUNT_STRATEGY_METADATA, name, target);
  };
}

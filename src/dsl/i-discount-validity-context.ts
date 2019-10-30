import { User } from '../domain';

export interface IDiscountValidityContext {
  user: User;
  todayDate: Date;
}

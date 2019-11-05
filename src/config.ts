import {
  BlackFridayDiscountRule,
  BirthdayDiscountRule,
  CumulativeWithLimitDiscountStrategy,
  BiggestWithLimitDiscountStrategy,
} from './domain';
import { SnakeNamingStrategy } from './utils/snake_case_naming_strategy';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserTypeORMEntity } from './app/typeorm-entities/user.entity';
import { ProductTypeORMEntity } from './app/typeorm-entities/product.entity';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_DATABASE_HOST,
  port: parseInt(process.env.POSTGRES_DATABASE_PORT, 10),
  username: process.env.POSTGRES_DATABASE_USERNAME,
  password: process.env.POSTGRES_DATABASE_PASSWORD,
  database: process.env.POSTGRES_DATABASE_DATABASE,
  entities: [UserTypeORMEntity, ProductTypeORMEntity],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

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
  typeOrmConfig,
};

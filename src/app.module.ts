import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { DiscountService } from './domain';
import { discountService } from './initialize-discount-service';

const { typeOrmConfig } = config;

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [],
  providers: [
    {
      provide: DiscountService,
      useValue: discountService,
    },
  ],
})
export class AppModule {}

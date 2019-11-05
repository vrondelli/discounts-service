import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrpcMethod } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { ProductTypeORMEntity } from '../typeorm-entities/product.entity';
import { UserTypeORMEntity } from '../typeorm-entities/user.entity';
import { IProductDiscountRequest } from '../interfaces';
import { DiscountService, Product } from '../../domain';
import { IDiscountValidityContext } from '../../dsl';
import { hydratePrimitive } from '@cashfarm/lang';

@Controller()
export class ProductDiscountService {
  constructor(
    @InjectRepository(UserTypeORMEntity)
    private readonly userRepository: Repository<UserTypeORMEntity>,
    @InjectRepository(ProductTypeORMEntity)
    private readonly productRepository: Repository<ProductTypeORMEntity>,
    private readonly discountService: DiscountService,
  ) {}

  @GrpcMethod()
  public async getProductDiscount(
    data: IProductDiscountRequest,
    metadata: any,
  ) {
    const userDto = await this.userRepository.findOne(data.userId);
    const productDto = await this.productRepository.findOne(data.productId);

    const user = userDto.createDomainEntity();
    const product = productDto.createDomainEntity();

    const discountValidityContext: IDiscountValidityContext = {
      todayDate: new Date(),
      user,
    };

    const discount = this.discountService.getDiscountForProduct(
      discountValidityContext,
      product,
    );

    return hydratePrimitive<Product>(product.updateDiscount(discount), {});
  }
}

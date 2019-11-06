import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrpcMethod } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { ProductTypeORMEntity } from '../typeorm-entities/product.entity';
import { UserTypeORMEntity } from '../typeorm-entities/user.entity';
import { IProductDiscountRequest } from '../interfaces';
import { DiscountService, Product } from '../../domain';
import { IDiscountValidityContext } from '../../dsl';

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

    return this.getProductPlainObject(product.updateDiscount(discount));
  }

  private getProductPlainObject(product: Product) {
    const plainProduct = {};

    Object.entries(product).forEach(entry => {
      const keyWithouPrefix = entry[0].replace('_', '');

      plainProduct[keyWithouPrefix] = entry[1];
    });

    return plainProduct;
  }
}

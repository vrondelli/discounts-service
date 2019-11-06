import { ProductDiscountService } from '../../../src/app/controllers/product-discount.controller';
import {
  userRepositoryFixture,
  productRepositoryFixture,
  productDtoFixture,
} from '../../fixtures/repositories';
import {
  discountServiceFixture,
  discountFixture,
} from '../../fixtures/discountService';

describe('ProductDiscountService', () => {
  describe('getProductDiscount', () => {
    test('returns product with discount', async () => {
      const productDiscountService = new ProductDiscountService(
        userRepositoryFixture,
        productRepositoryFixture,
        discountServiceFixture,
      );

      const productId = 'testId';

      const expectedResult = {
        id: productId,
        title: productDtoFixture.title,
        description: productDtoFixture.description,
        priceInCents: productDtoFixture.priceInCents,
        discount: discountFixture,
      };

      const result = await productDiscountService.getProductDiscount(
        {
          userId: 'testid',
          productId,
        },
        null,
      );

      expect(result).toStrictEqual(expectedResult);
    });
  });
});

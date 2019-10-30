import { Discount } from '../../../src/domain';
import { Product } from '../../../src/domain/entities/product';

describe('Product', () => {
  describe('updateDiscount()', () => {
    test('returns product with updated discount', () => {
      const discount = new Discount(10, 1000);

      const product = new Product('testeid', 10000, 'teste', 'a test product');

      const result = product.updateDiscount(discount);

      expect(result.discount).toStrictEqual(discount);
      expect(product.discount).toStrictEqual(discount);
      expect(result).toStrictEqual(product);
    });
  });
});

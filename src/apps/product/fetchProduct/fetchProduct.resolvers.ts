import { ResolverMap } from 'types';
import { Product } from 'apps/product.entity';

const Resolvers: ResolverMap = {
  Query: {
    product:  (_, __): Promise<Product[]> => {
         console.log(typeof(Product.find()))
      return Product.find();
    },

  },
};
export default Resolvers;

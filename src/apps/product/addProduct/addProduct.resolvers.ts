import { ResolverMap } from 'types';
import { Product } from '../../product.entity';

const Resolvers: ResolverMap = {
  Mutation: {
    addProduct: async (_,{ name }): Promise<Product> => {
      const pro = new Product( );
      pro.name = name;
      await pro.save();
      return pro;
    }
  }
};
export default Resolvers;

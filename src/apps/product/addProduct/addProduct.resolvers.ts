import { ResolverMap } from 'types';
import { Product } from '../product.entity';
import {Entity, PrimaryGeneratedColumn, Column,getConnection} from 'typeorm';
const Resolvers: ResolverMap = {
  Mutation: {
    addProduct: async (_,{ name }): Promise<Product> => {
      const pro = new Product(name);
      await pro.save();
      return pro;
    }
  }
};
export default Resolvers;
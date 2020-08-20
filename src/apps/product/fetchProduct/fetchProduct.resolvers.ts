import { ResolverMap } from 'types';
import { Product } from '../product.entity';
import {Entity, PrimaryGeneratedColumn, Column,getConnection} from 'typeorm';
const Resolvers: ResolverMap = {
  Query: {
    product:  (_, __): Promise<Product[]> => {
         console.log(typeof(Product.find()))
      return Product.find();
    },
    
  },
};
export default Resolvers;
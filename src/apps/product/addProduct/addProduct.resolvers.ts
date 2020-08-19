import { ResolverMap } from 'types';
import { Product } from '../product.entity';

const Resolvers: ResolverMap = {
    Mutation: {
        addProduct: async function(_, { name ,price}:GQL.AddProductMutationArguments,): Promise<Product | null> {
            const newProduct=new Product();
            newProduct.name=name;
            newProduct.price=price;
              await newProduct.save();
            console.log(newProduct);
            return newProduct;
        },
    },
};

export default Resolvers;

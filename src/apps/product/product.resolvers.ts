import { ResolverMap } from 'types';
import { Product} from './product.entity';

const Resolvers: ResolverMap = {
    Query: {
        products: async (): Promise<Product[] | null> => {
            const allProducts= await Product.find();
            return allProducts;
        },
    },
};

export default Resolvers;

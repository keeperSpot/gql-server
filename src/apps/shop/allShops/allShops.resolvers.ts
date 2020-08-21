import { ResolverMap } from 'types';
import { Shop } from 'apps/shop.entity';

const Resolvers: ResolverMap = {
    Query: {
        allShop: async (_, __): Promise<Shop[]> => {
            return await Shop.find();
       },
    }

};

export default Resolvers;

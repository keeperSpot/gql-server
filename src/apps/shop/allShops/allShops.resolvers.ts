import { IExceptions, ResolverMap } from 'types';
import { User } from 'apps/user.entity';
import { Shop } from 'apps/shop.entity';
import { Exceptions } from 'helpers/exceptions';
import { shopArgsValidator } from './validators';
import { DUPLICATE_SLUG } from '../exceptions';

const Resolvers: ResolverMap = {
    Query: {
        allShop: async (_, __): Promise<Shop[]> => {
            const shops = await Shop.find();
            return shops;
       },
    }

};

export default Resolvers;

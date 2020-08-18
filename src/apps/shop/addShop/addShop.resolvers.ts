import { IExceptions, ResolverMap } from 'types';
import { User } from 'apps/user.entity';
import { Shop } from 'apps/shop.entity';
import { Exceptions } from 'helpers/exceptions';
import { shopArgsValidator } from './validators';

const Resolvers: ResolverMap = {
    ShopOrExceptions: {
        __resolveType: (obj): string => (obj.exceptions ? 'Exceptions' : 'User'),
    },
    Mutation: {
        addShop: async (_, args, { session }): Promise<Shop | IExceptions> => {
            const user = await User.authenticationRequired(session);
            const e = new Exceptions();

            if (!await e.validate(shopArgsValidator, args)) return e.exceptions;

            const { name, slug, address } = e.data;
            const shop = new Shop();
            Object.assign(shop, { name, address, slug });
            shop.owner = user;
            await shop.save();

            console.log('mamaaa');
            return shop;
        }
    },
};

export default Resolvers;

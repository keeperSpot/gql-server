import { IExceptions, ResolverMap } from 'types';
import { User } from 'apps/user.entity';
import { Shop } from 'apps/shop.entity';
import { Exceptions } from 'helpers/exceptions';
import { shopArgsValidator } from './validators';
import { DUPLICATE_SLUG } from '../exceptions';

const Resolvers: ResolverMap = {
    ShopOrExceptions: {
        __resolveType: (obj): string => (obj.exceptions ? 'Exceptions' : 'Shop'),
    },
    Mutation: {
        addShop: async (_, args, { session }): Promise<Shop | IExceptions> => {
            const user = await User.authenticationRequired(session);
            const e = new Exceptions(args);

            if (!await e.validate(shopArgsValidator, args)) return e.exceptions;

            const { name, address, slug } = e.data;

            const shop = new Shop();
            Object.assign(shop, { name, address });
            shop.slug = slug || name;
            shop.owner = user;

            try {
                await shop.save();
            } catch (error) {
                return e.push(DUPLICATE_SLUG({ data: { slug: shop.slug } }))
            }

            return shop;
        }
    },
};

export default Resolvers;

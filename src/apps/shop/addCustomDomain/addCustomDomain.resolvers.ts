import { IExceptions,ICustomDomain, ResolverMap } from 'types';
import { User } from 'apps/user.entity';
import { Shop } from 'apps/shop.entity';
import { Exceptions } from 'helpers/exceptions';
import {  ERROR_IN_ADDING_CUSTOM_DOMAIN } from '../exceptions';
import {addCustomDomainArgsValidator} from './validators';
import { shopArgsValidator } from '../addShop/validators';
//todo : Recaptcha Google

const Resolvers: ResolverMap = {
    ShopOrExceptions: {
        __resolveType: (obj): string => (obj.exceptions ? 'Exceptions' : 'CustomDomain'),
    },
    Mutation: {
        addCustomDomain: async (_, args, { session }): Promise<Shop | IExceptions> => {
            const e = new Exceptions(args);

            if (!await e.validate(addCustomDomainArgsValidator, args)) return e.exceptions;

            const { customDomain, slug } = args;

            const shop = await Shop.findOne({_slug:slug});
            console.log(shop)

            shop.domain = customDomain ;

            try {
                await shop.save();
            } catch (error) {
                return e.push(ERROR_IN_ADDING_CUSTOM_DOMAIN({ data: { customDomain: customDomain } }))
            }
        return shop
        }
    },
};

export default Resolvers;

import { IExceptions,ICustomDomain, ResolverMap } from 'types';
import { Shop } from 'apps/shop.entity';
import { Exceptions } from 'helpers/exceptions';
import {  ERROR_IN_FINDING_SHOP,INVALID_ARGUMENTS_RECEIVED } from '../exceptions';
import {addCustomDomainArgsValidator} from './validators';


const Resolvers: ResolverMap = {
    ShopOrExceptions: {
        __resolveType: (obj): string => (obj.exceptions ? 'Exceptions' : 'CustomDomain'),
    },
    Mutation: {
        addCustomDomain: async (_, args:GQL.IAddCustomDomainOnMutationArguments,
                                { session }): Promise<Shop | IExceptions> => {
            const e = new Exceptions(args);

            const { customDomain, slug } = args;

            if (!await e.validate(addCustomDomainArgsValidator, args))
                return e.push(INVALID_ARGUMENTS_RECEIVED({ data: { customDomain: customDomain } }))

            const shop = await Shop.findOne({_slug:slug});
            if(shop){
                shop.domain = customDomain ;
                await shop.save();
                return shop
            }
            return e.push(ERROR_IN_FINDING_SHOP({ data: { customDomain: customDomain } }))
        }
    },
};

export default Resolvers;

import { IExceptions, ResolverMap } from 'types';
import { User } from 'apps/user.entity';
import { Shop } from 'apps/shop.entity';
import { Exceptions } from 'helpers/exceptions';
import { shopArgsValidator } from './validators';

const Resolvers: ResolverMap = {
    ShopOrExceptions: {
        __resolveType: (obj): string => (obj.exceptions ? 'Exceptions' : 'Shop'),
    },
    Mutation: { 
        editShop: async (_,args, { session }): Promise<Shop | IExceptions> => {
            const user = await User.authenticationRequired(session);
            const e = new Exceptions(args);
            if (!await e.validate(shopArgsValidator, args)) return e.exceptions;
            const { name, address, slug } = e.data;
            const shops = await Shop.findOne({ where: { owner:user } });
            (name)?shops.name=name:null;
            (address)?shops.address=address:null;
            (slug)?shops.slug=slug:null;
            shops.save();
            return shops;
    
       },
    }

};

export default Resolvers;

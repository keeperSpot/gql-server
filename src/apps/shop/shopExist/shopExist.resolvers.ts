import { ResolverMap } from 'types';
import { Shop } from 'apps/shop.entity';


const Resolvers: ResolverMap = {
    Query: {
        shopExist:async (_, args, { session }): Promise<boolean> =>{
            const {slug} = args;
            const shop = await Shop.find({_slug:slug});
            return !!shop.length
        }

    },
};
export default Resolvers;

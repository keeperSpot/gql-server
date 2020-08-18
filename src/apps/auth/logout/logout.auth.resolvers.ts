import { ResolverMap } from 'types';
import { User } from 'apps/user.entity';

const Resolvers: ResolverMap = {
    Query: {
        logout: async (_, __, { session }): Promise<boolean> => {
            await User.logout(session);
            return true;
        },
    },
};

export default Resolvers;

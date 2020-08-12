import { ResolverMap } from 'types';

const Resolvers: ResolverMap = {
    Query: {
        logout: async (_, __, { session }): Promise<boolean> => {
            delete session.userId;
            return true;
        },
    },
};

export default Resolvers;

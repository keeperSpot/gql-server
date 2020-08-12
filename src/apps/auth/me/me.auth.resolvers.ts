import { ResolverMap } from 'types';
import { User } from '../user.entity';

const Resolvers: ResolverMap = {
    Query: {
        me: (_, __, { session }): Promise<User | null> => {
            return User.fromSession(session, true);
        },
    },
};

export default Resolvers;

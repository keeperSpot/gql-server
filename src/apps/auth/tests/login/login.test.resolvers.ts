import { ResolverMap } from 'types';
import { User } from 'apps/user.entity';
import { isTest } from 'server/constants';


const Resolvers: ResolverMap = {
    Mutation: {
        testLogin: async (_, { email, userId }, { session }): Promise<User | null> => {
            if (isTest) {
                const userByEmail = await User.findOneByEmails([email]);
                const userById = await User.findOne(userId);
                if (userById.id == userByEmail.id) await userById.login(session);
            }
            return null;
        },
    },
};

export default Resolvers;

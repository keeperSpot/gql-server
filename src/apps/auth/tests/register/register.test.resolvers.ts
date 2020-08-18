import { ResolverMap } from 'types';
import { User } from 'apps/user.entity';
import { isTest } from 'server/constants';


const Resolvers: ResolverMap = {
    Mutation: {
        testRegister: async (_, { email, name }): Promise<User | null> => {
            if (isTest) {
                const [user] = await User.getOrCreateUserByEmails({ name, emails: [email] })
                return user;
            }
            return null;
        },
    },
};

export default Resolvers;

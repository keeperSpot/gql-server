import { ResolverMap } from 'types';
import { User, Email, Phone } from 'apps/user.entity';

const Resolvers: ResolverMap = {
    User: {
        emails: (parent) => {
            return Email.find({ where: { user: parent.id } });
        },
        phones: (parent) => {
            return Phone.find({ where: { user: parent.id } });
        }
    },
    Query: {
        me: (_, __, { session }): Promise<User | null> => {
            return User.fromSession(session);
        },
    },
};

export default Resolvers;

import { ResolverMap } from 'types';

const Resolvers: ResolverMap = {
    UserOrExceptions: {
        __resolveType: (obj): string => (obj.exceptions ? 'Exceptions' : 'User'),
    },
    DoneOrExceptions: {
        __resolveType: (obj): string => (obj.exceptions ? 'Exceptions' : 'Done'),
    },
};

export default Resolvers;

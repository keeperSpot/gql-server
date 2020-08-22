import { ResolverMap } from 'types';
import { Category } from 'apps/categories.entity';

const Resolvers: ResolverMap = {
    Query: {
        categories: async (_, { representation }:GQL.fetchCategories,): Promise<Category[] | null> => {
            return await Category.find();
        },
    },
};

export default Resolvers;

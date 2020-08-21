import { ResolverMap } from 'types';
import { Category } from './categories.entity';
const Resolvers: ResolverMap = {
    Query: {
        categories: async (_, { representation }:GQL.fetchCategories,): Promise<Category[] | null> => {
            const baseCategories= await Category.find();
                return baseCategories;

        },
    },
};

export default Resolvers;
import { ResolverMap } from 'types';
import { Category } from './categories.entity';

const Resolvers: ResolverMap = {
    Query: {
        categories: async (): Promise<Category[] | null> => {
            const baseCategories= await Category.find();
            return baseCategories;
        },
    },
};

export default Resolvers;
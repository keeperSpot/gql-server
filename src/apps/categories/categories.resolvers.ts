import { ResolverMap } from 'types';
import { Category } from './categories.entity';

const Resolvers: ResolverMap = {
    Query: {
        categories: async (): Promise<Category[] | null> => {
            const baseCategories= await Category.find();
            const newCategory=new Category();
            // newCategory.name='Electronics';
            // newCategory.code='df123gr';
            // newCategory.representation='electronics'
            // newCategory.parent='base';
            // await newCategory.save();
            return null;
        },
    },
};

export default Resolvers;
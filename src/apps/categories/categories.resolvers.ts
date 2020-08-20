import { ResolverMap } from 'types';
import { Category } from './categories.entity';

const Resolvers: ResolverMap = {
    Query: {
        categories: async (_, { parent }:GQL.fetchCategories,): Promise<Category[] | null> => {
            const baseCategories= await Category.find();

            if(parent===null)
                return baseCategories;

            // let filteredCategories;
            // baseCategories.map((cat)=>{
            //     if(cat.parent===parent)
            //         filteredCategories.push(cat);
            // });
            // return filteredCategories;
        },
    },
};

export default Resolvers;
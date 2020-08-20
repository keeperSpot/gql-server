import { ResolverMap } from 'types';
import { Category } from './categories.entity';

const Resolvers: ResolverMap = {
    Query: {
        categories: async (_, { representation }:GQL.fetchCategories,): Promise<Category[] | null> => {
            const baseCategories= await Category.find();
            if(representation){
                const filteredCategories=[];
                baseCategories.map((cat)=>{
                    if(cat.parent===representation)
                        filteredCategories.push(cat);
                });
                return filteredCategories;
            }
                return baseCategories;

        },
    },
};

export default Resolvers;
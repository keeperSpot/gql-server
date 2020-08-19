import { ResolverMap } from 'types';
import {Category} from '../categories.entity';

const Resolvers: ResolverMap = {
    Mutation: {
        addCategory: async function(_, { name ,code,representation,parent}:GQL.AddCategoryMutationArguments,): Promise<Category | null> {
            const newCategory=new Category();
            newCategory.name=name;
            newCategory.code=code;
            newCategory.representation=representation;
            newCategory.parent=parent;
            await newCategory.save();
            console.log(newCategory);
            return newCategory;
        },
    },
};

export default Resolvers;
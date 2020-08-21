import { ResolverMap ,IExceptions} from 'types';
import {Category} from '../categories.entity';
import { User } from '../../user.entity';
import { Exceptions } from '../../../helpers/exceptions';
import { categoryArgsValidator } from './validators';
import { DUPLICATE_REPRESENTATION } from '../exceptions';



const Resolvers: ResolverMap = {
    CategoryOrException:{
        __resolveType: (obj): string => (obj.exceptions ? 'Exceptions' : 'Category'),
    },
    Mutation: {
        addCategory: async(_,args,{ session }): Promise<Category | IExceptions> =>{
            // const user = await User.authenticationRequired(session);
            const { data, exceptions, push, validate } = new Exceptions(args);

            if (!await  validate(categoryArgsValidator, args)) return exceptions;

            const { name, code,representation } = data;

            const newCategory=new Category();
            newCategory.name=name;
            newCategory.code=code;
            newCategory.representation=representation;

            try {
                await newCategory.save();
            } catch (error) {
                return push(DUPLICATE_REPRESENTATION({ data: { representation: newCategory.representation } }))
            }
            console.log(newCategory);
            return newCategory;
        }
    },
};

export default Resolvers;
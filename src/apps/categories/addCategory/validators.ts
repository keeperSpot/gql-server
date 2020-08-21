import * as yup from 'yup';
import * as _ from 'lodash';


export const categoryArgsValidator = yup.object().shape({
    name: yup.string().required('Name is required for the category.'),
    code: yup.string().required('Category needs a unique code.'),
    representation: yup.string().transform(value => _.kebabCase(value))
});

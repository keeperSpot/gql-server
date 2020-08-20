import * as yup from 'yup';
import * as _ from 'lodash';


export const shopArgsValidator = yup.object().shape({
    name: yup.string().required('Name is required for the shop.'),
    address: yup.string().required('Shop needs an address.'),
    slug: yup.string().transform(value => _.kebabCase(value))
});

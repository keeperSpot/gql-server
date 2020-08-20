import * as yup from 'yup';
import * as _ from 'lodash';


export const shopArgsValidator = yup.object().shape({
    name: yup.string().nullable(),
    address: yup.string().nullable(),
    slug: yup.string().transform(value => _.kebabCase(value))
});

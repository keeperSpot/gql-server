import * as yup from 'yup';
import * as _ from 'lodash';


export const addCustomDomainArgsValidator = yup.object().shape({
    customDomain: yup.string().required('customDomain is needed.').matches(
        /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
    )
    ,
    slug: yup.string().transform(value => _.kebabCase(value))
});

import * as yup from 'yup';
import * as _ from 'lodash';


export const addCustomDomainArgsValidator = yup.object().shape({
    customDomain: yup.string().required('customDomain is needed.'),
    slug: yup.string().transform(value => _.kebabCase(value))
});

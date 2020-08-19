import { Exceptions } from 'helpers/exceptions';

export const DUPLICATE_SLUG = Exceptions.generator({
    code: 'DUPLICATE_SLUG',
    message: 'Shop identifier is already present.',
});

export const ERROR_IN_ADDING_CUSTOM_DOMAIN = Exceptions.generator({
    code: 'ERROR_IN_ADDING_CUSTOM_DOMAIN',
    message: 'An unknown error occurred',
});

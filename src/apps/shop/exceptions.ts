import { Exceptions } from 'helpers/exceptions';

export const DUPLICATE_SLUG = Exceptions.generator({
    code: 'DUPLICATE_SLUG',
    message: 'Shop identifier is already present.',
});

export const ERROR_IN_FINDING_SHOP = Exceptions.generator({
    code: 'SHOP_NOT_FOUND',
    message: 'The shop you are looking for does not exist.',
});

export const INVALID_ARGUMENTS_RECEIVED = Exceptions.generator({
    code: 'INVALID_ARGUMENTS_TYPE',
    message: 'Expected a valid slug and customDomain a valid url',
});

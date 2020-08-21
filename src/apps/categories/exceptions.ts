import { Exceptions } from 'helpers/exceptions';

export const DUPLICATE_REPRESENTATION = Exceptions.generator({
    code: 'DUPLICATE_REPRESENTATION',
    message: 'Category of same representation already exists',
});

export const INVALID_ARGUMENTS_RECEIVED = Exceptions.generator({
    code: 'INVALID_ARGUMENTS_TYPE',
    message: 'Expected a valid Representation and a name and code for category',
});
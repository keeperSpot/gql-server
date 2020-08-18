import { Exceptions } from 'helpers/exceptions';

export const AUTHENTICATION_REQUIRED = Exceptions.generator({
    code: 'AUTHENTICATION_REQUIRED',
    message: 'User needs to be authenticated to access this.',
});

export const MULTIPLE_USERS_FOUND = Exceptions.generator({
   code: 'MULTIPLE_USERS_FOUND',
    message: 'There are multiple users for provided email IDs.'
});

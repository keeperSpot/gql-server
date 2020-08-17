import { Exceptions } from 'helpers/exceptions';

export const INVALID_GOOGLE_SIGN_IN = Exceptions.generator({
    code: 'INVALID_GOOGLE_SIGN_IN',
    message: 'Sign-in with Google can\'t be validated.',
});

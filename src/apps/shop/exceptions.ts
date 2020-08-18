import { Exceptions } from 'helpers/exceptions';

export const DUPLICATE_SLUG = Exceptions.generator({
    code: 'DUPLICATE_SLUG',
    message: 'Shop identifier is already present.',
});

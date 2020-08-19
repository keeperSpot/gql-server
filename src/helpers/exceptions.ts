import { ValidationError as YupValidationError } from 'yup';
import { IException, IExceptions } from 'types';
import * as _ from 'lodash';

type Exception = (details: Partial<IException>) => IException;


export const VALIDATION_EXCEPTION = 'VALIDATION_EXCEPTION';


export class Exceptions {
    private readonly $args: any;
    private readonly $exceptions: IException[];
    public data: any;

    constructor(args = {}) {
        this.$args = args;
        this.$exceptions = [];
    }

    get hasException(): boolean {
        return this.$exceptions.length > 0;
    }

    get exceptions() {
        return {
            __typename: 'Exception',
            exceptions: this.$exceptions,
            arguments: this.$args,
        };
    }

    push(exceptions: IException[] | IException | IExceptions | Exception): IExceptions {
        if (_.isArray(exceptions)) this.$exceptions.push(...exceptions);
        else if ('code' in exceptions) this.$exceptions.push(exceptions);
        else if (_.isFunction(exceptions)) this.$exceptions.push(exceptions({}));
        else this.$exceptions.push(...exceptions.exceptions);

        return this.exceptions;
    }

    async validate(validator, obj: any): Promise<boolean> {
        try {
            this.data = await validator.validate(obj);
            return true;
        } catch (validationException) {
            this.push(Exceptions.ValidationException(validationException))
        }

        return false;
    }

    static generator(defaults: Partial<IException>) {
        return function <Exception>(details = {}) {
            return <IException>{
                ...defaults,
                ...details,
            };
        };
    }

    static new(exceptions: IException[] | IException | IExceptions, args = {}) {
        const e = new Exceptions(args);
        e.push(exceptions);
        return e.exceptions;
    }

    static ValidationException(errors: YupValidationError): IException[] {
        if (errors.inner.length > 0)
            return errors.inner.map(
                ({ message, path, value }): IException =>
                    Exceptions.generator({
                        code: VALIDATION_EXCEPTION,
                        message,
                    })({ path, data: { value } }),
            );

        return [
            Exceptions.generator({
                code: VALIDATION_EXCEPTION,
                message: errors.message,
            })({ path: null, data: { value: errors.value } }),
        ];
    };
}

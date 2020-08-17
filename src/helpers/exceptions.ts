import { IException, IExceptions } from 'types';
import * as _ from 'lodash';

type Exception = (details: Partial<IException>) => IException;

export class Exceptions {
    private readonly $args: any;
    private readonly $exceptions: IException[];

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
}

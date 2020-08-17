import { Response } from 'express';
import { Request } from 'types';

import * as _ from 'lodash';
import * as passport from 'passport';
import { User } from '../user.entity';

type AuthenticationDone = (err: any, user: User | null) => void;

export class OAuth {
    name: string;
    strategy: any;
    loginURL: string;
    callbackURL: string;
    getProfile: any;
    authenticateOptions: any;
    callbackOptions: any;

    constructor(options) {
        const { name, strategy } = options;
        [this.name, this.strategy] = [name, strategy];

        const {
            loginURL = `/oauth/${name}/`,
            callbackURL = `/oauth/${name}/callback/`,
            getProfile = OAuth.defaultGetProfile,
            authenticateOptions = {},
            callbackOptions = {},
        } = options;
        [this.loginURL, this.callbackURL, this.getProfile] = [loginURL, callbackURL, getProfile];
        [this.authenticateOptions, this.callbackOptions] = [authenticateOptions, callbackOptions];

        this.authenticate = this.authenticate.bind(this);
        this.callback = this.callback.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.getOrCreateUser = this.getOrCreateUser.bind(this);
    }

    static defaultGetProfile(profile) {
        const { emails, displayName } = profile;
        return {
            emails: _.map(emails, 'value'),
            name: displayName,
        };
    }

    async getOrCreateUser(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: AuthenticationDone,
    ) {
        try {
            const { emails, name } = this.getProfile(profile);
            const [user] = await User.getOrCreateUserByEmails({ emails, name });
            done(null, user);
        } catch (error) {
            if (error == 'Many users found.') done('Multiple users found with this account', null);
            else done('Unknown error occurred', null);
        }
    }

    authenticate(req: Request, res: Response, next: any) {
        passport.authenticate(this.name, this.authenticateOptions)(req, res, next);
    }

    callback(req: Request, res: Response, next: any) {
        passport.authenticate(this.name, this.callbackOptions)(req, res, next);
    }

    async onSuccess(req: Request, res: Response) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const user = req.user as User || null;
        if (user) {
            await user.login(req.session);
            res.redirect('/');
        } else {
            res.send('User not found. FAILED LOGIN.');
        }
    }

    views(config: any) {
        passport.use(new this.strategy(config, this.getOrCreateUser));
        console.log(this.loginURL, this.callbackURL);

        return [
            [this.loginURL, this.authenticate],
            [this.callbackURL, this.callback, this.onSuccess],
        ];
    }
}

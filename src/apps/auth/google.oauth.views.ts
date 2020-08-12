import { Response } from 'express';
import { Request } from 'types';
import { User } from 'apps/auth/user.entity';

import * as _ from 'lodash';
import * as passport from 'passport';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

let VIEW_MAPPING = [];
if (process.env.GOOGLE_CLIENT_ID) {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:4000/auth/google/callback',
        },
        async function(accessToken, refreshToken, profile, cb) {
            try {
                const emails = _.map(profile.emails, 'value');
                const { displayName: name } = profile;

                const [user, ] = await User.getOrCreateUserByEmails({ name, emails });
                cb(null, user);
            } catch (e) {
                console.log({ e });
                if (e == 'Many users found.') cb('Multiple users found with this account', null);
                else cb('Unknown error occurred', null);
            }
        },
    ));

    const googleSignIn = passport.authenticate('google', { scope: ['profile', 'email'] });

    const googleConfirmSignIn = passport.authenticate('google', { failureRedirect: '/auth/google/failure/' });

    const onSignInSuccess = (req: Request, res: Response): void => {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const user = req.user as User || null;
        if (user) {
            req.session.userId = user.id;
            res.redirect('/auth/google/success/');
        } else {
            res.redirect('/auth/google/failure/');
        }
    };

    const successView = async (req: Request, res: Response) => {
        const user = await User.findOne(req.session);
        res.send(`Hi, ${user.name}. Welcome to our world. <a href="/">Continue</a>`)
    };

    const signInFailure = (req: Request, res: Response) => {
        res.send('Login Failure');
    };


    VIEW_MAPPING = [
        ['/auth/google/', googleSignIn],
        ['/auth/google/callback/', googleConfirmSignIn, onSignInSuccess],
        ['/auth/google/failure/', signInFailure],
        ['/auth/google/success/', successView],
    ];
}

export default {
    'get': VIEW_MAPPING,
};

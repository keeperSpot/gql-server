import { Response } from 'express';
import { Request } from 'types';
import * as passport from 'passport';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/google/callback',
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        cb();
    },
));

const googleSignIn = passport.authenticate('google', { scope: ['profile', 'email'] });
const googleConfirmSignIn = passport.authenticate('google', { failureRedirect: '/auth/google/failure/' });
const onSignInSuccess = (req: Request, res: Response) => {
    res.redirect('/');
}

const signInFailure = (req: Request, res: Response) => {
    res.send('Login Failure')
}

export default {
    'get': [
        ['/auth/google/', googleSignIn],
        ['/auth/google/callback/', googleConfirmSignIn, onSignInSuccess],
        ['/auth/google/failure/', signInFailure]
    ],
};

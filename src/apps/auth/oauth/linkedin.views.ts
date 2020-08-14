import { OAuth } from './index';
import { Strategy as strategy } from 'passport-linkedin-oauth2';

const linkedin = new OAuth({ name: 'linkedin', strategy });
let views = [];

if (process.env.LINKEDIN_API_KEY)
    views = linkedin.views({
        clientID: process.env.LINKEDIN_API_KEY as string,
        clientSecret: process.env.LINKEDIN_SECRET_KEY as string,
        callbackURL: 'http://localhost:4000/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_liteprofile'],
    })


export default {
    'get': views
}

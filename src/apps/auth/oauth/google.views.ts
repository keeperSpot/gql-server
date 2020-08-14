import { OAuth } from './index';
import { Strategy as strategy } from 'passport-google-oauth20';

const google = new OAuth({ name: 'google', strategy });
let views = [];

if (process.env.GOOGLE_CLIENT_ID)
    views = google.views({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/google/callback',
        scope: ['profile', 'email']
    })


export default {
    'get': views
}

import { OAuth } from './index';
import { Strategy as strategy } from 'passport-github2';

const github = new OAuth({ name: 'github', strategy });
let views = [];

if (process.env.GITHUB_CLIENT_ID)
    views = github.views({
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: 'http://localhost:4000/auth/github/callback',
    })


export default {
    'get': views
}

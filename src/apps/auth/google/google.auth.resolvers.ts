import { IExceptions, ResolverMap } from 'types';
import { OAuth2Client } from 'google-auth-library';
import { Exceptions } from 'helpers/exceptions';
import { User } from 'apps/user.entity';
import { INVALID_GOOGLE_SIGN_IN } from './exceptions';

let client = null;
const Resolvers: ResolverMap = {
    Mutation: {
        loginWithGoogle: async (
            _,
            { id, token }: GQL.ILoginWithGoogleOnMutationArguments,
            { session },
        ): Promise<User | IExceptions> => {
            const e = new Exceptions({ id, token });
            if (!client) client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

            try {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                const userid = payload['sub'];

                if (userid === id) {
                    const [user] = await User.getOrCreateUserByEmails({
                        emails: [payload.email],
                        name: payload.name,
                    });
                    await user.login(session);
                    return user;
                }
            } catch (error) {}

            return e.push(INVALID_GOOGLE_SIGN_IN);
        },
    },
};

export default Resolvers;

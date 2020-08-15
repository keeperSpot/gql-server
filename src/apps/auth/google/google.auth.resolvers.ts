import { ResolverMap } from 'types';
import { OAuth2Client } from 'google-auth-library';
import { User } from 'apps/auth/user.entity';

let client = null;
const Resolvers: ResolverMap = {
    Mutation: {
        loginWithGoogle: async (
            _,
            { id, token }: GQL.ILoginWithGoogleOnMutationArguments,
            { session },
        ): Promise<User | null> => {
            if (!client) client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
            return null;
        },
    },
};

export default Resolvers;

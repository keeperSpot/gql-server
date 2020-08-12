import { Server } from 'server';
import { Connection } from 'typeorm';

import { TestClient } from 'server/client';
import { User, Email } from './user.entity';


let conn: Connection;
beforeAll(async () => {
    conn = await Server.connectToDB();
});

afterAll(async () => {
    await conn.close();
});


describe('find users with email', () => {
    const createUsersWithEmail = async (emailCount = 1) => {
        const { name } = TestClient.createCredentials();

        const emailObjs = [];
        const emails = [];
        for (let i = 0; i < emailCount; i++) {
            const { email } = TestClient.createCredentials();
            emails.push(email);

            const emailObj = await Email.create({ email });
            await emailObj.save();
            emailObjs.push(emailObj);
        }

        const user = await User.create({ name, emails: emailObjs });
        await user.save();
        return { user, emails, emailObjs }
    };

    test('insert one email and find', async () => {
        const { user, emails } = await createUsersWithEmail(1);
        const users = await User.findByEmails(emails);

        expect(users).toHaveLength(1);
        expect(users[0].id).toEqual(user.id);

        const oneUser = await User.findOneByEmails(emails);
        expect(oneUser.id).toEqual(user.id);
    });

    test('insert multiple email and find', async () => {
        const { user, emails } = await createUsersWithEmail(3);
        const users = await User.findByEmails(emails);

        expect(users).toHaveLength(1);
        expect(users[0].id).toEqual(user.id);

        const oneUser = await User.findOneByEmails(emails);
        expect(oneUser.id).toEqual(user.id);
    });

    test('insert multiple and find using wrong email', async () => {
        const { user, emails } = await createUsersWithEmail(3);
        const { email: randomEmail } = await TestClient.createCredentials();

        const users = await User.findByEmails([randomEmail]);
        expect(users).toHaveLength(0);
    });

    test('insert multiple and check for multiple using wrong email', async () => {
        const { user: user1, emails: emails1 } = await createUsersWithEmail(3);
        const { user: user2, emails: emails2 } = await createUsersWithEmail(4);
        const { emails: emails3 } = await createUsersWithEmail(4);

        const { email: randomEmail } = await TestClient.createCredentials();
        const byRandomEmails = await User.findByEmails([randomEmail]);
        expect(byRandomEmails).toHaveLength(0);

        const by1Only = await User.findByEmails(emails1.slice(0, 2))
        expect(by1Only).toHaveLength(1);
        expect(by1Only[0].id).toEqual(user1.id);

        const by2Only = await User.findByEmails(emails2.slice(0, 2))
        expect(by2Only).toHaveLength(1);
        expect(by2Only[0].id).toEqual(user2.id);

        const by1and2Only = await User.findByEmails([emails1[0], emails2[0]])
        expect(by1and2Only).toHaveLength(2);

        const by2and3Only = await User.findByEmails([emails2[3], emails3[1]])
        expect(by2and3Only).toHaveLength(2);

        const user1obj0 = await User.findOneByEmails([emails1[0]]);
        expect(user1obj0.id).toEqual(user1.id);

        const user1obj0n1 = await User.findOneByEmails([emails1[0], emails1[1]]);
        expect(user1obj0n1.id).toEqual(user1.id);

        const user1obj1n2 = await User.findOneByEmails([emails1[1], emails1[2]]);
        expect(user1obj1n2.id).toEqual(user1.id);

        const { email: randomEmail2 } = await TestClient.createCredentials();
        const userNull = await User.findOneByEmails([randomEmail2]);
        expect(userNull).toEqual(null);

        expect(User.findOneByEmails([emails1[0], emails2[0]])).rejects.toEqual('Many users found.');
    });
});

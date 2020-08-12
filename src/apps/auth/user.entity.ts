import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { In } from 'typeorm';
import { BaseEntity } from 'helpers/db';
import * as _ from 'lodash';
import { Session } from 'types';

@Entity('phone')
export class Phone extends BaseEntity {
    @Column({ nullable: false, default: '91' })
    country: string;

    @Column({ nullable: false, unique: true })
    number: string;

    @Column({ default: false })
    verified: boolean;

    @ManyToOne(type => User, user => user.phones)
    user: User;
}


@Entity('email')
export class Email extends BaseEntity {
    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ default: false })
    verified: boolean;

    @ManyToOne(type => User, user => user.emails)
    user: User;
}


interface CreateUserByEmailsOptions {
    name: string;
    emails: string[]
}


@Entity('users')
export class User extends BaseEntity {
    @Column({ nullable: false })
    name: string;

    @OneToMany(type => Phone, phone => phone.user)
    phones: Phone[];

    @OneToMany(type => Email, email => email.user)
    emails: Email[];

    static async findByEmails(emails: string[]): Promise<User[]> {
        const emailObjs = await Email.find({
            cache: true,
            select: ['email'],
            where: { email: In(emails) },
            relations: ['user'],
        });
        console.log({ emails, emailObjs });
        const uniqueUsers = _.uniqBy(emailObjs.map(emailObj => emailObj.user), 'id');

        console.log({ emails, uniqueUsers });
        return uniqueUsers;
    }

    static async findOneByEmails(emails: string[]): Promise<User | null> {
        const users = await User.findByEmails(emails);
        console.log({ emails, users });

        if (users.length == 0) return null;
        if (users.length == 1) return users[0];

        throw Error('Many users found.');
    }

    static async createUserByEmails({ name, emails }: CreateUserByEmailsOptions): Promise<User> {
        const emailObjs = [];
        for (const email of emails) {
            const emailObj = await Email.create({ email });
            await emailObj.save();
            emailObjs.push(emailObj);
            console.log('Created email', email);
        }

        console.log({ name, emails, emailObjs });

        const user = await User.create({ name, emails: emailObjs });
        await user.save();
        console.log({ name, emails, emailObjs, user });

        return user;
    }

    static async getOrCreateUserByEmails({ name, emails }: CreateUserByEmailsOptions): Promise<[User, boolean]> {
        const existingUser = await User.findOneByEmails(emails);
        console.log({ name, emails, existingUser });
        if (existingUser) return [existingUser, false];

        const newUser = await User.createUserByEmails({ name, emails });
        console.log({ name, emails, newUser });
        return [newUser, true];
    }

    static getFromId(id: string): Promise<User> {
        return User.findOne({
            where: { id: id },
            relations: ['emails', 'phones'],
        });
    }

    static async fromSession(session: Session, full = false): Promise<User | null> {
        const { userId } = session;
        if (!userId) return null;
        return await User.findOne({
            where: { id: userId },
            relations: full ? ['emails', 'phones'] : [],
        });
    }
}

import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { In } from 'typeorm';
import { BaseEntity } from 'helpers/db';
import * as _ from 'lodash';


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
            relations: ['user']
        });
        return _.uniqBy(emailObjs.map(emailObj => emailObj.user), 'id');
    }

    static async findOneByEmails(emails: string[]): Promise<User | null>  {
        const users = await User.findByEmails(emails);
        if (users.length == 0) return null;
        if (users.length == 1) return users[0];

        console.log({ users })
        throw Error('Many users found.')
    }
}

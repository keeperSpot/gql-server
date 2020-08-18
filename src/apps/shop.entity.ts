import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'helpers/db';
import * as _ from 'lodash';
import { User } from './user.entity';


@Entity('shop')
export class Shop extends BaseEntity {

    @Column({ nullable: true })
    domain: string;

    @Column({ nullable: false, unique: true })
    _slug: string;

    @Column()
    name: string;

    @Column('text')
    address: string;

    @OneToOne( type => User)
    @JoinColumn()
    owner: User;

    get slug() {
        return this._slug;
    }

    set slug(value) {
        this._slug = _.kebabCase(value);
    }
}

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
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

    @ManyToOne( type => User)
    @JoinColumn()
    owner: User;

    
    get slug() {
        return this._slug;
    }

    set slug(value) {
        console.log('slug', value, _.kebabCase(value));
        this._slug = _.kebabCase(value);
    }
}

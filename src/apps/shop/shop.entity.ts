import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'helpers/db';


@Entity('shop')
class Shop extends BaseEntity {

    @Column()
    name: string;

    @Column({ array: true })
    domain: string[];
}

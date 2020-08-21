import { Entity, Column ,OneToMany,JoinColumn } from 'typeorm';
import { BaseEntity } from 'helpers/db';
import {Product} from './product.entity'

@Entity('brand')
export class Brand extends BaseEntity {

    @Column({ nullable: false ,length:225})
    name: string;

    @Column({ nullable: true })
    description: string

    @Column({ nullable: false ,length:3})
    country: string;

    @OneToMany(type => Product, product => product.brand)
    product: Product[];

    get isIndian(){
        return this.country==='IND';
    }

}

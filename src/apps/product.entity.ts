import { Entity, Column, OneToMany, OneToOne, AfterLoad,JoinColumn } from 'typeorm';
import { BaseEntity } from 'helpers/db';
import {Variant} from './variant.entity';
import { Brand } from './brand.entity';


@Entity('product')
export class Product extends BaseEntity {

    @Column({ nullable: false ,length:255})
    name: string;

    @Column({ nullable: false ,length:2})
    containerType: string;

    @Column({ nullable: true ,length:3})
    country: string;

    @Column({ nullable: false})
    isIndian: boolean;

    @AfterLoad()
    setIsIndian() {
        this.isIndian = this.country==='IND';
    }

    @OneToOne(type => Brand)
    @JoinColumn()
    brand: Brand;

    @OneToMany(type => Variant, variant => variant.product)
    variant: Variant[];
}

import { Entity, Column, ManyToOne  } from 'typeorm';
import { BaseEntity } from 'helpers/db';
import { Product } from './product.entity';


@Entity('variant')
export class Variant extends BaseEntity {

    @Column({ nullable: false ,length:225})
    name: string;

    @Column({ nullable: false })
    price: number

    @Column({ nullable: false ,length:49})
    sku: string;

    @Column('json')
    details: any;

    @Column({ nullable: true ,length:255})
    barcode: string;

    @ManyToOne(type => Product, product => product.variant)
    product: Product;

    get isIndian(){
        return this.product.country==='IND';
    }


}

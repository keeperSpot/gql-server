import { Entity, Column, ManyToOne,AfterLoad  } from 'typeorm';
import { BaseEntity } from 'helpers/db';
import { Product } from './product.entity';


@Entity('variant')
export class Variant extends BaseEntity {

    @Column({ nullable: false ,length:21})
    name: string;

    @Column({ nullable: false })
    price: number

    @Column({ nullable: false ,length:49})
    sku: string;

    // @Column({ nullable: false ,length:49})
    // details: any[];

    @Column({ nullable: true ,length:255})
    barcode: string;

    @Column({ nullable: true })
    isIndian: boolean;


    @ManyToOne(type => Product, product => product.variant)
    product: Product;
}

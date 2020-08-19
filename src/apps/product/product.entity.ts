import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'helpers/db';
import { post } from 'request-promise';
import { CoreOptions } from 'request';


@Entity('product')
export class Product extends BaseEntity {
    options: CoreOptions;
    @Column()
    name:string;

    @Column()
    price:string;

}






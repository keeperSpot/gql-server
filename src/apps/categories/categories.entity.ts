import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'helpers/db';
import { CoreOptions } from 'request';


@Entity('category')
export class Category extends BaseEntity {
    options: CoreOptions;
    @Column()
    name:string;

    @Column({nullable:false,unique:true})
    code:string;

    @Column()
    representation:string;

    @Column()
    parent:string;

}
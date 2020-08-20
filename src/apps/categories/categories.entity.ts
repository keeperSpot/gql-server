import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'helpers/db';


@Entity('category')
export class Category extends BaseEntity {
    @Column()
    name:string;

    @Column({nullable:false,unique:true})
    code:string;

    @Column()
    representation:string;

    @Column()
    parent:string;

}
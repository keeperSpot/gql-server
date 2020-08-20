import {Entity, PrimaryGeneratedColumn, Column,getConnection} from 'typeorm';
import { BaseEntity } from 'helpers/db';


@Entity('product')
export class Product extends BaseEntity{
    @Column({ nullable: false })
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}
/*
getConnection()
    .createQueryBuilder()
    .insert()
    .into(Product)
    .values([
        { name:"asdfasdfasdf"}
     ])
    .execute();
    */
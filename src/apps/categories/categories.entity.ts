import { Entity, Column ,ManyToOne } from 'typeorm';
import { BaseEntity } from 'helpers/db';
import * as _ from 'lodash';

@Entity('category')
export class Category extends BaseEntity {
    @Column()
    name:string;

    @Column()
    code:string;

    @Column({nullable:false,unique:true})
    representation:string;

    @ManyToOne(type => Category, parent => parent.parent)
    parent: Category;

    get _representation(){
        return this.representation;
    }

    set _representation(value){
        this.representation=_.kebabCase(value);
    }

}
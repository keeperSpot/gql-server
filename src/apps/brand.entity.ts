import { Entity, Column ,AfterLoad } from 'typeorm';
import { BaseEntity } from 'helpers/db';


@Entity('brand')
export class Brand extends BaseEntity {

    @Column({ nullable: false ,length:225})
    name: string;

    @Column({ nullable: true })
    description: string

    @Column({ nullable: false ,length:3})
    country: string;

    @Column({ nullable: true})
    isIndian: boolean;

    @AfterLoad()
    setIsIndian() {
        return this.country==='IND';
    }


}

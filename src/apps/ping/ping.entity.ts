import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'helpers/db';


@Entity('ping')
export class Ping extends BaseEntity {
    @Column({ nullable: false })
    ip: string;

    constructor(ip: string) {
        super();
        this.ip = ip;
    }
}

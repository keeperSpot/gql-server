import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';


@Entity('ping')
export class Ping extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    time: Date;

    @Column({ nullable: false })
    ip: string;

    constructor(ip: string) {
        super();
        this.ip = ip;
    }
}

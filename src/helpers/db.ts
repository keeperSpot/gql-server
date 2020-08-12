import { PrimaryGeneratedColumn, Column, BaseEntity as TypeOrmBaseEntity } from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created: Date;
}

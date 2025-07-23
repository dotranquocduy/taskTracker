import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column()
    name!: string;

    @Column({unique: true})
    email!: string;

    @Column({unique: true})
    phone!: string;

    @Column()
    password!: string;

}
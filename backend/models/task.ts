import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Task extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!:string;

    @Column()
    status!:string;

    @ManyToOne(() => User, user => user.id)
    user!: User;
}

// ssfj jtxh yhmn ouai
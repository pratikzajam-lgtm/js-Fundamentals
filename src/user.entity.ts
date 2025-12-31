
import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name: 'name' })
    name: string;

    @Column({ type: "varchar", name: "email" })
    email: string;

    @Column({ type: "varchar", name: "password" })
    password: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz', 
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}

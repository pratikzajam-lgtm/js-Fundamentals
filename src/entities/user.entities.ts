import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    MANAGER = 'manager',
    STAFF = 'staff'
}

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name: 'name', nullable: false })
    name: string;

    @Column({ type: "varchar", name: 'email', unique: true })
    email: string

    @Column({ type: "varchar", name: 'password' })
    password: string

    @Column({ type: "enum", enum: UserRole, default: UserRole.STAFF })
    role: UserRole

    @Column({ type: 'boolean', default: true })
    isActive: boolean

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    timeStamp: Date;
}


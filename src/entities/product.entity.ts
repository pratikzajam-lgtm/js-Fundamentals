import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('product')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name: 'name' })
    name: string;

    @Column({ type: "varchar", name: 'description' })
    description: string

    @Column({ type: "decimal", name: 'price' })
    price: number

    @Column({ type: "boolean", name: 'is_active', default:true})
    isActive: boolean 

    @Column({ type: "integer", })
    createdBy: number

    @Column({ type: 'integer', nullable: true })
    updatedBy: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt: Date;


}


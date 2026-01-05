import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class InitialMigration1736083200000 implements MigrationInterface {
    name = 'InitialMigration1736083200000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create UserRole enum type
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE "user_role_enum" AS ENUM('superadmin', 'admin', 'manager', 'staff');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

    
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'role',
                        type: 'user_role_enum',
                        default: "'staff'",
                    },
                    {
                        name: 'isActive',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'timeStamp',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );

        
        await queryRunner.createTable(
            new Table({
                name: 'product',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'createdBy',
                        type: 'integer',
                    },
                    {
                        name: 'updatedBy',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            }),
            true,
        );


        await queryRunner.createTable(
            new Table({
                name: 'inventory',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'product_id',
                        type: 'integer',
                        isUnique: true,
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'createdBy',
                        type: 'integer',
                    },
                    {
                        name: 'updatedBy',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );

        
        await queryRunner.createForeignKey(
            'inventory',
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'product',
                onDelete: 'CASCADE',
            }),
        );

        // Create indexes
        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'IDX_USER_EMAIL',
                columnNames: ['email'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        const inventoryTable = await queryRunner.getTable('inventory');
        const foreignKey = inventoryTable?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('product_id') !== -1,
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey('inventory', foreignKey);
        }

        
        await queryRunner.dropTable('inventory', true);
        await queryRunner.dropTable('product', true);
        await queryRunner.dropTable('users', true);

        
        await queryRunner.query(`DROP TYPE IF EXISTS "user_role_enum"`);
    }
}

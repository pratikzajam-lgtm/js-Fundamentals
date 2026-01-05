import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { ProductsModule } from 'src/products/products.module';
import { Inventory } from 'src/entities/inventory.entity';
import { Product } from 'src/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory, Product]),
    ProductsModule, 
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule { }

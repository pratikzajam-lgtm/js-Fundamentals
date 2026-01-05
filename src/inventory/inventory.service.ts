import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Inventory } from 'src/entities/inventory.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(
    productId: number,
    createInventoryDto: CreateInventoryDto,
    user: any,
  ): Promise<Inventory> {

    const { quantity } = createInventoryDto;

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Product not found',
        data: null,
      });
    }


    const existingInventory = await this.inventoryRepository.findOne({
      where: { product: { id: productId } },
      relations: ['product'],
    });

    if (existingInventory) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Inventory already exists for this product',
        data: null,
      });
    }


    const inventory = this.inventoryRepository.create({
      product,
      quantity: quantity ?? 0,
      createdBy: Number(user.id),
    });


    return await this.inventoryRepository.save(inventory);
  }

  async findAll(filters?: {
    page?: number;
    limit?: number;
    productId?: number;
  }) {
    try {
      const page = filters?.page ?? 1;
      const limit = filters?.limit ?? 10;
      const productId = filters?.productId;

      const skip = (page - 1) * limit;

    
      const where: any = {};

      if (productId) {
        where.product = { id: productId };
      }

      const [allInventory, total] =
        await this.inventoryRepository.findAndCount({
          where,
          relations: ['product'],
          select: {
            id: true,
            quantity: true,
            createdAt: true,
            updatedAt: true,
            product: {
              id: true,
              name: true,
              description: true,
              price: true,
            },
          },
          skip,
          take: limit,
          order: { createdAt: 'DESC' },
        });

      if (allInventory.length < 1) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'No inventory found',
          data: null,
        });
      }

      return {
        inventory: allInventory,
        metaData: {
          totalRecords: total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          limit,
        },
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: 500,
        message: error.message,
        data: null,
      });
    }
  }


  async findOne(id: number) {
    try {
      if (!id) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Id not found',
          data: null,
        });
      }

      const inventory = await this.inventoryRepository.findOne({
        where: { id },
        relations: ['product'],
        select: {
          id: true,
          quantity: true,
          createdAt: true,
          updatedAt: true,
          product: {
            id: true,
            name: true,
            description: true,
            price: true,
          },
        },
      });

      if (!inventory) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Inventory not found',
          data: null,
        });
      }

      return { inventory };
    } catch (error) {

      throw new BadRequestException({
        statusCode: 500,
        message: error.message,
        data: null,
      });
    }
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto, user: any) {
    try {
      if (!id) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Id not found',
          data: null,
        });
      }

      const inventory = await this.inventoryRepository.findOne({
        where: { id },
        relations: ['product'],
      });

      if (!inventory) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Inventory not found',
          data: null,
        });
      }

      if (updateInventoryDto.quantity !== undefined) {
        if (updateInventoryDto.quantity < 0) {
          throw new BadRequestException({
            statusCode: 400,
            message: 'Quantity cannot be negative',
            data: null,
          });
        }
        inventory.quantity = updateInventoryDto.quantity;
      }

      inventory.updatedBy = Number(user.id);

      const updatedInventory = await this.inventoryRepository.save(inventory);

      return { id: updatedInventory.id };
    } catch (error) {

      throw new BadRequestException({
        statusCode: 500,
        message: error.message,
        data: null,
      });
    }
  }

  async remove(id: number) {
    try {
      if (!id) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Id not found',
          data: null,
        });
      }

      const inventory = await this.inventoryRepository.findOne({
        where: { id },
      });

      if (!inventory) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Inventory not found',
          data: null,
        });
      }

      const result = await this.inventoryRepository.delete(id);

      if (result.affected === 0) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Something went wrong while deleting the inventory',
          data: null,
        });
      }

      return { success: true };
    } catch (error) {

      throw new BadRequestException({
        statusCode: 500,
        message: error.message,
        data: null,
      });
    }
  }
}

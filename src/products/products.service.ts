import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { Like } from 'typeorm';



@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }


  async createProduct(product: object): Promise<Product> {
    return this.productRepository.save(product)
  }

  async fetchAllProducts(): Promise<Product[]> {
    return this.productRepository.find({
      where: { isActive: true },

      select: {
        name: true,
        description: true,
        price: true
      }
    })
  }


  async deleteProduct(id: number): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return result.affected == 1;
  }



  async fetchProductsById(id: number): Promise<Partial<Product> | null> {
    return this.productRepository.findOne({
      where: { id: id, isActive: true },

      select: {
        name: true,
        description: true,
        price: true
      }
    })
  }

  async isProductExists(name: string): Promise<boolean> {
    return this.productRepository.exists({ where: { name: name } })
  }

  async create(createProductDto: CreateProductDto, user: any) {

    try {
      const { name, description, price } = createProductDto;


      let isProductExists = await this.isProductExists(name);

      if (isProductExists) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Product Allready Exists',
          data: null
        });
      }

      if (price < 1) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Please Enter Proper Price Details',
          data: null
        });
      }


      let product = {
        name: name,
        description: description,
        price: price,
        createdBy: Number(user.id)
      }

      let SaveUser = await this.createProduct(product);

      if (!SaveUser.id) {
        throw new InternalServerErrorException({
          statusCode: 500,
          message: 'Something Went Wrong While Adding The Product',
          data: null
        });
      }

      let userId = SaveUser.id;

      return { userId: userId }
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: error.message,
        data: null
      });
    }

  }

  async findAll(filters?: {
    page?: number;
    limit?: number;
    name?: string;
    isActive?: boolean;
  }) {
    try {
      const page = filters?.page ?? 1;
      const limit = filters?.limit ?? 10;
      const name = filters?.name;
      const isActive = filters?.isActive;

      const skip = (page - 1) * limit;


      const where: any = {};

      if (name) {
        where.name = Like(`%${name}%`);
      }

      if (isActive !== undefined) {
        where.isActive = isActive;
      }


      const [products, total] =
        await this.productRepository.findAndCount({
          where,
          skip,
          take: limit,
          order: { createdAt: 'DESC' },
        });

      if (products.length < 1) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Product Not Found',
          data: null,
        });
      }

      return {
        products,
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
          message: "Id Not Found",
          data: null
        });
      }

      let product = await this.fetchProductsById(id)

      if (!product) {
        throw new NotFoundException({
          statusCode: 404,
          message: "product not found",
          data: null
        });
      }

      return { product: product }

    } catch (error) {
      throw new BadRequestException({
        statusCode: 500,
        message: error.message,
        data: null
      });
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ) {


    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Product not found',
        data: null,
      });
    }


    if (updateProductDto.name) {
      const existingProduct = await this.productRepository.findOne({
        where: {
          name: updateProductDto.name,
        },
      });


      if (existingProduct && existingProduct.id !== id) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Product name already exists',
          data: null,
        });
      }
    }


    Object.assign(product, updateProductDto);


    let updatedProduct = await this.productRepository.save(product);

    return { id: updatedProduct.id }
  }


  async remove(id: number) {
    try {

      if (!id) {
        throw new NotFoundException({
          statusCode: 404,
          message: "Id Not Found",
          data: null
        });
      }

      let product = await this.fetchProductsById(id)

      if (!product) {
        throw new NotFoundException({
          statusCode: 404,
          message: "product not found",
          data: null
        });
      }

      let deleteProduct = await this.deleteProduct(id);


      if (!deleteProduct) {
        throw new BadRequestException({
          statusCode: 404,
          message: "something went wrong while deleting the record",
          data: null
        });
      }




    } catch (error) {
      throw new BadRequestException({
        statusCode: 500,
        message: error.message,
        data: null
      });
    }


  }
}

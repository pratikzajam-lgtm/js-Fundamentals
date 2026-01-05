import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseIntPipe,DefaultValuePipe } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/rbac/rbac.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import type { RequestWithUser } from '../common/types/request-with-user-interface'
import { Product } from 'src/entities/product.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Query } from '@nestjs/common';



@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
@Roles('superadmin', 'admin', 'manager')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body()
    createProductDto: CreateProductDto) {
    let result = await this.productsService.create(createProductDto, req.user);

    return {
      statusCode: 201,
      message: 'Product Added Sucessfully',
      data: result,
    }
  }

  @Get()
async findAll(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  @Query('name') name?: string,
  @Query('isActive') isActive?: boolean,
) {
  const result = await this.productsService.findAll({
    page,
    limit,
    name,
    isActive,
  });

  return {
    statusCode: 200,
    message: 'Fetch Products Successfully',
    data: result,
  };
}


  @Get(':id')
  async findOne(@Param('id') id: string) {
    let result = await this.productsService.findOne(+id);

    return {
      statusCode: 200,
      message: "product fetched sucessfully",
      data: result
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    let result = await this.productsService.update(+id, updateProductDto);


    return {
      statusCode: 200,
      message: "Products Updated SUcessfully",
      data: result
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.productsService.remove(+id);

    return {
      statusCode: 200,
      message: "product deleted sucesfully",
      data: result,
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/rbac/rbac.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import type { RequestWithUser } from '../common/types/request-with-user-interface';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { Query,DefaultValuePipe } from '@nestjs/common';




@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
@Roles('superadmin','admin', 'manager', 'staff')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Post(':productId')
  @ApiBearerAuth()
  async create(
    @Req() req: RequestWithUser,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() createInventoryDto: CreateInventoryDto,
  ) {
    const result = await this.inventoryService.create(
      productId,
      createInventoryDto,
      req.user,
    );

    return {
      statusCode: 201,
      message: 'Inventory created successfully',
      data: result,
    };
  }


  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('productId') productId?: number
  ) {
    const result = await this.inventoryService.findAll({
      page,
      limit,
      productId,
    });

    return {
      statusCode: 200,
      message: 'Inventory fetched successfully',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.inventoryService.findOne(id);
    return {
      statusCode: 200,
      message: 'Inventory fetched successfully',
      data: result,
    };
  }

  @Patch(':id')
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    const result = await this.inventoryService.update(id, updateInventoryDto, req.user);
    return {
      statusCode: 200,
      message: 'Inventory updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.inventoryService.remove(id);
    return {
      statusCode: 200,
      message: 'Inventory deleted successfully',
      data: result,
    };
  }
}

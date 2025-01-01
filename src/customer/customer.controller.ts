import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller({
  path: 'customer',
  version: '1',
})
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return {
      msg: 'Create Customer Successfully',
      dataCreated: await this.customerService.create(createCustomerDto),
    };
  }

  @Get()
  async findAll() {
    return {
      msg: 'Get Customers data successfully!',
      custumerData: await this.customerService.getCustomersData(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      msg: `Get Customer by ${id} successfully!`,
      customer: await this.customerService.findOne(+id),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const affectedCountUpdate = await this.customerService.update(
      +id,
      updateCustomerDto,
    );
    return {
      msg:
        affectedCountUpdate[0] === 1
          ? 'Update Customer Successfully!'
          : `Update Customer Faild, Customer id ${id} not found.`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      msg: 'Customer delete successfully!',
      deletedRows: await this.customerService.remove(+id),
    };
  }
}

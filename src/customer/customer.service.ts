import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) // inject model *sqlize
    private readonly cistomerModel: typeof Customer,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer' + createCustomerDto;
  }

  async getCustomersData() {
    return {
      msg: 'get data successfully !',
      data: await this.cistomerModel.findAll(),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer ${updateCustomerDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}

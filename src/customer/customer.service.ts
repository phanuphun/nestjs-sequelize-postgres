import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) // inject model *sqlize
    private readonly customerModel: typeof Customer,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      return await this.customerModel.create(
        createCustomerDto as Partial<Customer>,
      );
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async getCustomersData(): Promise<Array<Customer>> {
    return await this.customerModel.findAll({
      order: [['id', 'desc']],
    });
  }

  async findOne(id: number) {
    try {
      const customer = await this.customerModel.findByPk(id);
      if (!customer) {
        throw new NotFoundException(`Not found customer id ${id}`);
      }
      return customer;
    } catch (error) {
      if (error instanceof HttpException) {
        if (error.getStatus() === 404) {
          throw error;
        }
      }
      throw new HttpException(
        `Something wrong, ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      return await this.customerModel.update(updateCustomerDto, {
        where: { id: id },
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async remove(id: number) {
    try {
      const destroyResult = await this.customerModel.destroy({
        where: { id: id },
      });
      if (destroyResult === 0) {
        throw new NotFoundException('Not Found Customer id');
      }
      return `deleted ${destroyResult} row`;
    } catch (error) {
      if (error instanceof HttpException) {
        return error;
      }
      throw new HttpException(error, 500);
    }
  }
}

import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [SequelizeModule.forFeature([Customer])], // import model
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}

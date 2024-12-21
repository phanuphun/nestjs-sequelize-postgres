import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { UtilityModule } from 'src/shared/utility/utility.module';

@Module({
  imports: [UtilityModule],
  controllers: [ProductsController],
})
export class ProductsModule {}

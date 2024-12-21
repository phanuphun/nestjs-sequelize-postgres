import { Controller, Get } from '@nestjs/common';
import { UtilityService } from 'src/shared/utility/utility.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly utils: UtilityService) {}

  @Get('/')
  fincAll() {
    return [];
  }

  @Get('/date')
  getDate() {
    return {
      server_date: this.utils.getServerDate(),
    };
  }
}

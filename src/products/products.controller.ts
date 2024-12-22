import { Controller, Get } from '@nestjs/common';
import { GlobalHelperService } from 'src/shared/global-helper/global-helper.service';
import { UtilityService } from 'src/shared/utility/utility.service';
@Controller('products')
export class ProductsController {
  constructor(
    private readonly utils: UtilityService,
    private readonly globalHelperService: GlobalHelperService,
  ) {}

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

  @Get('/date-fns')
  getDate_fns() {
    return {
      server_thai_date: this.globalHelperService.getServerThaiDate(),
    };
  }
}

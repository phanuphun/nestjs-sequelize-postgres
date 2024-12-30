import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Version,
} from '@nestjs/common';
import { GlobalHelperService } from 'src/shared/global-helper/global-helper.service';
import { UtilityService } from 'src/shared/utility/utility.service';
@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(
    private readonly utils: UtilityService,
    private readonly globalHelperService: GlobalHelperService,
  ) {}

  @Get('/')
  fincAll() {
    try {
      return { msg: 'welcome to products' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'error occured !',
        },
        error,
      );
    }
  }

  @Get('/date')
  getDate() {
    return {
      server_date: this.utils.getServerDate(),
    };
  }

  @Version('2')
  @Get('/thaidate')
  getDate_fns() {
    return {
      server_thai_date: this.globalHelperService.getServerThaiDate(),
    };
  }

  @Get('/error')
  testErr() {
    throw new HttpException(
      'Something wrong cant show current date',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Version('2')
  @Get('/error')
  testErr2() {
    // build-in exception
    throw new BadRequestException(
      'Something wrong cant show current date',
      'มีบางอย่าผิดพลาดไม่สามารถแสดงวันที่ได้',
    );
  }
}

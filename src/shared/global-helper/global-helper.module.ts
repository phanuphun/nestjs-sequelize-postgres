import { Module } from '@nestjs/common';
import { GlobalHelperService } from './global-helper.service';

@Module({
  providers: [GlobalHelperService],
  exports: [GlobalHelperService],
})
export class GlobalHelperModule {}

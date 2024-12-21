import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';

@Module({
  providers: [UtilityService],
  exports: [UtilityService], // module อื่นที่ import utilityModul จะใช้ utilityService ได้
})
export class UtilityModule {}

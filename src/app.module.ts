import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UtilityModule } from './shared/utility/utility.module';
import { GlobalHelperModule } from './shared/global-helper/global-helper.module';

@Module({
  imports: [ProductsModule, UtilityModule, GlobalHelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

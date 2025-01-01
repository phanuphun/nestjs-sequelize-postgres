import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UtilityModule } from './shared/utility/utility.module';
import { GlobalHelperModule } from './shared/global-helper/global-helper.module';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Customer } from './customer/entities/customer.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';

@Module({
  // import controller modules
  imports: [
    ProductsModule,
    UtilityModule,
    GlobalHelperModule,
    CustomerModule,
    ConfigModule.forRoot(), // .env config `npm i --save @nestjs/config` then create .env file at root project
    SequelizeModule.forRoot({
      dialect: <Dialect>process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Customer, User],
      autoLoadModels: true, // auto load model registered in forFeutures()
      // sync: {}, // sync model to db server **avoid to use in production , this option will create only one if db dont have
      // sync: { force: true }, // this option will force to db dont care if aready have it , **data will delete all in model (that means re-creation table)
      sync: { alter: true }, // this option will check state on table and change to match model
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

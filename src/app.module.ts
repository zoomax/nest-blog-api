import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/blog-api", {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true, useUnifiedTopology: true
  }),
    ProductsModule,
    AuthModule,
  ConfigModule.forRoot(),
    UsersModule,
    ArticlesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

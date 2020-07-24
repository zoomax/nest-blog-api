import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/models/product.model';
import { ProductsService } from './products.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    MongooseModule.forFeature([
     {
       name : "products" , 
       schema: ProductSchema 
     }
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }

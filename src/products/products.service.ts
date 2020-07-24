import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSchema, IPRoductSchema } from 'src/models/product.model';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { promises } from 'dns';
import { ReturnModelType } from '@typegoose/typegoose';
// import { ProductsModule } from './products.module';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel("products") private readonly productsModel: Model<IPRoductSchema>,
  ) {}

  async createProduct(productDto: CreateProductDto): Promise<IPRoductSchema> | null {
    const newProduct = new this.productsModel(productDto);
    const product = await newProduct.save();
    return product;
  }

  async getProducts(): Promise<IPRoductSchema[]> | null {
    return await this.productsModel.find();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { promises } from 'dns';
// import { ProductsModule } from './products.module';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productsModel: Model<Product>,
  ) {}

  async createProduct(productDto: CreateProductDto): Promise<Product> | null {
    const newProduct = new this.productsModel(productDto);
    const product = await newProduct.save();
    return product;
  }

  async getProducts(): Promise<Product[]> | null {
    return await this.productsModel.find();
  }
}

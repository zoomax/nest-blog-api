import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/createProduct.dto';
import { Product } from 'models/product.model';     

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }
  @Post()
  @UsePipes(ValidationPipe)
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return await this.productsService.createProduct(product);
  }
}

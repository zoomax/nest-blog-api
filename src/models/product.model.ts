
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import {Document} from "mongoose"

@Schema()
export class Product extends Document {
  @Prop({
    required: true,
  })
  title: string;
  @Prop({
    required: true,
  })
  description: string;
  @Prop({
    required: true,
  })
  price: number;
  @Prop({
    required: true,
  })
  amount: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);

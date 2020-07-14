
import {prop} from '@typegoose/typegoose';
import {Document} from "mongoose"


export class Product {
  @prop({
    required: true,
  })
  title: string;
  @prop({
    required: true,
  })
  description: string;
  @prop({
    required: true,
  })
  price: number;
  @prop({
    required: true,
  })
  amount: number;
}
// export const ProductSchema = SchemaFactory.createForClass(Product);

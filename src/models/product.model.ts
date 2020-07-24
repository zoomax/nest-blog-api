import { prop } from '@typegoose/typegoose';
import { Document, Schema } from 'mongoose';

interface IPRoductSchema extends Document {
  title: string;
  description: string;
  price: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});
export  { 
  IPRoductSchema , ProductSchema
}
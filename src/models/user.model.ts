// import { Document, Schema as S, mongo } from 'mongoose';
// import * as Mongoose from 'mongoose';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// import { Prop } from "@nestjs/mongoose";
import {
  prop,
  Ref,
  pre,
  ModelOptions,
} from '@typegoose/typegoose';
import { IsEmail } from 'class-validator';
import { Types } from 'mongoose';
@pre<UserSchema>('save', next => {
  console.log('pre save hook');
  next();
})
@ModelOptions({
  schemaOptions: {
    timestamps: true
  },
})
export class UserSchema {
  // @prop({ default: Date.now() })
  // createdAt?: Date;
  // @prop({ default: Date.now() })
  // updatedAt?: Date;
  // @prop({ type: Types.ObjectId })
  // id?: Types.ObjectId;
  @prop({ required: true })
  password?: string;
  @prop({ required: true })
  @IsEmail()
  email?: string;
  @prop({
    itemsRef: 'Users',
    default: [],
  })
  followers?: Ref<UserSchema>[];
  @prop({
    itemsRef: 'Users',
    default: [],
  })
  following?: Ref<UserSchema>[];
  @prop()
  image?: Buffer;
  @prop( { 
    unique : true
  })
  username!: string;
  @prop( { 
    unique : true
  })
  token?: string;
}


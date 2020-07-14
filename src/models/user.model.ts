// import { Document, Schema as S, mongo } from 'mongoose';
// import * as Mongoose from 'mongoose';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// import { Prop } from "@nestjs/mongoose";
import {
  prop,
  arrayProp,
  Ref,
  pre,
  getModelForClass,
  ModelOptions,
} from '@typegoose/typegoose';
import { IsEmail } from 'class-validator';
import { UsersModule } from 'src/users/users.module';
import { Types } from 'mongoose';

// @Schema()
// export class UserModel extends Document {
//   @Prop({
//     required: true,
//     unique: true,
//   })
//   username: string;
//   @Prop({
//     required: true,
//   })
//   password: string;
//   @Prop({
//     required: true,
//     unique: true,
//   })
//   email: string;
//   @Prop()
//   bio: string;
//   @Prop()
//   image: Buffer;
//   @Prop()
//   token: string;
//   @Prop()
//   following: string[];
//   @Prop()
//   followers:string[];
//   @Prop()
//   createdAt : Date ;
//   @Prop()
//   updatedAt : Date
// }

// export const UserSchema = SchemaFactory.createForClass(UserModel);

// export const NewUserSchema = new Mongoose.Schema(
//   {
//     useranme: String,
//     password: String,
//     email: String,
//     followers: [
//       {
//         type: Mongoose.Schema.Types.ObjectId,
//         ref: 'users',
//       },
//     ],
//     following: [
//       {
//         type: Mongoose.Schema.Types.ObjectId,
//         ref: 'users',
//       },
//     ],
//     bio: String,
//     image: Buffer,
//   },
//   {
//     timestamps: true,
//   },
// );

@pre<UserSchema>('save', next => {
  console.log('pre save hook');
  next();
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class UserSchema {
  @prop({ default: Date.now() })
  createdAt?: Date;
  @prop({ default: Date.now() })
  updatedAt?: Date;
  @prop({ required: true, type: Types.ObjectId })
  _id: Types.ObjectId;
  @prop({ required: true })
  password?: string;
  @prop({ required: true })
  @IsEmail()
  email?: string;
  @arrayProp({
    itemsRef: 'User',
    default: [],
  })
  followers?: Ref<UserSchema>[];
  @arrayProp({
    itemsRef: 'User',
    default: [],
  })
  @arrayProp({
    itemsRef: 'User',
    default: [],
  })
  following?: Ref<UserSchema>[];
  @prop()
  image?: Buffer;
  @prop()
  username?: string;
  @prop()
  token?: string;
}

export const UserModel = getModelForClass(UserSchema);

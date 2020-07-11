import { Document , Schema as S} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserModel extends Document {
  @Prop({
    required: true,
    unique : true 
  })
  username: string;
  @Prop({
    required: true,
  })
  password: string;
  @Prop({
    required: true,
    unique : true   
  })
  email: string;
  @Prop()
  bio: string;
  @Prop()
  image: Buffer;
  @Prop()
  token: string;
  @Prop([{type:S.Types.ObjectId , ref :"users" }])
  following :any[] ;
  @Prop([{type:S.Types.ObjectId , ref :"users" , unique : true}])
  followers :any[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

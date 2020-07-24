import { Document, Schema, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { IArticle } from './article.model';

interface IUserSchema extends Document {
  username: string;
  fname: string;
  lname: string;
  password: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date; 
  token : string 
}
interface IUserBase extends IUserSchema {
  fullname: string;
  getBio(): string;
}
interface IUser extends IUserBase {
  followers: IUser['_id'][];
  followees: IUser['_id'][];
  articles: IArticle['_id'][];
}
interface IUserPopulateFollowers extends IUserBase {
  followers: IUser[];
  followees: IUser['_id'][];
  articles: IArticle['_id'][];
}
interface IUserPopulateFollowees extends IUserBase {
  followees: IUser[];
  followers: IUser['_id'][];
  articles: IArticle['_id'][];
}
interface IUserPopulateArticles extends IUserBase {
  articles: IArticle[];
  followers: IUser['_id'][];
  followees: IUser['_id'][];
}
const UserSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  bio: {
    type: String,
  },
  image: {
    type: Buffer,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  following: [
    {
      ref: 'users',
      type: Schema.Types.ObjectId,
    },
  ],
  followees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  articles: [
    {
      ref: 'articles',
      type: Schema.Types.ObjectId,
    },
  ],
  password: {
    type: String,
    required: true,
  },
  token : { 
    type  : String  , 
    default : null 
  }
});

UserSchema.pre('save', async next => {
  if (this.isNew) {
    let newPass = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, newPass);
    next();
  }
});
UserSchema.methods.toJSON = function() {
  let user = this;
  delete user.password;
  return user;
};
UserSchema.methods.getBio = function() {
  return this.bio;
};
UserSchema.virtual("fullname").get(function (){
  return `${this.fname} ${this.lname}`  ; 
})
UserSchema.virtual("fullname").set(function (name : string) { 
 let nameParts = name.split(" ")  ; 
 this.fname = nameParts[0] ; 
 this.lname = nameParts[1] ; 
})

export {
  IUser,
  IUserPopulateArticles,
  IUserPopulateFollowees,
  IUserPopulateFollowers,
  UserSchema,
};

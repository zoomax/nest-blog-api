import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserModel } from 'models/user.model';
import * as bcryptjs from "bcryptjs";
import {JwtModule} from "@nestjs/jwt" ; 
import {PassportModule} from "@nestjs/passport"; 
import { JwtService } from './jwt.service';
@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: 'User', useFactory: () => {
      UserSchema.pre<UserModel>("save", async function (next) {
          next()
      })
      return UserSchema
    }
  }]) , 

JwtModule.register({
  secret : process.env.TOKEN_SECRET || "thisismysecretkey" , 
  signOptions    : {
   
  }
}) , 
PassportModule.register({
  defaultStrategy : "jwt"
})],  
  providers: [AuthService , JwtService],
  controllers: [AuthController], 
  exports : [PassportModule]
})
export class AuthModule { }

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/models/user.model';
import { ProfileController } from './profile.controller';
import {TypegooseModule} from "nestjs-typegoose" ; 

@Module({
  imports : [AuthModule , TypegooseModule.forFeature([UserSchema])]   ,   
  controllers: [UsersController , ProfileController],
  providers: [UsersService]
})
export class UsersModule {}

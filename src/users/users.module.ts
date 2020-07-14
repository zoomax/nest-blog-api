import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import {UserSchema } from '../models/user.model';
import { ProfileController } from './profile.controller';
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  imports: [AuthModule, TypegooseModule.forFeature([UserSchema])],
  controllers: [UsersController, ProfileController],
  providers: [UsersService]
})
export class UsersModule { }

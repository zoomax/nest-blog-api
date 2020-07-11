import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'models/user.model';
import { ProfileController } from './profile.controller';

@Module({
  imports : [AuthModule , MongooseModule.forFeature([{
    name: "User" , 
    schema : UserSchema
  }])]   ,   
  controllers: [UsersController , ProfileController],
  providers: [UsersService]
})
export class UsersModule {}

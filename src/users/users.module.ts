import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../models/user.model';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'users',schema: UserSchema }]),
  ],
  controllers: [UsersController, ProfileController],
  providers: [UsersService],
})
export class UsersModule {}

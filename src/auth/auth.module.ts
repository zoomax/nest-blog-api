import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.model';
import * as bcryptjs from 'bcryptjs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from './jwt.service';
import { TypegooseModule } from 'nestjs-typegoose';
@Module({
  imports: [
    TypegooseModule.forFeature([
      UserSchema
    ]),

    JwtModule.register({
      secret: process.env.TOKEN_SECRET || 'thisismysecretkey',
      signOptions: {},
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule { }

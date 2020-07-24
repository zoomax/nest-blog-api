import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../models/user.model';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { JwtService } from '@nestjs/jwt'; // must be injected as a service (just like Model)
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {
  private readonly secret = process.env.TOKEN_SECRET;
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUser>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<IUser> | null {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (user) {
      let isTrue = await bcryptjs.compare(loginDto.password, user.password);
      if (isTrue) {
        let payload = {
          username: user.username,
        };
        user.token = jwt.sign(payload, this.secret);
        return user.save();
      } else {
        throw new UnauthorizedException();
      }
    }
  }
  async register(registerDto: RegisterDto): Promise<IUser> | null {
    let user = new this.userModel(registerDto);
    user.password = await bcryptjs.hash(user.password, 10);
    const payload = { username: user.username };
    user.token = jwt.sign(payload, this.secret);
    return user.save();
  }
}

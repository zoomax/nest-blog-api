import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from 'models/user.model';
import { Model } from "mongoose"
import { LoginDto } from 'src/dto/login.dto';
import { RegisterDto } from "src/dto/register.dto"
import { JwtService } from "@nestjs/jwt";  // must be injected as a service (just like Model)
import *  as jwt from "jsonwebtoken"
import * as bcryptjs from "bcryptjs"
@Injectable()
export class AuthService {
    private readonly secret =  process.env.TOKEN_SECRET; 
    constructor(@InjectModel("User") private readonly userModel: Model<UserModel>,
        private jwtService: JwtService) { }


    async login(loginDto: LoginDto): Promise<UserModel> | null {
        const user = await this.userModel.findOne({ email: loginDto.email });
        if (user) {
            let isTrue = await bcryptjs.compare(loginDto.password, user.password);
            if (isTrue) {
                let payload = {
                    username: user.username
                }
                user.token =  jwt.sign(payload, this.secret)
                return user.save();
            } else {
                throw new UnauthorizedException();
            }
        }

    }
    async register(registerDto: RegisterDto): Promise<UserModel> | null {
        let user = new this.userModel(registerDto)
        user.password = await bcryptjs.hash(user.password, 10);
        const payload = { username: user.username }
        user.token =  jwt.sign(payload, this.secret)
        return user.save();

    }
}

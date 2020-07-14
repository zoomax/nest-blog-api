import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserSchema } from '../models/user.model';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from "../dto/register.dto"
import { JwtService } from "@nestjs/jwt";  // must be injected as a service (just like Model)
import *  as jwt from "jsonwebtoken"
import * as bcryptjs from "bcryptjs"
import { ReturnModelType } from '@typegoose/typegoose';
@Injectable()
export class AuthService {
    private readonly secret =  process.env.TOKEN_SECRET; 
    constructor(@InjectModel(UserSchema) private readonly userModel: ReturnModelType<typeof UserSchema>,
        private jwtService: JwtService) { }


    async login(loginDto: LoginDto): Promise<UserSchema> | null {
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
    async register(registerDto: RegisterDto): Promise<UserSchema> | null {
        let user = new this.userModel(registerDto)
        user.password = await bcryptjs.hash(user.password, 10);
        const payload = { username: user.username }
        user.token =  jwt.sign(payload, this.secret)
        return user.save();

    }
}

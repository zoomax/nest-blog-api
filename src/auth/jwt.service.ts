import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import {InjectModel  } from "@nestjs/mongoose";
import {UserSchema, IUser } from "src/models/user.model";
import { ExtractJwt } from "passport-jwt";
import { Model  } from "mongoose";

@Injectable()
export class JwtService extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel("users") private readonly userModel :Model<IUser> 
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Token"),
            secretOrKey: process.env.TOKEN_SECRET
        })
    }


    async validate(payload: any) {
        let { username } = payload;
        const user = await this.userModel.findOne({ username }).populate("followers");
        if (!user) {
            return new UnauthorizedException()
        }
        return user;
    }
}
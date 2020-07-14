import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { InjectModel } from "nestjs-typegoose";
import {UserSchema } from "src/models/user.model";
import { ExtractJwt } from "passport-jwt";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class JwtService extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(UserSchema) private readonly userModel :ReturnModelType<typeof UserSchema> 
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
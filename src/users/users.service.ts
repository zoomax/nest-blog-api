import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel, UserSchema  } from 'src/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UsersModule } from './users.module';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: ReturnModelType<typeof UserSchema>,
  ) {}

  async getUser( username ): Promise<UserSchema> | null {
    let user = await this.userModel.findOne({ username }).populate("followers").exec();
    if (!user) {
      throw new NotFoundException('user was not found');
    }
    return user;
  }
  async updateUser(payload: UserSchema, data: UserSchema) {
    return await this.userModel
      .findOneAndUpdate(payload._id, data, { new: true })
      .exec();
  }

  async addUserFollower(user: string, follower: string): Promise<UserSchema> {
    let userA = await this.userModel.findOne({ username: user });
    let userB = await this.userModel.findOne({ username: follower });
    if (userA && userB) {
      let isFollower = userA.followers.indexOf(userB.id) > -1 ; 
      let isFollowing = userB.following.indexOf(userA.id)  > -1; 
      if(!isFollower)  userA.followers.push(userB.id);
      if(!isFollowing) userB.following.push(userA.id);
      await userB.save();
      await userA.save() ; 
      return (await userA.save()).populate("followers");
    }
    throw new NotFoundException('user was not found');
  }
  async unFollow(user: string, following: string): Promise<UserSchema> {
    let userA = await this.userModel.findOne({ username: user });
    let userB = await this.userModel.findOne({ username: following });
    if (userA && userB) {
      userB.followers = userB.followers.filter(item => item != userA.id)
      userA.following= userA.following.filter(item => item != userB.id)
      await userB.save();
      return (await userA.save()).populate("following");
    }
    throw new NotFoundException('user was not found');
  }
}

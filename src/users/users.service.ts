import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser  } from 'src/models/user.model';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel("users") private readonly userModel: Model<IUser>
  ) {}

  async getUser( username : string ): Promise<IUser> | null {
    // const {username}  = user ; 
    console.log("from user service" , username)  ; 
    let expectedUser = await this.userModel.findOne({ username }).populate("followers").exec();
    if (!expectedUser) {
      throw new NotFoundException('user was not found');
    }
    return expectedUser;
  }
  async updateUser(payload, data: IUser) {
    return await this.userModel
      .findOneAndUpdate(payload.id, data, { new: true })
      .exec();
  }

  async addUserFollower(user: string, follower: string): Promise<IUser> {
    let userA = await this.userModel.findOne({ username: user });
    let userB = await this.userModel.findOne({ username: follower });
    if (userA && userB) {
      let isFollower = userA.followers.indexOf(userB.id) > -1 ; 
      let isFollowing = userB.followees.indexOf(userA.id)  > -1; 
      if(!isFollower)  userA.followers.push(userB.id);
      if(!isFollowing) userB.followees.push(userA.id);
      await userB.save();
      await userA.save() ; 
      return (await userA.save()).populate("followers");
    }
    throw new NotFoundException('user was not found');
  }
  async unFollow(user: string, following: string): Promise<IUser> {
    let userA = await this.userModel.findOne({ username: user });
    let userB = await this.userModel.findOne({ username: following });
    if (userA && userB) {
      userB.followers = userB.followers.filter(item => item != userA.id)
      userA.followees= userA.followees.filter(item => item != userB.id)
      await userB.save();
      return (await userA.save()).populate("following");
    }
    throw new NotFoundException('user was not found');
  }
}

import { Controller, Get, UseGuards, Param, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
// import { UserS, UserSchemacheUserSchema } from 'src/models/user.model';
import { User } from 'src/auth/user.decorator';
import { UserSchema, IUser } from 'src/models/user.model';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:username')
  // @UseGuards(AuthGuard('jwt'))
  async getProfile(@Param('username') username: string): Promise<IUser> {
    console.log(username);
    return await this.userService.getUser(username);
  }
  @Put("/:username/following")
  @UseGuards(AuthGuard('jwt'))
  async followUser(
    @User() user,
    @Param("username") following: string,
  ): Promise<IUser> {
    return await this.userService.addUserFollower(following, user.username);
}
@Put("/:username/followers")
@UseGuards(AuthGuard('jwt'))
  async addUserFollower(
    @User() user,
    @Param("username") follower: string,
  ): Promise<IUser> {
    return await this.userService.addUserFollower(user.username, follower);
  
}

}

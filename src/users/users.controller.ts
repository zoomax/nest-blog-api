import { Controller, Get, Put, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/auth/user.decorator';
import { UserModel } from 'models/user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@User() payload): Promise<UserModel> {
    console.log(process.env.TOKEN_SECRET);
    return await this.usersService.getUser(payload);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @User() payload,
    @Body() data: UserModel,
  ): Promise<UserModel> {
    return await this.usersService.updateUser(payload, data);
  }

  
}

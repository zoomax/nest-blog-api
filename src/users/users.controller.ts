import { Controller, Get, Put, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/auth/user.decorator';
import { UserSchema, IUser } from 'src/models/user.model';
import { AuthGuard } from '@nestjs/passport';
// import { UsersModule } from './users.module';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@User() payload): Promise<IUser> {
    console.log(process.env.TOKEN_SECRET);
    return await this.usersService.getUser(payload.username);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @User() payload: IUser,
    @Body() data: IUser,
  ): Promise<IUser> {
    return await this.usersService.updateUser(payload, data);
  }
}

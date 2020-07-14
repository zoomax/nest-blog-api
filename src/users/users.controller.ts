import { Controller, Get, Put, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/auth/user.decorator';
import { UserSchema } from 'src/models/user.model';
import { AuthGuard } from '@nestjs/passport';
// import { UsersModule } from './users.module';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@User() payload): Promise<UserSchema> {
    console.log(process.env.TOKEN_SECRET);
    return await this.usersService.getUser(payload);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @User() payload: UserSchema,
    @Body() data: UserSchema,
  ): Promise<UserSchema> {
    return await this.usersService.updateUser(payload, data);
  }
}

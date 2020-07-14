import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { UserModel, UserSchema } from 'src/models/user.model';
import { RegisterDto } from '../dto/register.dto';



@Controller('users')
export class AuthController {
    constructor (private readonly authService : AuthService) {}

@Post("/login")
@UsePipes(ValidationPipe)
async login(@Body()loginDto : LoginDto) : Promise<UserSchema> | null { 
return await this.authService.login(loginDto) ; 
}
@Post()
@UsePipes(ValidationPipe)
async regiseter(@Body()registerDto : RegisterDto) : Promise<UserSchema> | null { 
return await this.authService.register(registerDto) ; 
}



}

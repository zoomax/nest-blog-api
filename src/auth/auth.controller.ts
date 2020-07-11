import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';
import { UserModel } from 'models/user.model';
import { RegisterDto } from 'src/dto/register.dto';



@Controller('users')
export class AuthController {
    constructor (private readonly authService : AuthService) {}

@Post("/login")
@UsePipes(ValidationPipe)
async login(@Body()loginDto : LoginDto) : Promise<UserModel> | null { 
return await this.authService.login(loginDto) ; 
}
@Post()
@UsePipes(ValidationPipe)
async regiseter(@Body()registerDto : RegisterDto) : Promise<UserModel> | null { 
return await this.authService.register(registerDto) ; 
}



}

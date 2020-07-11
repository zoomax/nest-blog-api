import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto{

  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  username: string;

}

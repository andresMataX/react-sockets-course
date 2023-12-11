import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Post('/new')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/renew-token')
  @Auth()
  renewToken(@GetUser() user: User) {
    return this.authService.renewToken(user);
  }
}

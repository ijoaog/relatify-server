// auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../service/auth.service';

export class LoginDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    return this.authService.login(user);
  }
}
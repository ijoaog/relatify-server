// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './../../users/users.service'; // Ajuste conforme necessário
import { User } from './../../users/entities/user.entity'; // Ajuste conforme necessário

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default_secret',
    });
  }

  async validate(payload: { sub: string; username: string }): Promise<User> {
    return this.usersService.findOne(payload.username); // Retorna o usuário
  }
}

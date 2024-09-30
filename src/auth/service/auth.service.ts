// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../../users/users.service';
import { User } from './../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    try {
      const token = this.jwtService.sign(payload, {
        expiresIn: '1h',
      });

      return {
        access_token: token,
      };
    } catch (error) {
      throw new Error('Não foi possível fazer login.');
    }
  }
}

// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../../users/users.service'; // Serviço para acessar usuários
import { User } from './../../users/entities/user.entity'; // Entidade do usuário
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
      userlogin: user.login,
      username: user.name,
      email: user.email,
      role: user.role,
    };

    // Gera o token JWT com o payload e a chave secreta
    const token = this.jwtService.sign(payload, {
      secret: "KKK1KKK2KKK3",
      expiresIn: '1h',
    });

    // Retorna o token gerado
    return {
      access_token: token, // Apenas o token já gerado
    };
  }
}

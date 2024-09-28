import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOne(login: string): Promise<User> {
    return this.usersRepository.findOne({ where: { login } });
  }

  // Outros métodos, como criar ou atualizar usuários, podem ser adicionados aqui.
}

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Sua entidade de usuário
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { cpf: userData.cpf },
    });

    if (existingUser) {
      throw new ConflictException('A user with this CPF already exists');
    }

    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(USER_NAME: string): Promise<User> {
    return this.userRepository.findOne({ where: { username: USER_NAME } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id); // Remove o usuário pelo ID
  }
}

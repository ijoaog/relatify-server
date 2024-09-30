import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Sua entidade de usuário
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto'; // Importar o módulo crypto para gerar hashes
import { MailerService } from '../mailer/mailer.service'; // Importe seu serviço de email

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService, // Injete o MailerService
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    console.log('userData:', userData);

    const existingUser = await this.userRepository.findOne({
      where: { cpf: userData.cpf },
    });

    if (existingUser) {
      throw new ConflictException('Usuário já existe.');
    }

    try {
      let createLogin = `${userData.name.split(' ')[0].toLowerCase()}.${userData.name.split(' ').slice(-1)[0].toLowerCase()}`;

      let existingUserName = await this.userRepository.findOne({
        where: { username: createLogin },
      });

      if (existingUserName) {
        const hash = crypto
          .createHash('md5')
          .update(userData.name)
          .digest('hex');
        createLogin = `${createLogin}_${hash.slice(0, 4)}`;
      }

      const password = generateRandomPassword(12);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = this.userRepository.create({
        ...userData,
        role: 'official_agent',
        password: hashedPassword,
        username: createLogin,
      });

      // Salve o novo usuário no banco de dados
      const savedUser = await this.userRepository.save(newUser);

      // Prepare o corpo do email
      const emailBody = this.createEmailBody(createLogin, password);

      // Envie o email após o usuário ser salvo com sucesso
      await this.mailerService.sendMail(
        userData.email, // Use o email do usuário
        '[Relatify] - Dados do Usuário',
        emailBody,
      );

      return savedUser;
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      throw error;
    }
  }

  private createEmailBody(username: string, password: string): string {
    return `
		<html>
		<head>
			<style>
			body {
				font-family: Arial, sans-serif;
				background-color: #f4f4f4;
				margin: 0;
				padding: 20px;
				display: flex;
				justify-content: center; /* Centraliza horizontalmente */
				align-items: center; /* Centraliza verticalmente */
				height: auto; /* Faz a altura ocupar toda a tela */
			}
			.container {
				width: 100%; /* Ocupa toda a largura disponível */
				max-width: 600px; /* Largura máxima do container */
				background: #ffffff;
				padding: 20px;
				border-radius: 8px;
				box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
				text-align: center; /* Centraliza o texto dentro do container */
				height: auto; /* Altura automática, ajusta ao conteúdo */
				max-height: 90vh; /* Altura máxima do container */
				overflow-y: auto; /* Permite rolagem vertical se o conteúdo exceder a altura máxima */
			}
			h1 {
				color: #333;
			}
			p {
				font-size: 16px;
				color: #555;
			}
			</style>
		</head>
		<body>
			<div class="container">
			<h1>Dados do Usuário</h1>
			<div class="important">
				<p><strong>Username:</strong> <code>${username}</code></p>
				<p><strong>Password:</strong> <code>${password}</code></p>
			</div>
			<p>Por favor, mantenha esses dados em segurança e não os compartilhe com ninguém.</p>
			<p>Se você não solicitou essa alteração, entre em contato com o suporte imediatamente.</p>
			</div>
		</body>
		</html>
    `;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username: username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id); // Remove o usuário pelo ID
  }
}

function generateRandomPassword(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

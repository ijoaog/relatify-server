// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../users/users.module';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './service/jwt.strategy'; // Crie este arquivo a seguir

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Use uma variável de ambiente
      signOptions: { expiresIn: '60s' }, // Ajuste o tempo de expiração conforme necessário
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService], // Para que outros módulos possam usar o AuthService
})
export class AuthModule {}

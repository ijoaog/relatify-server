import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Adiciona o ConfigModule e ConfigService
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MonitoredIndividualsModule } from './monitored_individuals/monitored_individuals.module';
import { AnkletMonitoringModule } from './anklet_monitoring/anklet_monitoring.module';
import { MonitoringReport } from './anklet_monitoring/entities/anklet_monitoring.entity'; // Importe a entidade MonitoringReport
import { User } from './users/entities/user.entity'; // Importe a entidade User
import { Detainee } from './monitored_individuals/entities/monitored_individual.entity'; // Importe a entidade Detainee

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Torna o ConfigModule global para toda a aplicação
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql' | 'mariadb' | 'postgres' | 'sqlite' | 'mssql' | 'oracle'>('DB_TYPE'), // Defina os tipos suportados
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [MonitoringReport, User, Detainee], // Adicionando as entidades
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        logging: configService.get<boolean>('DB_LOGGING'),
      }),
    }),
    UsersModule,
    MonitoredIndividualsModule,
    AnkletMonitoringModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

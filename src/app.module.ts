import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MonitoredIndividualsModule } from './monitored_individuals/monitored_individuals.module';
import { AnkletMonitoringModule } from './anklet_monitoring/anklet_monitoring.module';
import { MonitoringReport } from './anklet_monitoring/entities/anklet_monitoring.entity';
import { User } from './users/entities/user.entity';
import { Detainee } from './monitored_individuals/entities/monitored_individual.entity';
import { AuthMiddleware } from './auth/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql' | 'mariadb' | 'postgres' | 'sqlite' | 'mssql' | 'oracle'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [MonitoringReport, User, Detainee],
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

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
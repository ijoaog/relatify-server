// src/app.module.ts

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MonitoredIndividualsModule } from './monitored_individuals/monitored_individuals.module';
import { AnkletMonitoringModule } from './anklet_monitoring/anklet_monitoring.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { PdfModule } from './pdf/pdf.module';
import { getDbConfig } from './infra/db/mysql/dbConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getDbConfig(configService),
    }),
    UsersModule,
    MonitoredIndividualsModule,
    AnkletMonitoringModule,
    PdfModule,
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
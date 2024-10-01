import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MonitoringReport } from '../../../anklet_monitoring/entities/anklet_monitoring.entity';
import { User } from '../../../users/entities/user.entity';
import { Detainee } from '../../../monitored_individuals/entities/monitored_individual.entity';

export const getDbConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: configService.get<'mysql'>('DB_TYPE'),
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [MonitoringReport, User, Detainee],
  synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
  logging: configService.get<boolean>('DB_LOGGING'),
});

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnkletMonitoringService } from './anklet_monitoring.service';
import { AnkletMonitoringController } from './anklet_monitoring.controller';
import { MonitoringReport } from './entities/anklet_monitoring.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonitoringReport])],
  controllers: [AnkletMonitoringController],
  providers: [AnkletMonitoringService],
})
export class AnkletMonitoringModule {}

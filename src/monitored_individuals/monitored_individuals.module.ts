import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoredIndividualsController } from './monitored_individuals.controller';
import { MonitoredIndividualsService } from './monitored_individuals.service';
import { Detainee } from './entities/monitored_individual.entity'; // Ajuste o caminho conforme necessário

@Module({
  imports: [TypeOrmModule.forFeature([Detainee])],
  controllers: [MonitoredIndividualsController],
  providers: [MonitoredIndividualsService],
})
export class MonitoredIndividualsModule {}

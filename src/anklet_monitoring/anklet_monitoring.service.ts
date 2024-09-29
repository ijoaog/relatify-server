import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAnkletMonitoringDto } from './dto/create-anklet_monitoring.dto';
import { UpdateAnkletMonitoringDto } from './dto/update-anklet_monitoring.dto';
import { MonitoringReport } from './entities/anklet_monitoring.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnkletMonitoringService {
  constructor(
    @InjectRepository(MonitoringReport)
    private readonly monitoringReportRepository: Repository<MonitoringReport>, // Injeção do repositório
  ) {}

  create(createAnkletMonitoringDto: CreateAnkletMonitoringDto) {
    return 'This action adds a new ankletMonitoring';
  }

  async findAll() {
    return await this.monitoringReportRepository.find(); // Busca todos os detentos
  }

  findOne(id: number) {
    return `This action returns a #${id} ankletMonitoring`;
  }

  update(id: number, updateAnkletMonitoringDto: UpdateAnkletMonitoringDto) {
    return `This action updates a #${id} ankletMonitoring`;
  }

  remove(id: number) {
    return `This action removes a #${id} ankletMonitoring`;
  }
}

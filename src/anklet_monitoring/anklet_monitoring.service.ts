import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MonitoringReport } from './entities/anklet_monitoring.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class AnkletMonitoringService {
  constructor(
    @InjectRepository(MonitoringReport)
    private readonly monitoringReportRepository: Repository<MonitoringReport>,
  ) {}

  async findAll() {
    return await this.monitoringReportRepository.find();
  }

  async findLastMonthReports() {
    const currentDate = new Date();
  
    const lastMonthStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastMonthEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
  
    return this.monitoringReportRepository.find({
      where: { updatedAt: Between(lastMonthStartDate, lastMonthEndDate) }
    });
  }
}

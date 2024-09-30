import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnkletMonitoringService } from './anklet_monitoring.service';
import { CreateAnkletMonitoringDto } from './dto/create-anklet_monitoring.dto';
import { UpdateAnkletMonitoringDto } from './dto/update-anklet_monitoring.dto';

@Controller('anklet-monitoring')
export class AnkletMonitoringController {
  constructor(private readonly ankletMonitoringService: AnkletMonitoringService) {}

  @Get()
  findAll() {
    return this.ankletMonitoringService.findAll();
  }

  @Get('last-month')
  findLastMonth() {
    return this.ankletMonitoringService.findLastMonthReports();
  }
}

import { Controller, Get} from '@nestjs/common';
import { AnkletMonitoringService } from './anklet_monitoring.service';

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

import { Controller, Get, Param} from '@nestjs/common';
import { MonitoredIndividualsService } from './monitored_individuals.service';

@Controller('monitored-individuals')
export class MonitoredIndividualsController {
  constructor(private readonly monitoredIndividualsService: MonitoredIndividualsService) {}

  @Get()
  findAll() {
    return this.monitoredIndividualsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitoredIndividualsService.findOne(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonitoredIndividualsService } from './monitored_individuals.service';
import { CreateMonitoredIndividualDto } from './dto/create-monitored_individual.dto';
import { UpdateMonitoredIndividualDto } from './dto/update-monitored_individual.dto';

@Controller('monitored-individuals')
export class MonitoredIndividualsController {
  constructor(private readonly monitoredIndividualsService: MonitoredIndividualsService) {}

  @Post()
  create(@Body() createMonitoredIndividualDto: CreateMonitoredIndividualDto) {
    return this.monitoredIndividualsService.create(createMonitoredIndividualDto);
  }

  @Get()
  findAll() {
    return this.monitoredIndividualsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitoredIndividualsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonitoredIndividualDto: UpdateMonitoredIndividualDto) {
    return this.monitoredIndividualsService.update(+id, updateMonitoredIndividualDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monitoredIndividualsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnkletMonitoringService } from './anklet_monitoring.service';
import { CreateAnkletMonitoringDto } from './dto/create-anklet_monitoring.dto';
import { UpdateAnkletMonitoringDto } from './dto/update-anklet_monitoring.dto';

@Controller('anklet-monitoring')
export class AnkletMonitoringController {
  constructor(private readonly ankletMonitoringService: AnkletMonitoringService) {}

  @Post()
  create(@Body() createAnkletMonitoringDto: CreateAnkletMonitoringDto) {
    return this.ankletMonitoringService.create(createAnkletMonitoringDto);
  }

  @Get()
  findAll() {
    return this.ankletMonitoringService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ankletMonitoringService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnkletMonitoringDto: UpdateAnkletMonitoringDto) {
    return this.ankletMonitoringService.update(+id, updateAnkletMonitoringDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ankletMonitoringService.remove(+id);
  }
}

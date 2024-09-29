import { PartialType } from '@nestjs/mapped-types';
import { CreateAnkletMonitoringDto } from './create-anklet_monitoring.dto';

export class UpdateAnkletMonitoringDto extends PartialType(CreateAnkletMonitoringDto) {}

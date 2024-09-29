import { PartialType } from '@nestjs/mapped-types';
import { CreateMonitoredIndividualDto } from './create-monitored_individual.dto';

export class UpdateMonitoredIndividualDto extends PartialType(CreateMonitoredIndividualDto) {}

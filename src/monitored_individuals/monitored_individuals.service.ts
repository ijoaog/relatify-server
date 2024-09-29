import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMonitoredIndividualDto } from './dto/create-monitored_individual.dto';
import { UpdateMonitoredIndividualDto } from './dto/update-monitored_individual.dto';
import { Detainee } from './entities/monitored_individual.entity';

@Injectable()
export class MonitoredIndividualsService {
  constructor(
    @InjectRepository(Detainee)
    private readonly detaineeRepository: Repository<Detainee>, // Injeção do repositório
  ) {}

  create(createMonitoredIndividualDto: CreateMonitoredIndividualDto) {
    return 'This action adds a new monitoredIndividual';
  }

  async findAll(): Promise<Detainee[]> {
    return await this.detaineeRepository.find(); // Busca todos os detentos
  }

  findOne(id: number) {
    return `This action returns a #${id} monitoredIndividual`;
  }

  update(id: number, updateMonitoredIndividualDto: UpdateMonitoredIndividualDto) {
    return `This action updates a #${id} monitoredIndividual`;
  }

  remove(id: number) {
    return `This action removes a #${id} monitoredIndividual`;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detainee } from './entities/monitored_individual.entity';

@Injectable()
export class MonitoredIndividualsService {
  constructor(
    @InjectRepository(Detainee)
    private readonly detaineeRepository: Repository<Detainee>,
  ) {}

  async findAll(): Promise<Detainee[]> {
    return await this.detaineeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} monitoredIndividual`;
  }
}

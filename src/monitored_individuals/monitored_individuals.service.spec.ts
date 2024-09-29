import { Test, TestingModule } from '@nestjs/testing';
import { MonitoredIndividualsService } from './monitored_individuals.service';

describe('MonitoredIndividualsService', () => {
  let service: MonitoredIndividualsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonitoredIndividualsService],
    }).compile();

    service = module.get<MonitoredIndividualsService>(MonitoredIndividualsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

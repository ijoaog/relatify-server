import { Test, TestingModule } from '@nestjs/testing';
import { MonitoredIndividualsController } from './monitored_individuals.controller';
import { MonitoredIndividualsService } from './monitored_individuals.service';

describe('MonitoredIndividualsController', () => {
  let controller: MonitoredIndividualsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitoredIndividualsController],
      providers: [MonitoredIndividualsService],
    }).compile();

    controller = module.get<MonitoredIndividualsController>(MonitoredIndividualsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

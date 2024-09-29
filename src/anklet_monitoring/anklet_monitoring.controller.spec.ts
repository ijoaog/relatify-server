import { Test, TestingModule } from '@nestjs/testing';
import { AnkletMonitoringController } from './anklet_monitoring.controller';
import { AnkletMonitoringService } from './anklet_monitoring.service';

describe('AnkletMonitoringController', () => {
  let controller: AnkletMonitoringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnkletMonitoringController],
      providers: [AnkletMonitoringService],
    }).compile();

    controller = module.get<AnkletMonitoringController>(AnkletMonitoringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AnkletMonitoringService } from './anklet_monitoring.service';

describe('AnkletMonitoringService', () => {
  let service: AnkletMonitoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnkletMonitoringService],
    }).compile();

    service = module.get<AnkletMonitoringService>(AnkletMonitoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

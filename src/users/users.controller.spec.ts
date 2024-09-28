import { Test, TestingModule } from '@nestjs/testing';
import { UsuersController } from './users.controller';
import { UsuersService } from './users.service';

describe('UsuersController', () => {
  let controller: UsuersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuersController],
      providers: [UsuersService],
    }).compile();

    controller = module.get<UsuersController>(UsuersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

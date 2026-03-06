import { Test, TestingModule } from '@nestjs/testing';
import { PrisonersController } from './prisoners.controller';
import { PrisonersService } from './prisoners.service';

describe('PrisonersController', () => {
  let controller: PrisonersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrisonersController],
      providers: [PrisonersService],
    }).compile();

    controller = module.get<PrisonersController>(PrisonersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

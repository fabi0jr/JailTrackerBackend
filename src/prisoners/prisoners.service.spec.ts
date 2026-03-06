import { Test, TestingModule } from '@nestjs/testing';
import { PrisonersService } from './prisoners.service';

describe('PrisonersService', () => {
  let service: PrisonersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrisonersService],
    }).compile();

    service = module.get<PrisonersService>(PrisonersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

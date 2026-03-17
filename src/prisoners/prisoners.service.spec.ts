import { Test, TestingModule } from '@nestjs/testing';
import { PrisonersService } from './prisoners.service';
import { PrismaService } from '../prisma/prisma.service';
import { UploadsService } from '../uploads/uploads.service';

describe('PrisonersService', () => {
  let service: PrisonersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrisonersService, PrismaService, UploadsService],
    }).compile();

    service = module.get<PrisonersService>(PrisonersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

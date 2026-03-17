import { Test, TestingModule } from '@nestjs/testing';
import { PrisonersController } from './prisoners.controller';
import { PrisonersService } from './prisoners.service';
import { PrismaService } from '../prisma/prisma.service';
import { UploadsService } from '../uploads/uploads.service';

describe('PrisonersController', () => {
  let controller: PrisonersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrisonersController],
      providers: [PrisonersService, PrismaService, UploadsService],
    }).compile();

    controller = module.get<PrisonersController>(PrisonersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

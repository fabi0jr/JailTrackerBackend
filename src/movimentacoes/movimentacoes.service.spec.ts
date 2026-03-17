import { Test, TestingModule } from '@nestjs/testing';
import { MovimentacoesService } from './movimentacoes.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MovimentacoesService', () => {
  let service: MovimentacoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimentacoesService, PrismaService],
    }).compile();

    service = module.get<MovimentacoesService>(MovimentacoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

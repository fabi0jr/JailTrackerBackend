import { Module } from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service';
import { MovimentacoesController } from './movimentacoes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MovimentacoesController],
  providers: [MovimentacoesService],
})
export class MovimentacoesModule {}

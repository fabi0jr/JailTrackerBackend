import { Module } from '@nestjs/common';
import { PrisonersService } from './prisoners.service';
import { PrisonersController } from './prisoners.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PrisonersController],
  providers: [PrisonersService],
})
export class PrisonersModule {}

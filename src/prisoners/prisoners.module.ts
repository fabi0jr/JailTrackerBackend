import { Module } from '@nestjs/common';
import { PrisonersService } from './prisoners.service';
import { PrisonersController } from './prisoners.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  imports: [PrismaModule, UploadsModule],
  controllers: [PrisonersController],
  providers: [PrisonersService],
})
export class PrisonersModule {}

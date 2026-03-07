import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PrisonersModule } from './prisoners/prisoners.module';
import { VisitsModule } from './visits/visits.module';
import { VisitorsModule } from './visitors/visitors.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, PrisonersModule, VisitsModule, VisitorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

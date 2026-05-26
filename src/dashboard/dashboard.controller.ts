import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('visitsToday')
  @ApiOperation({ summary: 'Listar visitas de hoje' })
  findVisitsToday() {
    return this.dashboardService.findVisitsToday();
  }

  @Get('prisionersInSolitary')
  @ApiOperation({ summary: 'Listar presos em solitária' })
  findPrisionersInSolitary() {
    return this.dashboardService.findPrisionersInSolitary();
  }

  @Get('occupationRate')
  @ApiOperation({ summary: 'Taxa de ocupação por Pavilhão' })
  occupationRate() {
    return this.dashboardService.occupationRate();
  }


}

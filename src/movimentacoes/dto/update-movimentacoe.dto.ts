import { PartialType } from '@nestjs/swagger';
import { CreateMovimentacoeDto } from './create-movimentacoe.dto';

export class UpdateMovimentacoeDto extends PartialType(CreateMovimentacoeDto) {}

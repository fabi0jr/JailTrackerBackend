import { PartialType } from '@nestjs/swagger';
import { CreatePrisonerDto } from './create-prisoner.dto';

export class UpdatePrisonerDto extends PartialType(CreatePrisonerDto) {}

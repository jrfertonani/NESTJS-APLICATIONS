import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoricoMedicoDto } from './create-historico-medico.dto';

export class UpdateHistoricoMedicoDto extends PartialType(CreateHistoricoMedicoDto) {}

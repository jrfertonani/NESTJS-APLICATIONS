import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { ConsultaStatus } from './consulta-status.enum';
import { ConsultaTipo } from './consulta-tipo.enum';

export class CreateConsultaDto {
  @IsNotEmpty({ message: 'A data e hora do agendamento são obrigatórias.' })
  @IsDateString(
    {},
    {
      message:
        'A data e hora do agendamento devem ser uma string de data válida (ISO 8601).',
    },
  )
  dataConsulta: string;

  @IsOptional()
  @IsEnum(ConsultaStatus, { message: `Status inválido...` })
  status?: ConsultaStatus;

  @IsOptional()
  @IsEnum(ConsultaTipo, { message: `Tipo inválido...` })
  tipo?: ConsultaTipo;

  @IsOptional()
  @IsString({ message: 'O diagnóstico deve ser uma string.' })
  diagnostico: string;

  @IsOptional()
  @IsString({ message: 'O tratamento deve ser uma string.' })
  tratamento: string;

  @IsOptional()
  @IsString({ message: 'As observações devem ser uma string.' })
  observacoes?: string;

  @IsOptional()
  @IsNumber(
    {},
    {
      each: true,
      message: 'Cada item deve ser um ID numérico de veterinário.',
    },
  )
  veterinarioIds?: number[];

  @IsOptional()
  @IsNumber(
    {},
    { each: true, message: 'Cada item deve ser um ID numérico de pet.' },
  )
  petIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber(
    {},
    { each: true, message: 'Cada item deve ser um ID numérico de tutor.' },
  )
  tutorIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber(
    {},
    { each: true, message: 'Cada item deve ser um ID numérico de produto.' },
  )
  produtoIds?: number[];
}

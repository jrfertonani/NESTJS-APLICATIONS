import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateConsultaDto {
  @IsOptional()
  @IsDateString() // Para definir o horário da consulta (ex: "2025-10-07T15:00:00Z")
  dataConsulta?: string;

  @IsOptional()
  @IsString()
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
  @IsNumber(
    {},
    { each: true, message: 'Cada item deve ser um ID numérico de produto.' },
  )
  produtoIds?: number[];
}

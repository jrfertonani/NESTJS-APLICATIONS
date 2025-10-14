import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PetEspecie } from './pet-especie.enum';

export class CreatePetDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @IsNotEmpty()
  @IsEnum(PetEspecie, {
    message:
      'Espécie inválida. Valores permitidos são: cachorro, cavalo, gato, passarinnho, peixe.',
  })
  especie: PetEspecie;

  @IsString({ message: 'A raça deve ser uma string.' })
  raca: string;

  @IsOptional()
  @IsNumber(
    {},
    {
      message: 'A idade deve ser um valor numérico válido.',
    },
  )
  idade?: number;

  @IsOptional()
  @IsArray({ message: 'A lista de IDs de pets deve ser um array.' })
  @IsNumber(
    {},
    {
      each: true,
      message: 'Cada item deve ser um ID numérico de veterinario.',
    },
  )
  veterinarioIds: number[];
}

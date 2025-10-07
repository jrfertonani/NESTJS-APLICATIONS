import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @IsOptional()
  @IsArray({ message: 'A lista de IDs de pets deve ser um array.' })
  @IsNumber(
    {},
    {
      each: true,
      message: 'Cada item deve ser um ID numérico de veterinario.',
    }, // 💡 each: true
  )
  veterinarioIds: number[];
}

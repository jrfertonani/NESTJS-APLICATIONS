import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVeterinarioDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  

  @IsOptional() // Opcional ao criar, se não for obrigatório vincular pets imediatamente
  @IsArray({ message: 'A lista de IDs de pets deve ser um array.' })
  @IsNumber({}, { each: true, message: 'Cada item deve ser um ID numérico de pet.' })
  petIds?: number[];


}

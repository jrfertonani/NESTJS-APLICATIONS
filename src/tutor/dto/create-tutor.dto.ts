import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTutorDto {
  @IsNotEmpty({ message: 'O name é obrigatório.' })
  @IsString({ message: 'O name deve ser uma string.' })
  name: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @IsString({ message: 'O telefone deve ser uma string.' })
  telefone: string;

  @IsOptional()
  @IsArray({ message: 'A lista de IDs de pets deve ser um array.' })
  @IsNumber(
    {},
    { each: true, message: 'Cada item deve ser um ID numérico de pet.' }, // 💡 each: true
  )
  petIds: number[];

  @IsOptional()
  @IsArray({ message: 'A lista de IDs de produto deve ser um array.' })
  @IsNumber(
    {},
    { each: true, message: 'Cada item deve ser um ID numérico de produtos.' }, // 💡 each: true
  )
  produtoIds: number[];

  @IsOptional()
  @IsArray({ message: 'A lista de IDs de tutores deve ser um array.' })
  @IsNumber(
    {},
    { each: true, message: 'Cada item deve ser um ID numérico de tutor.' }, // 💡 each: true
  )
  tutorIds: number[];
}

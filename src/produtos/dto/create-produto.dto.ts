import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;
}

import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ProdutoCategoria } from './produto-categoria.enum';

export class CreateProdutoDto {
  @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @Length(3, 255, { message: 'O nome deve ter entre 3 e 255 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'A categoria do produto é obrigatória.' })
  @IsEnum(ProdutoCategoria, {
    message: 'Categoria inválida. Use um dos valores definidos.',
  })
  categoria: ProdutoCategoria;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao?: string;
}

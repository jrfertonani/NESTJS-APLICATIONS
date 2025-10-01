import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateAnimalDto } from "src/animals/dto/create-animal.dto";

export class CreateTutorDto {
     @IsNotEmpty({ message: 'O nome é obrigatório.' })
      @IsString({ message: 'O nome deve ser uma string.' })
      name: string;
    
      @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
      @IsEmail({}, { message: 'Formato de e-mail inválido.' })
      email: string;
    
      @IsArray({ message: 'A lista de animais deve ser um array.' })
      @ValidateNested({ each: true })
      @Type(() => CreateAnimalDto)
      animals: CreateAnimalDto[];
}

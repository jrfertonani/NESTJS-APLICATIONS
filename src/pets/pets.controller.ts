import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const pet = await this.petsService.findOne(+id);
    if (!pet) throw new NotFoundException(`Id ${id} not found!`);
    return pet;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    const pet = await this.petsService.update(+id, updatePetDto);
    if (!pet) throw new NotFoundException(`Id ${id} not found!`);
    return pet;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const pet = await this.petsService.remove(+id);
    if (!pet) throw new NotFoundException(`Id ${id} not found!`);
  }

  

  @Get(':id/veterinarios')
  findOneVeterinario(@Param('id') id: string) {
    return this.petsService.findOneVeterinario(+id);
  }
}

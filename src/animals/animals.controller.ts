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
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const animalFindBy = await this.animalsService.findOne(+id);
    if (!animalFindBy)
      throw new NotFoundException(`Animal ID ${id} not found!`);
    return animalFindBy;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    const animalUpdate = await this.animalsService.update(+id, updateAnimalDto);
    if (!animalUpdate)
      throw new NotFoundException(`Amimal ID ${id} not found!`);
    return animalUpdate;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const animalRemove = await this.animalsService.remove(+id);
    if (!animalRemove)
      throw new NotFoundException(`Animal ID ${id} not found!`);
  }
}

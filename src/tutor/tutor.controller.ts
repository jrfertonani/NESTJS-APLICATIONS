import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor } from './entities/tutor.entity';

@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post()
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorService.create(createTutorDto);
  }

  @Get()
  findAll() {
    return this.tutorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tutor = await this.tutorService.findOne(+id);
    if (!tutor) throw new NotFoundException(`ID ${id} not found!`);
    return tutor;
  }

  @Get(':id/animals')
  findOneAnimal(@Param('id') id: string) {
    return this.tutorService.findOneAnimal(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTutorDto: UpdateTutorDto,
  ) {
    const tutor = await this.tutorService.update(+id, updateTutorDto);
    if (!tutor) throw new NotFoundException(`ID ${id} not found!`);
    return tutor;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const tutor = await this.tutorService.remove(+id);
    if (!tutor) throw new NotFoundException(`ID ${id} not found!`);
  }
}

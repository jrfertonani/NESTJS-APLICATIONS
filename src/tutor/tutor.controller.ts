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
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { TutorService } from './tutor.service';
import { Tutor } from './entities/tutor.entity';

@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post()
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorService.createTutor(createTutorDto);
  }

  @Post(':id/add-produtos')
  async createTutoresProdutos(
    @Param('id') tutorId: number,
    @Body('produtoIds') produtoIds: number,
  ): Promise<Tutor> {
    return this.tutorService.addProdutoToExistingTutor(tutorId, produtoIds);
  }

  @Patch(':id/add-pet')
  async addPet(
    @Param('id') tutorId: number,
    @Body('petIds') petIds: number,
  ): Promise<Tutor> {
    return this.tutorService.addPetToExistingTutor(tutorId, petIds);
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

  @Get(':id/pets')
  findOneAnimal(@Param('id') id: string) {
    return this.tutorService.findOneAnimal(+id);
  }

  @Get(':id/produtos')
  findOneProduto(@Param('id') id: string) {
    return this.tutorService.findOneProduto(+id);
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

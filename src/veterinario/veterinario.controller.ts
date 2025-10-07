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
import { VeterinarioService } from './veterinario.service';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import type { Veterinario } from './entities/veterinario.entity';

@Controller('veterinario')
export class VeterinarioController {
  constructor(private readonly veterinarioService: VeterinarioService) {}

  @Post()
  create(@Body() createVeterinarioDto: CreateVeterinarioDto) {
    return this.veterinarioService.create(createVeterinarioDto);
  }

  @Get()
  findAll() {
    return this.veterinarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vet = await this.veterinarioService.findOne(+id);
    if (!vet) throw new NotFoundException(`Id ${id} not found!`);
    return vet;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVeterinarioDto: UpdateVeterinarioDto,
  ) {
    const vet = await this.veterinarioService.update(+id, updateVeterinarioDto);
    if (!vet) throw new NotFoundException(`ID ${id} not found!`);
    return vet;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const vet = await this.veterinarioService.remove(+id);
    if (!vet) throw new NotFoundException(`ID ${id} not found!`);
  }

  @Patch(':id/add-pet')
  async addPet(
    @Param('id') veterinarioId: number,
    @Body('petIds') petIds: number,
  ): Promise<Veterinario> {
    return this.veterinarioService.addPetToExistingVeterinario(
      veterinarioId,
      petIds,
    );
  }

  @Get(':id/pets')
  findOnePet(@Param('id') id: string) {
    return this.veterinarioService.findOnePet(+id);
  }
}

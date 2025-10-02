import { Injectable } from '@nestjs/common';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { Veterinario } from './entities/veterinario.entity';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VeterinarioService {
  constructor(
    @InjectRepository(Veterinario)
    private veterinarioRepository: Repository<Veterinario>,
  ) {}

  create(createVeterinarioDto: CreateVeterinarioDto) {
    const vet = this.veterinarioRepository.create(createVeterinarioDto);
    return this.veterinarioRepository.save(vet);
  }

  async findAll() {
    return await this.veterinarioRepository.find();
  }

  async findOne(id: number) {
    return await this.veterinarioRepository.findOneBy({ id });
  }

  async update(id: number, updateVeterinarioDto: UpdateVeterinarioDto) {
    const vet = await this.veterinarioRepository.findOneBy({ id });
    if (!vet) return null;
    this.veterinarioRepository.merge(vet, updateVeterinarioDto);
    return this.veterinarioRepository.save(vet);
  }

  async remove(id: number) {
    const vet = await this.veterinarioRepository.findOneBy({ id });
    if (!vet) return null;
    return this.veterinarioRepository.remove(vet);
  }
}

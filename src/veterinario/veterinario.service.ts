import { Veterinario } from 'src/veterinario/entities/veterinario.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/pets/entities/pet.entity';

@Injectable()
export class VeterinarioService {
  constructor(
    @InjectRepository(Veterinario)
    private veterinarioRepository: Repository<Veterinario>,
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
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

  async addPetToExistingVeterinario(
    veterinarioId: number,
    petsIds: number,
  ): Promise<Veterinario> {
    const veterinario = await this.veterinarioRepository.findOne({
      where: { id: veterinarioId },
      relations: ['pets'],
    });

    if (!veterinario) {
      throw new NotFoundException(
        `Veterinario com ID ${veterinarioId} não encontrado!`,
      );
    }

    const petToAdd = await this.petRepository.findOneBy({ id: petsIds });

    if (!petToAdd) {
      throw new NotFoundException(`Pet com Id ${petsIds} não encontrado!`);
    }
    if (!veterinario.pets.some((pet) => pet.id === petsIds)) {
      veterinario.pets.push(petToAdd);
    }
    return this.veterinarioRepository.save(veterinario);
  }

  async findOnePet(id: number): Promise<Veterinario | null> {
    const veterinario = await this.veterinarioRepository.findOne({
      where: { id },
      relations: ['pets'],
    });
    if (!veterinario) {
      throw new NotFoundException(`Veterinario ${id} não encontrado!`);
    }

    if (!veterinario.pets || veterinario.pets.length === 0) {
      throw new NotFoundException(
        `Nenhum pet cadastrado com Dr.${veterinario.name}`,
      );
    }
    return veterinario;
  }
}

import { Pet } from 'src/pets/entities/pet.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { Veterinario } from 'src/veterinario/entities/veterinario.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  create(createPetDto: CreatePetDto) {
    const pet = this.petRepository.create(createPetDto);
    return this.petRepository.save(pet);
  }

  findAll() {
    return this.petRepository.find();
  }

  findOne(id: number) {
    return this.petRepository.findOneBy({ id });
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    const pet = await this.petRepository.findOneBy({ id });
    if (!pet) return null;
    this.petRepository.merge(pet, updatePetDto);
    return this.petRepository.save(pet);
  }

  async remove(id: number) {
    const pet = await this.petRepository.findOneBy({ id });
    if (!pet) return null;
    return this.petRepository.remove(pet);
  }

  async findOneVeterinario(id: number): Promise<Pet | null> {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['veterinarios'],
    });
    if (!pet) {
      throw new NotFoundException(`Pet não encontrado!`);
    }

    if (!pet.veterinarios || pet.veterinarios.length === 0) {
      throw new NotFoundException(
        `Nenhum verinario cadastrado com o Pet ${pet.name}`,
      );
    }

    return pet;
  }
}

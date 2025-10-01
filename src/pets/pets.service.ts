import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
}

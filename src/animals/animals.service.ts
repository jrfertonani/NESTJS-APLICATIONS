import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  create(createAnimalDto: CreateAnimalDto) {
    const newAnimal = this.animalRepository.create(createAnimalDto);
    return this.animalRepository.save(newAnimal);
  }

  async findAll() {
    const animalFind = await this.animalRepository.find();
    return animalFind;
  }

  async findOne(id: number) {
    const animalFindBy = await this.animalRepository.findOneBy({ id });
    if (!animalFindBy) return null;
    return animalFindBy;
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    const animalUpdate = await this.animalRepository.findOneBy({ id });
    if (!animalUpdate) return null;
    this.animalRepository.merge(animalUpdate, updateAnimalDto);
    return this.animalRepository.save(animalUpdate);
  }

  async remove(id: number) {
    const animalRemove = await this.animalRepository.findOneBy({ id });
    if (!animalRemove) return null;
    return this.animalRepository.remove(animalRemove);
  }
}

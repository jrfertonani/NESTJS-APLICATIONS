import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor } from './entities/tutor.entity';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/pets/entities/pet.entity';
import { Produto } from 'src/produtos/entities/produto.entity';

@Injectable()
export class TutorService {
  constructor(
    @InjectRepository(Tutor)
    private tutorRepository: Repository<Tutor>,
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  // createTutor(createTutorDto: CreateTutorDto) {
  //   const tutor = this.tutorRepository.create(createTutorDto);
  //   return this.tutorRepository.save(tutor);
  // }

  async addPetToExistingTutor(tutorId: number, petIds: number): Promise<Tutor> {
    const tutor = await this.tutorRepository.findOne({
      where: { id: tutorId },
      relations: ['pets'],
    });

    if (!tutor) {
      throw new NotFoundException(`Tutor com ID ${tutorId} não encontrado!`);
    }

    const petToAdd = await this.petRepository.findOneBy({ id: petIds });

    if (!petToAdd) {
      throw new NotFoundException(`Pet com ID ${petIds} não encontrado!`);
    }
    if (!tutor.pets.some((pet) => pet.id === petIds)) {
      tutor.pets.push(petToAdd);
    }

    return this.tutorRepository.save(tutor);
  }

  async addProdutoToExistingTutor(
    tutorId: number,
    produtoIds: number,
  ): Promise<Tutor> {
    const tutor = await this.tutorRepository.findOne({
      where: { id: tutorId },
      relations: ['produtos'],
    });

    if (!tutor) {
      throw new NotFoundException(`Tutor com ID ${tutorId} não encontrado!`);
    }

    const produtoAdd = await this.produtoRepository.findOneBy({
      id: produtoIds,
    });

    if (!produtoAdd) {
      throw new NotFoundException(
        `Produto com ID ${produtoIds} não encontrado!`,
      );
    }

    if (!tutor.produtos.some((produto) => produto.id == produtoIds)) {
      tutor.produtos.push(produtoAdd);
    }

    return this.tutorRepository.save(tutor);
  }
  async findAll() {
    return await this.tutorRepository.find();
  }

  async findOne(id: number) {
    return await this.tutorRepository.findOneBy({ id });
  }

  
  async findOneAnimal(id: number): Promise<Tutor | null> {
    const tutor = await this.tutorRepository.findOne({
      where: { id },
      relations: ['pets'],
    });
    return tutor;
  }

  async findOneProduto(id: number): Promise<Tutor | null> {
    const tutor = await this.tutorRepository.findOne({
      where: { id },
      relations: ['produtos'],
    });
    return tutor;
  }

  async update(id: number, updateTutorDto: UpdateTutorDto) {
    const tutorUpdate = await this.tutorRepository.findOneBy({ id });
    if (!tutorUpdate) return null;
    this.tutorRepository.merge(tutorUpdate, updateTutorDto);
    return this.tutorRepository.save(tutorUpdate);
  }

  async remove(id: number) {
    const tutorDelete = await this.tutorRepository.findOneBy({ id });
    if (!tutorDelete) return null;
    return this.tutorRepository.remove(tutorDelete);
  }
}

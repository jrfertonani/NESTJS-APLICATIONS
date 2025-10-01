import { Injectable } from '@nestjs/common';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor } from './entities/tutor.entity';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TutorService {
  constructor(
    @InjectRepository(Tutor)
    private tutorRepository: Repository<Tutor>,
  ) {}

  create(createTutorDto: CreateTutorDto): Promise<Tutor> {
    const tutor = this.tutorRepository.create(createTutorDto);
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
      relations: ['animals'],
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

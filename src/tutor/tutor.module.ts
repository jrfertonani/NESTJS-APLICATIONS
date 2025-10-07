import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { Tutor } from './entities/tutor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/pets/entities/pet.entity';
import { Produto } from 'src/produtos/entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor, Pet, Produto])],
  controllers: [TutorController],
  providers: [TutorService],
})
export class TutorModule {}

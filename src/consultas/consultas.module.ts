import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Module } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { Pet } from 'src/pets/entities/pet.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veterinario } from 'src/veterinario/entities/veterinario.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consulta, Pet, Produto, Veterinario, Tutor])],
  controllers: [ConsultasController],
  providers: [ConsultasService],
})
export class ConsultasModule {}

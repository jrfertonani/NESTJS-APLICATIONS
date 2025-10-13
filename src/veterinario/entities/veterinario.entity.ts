import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Veterinario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Pet, (pet) => pet.veterinarios)
  @JoinTable({
    name: 'veterinario_pet',
    joinColumn: { name: 'veterinario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'pet_id', referencedColumnName: 'id' },
  })
  pets: Pet[];

  @ManyToMany(() => Consulta, (consulta) => consulta.veterinarios)
  consultas: Consulta[];
}

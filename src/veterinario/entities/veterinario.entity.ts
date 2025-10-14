import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Veterinario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'Clínica Geral',
  })
  especialidade: string;

  @ManyToMany(() => Pet, (pet) => pet.veterinarios)
  @JoinTable({
    name: 'veterinario_pet',
    joinColumn: { name: 'veterinario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'pet_id', referencedColumnName: 'id' },
  })
  pets: Pet[];

  @ManyToMany(() => Consulta, (consulta) => consulta.veterinarios)
  consultas: Consulta[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

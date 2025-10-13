import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Veterinario } from 'src/veterinario/entities/veterinario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Tutor, (tutor) => tutor.pets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tutorId' })
  tutor: Tutor;

  @ManyToMany(() => Veterinario, (veterinario) => veterinario.pets)
  veterinarios: Veterinario[];

  @OneToMany(() => Consulta, (consulta) => consulta.pet)
  consultas: Consulta[];
}

import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Veterinario } from 'src/veterinario/entities/veterinario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
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
}

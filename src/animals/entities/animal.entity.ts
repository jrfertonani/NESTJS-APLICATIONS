import { Tutor } from 'src/tutor/entities/tutor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Tutor, (tutor) => tutor.pets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tutorId' })
  tutor: Tutor;

  //espécie
}

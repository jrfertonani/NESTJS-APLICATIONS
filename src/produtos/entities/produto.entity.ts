import { Tutor } from 'src/tutor/entities/tutor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Tutor, (tutor) => tutor.produtos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tutorId' })
  tutor: Tutor;

  // ração,
  // brinquedos,
  // acessórios
  // medicamentos
}

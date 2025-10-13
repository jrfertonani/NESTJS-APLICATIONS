import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
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

  @ManyToMany(() => Consulta, (consulta) => consulta.produtos)
  consultas: Consulta[];

  // ração,
  // brinquedos,
  // acessórios
  // medicamentos
}

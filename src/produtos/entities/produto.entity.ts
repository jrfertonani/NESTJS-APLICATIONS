import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProdutoCategoria } from '../dto/produto-categoria.enum';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 255 })
  name: string;

  @ManyToOne(() => Tutor, (tutor) => tutor.produtos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tutorId' })
  tutor: Tutor;

  @ManyToMany(() => Consulta, (consulta) => consulta.produtos)
  consultas: Consulta[];

  @Column({
    type: 'varchar',
    enum: ProdutoCategoria,
    nullable: false,
    default: ProdutoCategoria.OUTROS,
  })
  categoria: ProdutoCategoria;

  @Column({ type: 'text', nullable: true })
  descricao: string; // Para detalhes sobre ração, ingredientes, forma de uso, etc.

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

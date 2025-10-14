import { Pet } from 'src/pets/entities/pet.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Veterinario } from 'src/veterinario/entities/veterinario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConsultaStatus } from '../dto/consulta-status.enum';
import { ConsultaTipo } from '../dto/consulta-tipo.enum';

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    enum: ConsultaStatus,
    default: ConsultaStatus.AGENDADA,
    nullable: false,
  })
  status: ConsultaStatus;

  @Column({
    type: 'varchar',
    enum: ConsultaTipo,
    default: ConsultaTipo.ROTINA,
    nullable: false,
  })
  tipo: ConsultaTipo;

  @Column({
    type: 'datetime', // Use 'datetime' para compatibilidade com a maioria dos bancos
    nullable: false,
  })
  dataConsulta: Date;

  @Column({ type: 'text', nullable: true })
  diagnostico?: string;

  @Column({ type: 'text', nullable: true })
  tratamento?: string;

  @Column({ type: 'text', nullable: true })
  observacoes?: string;

  @ManyToMany(() => Veterinario, (veterinario) => veterinario.consultas)
  @JoinTable({
    name: 'consulta_veterinario',
    joinColumn: { name: 'consulta_id' },
    inverseJoinColumn: { name: 'veterinario_id' },
  })
  veterinarios: Veterinario[];

  @ManyToOne(() => Pet, (pet) => pet.consultas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'petId' })
  pet: Pet;

  @ManyToOne(() => Tutor, (tutor) => tutor.consultas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tutorId' })
  tutor: Tutor;

  @ManyToMany(() => Produto, (produto) => produto.consultas)
  @JoinTable({
    name: 'consulta_produto',
    joinColumn: { name: 'consulta_id' },
    inverseJoinColumn: { name: 'produto_id' },
  })
  produtos: Produto[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

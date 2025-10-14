import { Pet } from 'src/pets/entities/pet.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Consulta } from 'src/consultas/entities/consulta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  telefone: string;

  @OneToMany(() => Pet, (pet) => pet.tutor, {
    cascade: true,
  })
  pets: Pet[];

  @OneToMany(() => Produto, (produto) => produto.tutor, {
    cascade: true,
  })
  produtos: Produto[];

  @OneToMany(() => Consulta, (consulta) => consulta.tutor)
  consultas: Consulta[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

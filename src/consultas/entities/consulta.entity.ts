import { Pet } from 'src/pets/entities/pet.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Veterinario } from 'src/veterinario/entities/veterinario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'datetime', // Use 'datetime' para compatibilidade com a maioria dos bancos
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataConsulta: Date;

  @Column({ nullable: true })
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

  @ManyToMany(() => Produto, (produto) => produto.consultas)
  @JoinTable({
    name: 'consulta_produto',
    joinColumn: { name: 'consulta_id' },
    inverseJoinColumn: { name: 'produto_id' },
  })
  produtos: Produto[];
}


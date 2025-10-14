import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';
import { Veterinario } from 'src/veterinario/entities/veterinario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PetEspecie } from '../dto/pet-especie.enum';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'varchar',
    enum: PetEspecie,
    length: 50,
    nullable: true,
    default: PetEspecie.CACHORRO,
  })
  especie: PetEspecie;

  @Column({
    nullable: false,
    default: 'Desconhecida',
  })
  raca: string;

  @Column({
    type: 'integer',
    nullable: false,
    default: 0,
  })
  idade?: number;

  @ManyToOne(() => Tutor, (tutor) => tutor.pets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tutorId' })
  tutor: Tutor;

  @ManyToMany(() => Veterinario, (veterinario) => veterinario.pets)
  veterinarios: Veterinario[];

  @OneToMany(() => Consulta, (consulta) => consulta.pet)
  consultas: Consulta[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

import { Pet } from 'src/pets/entities/pet.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true }) 
  email: string;

  @OneToMany(() => Pet, (pet) => pet.tutor, {
    cascade: true,
  })
  pets: Pet[];

  @OneToMany(() => Produto, (produto) => produto.tutor, {
    cascade: true,
  })
  produtos: Produto[];
}

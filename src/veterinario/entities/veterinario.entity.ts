import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Veterinario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

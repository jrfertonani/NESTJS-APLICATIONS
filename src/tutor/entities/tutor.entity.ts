import { Animal } from 'src/animals/entities/animal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => Animal, (animal) => animal.tutor, {
    cascade: true,
  })
  animals: Animal[];
}

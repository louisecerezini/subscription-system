import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  nome: string;

  @Column()
  email: string;
}

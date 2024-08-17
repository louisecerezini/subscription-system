import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Aplicativo {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  nome: string;

  @Column('float')
  custoMensal: number;
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Aplicativo } from './aplicativo.entity';

@Entity()
export class Assinatura {
  @PrimaryGeneratedColumn()
  codigo: number;

  @ManyToOne(() => Cliente)
  cliente: Cliente;

  @ManyToOne(() => Aplicativo)
  aplicativo: Aplicativo;

  @Column()
  inicioVigencia: Date;

  @Column({ nullable: true })
  fimVigencia: Date;
}

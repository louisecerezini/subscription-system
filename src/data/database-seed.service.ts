import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { Aplicativo } from '../entities/aplicativo.entity';
import { Assinatura } from '../entities/assinatura.entity';

@Injectable()
export class DatabaseSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
    @InjectRepository(Aplicativo) private aplicativoRepo: Repository<Aplicativo>,
    @InjectRepository(Assinatura) private assinaturaRepo: Repository<Assinatura>,
  ) {}

  async onModuleInit() {
    // Populando clientes
    const clientes = [
      { nome: 'Cliente 1', email: 'cliente1@example.com' },
      { nome: 'Cliente 2', email: 'cliente2@example.com' },
      { nome: 'Cliente 3', email: 'cliente3@example.com' },
      // Adicione mais clientes conforme necessário
    ];
    await this.clienteRepo.save(clientes);

    // Populando aplicativos
    const aplicativos = [
      { nome: 'App 1', custoMensal: 9.99 },
      { nome: 'App 2', custoMensal: 19.99 },
      { nome: 'App 3', custoMensal: 29.99 },
      // Adicione mais aplicativos conforme necessário
    ];
    await this.aplicativoRepo.save(aplicativos);

    // Populando assinaturas
    const cliente1 = await this.clienteRepo.findOneBy({ nome: 'Cliente 1' });
    const aplicativo1 = await this.aplicativoRepo.findOneBy({ nome: 'App 1' });

    const assinatura = this.assinaturaRepo.create({
      cliente: cliente1,
      aplicativo: aplicativo1,
      inicioVigencia: new Date(),
      fimVigencia: null,
    });

    await this.assinaturaRepo.save(assinatura);
  }
}

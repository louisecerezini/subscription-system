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
      { nome: 'Cliente 1', email: 'cliente1@example.com' }
    ];
    await this.clienteRepo.save(clientes);

    // Populando aplicativos
    const aplicativos = [
      { nome: 'App 1', custoMensal: 9.99 },
      { nome: 'App 2', custoMensal: 19.99 },
      { nome: 'App 3', custoMensal: 29.99 },
    ];
    await this.aplicativoRepo.save(aplicativos);

    // Populando assinaturas
    const cliente1 = await this.clienteRepo.findOneBy({ nome: 'Cliente 1' });
    const aplicativo1 = await this.aplicativoRepo.findOneBy({ nome: 'App 1' });

    const dataAtual = new Date();
    const dataFim = new Date();
    dataFim.setDate(dataFim.getDate() + 7);

    const assinaturaAtiva = this.assinaturaRepo.create({
      cliente: cliente1,
      aplicativo: aplicativo1,
      inicioVigencia: dataAtual,
      fimVigencia: dataFim,
    });

    await this.assinaturaRepo.save(assinaturaAtiva);

    const aplicativo2 = await this.aplicativoRepo.findOneBy({ nome: 'App 2' });

    const assinaturaCancelada = this.assinaturaRepo.create({
      cliente: cliente1,
      aplicativo: aplicativo2,
      inicioVigencia: dataAtual,
      fimVigencia: dataAtual,
    });

    await this.assinaturaRepo.save(assinaturaCancelada);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Assinatura } from '../entities/assinatura.entity';
import { AplicativoService } from './aplicativo.service';
import { ClienteService } from './cliente.service';

@Injectable()
export class AssinaturaService {
  constructor(
    @InjectRepository(Assinatura)
    private assinaturaRepo: Repository<Assinatura>,
    private clienteService: ClienteService,
    private aplicativoService: AplicativoService,
  ) {}

  getAllAssinaturas() {
    return this.assinaturaRepo.find();
  }

  async createAssinatura(clienteId: number, aplicativoId: number) {
    const cliente = await this.clienteService.getClienteById(clienteId);
    const aplicativo =
      await this.aplicativoService.getAplicativoById(aplicativoId);

    if (!cliente || !aplicativo) {
      throw new Error('Cliente ou Aplicativo não encontrado');
    }

    const dataAtual = new Date();
    const dataFim = new Date();
    dataFim.setDate(dataFim.getDate() + 7);

    const assinatura = this.assinaturaRepo.create({
      cliente,
      aplicativo,
      inicioVigencia: dataAtual,
      fimVigencia: dataFim,
    });

    const createdAssinatura = await this.assinaturaRepo.save(assinatura);

    return {
      codAssinatura: createdAssinatura.codigo,
      codCliente: createdAssinatura.cliente.codigo,
      codAplicativo: createdAssinatura.aplicativo.codigo,
      inicioVigencia: createdAssinatura.inicioVigencia,
      fimVigencia: createdAssinatura.fimVigencia
    }
  }

  async getAssinaturasPorTipo(tipo: string) {
    const dataAtual = new Date();

    let assinaturas = [];

    if (tipo === 'TODAS') {
      assinaturas = await this.assinaturaRepo.find({
        relations: ['cliente', 'aplicativo'],
      });
    } else {
      let condicaoVigencia =
        tipo === 'ATIVAS' ? MoreThanOrEqual(dataAtual) : LessThan(dataAtual);
      assinaturas = await this.assinaturaRepo.find({
        where: {
          fimVigencia: condicaoVigencia,
        },
        relations: ['cliente', 'aplicativo'],
      });
    }

    return assinaturas.map((assinatura) => ({
      codigo: assinatura.codigo,
      codigoCliente: assinatura.cliente.codigo,
      codigoAplicativo: assinatura.aplicativo.codigo,
      inicioVigencia: assinatura.inicioVigencia,
      fimVigencia: assinatura.fimVigencia,
      status:
        assinatura.fimVigencia && assinatura.fimVigencia >= dataAtual
          ? 'ATIVA'
          : 'CANCELADA',
    }));
  }

  async getAssinaturasPorCliente(codcli: number) {
    const assinaturas = await this.assinaturaRepo.find({
      where: { cliente: { codigo: codcli } },
      relations: ['cliente', 'aplicativo'],
    });

    const dataAtual = new Date();

    return assinaturas.map((assinatura) => ({
      codigo: assinatura.codigo,
      codigoCliente: assinatura.cliente.codigo,
      codigoAplicativo: assinatura.aplicativo.codigo,
      inicioVigencia: assinatura.inicioVigencia,
      fimVigencia: assinatura.fimVigencia,
      status:
        assinatura.fimVigencia && assinatura.fimVigencia >= dataAtual
          ? 'ATIVA'
          : 'CANCELADA',
    }));
  }

  async getAssinaturasPorAplicativo(codapp: number) {
    const assinaturas = await this.assinaturaRepo.find({
      where: { aplicativo: { codigo: codapp } },
      relations: ['cliente', 'aplicativo'],
    });

    const dataAtual = new Date();

    return assinaturas.map((assinatura) => ({
      codigo: assinatura.codigo,
      inicioVigencia: assinatura.inicioVigencia,
      fimVigencia: assinatura.fimVigencia,
      codigoCliente: assinatura.cliente.codigo,
      codigoAplicativo: assinatura.aplicativo.codigo,
      status:
        assinatura.fimVigencia && assinatura.fimVigencia >= dataAtual
          ? 'ATIVA'
          : 'CANCELADA',
    }));
  }
}

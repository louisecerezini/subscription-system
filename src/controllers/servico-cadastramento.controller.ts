import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { Aplicativo } from '../entities/aplicativo.entity';
import { Assinatura } from '../entities/assinatura.entity';

@Controller('servcad')
export class ServicoCadastramentoController {
  constructor(
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
    @InjectRepository(Aplicativo) private aplicativoRepo: Repository<Aplicativo>,
    @InjectRepository(Assinatura) private assinaturaRepo: Repository<Assinatura>,
  ) {}

  @Get('clientes')
  getClientes() {
    return this.clienteRepo.find();
  }

  @Get('aplicativos')
  getAplicativos() {
    return this.aplicativoRepo.find();
  }

  @Post('assinaturas')
  async createAssinatura(@Body() body: { clienteId: number, aplicativoId: number }) {
    const cliente = await this.clienteRepo.findOneBy({ codigo: body.clienteId });
    const aplicativo = await this.aplicativoRepo.findOneBy({ codigo: body.aplicativoId });

    if (!cliente || !aplicativo) {
      throw new Error('Cliente ou Aplicativo não encontrado');
    }

    const assinatura = this.assinaturaRepo.create({
      cliente,
      aplicativo,
      inicioVigencia: new Date(),
      fimVigencia: null,
    });

    return this.assinaturaRepo.save(assinatura);
  }

  @Patch('aplicativos/:idAplicativo')
  async updateCusto(@Param('idAplicativo') id: number, @Body() body: { custo: number }) {
    const aplicativo = await this.aplicativoRepo.findOneBy({ codigo: id });
    
    if (!aplicativo) {
      throw new Error('Aplicativo não encontrado');
    }
    
    aplicativo.custoMensal = body.custo;
    return this.aplicativoRepo.save(aplicativo);
  }

  @Get('assinaturas')
  getTodasAssinaturas() {
    // Implementação conforme tipo (TODAS, ATIVAS, CANCELADAS)
    return this.assinaturaRepo.find();
  }

  @Get('assinaturas/:tipo')
  getAssinaturas(@Param('tipo') tipo: string) {
    // Implementação conforme tipo (TODAS, ATIVAS, CANCELADAS)
    return this.assinaturaRepo.find();
  }

  @Get('asscli/:codcli')
  getAssinaturasPorCliente(@Param('codcli') codcli: number) {
    return this.assinaturaRepo.find({ where: { cliente: { codigo: codcli } } });
  }

  @Get('assapp/:codapp')
  getAssinaturasPorAplicativo(@Param('codapp') codapp: number) {
    return this.assinaturaRepo.find({ where: { aplicativo: { codigo: codapp } } });
  }
}
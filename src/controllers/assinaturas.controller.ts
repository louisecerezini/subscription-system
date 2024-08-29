import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssinaturaService } from 'src/services/assinatura.service';

@Controller('servcad')
export class AssinaturasController {
  constructor(    
    private assinaturaService: AssinaturaService
  ) {}

  @Post('assinaturas')
  createAssinatura(@Body() body: { clienteId: number, aplicativoId: number }) {
    return this.assinaturaService.createAssinatura(body.clienteId, body.aplicativoId);
  }

  @Get('assinaturas')
  getTodasAssinaturas() {
    return this.assinaturaService.getAllAssinaturas();
  }

  @Get('assinaturas/:tipo')
  getAssinaturas(@Param('tipo') tipo: string) {
    return this.assinaturaService.getAssinaturasPorTipo(tipo);
  }

  @Get('asscli/:codcli')
  getAssinaturasPorCliente(@Param('codcli') codcli: number) {
    return this.assinaturaService.getAssinaturasPorCliente(codcli);
  }

  @Get('assapp/:codapp')
  async getAssinaturasPorAplicativo(@Param('codapp') codapp: number) {
    return await this.assinaturaService.getAssinaturasPorAplicativo(codapp);
  }
}
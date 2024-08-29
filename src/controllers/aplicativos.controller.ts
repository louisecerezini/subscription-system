import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AplicativoService } from 'src/services/aplicativo.service';

@Controller('servcad')
export class AplicativosController {
  constructor(    
    private aplicativoService: AplicativoService
  ) {}

  @Get('aplicativos')
  getAplicativos() {
    return this.aplicativoService.getAllAplicativos();
  }

  @Patch('aplicativos/:idAplicativo')
  async updateCusto(@Param('idAplicativo') id: number, @Body() body: { custo: number }) {
    return await this.aplicativoService.updateCusto(id, body.custo);
  }
}
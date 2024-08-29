import { Controller, Get } from '@nestjs/common';
import { ClienteService } from 'src/services/cliente.service';

@Controller('servcad')
export class ClientesController {
  constructor(    
    private clienteService: ClienteService,
  ) {}

  @Get('clientes')
  getClientes() {
    return this.clienteService.getAllClientes();
  }
}
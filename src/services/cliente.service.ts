import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
  ) {}

  getAllClientes() {
    return this.clienteRepo.find();
  }

  getClienteById(id: number) {
    return this.clienteRepo.findOneBy({ codigo: id });
  }
}

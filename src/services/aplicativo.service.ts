import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aplicativo } from '../entities/aplicativo.entity';

@Injectable()
export class AplicativoService {
  constructor(
    @InjectRepository(Aplicativo) private aplicativoRepo: Repository<Aplicativo>,
  ) {}

  getAllAplicativos() {
    return this.aplicativoRepo.find();
  }

  getAplicativoById(id: number) {
    return this.aplicativoRepo.findOneBy({ codigo: id });
  }

  async updateCusto(id: number, custo: number) {
    const aplicativo = await this.getAplicativoById(id);
    if (!aplicativo) {
      throw new Error('Aplicativo não encontrado');
    }
    
    aplicativo.custoMensal = custo;
    return await this.aplicativoRepo.save(aplicativo);
  }
}

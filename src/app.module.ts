import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Aplicativo } from './entities/aplicativo.entity';
import { Assinatura } from './entities/assinatura.entity';
import { ClientesController } from './controllers/clientes.controller';
import { AssinaturasController } from './controllers/assinaturas.controller';
import { AplicativosController } from './controllers/aplicativos.controller';
import { DatabaseSeedService } from './data/database-seed.service';
import { ClienteService } from './services/cliente.service';
import { AplicativoService } from './services/aplicativo.service';
import { AssinaturaService } from './services/assinatura.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Cliente, Aplicativo, Assinatura],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Cliente, Aplicativo, Assinatura]),
  ],
  controllers: [
    ClientesController,
    AssinaturasController,
    AplicativosController,
  ],
  providers: [
    ClienteService,
    AplicativoService,
    AssinaturaService,
    DatabaseSeedService,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Aplicativo } from './entities/aplicativo.entity';
import { Assinatura } from './entities/assinatura.entity';
import { ServicoCadastramentoController } from './controllers/servico-cadastramento.controller';
import { DatabaseSeedService } from './data/database-seed.service';

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
  controllers: [ServicoCadastramentoController],
  providers: [DatabaseSeedService],
})
export class AppModule {}

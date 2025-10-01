import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data-source';
import { AnimalsModule } from './animals/animals.module';
import { TutorModule } from './tutor/tutor.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ConsultasModule } from './consultas/consultas.module';
import { VeterinarioModule } from './veterinario/veterinario.module';
import { HistoricoMedicoModule } from './historico-medico/historico-medico.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AnimalsModule,
    TutorModule,
    ProdutosModule,
    ConsultasModule,
    VeterinarioModule,
    HistoricoMedicoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

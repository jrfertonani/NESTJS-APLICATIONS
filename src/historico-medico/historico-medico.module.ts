import { Module } from '@nestjs/common';
import { HistoricoMedicoService } from './historico-medico.service';
import { HistoricoMedicoController } from './historico-medico.controller';

@Module({
  controllers: [HistoricoMedicoController],
  providers: [HistoricoMedicoService],
})
export class HistoricoMedicoModule {}

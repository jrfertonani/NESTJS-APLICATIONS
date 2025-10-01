import { Injectable } from '@nestjs/common';
import { CreateHistoricoMedicoDto } from './dto/create-historico-medico.dto';
import { UpdateHistoricoMedicoDto } from './dto/update-historico-medico.dto';

@Injectable()
export class HistoricoMedicoService {
  create(createHistoricoMedicoDto: CreateHistoricoMedicoDto) {
    return 'This action adds a new historicoMedico';
  }

  findAll() {
    return `This action returns all historicoMedico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historicoMedico`;
  }

  update(id: number, updateHistoricoMedicoDto: UpdateHistoricoMedicoDto) {
    return `This action updates a #${id} historicoMedico`;
  }

  remove(id: number) {
    return `This action removes a #${id} historicoMedico`;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoricoMedicoService } from './historico-medico.service';
import { CreateHistoricoMedicoDto } from './dto/create-historico-medico.dto';
import { UpdateHistoricoMedicoDto } from './dto/update-historico-medico.dto';

@Controller('historico-medico')
export class HistoricoMedicoController {
  constructor(private readonly historicoMedicoService: HistoricoMedicoService) {}

  @Post()
  create(@Body() createHistoricoMedicoDto: CreateHistoricoMedicoDto) {
    return this.historicoMedicoService.create(createHistoricoMedicoDto);
  }

  @Get()
  findAll() {
    return this.historicoMedicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historicoMedicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoricoMedicoDto: UpdateHistoricoMedicoDto) {
    return this.historicoMedicoService.update(+id, updateHistoricoMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historicoMedicoService.remove(+id);
  }
}

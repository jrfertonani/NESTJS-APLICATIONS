import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import type { Consulta } from './entities/consulta.entity';

@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Post()
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultasService.create(createConsultaDto);
  }

  @Get()
  findAll() {
    return this.consultasService.findAll();
  }

  @Get(':id')
  async findBy(@Param('id') id: string) {
    const consulta = await this.consultasService.buscaCosulta(+id);
    if (!consulta) throw new Error(`ID ${id} not found!`);
    return consulta;
  }

 
  @Patch(':id')
  async update(
    // 1. Captura o ID da URL
    @Param('id') consultaId: string, 
    // 2. Captura TODO o corpo da requisição como um objeto UpdateConsultaDto
    @Body() updateConsultaDto: UpdateConsultaDto,
  ): Promise<Consulta> {
    // 3. Converte o ID para número (Param() geralmente retorna string)
    const id = parseInt(consultaId, 10);
    
    // 4. Chama o service, passando o ID e o DTO completo
    return this.consultasService.updateConsulta(id, updateConsultaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultasService.remove(+id);
  }

  @Post('teste')
  createConsult(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultasService.registroConsulta(createConsultaDto);
  }
}

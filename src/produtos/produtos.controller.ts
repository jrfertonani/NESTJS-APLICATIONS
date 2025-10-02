import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const prod = await this.produtosService.findOne(+id);
    if (!prod) throw new NotFoundException(`ID ${id} not found!`);
    return prod;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    const prod = await this.produtosService.update(+id, updateProdutoDto);
    if (!prod) throw new NotFoundException(`ID ${id} not found!`);
    return prod;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const prod = await this.produtosService.remove(+id);
    if (!prod) throw new NotFoundException(`Id ${id} not found!`);
  }
}

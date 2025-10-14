import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  create(createProdutoDto: CreateProdutoDto) {
    const prod = this.produtoRepository.create(createProdutoDto);
    return this.produtoRepository.save(prod);
  }

  findAll() {
    return this.produtoRepository.find(); 
  }

  findOne(id: number) {
    return this.produtoRepository.findOneBy({ id });
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const prod = await this.produtoRepository.findOneBy({ id });
    if (!prod) return null;
    this.produtoRepository.merge(prod, updateProdutoDto);
    return this.produtoRepository.save(prod);
  }

  async remove(id: number) {
    const prod = await this.produtoRepository.findOneBy({ id });
    if (!prod) return null;
    return this.produtoRepository.remove(prod);
  }
}

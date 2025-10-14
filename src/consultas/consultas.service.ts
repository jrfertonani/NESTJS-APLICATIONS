import { Pet } from './../pets/entities/pet.entity';
import { Consulta } from './entities/consulta.entity';
import { Produto } from './../produtos/entities/produto.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, type Repository } from 'typeorm';
import { Veterinario } from 'src/veterinario/entities/veterinario.entity';
import { Tutor } from 'src/tutor/entities/tutor.entity';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Tutor)
    private tutorRepository: Repository<Tutor>,
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(Veterinario)
    private readonly veterinarioRepository: Repository<Veterinario>,
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
  ) {}

  async registroConsulta(input: CreateConsultaDto) {
    const pet = await this.petRepository.findBy({ id: In(input.petIds || []) });
    if (input.petIds && pet.length !== input.petIds.length) {
      throw new NotFoundException('Um ou mais pets não foram encontrados.');
    }

    const tutor = await this.tutorRepository.findBy({
      id: In(input.tutorIds || []),
    });

    if (input.tutorIds && tutor.length !== input.tutorIds.length) {
      throw new NotFoundException('Um ou mais tutores não foram encontrados.');
    }

    const veterinarios = await this.veterinarioRepository.findBy({
      id: In(input.veterinarioIds || []),
    });
    if (
      input.veterinarioIds &&
      veterinarios.length !== input.veterinarioIds.length
    ) {
      throw new NotFoundException(
        'Um ou mais veterinários não foram encontrados.',
      );
    }

    const produtos = await this.produtoRepository.findBy({
      id: In(input.produtoIds || []),
    });
    if (input.produtoIds && produtos.length !== input.produtoIds.length) {
      throw new NotFoundException('Um ou mais produtos não foram encontrados.');
    }

    const cadastrarConsulta = this.consultaRepository.create({
      ...input,
      pet: pet[pet.length - 1],
      tutor: tutor[tutor.length - 1],
      produtos,
      veterinarios,
    });

    const resultadoSalvo =
      await this.consultaRepository.save(cadastrarConsulta);

    const resultadoConsulta = await this.consultaRepository.findOne({
      where: { id: resultadoSalvo.id },
      relations: ['pet', 'tutor', 'veterinarios', 'produtos'],
    });

    return { resultadoConsulta };
  }

  async buscaCosulta(id: number): Promise<Consulta> {
    const consulta = await this.consultaRepository.findOne({
      where: { id },
      relations: ['pet', 'produtos', 'veterinarios', 'tutor'],
    });
    console.log(
      'Input Consultas: pet, produtos, veterinarios, tutor',
      consulta,
    );
    if (!consulta) {
      throw new NotFoundException(`Consulta com ID ${id} não encontrada.`);
    }
    return consulta;
  }

  async findConsultasByTutorName(nameTutor: string): Promise<Consulta[]> {
    if (!nameTutor) {
      return [];
    }

    const consultas = await this.consultaRepository.find({
      relations: ['tutor', 'pet'],
      where: {
        tutor: {
          name: Like(`%{nameTutor}%`),
        },
      },
      order: {
        dataConsulta: 'DESC',
      },
    });

    return consultas;
  }

  findAll() {
    return this.consultaRepository.find();
  }

  async updateConsulta(
    id: number,
    updateConsultaDto: UpdateConsultaDto,
  ): Promise<Consulta> {
    // 1. Encontrar a Consulta existente com os relacionamentos carregados
    const consulta = await this.consultaRepository.findOne({
      where: { id },
      relations: ['pet', 'veterinarios', 'produtos', 'tutor'], // Carrega os arrays atuais
    });

    if (!consulta) {
      throw new NotFoundException(`Consulta com ID ${id} não encontrada.`);
    }

    // 2. Atualizar campos simples (dataConsulta e observacoes)
    // Isso usa o spread operator, mas garantimos que apenas os campos do DTO sejam usados.
    this.consultaRepository.merge(consulta, updateConsultaDto);

    // 3. ATUALIZAÇÃO DO RELACIONAMENTO ManyToOne (Pet)
    if (updateConsultaDto.petIds && updateConsultaDto.petIds.length > 0) {
      // Como é ManyToOne, esperamos apenas 1 ID. Pegamos o primeiro.
      const petId = updateConsultaDto.petIds[0];
      const pet = await this.petRepository.findOneBy({ id: petId });

      if (!pet) {
        throw new NotFoundException(`Pet com ID ${petId} não encontrado.`);
      }

      // Atribuição direta do objeto Pet (resolve o erro de array anterior)
      consulta.pet = pet;
    }
    // 3. ATUALIZAÇÃO DO RELACIONAMENTO ManyToOne (Tutor)
    if (updateConsultaDto.tutorIds && updateConsultaDto.tutorIds.length > 0) {
      const tutorId = updateConsultaDto.tutorIds[0];
      const newTutor = await this.tutorRepository.findOneBy({ id: tutorId });

      if (!newTutor) {
        throw new NotFoundException(`Tutor com ID ${tutorId} não encontrado.`);
      }
      consulta.tutor = newTutor;
    }

    // 4. ATUALIZAÇÃO DO RELACIONAMENTO ManyToMany (Veterinarios)
    if (updateConsultaDto.veterinarioIds) {
      if (updateConsultaDto.veterinarioIds.length > 0) {
        const veterinarios = await this.veterinarioRepository.findBy({
          id: In(updateConsultaDto.veterinarioIds),
        });

        if (veterinarios.length !== updateConsultaDto.veterinarioIds.length) {
          // Lógica para lidar com IDs de veterinário não encontrados
          throw new NotFoundException('Veterinários não foram encontrados.');
        }

        // Atribui o novo array de Veterinarios. TypeORM fará o sync na tabela de junção.
        consulta.veterinarios = veterinarios;
      } else {
        // Se um array vazio for enviado, limpa o relacionamento
        consulta.veterinarios = [];
      }
    }

    // 5. ATUALIZAÇÃO DO RELACIONAMENTO ManyToMany (Produtos)
    if (updateConsultaDto.produtoIds) {
      if (updateConsultaDto.produtoIds.length > 0) {
        const produtos = await this.produtoRepository.findBy({
          id: In(updateConsultaDto.produtoIds),
        });

        if (produtos.length !== updateConsultaDto.produtoIds.length) {
          // Lógica para lidar com IDs de produto não encontrados
          throw new NotFoundException('Produtos não foram encontrados.');
        }

        // Atribui o novo array de Produtos. TypeORM fará o sync na tabela de junção.
        consulta.produtos = produtos;
      } else {
        // Se um array vazio for enviado, limpa o relacionamento
        consulta.produtos = [];
      }
    }

    // 6. Salvar e retornar a entidade atualizada
    return this.consultaRepository.save(consulta);
  }

  async remove(id: number) {
    const removerConsulta = await this.consultaRepository.findOneBy({ id });
    if (!removerConsulta) {
      throw new NotFoundException(`Consulta com ID ${id} não encontrada.`);
    }
    this.consultaRepository.remove(removerConsulta);
  }
}

import { Injectable } from '@nestjs/common';
import { CreatePracticaDto } from './dto/create-practica.dto';
import { UpdatePracticaDto } from './dto/update-practica.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Practica } from './entities/practica.entity';



@Injectable()
export class PracticaService {
  constructor(
    @InjectRepository(Practica) private practicaRepository: Repository<Practica>,
  ) { }

  create(createPracticaDto: CreatePracticaDto) {
    return 'This action adds a new practica';
  }

  async findAll() {
    return this.practicaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} practica`;
  }

  update(id: number, updatePracticaDto: UpdatePracticaDto) {
    return `This action updates a #${id} practica`;
  }

  remove(id: number) {
    return `This action removes a #${id} practica`;
  }
}

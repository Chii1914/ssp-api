import { Injectable } from '@nestjs/common';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comuna } from './entities/comuna.entity';



@Injectable()
export class ComunaService {
  constructor(
    @InjectRepository(Comuna)
    private comunaRepository: Repository<Comuna>,
  ) {}

  create(createComunaDto: CreateComunaDto) {
    return 'This action adds a new comuna';
  }

  findAll() {
    return this.comunaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} comuna`;
  }

  update(id: number, updateComunaDto: UpdateComunaDto) {
    return `This action updates a #${id} comuna`;
  }

  remove(id: number) {
    return `This action removes a #${id} comuna`;
  }
}

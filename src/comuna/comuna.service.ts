import { Injectable } from '@nestjs/common';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';

@Injectable()
export class ComunaService {
  create(createComunaDto: CreateComunaDto) {
    return 'This action adds a new comuna';
  }

  findAll() {
    return `This action returns all comuna`;
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

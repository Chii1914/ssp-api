import { Injectable } from '@nestjs/common';
import { CreateCartasPerDto } from './dto/create-cartas-per.dto';
import { UpdateCartasPerDto } from './dto/update-cartas-per.dto';

@Injectable()
export class CartasPerService {
  create(createCartasPerDto: CreateCartasPerDto) {
    return 'This action adds a new cartasPer';
  }

  findAll() {
    return `This action returns all cartasPer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartasPer`;
  }

  update(id: number, updateCartasPerDto: UpdateCartasPerDto) {
    return `This action updates a #${id} cartasPer`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartasPer`;
  }
}

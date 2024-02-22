import { Inject, Injectable } from '@nestjs/common';
import { CreateCartasGenDto } from './dto/create-cartas-gen.dto';
import { UpdateCartasGenDto } from './dto/update-cartas-gen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartasGen } from './entities/cartas-gen.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CartasGenService {

  constructor( @InjectRepository(CartasGen) private CartasGenRepository: Repository<CartasGen> ) {}


  create(createCartasGenDto: CreateCartasGenDto) {
    return 'This action adds a new cartasGen';
  }

  async findAll() {
    return await this.CartasGenRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} cartasGen`;
  }

  update(id: number, updateCartasGenDto: UpdateCartasGenDto) {
    return `This action updates a #${id} cartasGen`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartasGen`;
  }
}

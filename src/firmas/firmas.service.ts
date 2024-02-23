import { Injectable } from '@nestjs/common';
import { CreateFirmaDto } from './dto/create-firma.dto';
import { UpdateFirmaDto } from './dto/update-firma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Firma } from './entities/firma.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FirmasService {

  constructor(@InjectRepository(Firma) private firmaRepository: Repository<Firma>) { }

  create(createFirmaDto: CreateFirmaDto) {
    return 'This action adds a new firma';
  }

  findBySede(sede: string) {
    if (sede !== "Valparaíso" && sede !== "Santiago") {
      throw new Error("Invalid sede value");
    }
    return this.firmaRepository.find({ where: { sede: sede } });
  }

  findAll() {
    return `This action returns all firmas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} firma`;
  }

  update(id: number, updateFirmaDto: UpdateFirmaDto) {
    return `This action updates a #${id} firma`;
  }

  remove(id: number) {
    return `This action removes a #${id} firma`;
  }
}

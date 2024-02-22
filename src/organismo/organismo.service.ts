import { Injectable } from '@nestjs/common';
import { CreateOrganismoDto } from './dto/create-organismo.dto';
import { UpdateOrganismoDto } from './dto/update-organismo.dto';

@Injectable()
export class OrganismoService {
  create(createOrganismoDto: CreateOrganismoDto) {
    return 'This action adds a new organismo';
  }

  findAll() {
    return `This action returns all organismo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organismo`;
  }

  update(id: number, updateOrganismoDto: UpdateOrganismoDto) {
    return `This action updates a #${id} organismo`;
  }

  remove(id: number) {
    return `This action removes a #${id} organismo`;
  }
}

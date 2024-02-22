import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganismoService } from './organismo.service';
import { CreateOrganismoDto } from './dto/create-organismo.dto';
import { UpdateOrganismoDto } from './dto/update-organismo.dto';

@Controller('organismo')
export class OrganismoController {
  constructor(private readonly organismoService: OrganismoService) {}

  @Post()
  create(@Body() createOrganismoDto: CreateOrganismoDto) {
    return this.organismoService.create(createOrganismoDto);
  }

  @Get()
  findAll() {
    return this.organismoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organismoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganismoDto: UpdateOrganismoDto) {
    return this.organismoService.update(+id, updateOrganismoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organismoService.remove(+id);
  }
}

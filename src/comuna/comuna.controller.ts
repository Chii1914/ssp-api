import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComunaService } from './comuna.service';
import { CreateComunaDto } from './dto/create-comuna.dto';
import { UpdateComunaDto } from './dto/update-comuna.dto';

@Controller('comuna')
export class ComunaController {
  constructor(private readonly comunaService: ComunaService) {}

  @Post()
  create(@Body() createComunaDto: CreateComunaDto) {
    return this.comunaService.create(createComunaDto);
  }

  @Get()
  findAll() {
    return this.comunaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComunaDto: UpdateComunaDto) {
    return this.comunaService.update(+id, updateComunaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunaService.remove(+id);
  }
}

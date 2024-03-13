import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PracticaService } from './practica.service';
import { CreatePracticaDto } from './dto/create-practica.dto';
import { UpdatePracticaDto } from './dto/update-practica.dto';

@Controller('practica')
export class PracticaController {
  constructor(private readonly practicaService: PracticaService) {}

  //Verifica si ya realizó una postulación prontamente hacer con front
  @Get(':mail')
  createById(@Param('mail') mail: string){
    return this.practicaService.verifyByMail(mail);
  }

  @Post()
  create(@Body() createPracticaDto: CreatePracticaDto) {
    return this.practicaService.create(createPracticaDto);
  }

  @Get()
  findAll() {
    return this.practicaService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePracticaDto: UpdatePracticaDto) {
    return this.practicaService.update(+id, updatePracticaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practicaService.remove(+id);
  }
}

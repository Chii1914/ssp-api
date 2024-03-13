import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Request } from '@nestjs/common';
import { PracticaService } from './practica.service';
import { CreatePracticaDto } from './dto/create-practica.dto';
import { UpdatePracticaDto } from './dto/update-practica.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/roles/roles.decorator';


@Controller('practica')
export class PracticaController {
  constructor(private readonly practicaService: PracticaService) {}

  //Verifica si ya realizó una postulación prontamente hacer con front
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles('alumno')
  verifyByMail(@Request() req: any){
    return this.practicaService.verifyByMail(req.user.mail);
  }

  @Post()
  create(@Body() createPracticaDto: CreatePracticaDto) {
    return this.practicaService.create(createPracticaDto);
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

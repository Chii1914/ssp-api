import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';


@Controller('alumno')
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) {}
  
  //alumno/id/:rut
  @Get('id/:rut')
  obtainIdByRut(@Param('rut') rut: number) {
    return this.alumnoService.obtainIdByRut(rut);
  }

  @Get('ct-gen/:mail')
  obtainCtGeneralByRut(@Param('mail') mail: string) {
    return this.alumnoService.obtainCtGeneralByRut(mail);
  }

  @Get('ct-per/:mail')
  obtainCpGeneralByRut(@Param('mail') mail: string) {
    return this.alumnoService.obtainCpGeneralByRut(mail);
  }

  @Get('rev/:mail')
  obtainAlumnoByMail(@Param('mail') mail: string){
    return this.alumnoService.obtainAlumnoByMail(mail);
  }

  @Patch(':run')
  updateByRun(@Param('run') run: number, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnoService.updateByRut(run, updateAlumnoDto);
  }

  @Post()
  create(@Body() createAlumnoDto: CreateAlumnoDto) {
    return this.alumnoService.create(createAlumnoDto);
  }

  @Get()
  findAll() {
    return this.alumnoService.findAll();
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumnoService.findOne(+id);
  }
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnoService.update(+id, updateAlumnoDto);
  }
  */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumnoService.remove(+id);
  }
}

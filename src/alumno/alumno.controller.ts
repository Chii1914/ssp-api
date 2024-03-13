import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/roles/roles.decorator';


@Controller('alumno')
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) { }

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
  obtainAlumnoByMail(@Param('mail') mail: string) {
    return this.alumnoService.obtainAlumnoByMail(mail);
  }
  /*
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles('alumno')
  verifyByMail(@Request() req: any){
    return this.practicaService.verifyByMail(req.user.mail);
  }
   */


  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @Roles('alumno')
  updateByRun(@Request() req: any, @Body() updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnoService.updateByRut(req.user.mail, updateAlumnoDto);
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

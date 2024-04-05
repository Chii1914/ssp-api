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
  @Get('id/')
  @UseGuards(AuthGuard('jwt'))
  @Roles('alumno')
  obtainIdByMail(@Request() req: any) {
    return this.alumnoService.obtainIdByRut(req.user.mail);
  }

  @Get('ct-gen/')
  @UseGuards(AuthGuard('jwt'))
  @Roles('alumno')
  obtainCtGeneralByRut(@Request() req: any) {
    return this.alumnoService.obtainCtGeneralByRut(req.user.mail);
  }

  @Get('ct-per/')
  @UseGuards(AuthGuard('jwt'))
  @Roles('alumno')
  obtainCpGeneralByRut(@Request() req: any) {
    return this.alumnoService.obtainCpGeneralByRut(req.user.mail);
  }

  @Get('rev')
  @UseGuards(AuthGuard('jwt'))
  @Roles('alumno')
  obtainAlumnoByMail(@Request() req: any) {
    return this.alumnoService.obtainAlumnoByMail(req.user.mail);
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

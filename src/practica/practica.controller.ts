import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Request } from '@nestjs/common';
import { PracticaService } from './practica.service';
import { CreatePracticaDto } from './dto/create-practica.dto';
import { UpdatePracticaDto } from './dto/update-practica.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/roles/roles.decorator';
import { CreateOrganismoDto } from 'src/organismo/dto/create-organismo.dto';
import { CreateSupervisorDto } from 'src/supervisor/dto/create-supervisor.dto';



/* ESTUDIANTE
$this->load->model('practicas/Estudiante_Model');
$estudiante = $this->Estudiante_Model->get_estudiante($this->session->userdata('id'));
$practica = $this->input->post('ocasion_practica');
$practica_homologacion = $this->input->post('practica_homologacion');
$practica_homologacion = ($practica_homologacion != NULL) ? $practica_homologacion : "0";
$sexo = $this->input->post('sexo');
$ultimo_sem_aprobado = $this->input->post('ultimo_sem_aprobado');
*/
/* ORGANISMO
$nombre_organismo = trim($this->input->post('nombre_organismo'));
$nombre_supervisor = trim($this->input->post('nombre_supervisor'));
$cargo_supervisor = trim($this->input->post('cargo_supervisor'));
$correo_supervisor = trim($this->input->post('correo_supervisor'));
$division_departamento = trim($this->input->post('division_departamento'));
$seccion_unidad = trim($this->input->post('seccion_unidad'));
$direccion_organismo = trim($this->input->post('direccion_organismo'));
$telefono_organismo = trim($this->input->post('telefono_organismo'));
$regionId = trim($this->input->post('region'));
$comunaId = trim($this->input->post('comuna'));
*/


@Controller('practica')
export class PracticaController {
  constructor(private readonly practicaService: PracticaService) { }

  //Acciones de estudiante
  //Verifica si ya realizó una postulación prontamente hacer con front
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles('alumno')
  verifyByMail(@Request() req: any) {
    return this.practicaService.verifyByMail(req.user.mail);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles('alumno')
  crearPractica(@Request() req: any, @Body() crearPracticaTotal: Object) {
    console.log(req.user.mail)
    return this.practicaService.crearPractica(req.user.mail, crearPracticaTotal);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePracticaDto: UpdatePracticaDto) {
    return this.practicaService.update(+id, updatePracticaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practicaService.remove(+id);
  }

  //Acciones de admin

  @Get('sn-rev/:sede') //Prácticas que están sin revisar 
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  getPracticasSinRevisar(@Param('sede') sede: string) {
    return this.practicaService.practicasSinRevisar(sede);
  }

  @Get('rev-rech/:sede') //Prácticas que están sin revisar 
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  getPracticasRevisadasRechazadas(@Param('sede') sede: string) {
    return this.practicaService.practicasRevisadasRechazadas(sede);
  }
}

/*
Solo el flaco inri sabe lo que ocurre acá, está entero peludo este código ql, lleno de datos inecesarios
y demostrando lo mal planteada que fue la base de datos
conxemimare, Dios te guíe si llegaste viendo el código de este archivo buscand respuestas
*/


import { Injectable } from '@nestjs/common';
import { CreatePracticaDto } from './dto/create-practica.dto';
import { CreateOrganismoDto } from 'src/organismo/dto/create-organismo.dto';
import { UpdatePracticaDto } from './dto/update-practica.dto';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Practica } from './entities/practica.entity';
import { Alumno } from '../alumno/entities/alumno.entity';
import { Evaluacione } from '../evaluaciones/entities/evaluacione.entity';
import { AlumnoService } from '../alumno/alumno.service';
import { Organismo } from 'src/organismo/entities/organismo.entity';
import { Supervisor } from 'src/supervisor/entities/supervisor.entity';
import { CreateSupervisorDto } from 'src/supervisor/dto/create-supervisor.dto';


class CrearPracticaTotalDto {
  createPracticaDto: CreatePracticaDto;
  createOrganismoDto: CreateOrganismoDto;
  createSupervisor: CreateSupervisorDto
  descripcion: string;
  ocasion: string;
  homologacion: boolean;
  horario: object;
}

@Injectable()
export class PracticaService {
  constructor(
    @InjectRepository(Practica) private practicaRepository: Repository<Practica>,
    @InjectRepository(Organismo) private organismoRepository: Repository<Organismo>,
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
    @InjectRepository(Evaluacione) private evaluacionesRepository: Repository<Evaluacione>,
    @InjectRepository(Supervisor) private supervisorRepository: Repository<Supervisor>,

    private alumnoService: AlumnoService,

  ) { }

  async verifyByMail(mail: string) {
    const alumno = await this.alumnoService.obtainAlumnoByMail(mail);
    const count_snevaluar = await this.practicaRepository.createQueryBuilder("practica")
      .where("practica.alumnoId = :id", { id: alumno.id })
      .andWhere("practica.ocasion = :ocasion", { ocasion: "Primera" })
      .andWhere("practica.estado = :estado", { estado: "Aceptada" })
      .andWhere("practica.evaluacionId IS NULL")
      .getCount();
    const count_snaccion = await this.practicaRepository.createQueryBuilder("practica").
      where("practica.alumnoId = :id", { id: alumno.id })
      .andWhere("practica.ocasion = :ocasion", { ocasion: "Primera" })
      .andWhere("practica.estado = :estado", { estado: "Sin Acción" })
      .andWhere("practica.evaluacionId IS NULL")
      .getCount();
    const count_evaluadas = await this.evaluacionesRepository.createQueryBuilder("evaluaciones")
      .innerJoin("evaluaciones.practicas", "practica")
      .where("practica.alumnoId = :id", { id: alumno.id })
      .andWhere("practica.ocasion = :ocasion", { ocasion: "Primera" })
      .andWhere("practica.estado = :estado", { estado: "Aceptada" })
      .andWhere("evaluaciones.evaluacion = :evaluacion", { evaluacion: "Aprobada" })
      .getCount();
    console.log(count_snevaluar, count_snaccion, count_evaluadas)
    if (count_snevaluar > 0 || count_evaluadas > 0 || count_snaccion > 0) {
      return false;
    }
    return true;
  }

  async crearPractica(mail: string, CrearPracticaTotalDto: CrearPracticaTotalDto) {
    const alumno = await this.alumnoService.obtainAlumnoByMail(mail);

    //now organismo.id exist <-------

    /*
    const practicaDto = dto.createPracticaDto;
    const organismoDto = dto.createOrganismoDto;
    const horarioDto = dto.createHorarioDto;
    const descripcion = dto.descripcion;
    const homologacion = dto.homologacion;
    */
    /* ESTUDIANTE
    $estudiante = $this->Estudiante_Model->get_estudiante($this->session->userdata('id'));
    $practica = $this->input->post('ocasion_practica');
    $practica_homologacion = $this->input->post('practica_homologacion');
    $practica_homologacion = ($practica_homologacion != NULL) ? $practica_homologacion : "0";
    $sexo = $this->input->post('sexo');
    $ultimo_sem_aprobado = $this->input->post('ultimo_sem_aprobado');
    $this->load->model('practicas/Estudiante_Model')
    */

    /*
    TODO
    - Inserción de orgnaismo en la bd
    - Inserción de supervisor en la bd
    - Inserción de la práctica en la bd
    - Inserción del horario en la bd, se tiene que hacer por día :c ctm quien modeló esta wea de base de datos mala qla
    */
    //Inserción del organismo en la bd
    const organismo = await this.organismoRepository.save(CrearPracticaTotalDto.createOrganismoDto);
    //Inserción del supervisor en la bd
    const organismoId = organismo.id;
    const supervisor = await this.supervisorRepository.save(CrearPracticaTotalDto.createSupervisor);
    return 0;
  }

  create(createPracticaDto: CreatePracticaDto) {
    return 'This action adds a new practica';
  }

  async findAll() {
    return this.practicaRepository.find();
  }

  update(id: number, updatePracticaDto: UpdatePracticaDto) {
    return `This action updates a #${id} practica`;
  }

  remove(id: number) {
    return `This action removes a #${id} practica`;
  }
}

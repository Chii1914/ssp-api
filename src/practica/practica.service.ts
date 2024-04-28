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
import { Horario } from 'src/horario/entities/horario.entity';


class CrearPracticaTotalDto {
  createPracticaDto: Object;
  createOrganismoDto: Object;
  createSupervisor: Object
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
    @InjectRepository(Horario) private horarioRepository: Repository<Horario>,

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
    console.log(CrearPracticaTotalDto)

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
    - Inserción de orgnaismo en la bd obtener id
    - Inserción de supervisor en la bd con id de organismo
    - Inserción de la práctica en la bd con id de organismo y de supervosr 
    - Inserción del horario en la bd, se tiene que hacer por día :c ctm quien modeló esta wea de base de datos mala qla
    */

    //Inserción del organismo en la bd
    const organismo = await this.organismoRepository.save(CrearPracticaTotalDto.createOrganismoDto);
    const organismoId = organismo.id;
    //Inserción del supervisor en la bd
    const supervisor = await this.supervisorRepository.save(CrearPracticaTotalDto.createSupervisor);
    const supervisorId = supervisor.id;
    //Inserción de la práctica en la bd

    /*
   const modifiedData = {
      ...practicaData,
      additionalData: 'This is some extra data',
    };

    */

    //obtener horas totales
   const hrstotales = 0;

    const practica_enrichted = {
      ...CrearPracticaTotalDto.createPracticaDto,
      organismoId: organismoId,
      supervisorId: supervisorId,
      alumnoId: alumno.id,
      horasPractica: hrstotales
    };

    const practica = await this.practicaRepository.save(practica_enrichted);
    const practicaId = practica.id;
    //Inserción del horario en la bd, con practicaId ingresar por día
    //Inserción de días de la semana, este con horario de mañana entrada y salida, luego tarde entrada y salida
    const Lunes = {...CrearPracticaTotalDto.horario["lunes"], practicaId: practicaId};
    const Martes = {...CrearPracticaTotalDto.horario["martes"], practicaId: practicaId};
    const Miercoles = {...CrearPracticaTotalDto.horario["miercoles"], practicaId: practicaId};
    const Jueves = {...CrearPracticaTotalDto.horario["jueves"], practicaId: practicaId};
    const Viernes = {...CrearPracticaTotalDto.horario["viernes"], practicaId: practicaId};
    const lunes = await this.horarioRepository.save(Lunes);
    const martes = await this.horarioRepository.save(Martes);
    const miercoles = await this.horarioRepository.save(Miercoles);
    const jueves = await this.horarioRepository.save(Jueves);
    const viernes = await this.horarioRepository.save(Viernes);
    //Ahora obtener total de horas en cada día y sumarlas para obtener el total de horas, total horas lunes, martes, miércoles...

    //Generación de archivo con los datos anteriormente mencionados
    //Envíar el correo reql con el archivo generado

    return 0;
  }

  create(createPracticaDto: CreatePracticaDto) {
    return 'This action adds a new practica';
  }

  async practicasSinRevisar(sede: string) {
  return await this.practicaRepository.createQueryBuilder("practica")
    .innerJoinAndSelect("practica.alumno", "alumno")
    .select([
      "practica.id",
      "alumno.run",
      "alumno.primerNombre",
      "alumno.segundoNombre",
      "alumno.apellidoPaterno",
      "alumno.apellidoMaterno",
      "practica.fecha_creado",
      "practica.fecha_cambio_estado",
      "practica.ocasion",
      "practica.estado",
    ]).where("practica.estado = :estado", { estado: "Sin Acción" })
    .andWhere("alumno.sede = :sede", { sede })
    .getMany();
  }

  async practicasRevisadasRechazadas(sede: string) {
     const practicas = await this.practicaRepository.createQueryBuilder("practica")
      .innerJoinAndSelect("practica.alumno", "alumno")
      .select([
        "practica.id",
        "practica.fecha_creado",
        "practica.fecha_cambio_estado",
        "practica.ocasion",
        "practica.estado",
        "alumno.run",
        "alumno.df",
        "alumno.primerNombre",
        "alumno.segundoNombre",
        "alumno.apellidoPaterno",
        "alumno.apellidoMaterno",
      ])
      .where("practica.estado = :estado", { estado: "Rechazada" })
      .andWhere("alumno.sede = :sede", { sede })
      .getMany();
    
    return practicas;
  }

  update(id: number, updatePracticaDto: UpdatePracticaDto) {
    return `This action updates a #${id} practica`;
  }

  remove(id: number) {
    return `This action removes a #${id} practica`;
  }
}

/*
Solo el flaco inri sabe lo que ocurre acá, está entero peludo este código ql, lleno de datos inecesarios
y demostrando lo mal planteada que fue la base de datos
conxemimare, Dios te guíe si llegaste viendo el código de este archivo buscand respuestas
Horas perdidas aquí: 23
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
  horario: Object;
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

  async crearPractica(mail: string, data: Object) {
    const alumno = await this.alumnoService.obtainAlumnoByMail(mail);
   
    /*
    TODO
    - Inserción de orgnaismo en la bd obtener id
    - Inserción de supervisor en la bd con id de organismo
    - Inserción de la práctica en la bd con id de organismo y de supervosr 
    - Inserción del horario en la bd, se tiene que hacer por día :c ctm quien modeló esta wea de base de datos mala qla
    */
    const organismoData = data["createOrganismo"];
    const supervisorData = data["createSupervisor"];
    const horarioData = data["horario"];
    let practicaData = data["practica"];

    let organismoId;
    let supervisorId;
    try{
      const organismo = await this.organismoRepository.save(organismoData);
      organismoId = organismo.id;
      const supervisor = await this.supervisorRepository.save(supervisorData);
      supervisorId = supervisor.id;
    }catch(err){
      return "Error en la inserción de los datos a la bd";
    }
    practicaData = {...practicaData, organismoId: organismoId, supervisorId: supervisorId, alumnoId: alumno.id, horasPractica: horarioData.totalHoras};
    try{
      const practica = await this.practicaRepository.save(practicaData);
      console.log(practica.id)
    }catch(err){
      console.log(err)
      return "Error en la inserción de los datos a la bd";
    }
    //Ahora insertar el horario reql, generar el documento y enviar por correo a todos
    
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
        "practica.fechaCreado",
        "practica.fechaCambioEstado",
        "practica.ocasion",
        "practica.estado",
        "alumno.run",
        "alumno.df",
        "alumno.primerNombre",
        "alumno.segundoNombre",
        "alumno.apellidoPaterno",
        "alumno.apellidoMaterno",
    ]).where("practica.estado = :estado", { estado: "Sin Acción" })
    .andWhere("alumno.sede = :sede", { sede })
    .getMany();
  }

  async practicasRevisadasRechazadas(sede: string) {
     const practicas = await this.practicaRepository.createQueryBuilder("practica")
      .innerJoinAndSelect("practica.alumno", "alumno")
      .select([
        "practica.id",
        "practica.fechaCreado",
        "practica.fechaCambioEstado",
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

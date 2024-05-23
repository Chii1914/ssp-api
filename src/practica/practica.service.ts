/*
Solo el flaco inri sabe lo que ocurre acá, está entero peludo este código ql, lleno de datos inecesarios
y demostrando lo mal planteada que fue la base de datos
conxemimare, Dios te guíe si llegaste viendo el código de este archivo buscand respuestas
Horas perdidas aquí: 24
*/
import * as path from 'path';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
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
import { DockGeneratorService } from 'src/dock_generator/dock_generator.service';
import { MailerService } from '../mailer/mailer.service';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class PracticaService {
  constructor(
    @InjectRepository(Practica) private practicaRepository: Repository<Practica>,
    @InjectRepository(Organismo) private organismoRepository: Repository<Organismo>,
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
    @InjectRepository(Evaluacione) private evaluacionesRepository: Repository<Evaluacione>,
    @InjectRepository(Supervisor) private supervisorRepository: Repository<Supervisor>,
    @InjectRepository(Horario) private horarioRepository: Repository<Horario>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private dockGeneratorService: DockGeneratorService,
    private alumnoService: AlumnoService,
    private mailerService: MailerService,
    private usuarioService: UsuariosService,


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
    if (count_snevaluar > 0 || count_evaluadas > 0 || count_snaccion > 0) {
      return {
        status: false,
        contadores: {
          sin_evaluar: count_snevaluar,
          evaluadas: count_evaluadas,
          sin_accion: count_snaccion
        }
      }    }
    return {
      status: true,
      contadores: {
        sin_evaluar: count_snevaluar,
        evaluadas: count_evaluadas,
        sin_accion: count_snaccion
      }
    };
  }

  async crearPractica(mail: string, data: Object) {
    const alumno = await this.alumnoService.obtainAlumnoByMail(mail);

    /*
    TODO
      - Cambio de semestre con modal
      - Pié de página
    */
    const organismoData = data["createOrganismo"];
    const supervisorData = data["createSupervisor"];
    const horarioData = data["horario"];
    const UltSem = data["semestre"];
    let practicaData = data["practica"];

    let organismoId;
    let supervisorId;
    let practicaId;
    try {
      const organismo = await this.organismoRepository.save(organismoData);
      organismoId = organismo.id;
      const supervisor = await this.supervisorRepository.save(supervisorData);
      supervisorId = supervisor.id;
    } catch (err) {
      return "Error en la inserción de los datos a la bd";
    }
    practicaData = { ...practicaData, organismoId: organismoId, supervisorId: supervisorId, alumnoId: alumno.id, horasPractica: horarioData.totalHoras };
    try {
      const practica = await this.practicaRepository.save(practicaData);
      practicaId = practica.id;
    } catch (err) {
      console.log(err)
      return "Error en la inserción de los datos a la bd";
    }
    try {
      const horarioLunes = await this.horarioRepository.save({
        practicaId: practicaId,
        dia: "Lunes",
        horaMananaEntrada: horarioData.horaLunesMananaEntrada,
        horaMananaSalida: horarioData.horaLunesMananaSalida,
        horaTardeEntrada: horarioData.horaLunesTardeEntrada,
        horaTardeSalida: horarioData.horaLunesTardeSalida,
      });
      const horarioMartes = await this.horarioRepository.save({
        practicaId: practicaId,
        dia: "Martes",
        horaMananaEntrada: horarioData.horaMartesMananaEntrada,
        horaMananaSalida: horarioData.horaMartesMananaSalida,
        horaTardeEntrada: horarioData.horaMartesTardeEntrada,
        horaTardeSalida: horarioData.horaMartesTardeSalida,
      });
      const horarioMiercoles = await this.horarioRepository.save({
        practicaId: practicaId,
        dia: "Miercoles",
        horaMananaEntrada: horarioData.horaMiercolesMananaEntrada,
        horaMananaSalida: horarioData.horaMiercolesMananaSalida,
        horaTardeEntrada: horarioData.horaMiercolesTardeEntrada,
        horaTardeSalida: horarioData.horaMiercolesTardeSalida,
      });
      const horarioJueves = await this.horarioRepository.save({
        practicaId: practicaId,
        dia: "Jueves",
        horaMananaEntrada: horarioData.horaJuevesMananaEntrada,
        horaMananaSalida: horarioData.horaJuevesMananaSalida,
        horaTardeEntrada: horarioData.horaJuevesTardeEntrada,
        horaTardeSalida: horarioData.horaJuevesTardeSalida,
      });
      const horarioViernes = await this.horarioRepository.save({
        practicaId: practicaId,
        dia: "Viernes",
        horaMananaEntrada: horarioData.horaViernesMananaEntrada,
        horaMananaSalida: horarioData.horaViernesMananaSalida,
        horaTardeEntrada: horarioData.horaViernesTardeEntrada,
        horaTardeSalida: horarioData.horaViernesTardeSalida,
      });
    } catch (err) {
      console.log(err)
      return "Error en la inserción de los datos a la bd";
    }
    let homologacion;
    homologacion = practicaData['homologacion'] ? "Si" : "No";
    let nombre_archivo;

    nombre_archivo = await this.dockGeneratorService.crear_postulacion({
      dia: new Date().getDate(),
      mes: new Date().getMonth(),
      anio: new Date().getFullYear(),
      primer_nombre: alumno.primerNombre,
      segundo_nombre: alumno.segundoNombre,
      apellido_paterno: alumno.apellidoPaterno,
      apellido_materno: alumno.apellidoMaterno,
      run: alumno.run,
      df: alumno.df,
      telefono: alumno.telefono,
      correo_institucional: alumno.correoInstitucional,
      correo_personal: alumno.correoPersonal,
      sede: alumno.sede,
      practica: practicaData['ocacion'],
      anio_ingreso: alumno.anioIngreso,
      ultimo_sem_aprobado: alumno.ultimoSemAprobado,
      homologacion: homologacion,
      nombre_organismo: organismoData['nombreOrganismo'],
      direccion_organismo: organismoData['direccion'],
      division_departamento: organismoData['divisionDepartamento'],
      seccion_unidad: organismoData['seccionUnidad'],
      nombre_supervisor: supervisorData['nombre'],
      cargo_supervisor: supervisorData['cargo'],
      correo_supervisor: supervisorData['correo'],
      fecha_inicio: practicaData['fechaInicio'],
      fecha_termino: practicaData['fechaTermino'],
      hora_lunes_manana_entrada: horarioData['horaLunesMananaEntrada'],
      hora_lunes_manana_salida: horarioData['horaLunesMananaSalida'],
      hora_lunes_tarde_entrada: horarioData['horaLunesTardeEntrada'],
      hora_lunes_tarde_salida: horarioData['horaLunesTardeSalida'],
      total_horas_lunes: horarioData['totalHorasLunes'],
      hora_martes_manana_entrada: horarioData['horaMartesMananaEntrada'],
      hora_martes_manana_salida: horarioData['horaMartesMananaSalida'],
      hora_martes_tarde_entrada: horarioData['horaMartesTardeEntrada'],
      hora_martes_tarde_salida: horarioData['horaMartesTardeSalida'],
      total_horas_martes: horarioData['totalHorasMartes'],
      hora_miercoles_manana_entrada: horarioData['horaMiercolesMananaEntrada'],
      hora_miercoles_manana_salida: horarioData['horaMiercolesMananaSalida'],
      hora_miercoles_tarde_entrada: horarioData['horaMiercolesTardeEntrada'],
      hora_miercoles_tarde_salida: horarioData['horaMiercolesTardeSalida'],
      total_horas_miercoles: horarioData['totalHorasMiercoles'],
      hora_jueves_manana_entrada: horarioData['horaJuevesMananaEntrada'],
      hora_jueves_manana_salida: horarioData['horaJuevesMananaSalida'],
      hora_jueves_tarde_entrada: horarioData['horaJuevesTardeEntrada'],
      hora_jueves_tarde_salida: horarioData['horaJuevesTardeSalida'],
      total_horas_jueves: horarioData['totalHorasJueves'],
      hora_viernes_manana_entrada: horarioData['horaViernesMananaEntrada'],
      hora_viernes_manana_salida: horarioData['horaViernesMananaSalida'],
      hora_viernes_tarde_entrada: horarioData['horaViernesTardeEntrada'],
      hora_viernes_tarde_salida: horarioData['horaViernesTardeSalida'],
      total_horas_viernes: horarioData['totalHorasViernes'],
      total_horas_semanales: horarioData['totalHoras'],
      descripcion: practicaData['descripcion'].replace(/\r\n/g, "</w:t><w:br/><w:t>"),
      piepagina: practicaData['piepagina'],
      nombre_archivo: alumno.run + '-postulacion(Primera).docx',
    });
    try {
      const practica = await this.practicaRepository.update(practicaId, { nombreArchivo: nombre_archivo });
      const semestre = await this.alumnoRepository.update(alumno.id, { ultimoSemAprobado: UltSem.ultimoSemAprobado });
    } catch (err) {
      console.log(err)
      return "Error en la inserción de los datos a la bd";
    }
    const correos = await this.usuarioService.findAllSede(alumno.sede);
    const correosStr = correos.map(usuario => usuario.correo).join(', ');
    const filepath = path.join(__dirname, "..", "..", "public", "documentos", alumno.run.toString() , nombre_archivo);
    await this.mailerService.sendMail(
      alumno.correoInstitucional,
      'Generación práctica',
      'Se ha generado su práctica, adjunta a este correo se encuentra el archivo correspondiente.',
      '',
      correosStr,
      nombre_archivo,
      filepath
    );

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

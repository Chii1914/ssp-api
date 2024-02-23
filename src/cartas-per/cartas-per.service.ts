import { Injectable } from '@nestjs/common';
import { CreateCartasPerDto } from './dto/create-cartas-per.dto';
import { UpdateCartasPerDto } from './dto/update-cartas-per.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlumnoService } from '../alumno/alumno.service';
import { Alumno } from '../alumno/entities/alumno.entity';
import { MailerService } from '../mailer/mailer.service';
import { DockGeneratorService } from 'src/dock_generator/dock_generator.service';
import * as path from 'path';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { FirmasService } from '../firmas/firmas.service';
import { CartasPer } from './entities/cartas-per.entity';
import { last, retry } from 'rxjs';

@Injectable()
export class CartasPerService {

  constructor(
    @InjectRepository(CartasPer) private CartasPerRepository: Repository<CartasPer>,
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private mailerService: MailerService,
    private dockGeneratorService: DockGeneratorService,
    private alumnoService: AlumnoService,
    private usuarioService: UsuariosService,
    private firmasService: FirmasService) { }

  create(createCartasPerDto: CreateCartasPerDto) {
    return 'This action adds a new cartasPer';
  }

  async createById(nombreSupervisor: string, organismo: string, nombreOrganismo: string, sexoSupervisor: string, divisionDepartamento: string, seccionUnidad: string, rut: number, createCartasPerDto: CreateCartasPerDto) {

    //Aquí entran datos como 
    /*
    Organismo
    Nombre Supervisor
    Cargo Supervisor
    Sexo del supervisor (H, M o NA)
    División/Departamento
    Sección/Unidad
    */
    let extracto1_supervisor = "";
    let extracto2_supervisor = "";
    if (sexoSupervisor == "Masculino") {
      extracto1_supervisor = "Señor";
      extracto2_supervisor = "Estimado Señor";
    } else if (sexoSupervisor == "Femenino") {
      extracto1_supervisor = "Señora";
      extracto2_supervisor = "Estimada Señora";
    }

    const alumno = await this.alumnoService.obtainIdByRut(rut);
    const lastCartaPer = await this.CartasPerRepository.createQueryBuilder('carta')
      .innerJoinAndSelect('carta.estudiante', 'alumno')
      .where('carta.estudiante_id = :id', { id: alumno.id })
      .getMany();
    if (lastCartaPer.length > 0) {
      const count_cp = lastCartaPer[0].cantidadGenerada + 1;
      const fecha_actualizacion = new Date();
      let extracto_1 = "";
      let extracto_2 = "";
      let extracto_3 = "";
      let extracto_4 = "";
      if (alumno.sexo == "femenino") {
        extracto_1 = "nuestra alumna Señorita";
        extracto_2 = "alumna";
        extracto_3 = "La señorita";
        extracto_4 = "LA ALUMNA";
      }
      else if (alumno.sexo == "masculino") {
        extracto_1 = "nuestro alumno Señor";
        extracto_2 = "alumno";
        extracto_3 = "El señor";
        extracto_4 = "EL ALUMNO";
      }
      const correos = await this.usuarioService.findAllSede(alumno.sede);
      const correosStr = correos.map(usuario => usuario.correo).join(', ');
      const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      const mesNombre = meses[new Date().getMonth()];
      const firmas = await this.firmasService.findBySede(alumno.sede);
      let piepagina = "";
      if (alumno.sede == "Valparaíso") {
        piepagina = "Las Heras Nº 06 Valparaíso | Fono: (32) 250 7961- 2507815 | E-mail: practivasv@uv.cl, www.uv.cl";
      } else if (alumno.sede == "Santiago") {
        piepagina = "Campus Santiago - Gran Avenida 4160, San Miguel | Fono +56 (2)2329  2149";
      }
      this.dockGeneratorService.crear_cp({
        nombre_archivo: lastCartaPer[0].nombreArchivo,
        sede: alumno.sede,
        dia: new Date().getDate(),
        mes: mesNombre,
        anio: new Date().getFullYear(),
        extracto1_supervisor: extracto1_supervisor,
        nombre_supervisor: nombreSupervisor,
        division_departamento: divisionDepartamento,
        seccion_unidad: seccionUnidad,
        extracto2_supervisor: extracto2_supervisor,
        extracto1_alumno: extracto_1,
        primer_nombre: alumno.primerNombre,
        segundo_nombre: alumno.segundoNombre,
        apellido_paterno: alumno.apellidoPaterno,
        apellido_materno: alumno.apellidoMaterno,
        run: alumno.run,
        df: alumno.df,
        extracto2_alumno: extracto_2,
        extracto3_alumno: extracto_3,
        ultimo_sem_aprobado: alumno.ultimoSemAprobado,
        nombre_firmante: firmas[0].nombreFirmante,
        cargo_firmante: firmas[0].cargo,
        firma_firmante: firmas[0].vocativo,
        firma_sec: firmas[0].firmaSec,
        extracto4: extracto_4,
        piepagina: piepagina
      });
      console.log("tiene")
    } else {
      console.log("no tiene")
    }



    return 'This action adds a new cartasPer';
  }


  findAll() {
    return `This action returns all cartasPer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartasPer`;
  }

  update(id: number, updateCartasPerDto: UpdateCartasPerDto) {
    return `This action updates a #${id} cartasPer`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartasPer`;
  }
}

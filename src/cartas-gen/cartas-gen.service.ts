import { Inject, Injectable, Res } from '@nestjs/common';
import { CreateCartasGenDto } from './dto/create-cartas-gen.dto';
import { UpdateCartasGenDto } from './dto/update-cartas-gen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartasGen } from './entities/cartas-gen.entity';
import { Repository } from 'typeorm';
import { AlumnoService } from '../alumno/alumno.service';
import { Alumno } from '../alumno/entities/alumno.entity';
import { MailerService } from '../mailer/mailer.service';
import { DockGeneratorService } from 'src/dock_generator/dock_generator.service';
import * as path from 'path';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { FirmasService } from '../firmas/firmas.service';
import * as fs from 'fs';

@Injectable()
export class CartasGenService {

  constructor(
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
    @InjectRepository(CartasGen) private CartasGenRepository: Repository<CartasGen>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private mailerService: MailerService,
    private dockGeneratorService: DockGeneratorService,
    private alumnoService: AlumnoService,
    private usuarioService: UsuariosService,
    private firmasService: FirmasService,
  ) { }

  private readonly directoryPath = path.join(__dirname, '..', '..', 'public', 'documentos');

  async createById(mail: string, semestre: Object) {
    console.log(semestre)
    const updateSemester = await this.alumnoRepository.update({ correoInstitucional: mail }, { ultimoSemAprobado: semestre["semestre"]});
    const alumno = await this.alumnoService.obtainIdByRut(mail);
    const lastCartaGen = await this.CartasGenRepository.createQueryBuilder('carta')
      .innerJoinAndSelect('carta.estudiante', 'alumno')
      .where('carta.estudiante_id = :id', { id: alumno.id })
      .getMany();
    if (lastCartaGen.length > 0) {
      const count_cg = lastCartaGen[0].cantidadGenerada + 1;
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
      //Para después modificando la bd
      /*
      if (alumno.sexo == "na") {
        const extracto1 = "nuestro/a alumno/a Señor/a";
        const extracto2 = "alumno/a";
        const extracto3 = "El/LA señor/a";
        const extracto4 = "EL/LA ALUMNO/A";
      }
      */
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
      this.dockGeneratorService.crear_cg({
        nombre_archivo: lastCartaGen[0].nombreArchivo,
        sede: alumno.sede,
        dia: new Date().getDate(),
        mes: mesNombre,
        anio: new Date().getFullYear(),
        extracto1: extracto_1,
        primer_nombre: alumno.primerNombre,
        segundo_nombre: alumno.segundoNombre,
        apellido_paterno: alumno.apellidoPaterno,
        apellido_materno: alumno.apellidoMaterno,
        run: alumno.run,
        rut: alumno.run + "-" + alumno.df.toUpperCase(),
        extracto2: extracto_2,
        extracto3: extracto_3,
        ultimo_sem_aprobado: alumno.ultimoSemAprobado,
        nombre_firmante: firmas[0].nombreFirmante,
        cargo_firmante: firmas[0].cargo,
        firma_firmante: firmas[0].vocativo,
        firma_sec: firmas[0].firmaSec,
        extracto4: extracto_4,
        piepagina: piepagina
      });
      this.CartasGenRepository.update(lastCartaGen[0].id, { cantidadGenerada: count_cg, fechaActualizacion: fecha_actualizacion, revisado: false });
      const filepath = path.join(__dirname, "..", "..", "public", "documentos", alumno.run.toString(), lastCartaGen[0].nombreArchivo);
      await this.mailerService.sendMail(
        alumno.correoInstitucional, //to
        'Actualización Carta Generica', //Subject
        'Usted ha generado una nueva carta generica, adjunta a este correo se encuentra el archivo correspondiente.', //Text
        '', //HTML
        correosStr, //CC
        lastCartaGen[0].nombreArchivo, //Nombre del archivo
        filepath //Path del archivo
      );
      return 'Carta Actualizada';
    } else {
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
      const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      const mesNombre = meses[new Date().getMonth()];
      const firmas = await this.firmasService.findBySede(alumno.sede);
      let piepagina = "";
      if (alumno.sede == "Valparaíso") {
        piepagina = "Las Heras Nº 06 Valparaíso | Fono: (32) 250 7961- 2507815 | E-mail: practivasv@uv.cl, www.uv.cl";
      } else if (alumno.sede == "Santiago") {
        piepagina = "Campus Santiago - Gran Avenida 4160, San Miguel | Fono +56 (2)2329  2149";
      }

      this.dockGeneratorService.crear_cg({
        nombre_archivo: alumno.run + '-carta_generica.docx',
        sede: alumno.sede,
        dia: new Date().getDate(),
        mes: mesNombre,
        anio: new Date().getFullYear(),
        extracto1: extracto_1,
        primer_nombre: alumno.primerNombre,
        segundo_nombre: alumno.segundoNombre,
        apellido_paterno: alumno.apellidoPaterno,
        apellido_materno: alumno.apellidoMaterno,
        run: alumno.run,
        rut: alumno.run + "-" + alumno.df.toUpperCase(),
        extracto2: extracto_2,
        extracto3: extracto_3,
        ultimo_sem_aprobado: alumno.ultimoSemAprobado,
        nombre_firmante: firmas[0].nombreFirmante,
        cargo_firmante: firmas[0].cargo,
        firma_firmante: firmas[0].vocativo,
        firma_sec: firmas[0].firmaSec,
        extracto4: extracto_4,
        piepagina: piepagina
      });
      const newCarta = this.CartasGenRepository.create({
        estudianteId: alumno.id,
        cantidadGenerada: 1,
        nombreArchivo: alumno.run + '-carta_generica.docx',
        revisado: false,
        fechaCreado: new Date(),
        fechaActualizacion: new Date()
      });
      await this.CartasGenRepository.save(newCarta);
      const correos = await this.usuarioService.findAllSede(alumno.sede);
      const correosStr = correos.map(usuario => usuario.correo).join(', ');
      const filepath = path.join(__dirname, "..", "..", "public", "documentos", alumno.run.toString(), alumno.run + '-carta_generica.docx');
      await this.mailerService.sendMail(
        alumno.correoInstitucional, //to
        'Creación Carta Generica', //Subject
        'Usted ha generado una nueva carta generica, adjunta a este correo se encuentra el archivo correspondiente.', //Text
        '', //HTML
        correosStr, //CC
        alumno.run + '-carta_generica.docx', //Nombre del archivo
        filepath //Path del archivo
      );
      return 'Carta creada';
    }
  }


  create(createCartasGenDto: CreateCartasGenDto) {
    return 'This action adds a new cartasGen';
  }

  async findAllsnRev(sede: string) {
    const alumno = await this.CartasGenRepository.createQueryBuilder('carta')
      .innerJoinAndSelect('carta.estudiante', 'alumno')
      .select([
        'carta.id',
        'alumno.run',
        'alumno.primerNombre',
        'alumno.segundoNombre',
        'alumno.apellidoPaterno',
        'alumno.apellidoMaterno',
        'carta.revisado',
        'carta.nombre_archivo',
        'carta.fechaCreado',
        'carta.fechaActualizacion'
      ])
      .where('alumno.sede = :sede', { sede })
      .andWhere('carta.revisado = :revisado', { revisado: false })
      .orderBy('carta.id', 'DESC');
    return alumno.getMany();
  }

  async findAllRev(sede: string) {
    const alumno = await this.CartasGenRepository.createQueryBuilder('carta')
      .innerJoinAndSelect('carta.estudiante', 'alumno')
      .select([
        'carta.id',
        'alumno.run',
        'alumno.primerNombre',
        'alumno.segundoNombre',
        'alumno.apellidoPaterno',
        'alumno.apellidoMaterno',
        'carta.revisado',
        'carta.nombre_archivo',
        'carta.fechaCreado',
        'carta.fechaActualizacion'
      ])
      .where('alumno.sede = :sede', { sede })
      .andWhere('carta.revisado = :revisado', { revisado: true })
      .orderBy('carta.id', 'DESC');
    return alumno.getMany();
  }

  async updateByRun(run: string, updateCartasGenDto: UpdateCartasGenDto) {
    const cartas = await this.CartasGenRepository //Obtiene la id de la carta por el run
      .createQueryBuilder('carta')
      .innerJoin('carta.estudiante', 'alumno', 'alumno.run = :run', { run })
      .select('carta.id')
      .getRawMany();
      return await this.CartasGenRepository.update(cartas[0].carta_id, updateCartasGenDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} cartasGen`;
  }

  update(id: number, updateCartasGenDto: UpdateCartasGenDto) {
    return `This action updates a #${id} cartasGen`;
  }

  async remove(run: string) {
    const cartas = await this.CartasGenRepository //Obtiene la id de la carta por el run
      .createQueryBuilder('carta')
      .innerJoin('carta.estudiante', 'alumno', 'alumno.run = :run', { run })
      .select('carta.id')
      .getRawMany();

      if (cartas.length == 0) {
        return 'No existe la carta';
      }
      
    
      return await this.CartasGenRepository.delete(cartas[0].carta_id);
  }
}



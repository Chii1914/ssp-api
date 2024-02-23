import { Inject, Injectable } from '@nestjs/common';
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

/*
nombre_archivo: data['nombre_archivo'],
            sede: data['sede'],
            dia:  data['dia'],
            mes: data['mes'],
            anio: data['anio'],
            extracto1: data['extracto1'],
            primer_nombre: data['primer_nombre'],
            segundo_nombre: data['segundo_nombre'],
            apellido_paterno: data['apellido_paterno'],
            apellido_materno: data['apellido_materno'],
            run: data['rut'],
            extracto2: data['extracto2'],
            extracto3: data['extracto3'],
            ultimo_sem_aprobado: data['ultimo_sem_aprobado'],
            nombre_firmante: data['nombre_firmante'],
            cargo_firmante: data['cargo_firmante'],
            firma_firmante: data['firma_firmante'],
            firma_sec: data['firma_sec'],
            extracto4: data['extracto4'],
            piepagina: data['piepagina'],
 */

@Injectable()
export class CartasGenService {

  constructor(
    @InjectRepository(CartasGen) private CartasGenRepository: Repository<CartasGen>,
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private mailerService: MailerService,
    private dockGeneratorService: DockGeneratorService,
    private alumnoService: AlumnoService,
    private usuarioService: UsuariosService) { }


  async createById(rut: number, createCartasGenDto: CreateCartasGenDto) {
    /*
    TODO: Implementar la creación de cartas genéricas por rut
    -> Se debe buscar el estudiante por su rut
    -> Se debe buscar la última carta genérica creada para el estudiante, si no existe crear de una con los datos del estudiante enseguida
    -> Guardar en la base de datos los datos de la carta genérica, sumar uno al count_cg. Si esta ya existía desde antes solo cambiar fecha de actualización y count_cg
    -> Generar documento dependiendo de lo que sucedió (docx)
    -> Envío de correo con la carta generada
    */

    //OBTENER ID EN BASE A RUT  
    const alumno = await this.alumnoService.obtainIdByRut(rut);
    //OBTENER ULTIMA CARTA GENÉRICA
    const lastCartaGen = await this.CartasGenRepository.createQueryBuilder('carta')
      .innerJoinAndSelect('carta.estudiante', 'alumno')
      .where('carta.estudiante_id = :id', { id: alumno.id })
      .getMany();
    if (lastCartaGen.length > 0) {
      //Caso en el que existe una carta generada anteriormente

      //En este caso sumar 1 al count_cg y actualizar fecha de actualización
      const count_cg = lastCartaGen[0].cantidadGenerada + 1;
      const fecha_actualizacion = new Date();
      //Sobreescribir documento nuevo 
      //TODO
      const extracto_1 = "";
      const extracto_2 = "";
      const extracto_3 = "";
      const extracto_4 = "";
      if (alumno.sexo == "femenino") {
        const extracto_1 = "nuestra alumna Señorita";
        const extracto2 = "alumna";
        const extracto3 = "La señorita";
        const extracto4 = "LA ALUMNA";
      }
      else if (alumno.sexo == "masculino") {
        let extracto_1 = "nuestro alumno Señor";
        const extracto2 = "alumno";
        const extracto3 = "El señor";
        const extracto4 = "EL ALUMNO";
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
      this.dockGeneratorService.crear_cg({
        nombre_archivo: lastCartaGen[0].nombreArchivo,
        sede: alumno.sede,
        dia: new Date().getDate(),
        mes: new Date().getMonth(),
        anio: new Date().getFullYear(),
        extracto1: extracto_1,
        primer_nombre: alumno.primerNombre,
        segundo_nombre: alumno.segundoNombre,
        apellido_paterno: alumno.apellidoPaterno,
        apellido_materno: alumno.apellidoMaterno,
        run: alumno.run,
        extracto2: extracto_2,
        extracto3: extracto_3,
        ultimo_sem_aprobado: alumno.ultimoSemAprobado,
        nombre_firmante: "Nombre Firmante",
        cargo_firmante: "Cargo Firmante",
        firma_firmante: "Firma Firmante",
        firma_sec: "Firma Secretaria",
        extracto4: extracto_4,
        piepagina: "Pie de página"
      });

      //Guardar en database la actualización y actualizar enteramente la carta generada
      this.CartasGenRepository.update(lastCartaGen[0].id, { cantidadGenerada: count_cg, fechaActualizacion: fecha_actualizacion, revisado: false });
      //Enviar correo con archivo adjunto

      //Enviar correo al alumno con la carta generada
      const filepath = path.join(__dirname, "..", "..", "public", "documentos", lastCartaGen[0].nombreArchivo);
      console.log(filepath)
      await this.mailerService.sendMail(
        alumno.correoInstitucional, //to
        'Actualización Carta Generica', //Subject
        'Usted ha generado una nueva carta generica, adjunta a este correo se encuentra el archivo correspondiente.', //Text
        '', //HTML
        correosStr, //CC
        lastCartaGen[0].nombreArchivo, //Nombre del archivo
        filepath //Path del archivo
      );


    } else {
      //Caso en el que la carta fue generada por primera vez
      
      //En este caso crear una carta genérica con los datos del estudiante
      //TODO
      const extracto_1 = "";
      const extracto_2 = "";
      const extracto_3 = "";
      const extracto_4 = "";


      if (alumno.sexo == "femenino") {
        const extracto_1 = "nuestra alumna Señorita";
        const extracto2 = "alumna";
        const extracto3 = "La señorita";
        const extracto4 = "LA ALUMNA";
      }
      else if (alumno.sexo == "masculino") {
        let extracto_1 = "nuestro alumno Señor";
        const extracto2 = "alumno";
        const extracto3 = "El señor";
        const extracto4 = "EL ALUMNO";
      }
      this.dockGeneratorService.crear_cg({
        nombre_archivo: alumno.run + '-carta_generica.docx',
        sede: alumno.sede,
        dia: new Date().getDate(),
        mes: new Date().getMonth(),
        anio: new Date().getFullYear(),
        extracto1: extracto_1,
        primer_nombre: alumno.primerNombre,
        segundo_nombre: alumno.segundoNombre,
        apellido_paterno: alumno.apellidoPaterno,
        apellido_materno: alumno.apellidoMaterno,
        run: alumno.run,
        extracto2: extracto_2,
        extracto3: extracto_3,
        ultimo_sem_aprobado: alumno.ultimoSemAprobado,
        nombre_firmante: "Nombre Firmante",
        cargo_firmante: "Cargo Firmante",
        firma_firmante: "Firma Firmante",
        firma_sec: "Firma Secretaria",
        extracto4: extracto_4,
        piepagina: "Pie de página"
      });

      //Guardar en database la carta generada
      const newCarta = this.CartasGenRepository.create({
        estudianteId: alumno.id,
        cantidadGenerada: 1,
        nombreArchivo: alumno.run + '-carta_generica.docx',
        revisado: false,
        fechaCreado: new Date(),
        fechaActualizacion: new Date()
      });
      await this.CartasGenRepository.save(newCarta);
      //Enviar correo con archivo adjunto 
      //TODO


    }

    return 'Carta creada o actualizada';
  }


  create(createCartasGenDto: CreateCartasGenDto) {
    return 'This action adds a new cartasGen';
  }

  async findAll() {
    return await this.CartasGenRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} cartasGen`;
  }

  update(id: number, updateCartasGenDto: UpdateCartasGenDto) {
    return `This action updates a #${id} cartasGen`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartasGen`;
  }
}

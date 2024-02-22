import { Inject, Injectable } from '@nestjs/common';
import { CreateCartasGenDto } from './dto/create-cartas-gen.dto';
import { UpdateCartasGenDto } from './dto/update-cartas-gen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartasGen } from './entities/cartas-gen.entity';
import { Repository } from 'typeorm';
import { AlumnoService } from '../alumno/alumno.service';
import { Alumno } from '../alumno/entities/alumno.entity';
import { MailerService } from '../mailer/mailer.service';
import * as path from 'path';

@Injectable()
export class CartasGenService {

  constructor(
    @InjectRepository(CartasGen) private CartasGenRepository: Repository<CartasGen>,
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
    private mailerService: MailerService,
    private alumnoService: AlumnoService) { }


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
    //console.log(lastCartaGen)
    console.log(lastCartaGen[0].nombreArchivo)
    if (lastCartaGen.length > 0) {
      //Caso en el que existe una carta generada anteriormente

      //En este caso sumar 1 al count_cg y actualizar fecha de actualización
      const count_cg = lastCartaGen[0].cantidadGenerada + 1;
      const fecha_actualizacion = new Date();
      //Sobreescribir documento nuevo 
      //TODO


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
        'maximiliano.aguirre@alumnos.uv.cl, mgfaundes@gmail.com', //CC
        lastCartaGen[0].nombreArchivo, //Nombre del archivo
        filepath //Path del archivo
      );


    } else {
      //Caso en el que la carta fue generada por primera vez

      //En este caso crear una carta genérica con los datos del estudiante
      //TODO

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

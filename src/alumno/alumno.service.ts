import { Injectable, Inject } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartasGen } from 'src/cartas-gen/entities/cartas-gen.entity';
import { CartasPer } from 'src/cartas-per/entities/cartas-per.entity';

@Injectable()
export class AlumnoService {

  constructor(
    @InjectRepository(CartasPer)
    private cartasPerRepository: Repository<CartasPer>,
    @InjectRepository(CartasGen)
    private cartasGenRepository: Repository<CartasGen>,
    @InjectRepository(Alumno)
    private alumnoRepository: Repository<Alumno>,
  ) {}

  async obtainIdByRut(rut: number): Promise <Alumno | undefined> {
    const alumno = await this.alumnoRepository.findOne({ where: {run: rut}});
    return alumno;
  }

  async create(createAlumnoDto: CreateAlumnoDto) {
    try{
      const alumno = this.alumnoRepository.create(createAlumnoDto);
      return await this.alumnoRepository.save(alumno);
    }catch(error){
      console.log(error);
    }
  }
  
  async obtainAlumnoByMail(mail: string){
    return await this.alumnoRepository.findOne({where: {correoInstitucional: mail}})
  }

  async obtainCtGeneralByRut(mail: string){
    const alumno = await this.alumnoRepository.findOne({ where: {correoInstitucional: mail}});
    const cg = await this.cartasGenRepository.findOne({ where: {estudianteId: alumno.id}});
    if (cg == null) {
      return 0;
    }
    return cg.cantidadGenerada;
  }

  async obtainCpGeneralByRut(mail: string){
    const alumno = await this.alumnoRepository.findOne({ where: {correoInstitucional: mail}});
    const ccp = await this.cartasPerRepository.findOne({ where: {estudianteId: alumno.id}});
    if (ccp == null) {
      return 0;
    }
    return ccp.cantidadGenerada;
  }

  findAll() {
    return this.alumnoRepository.find();
  }
 
  findOne(id: number) {
    return `This action returns a #${id} alumno`;
  }

  

  updateByRut(mail: string, updateAlumnoDto: UpdateAlumnoDto) {
    return this.alumnoRepository.update({correoInstitucional: mail}, updateAlumnoDto);
  }
  

  update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    return `This action updates a #${id} alumno`;
  }

  remove(id: number) {
    return `This action removes a #${id} alumno`;
  }
}

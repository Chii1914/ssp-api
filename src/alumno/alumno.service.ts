import { Injectable, Inject } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlumnoService {

  constructor(
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

  findAll() {
    return this.alumnoRepository.find();
  }
 
  findOne(id: number) {
    return `This action returns a #${id} alumno`;
  }
  

  update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    return `This action updates a #${id} alumno`;
  }

  remove(id: number) {
    return `This action removes a #${id} alumno`;
  }
}

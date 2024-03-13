import { Injectable } from '@nestjs/common';
import { CreatePracticaDto } from './dto/create-practica.dto';
import { UpdatePracticaDto } from './dto/update-practica.dto';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Practica } from './entities/practica.entity';
import { Alumno } from '../alumno/entities/alumno.entity';
import { Evaluacione } from '../evaluaciones/entities/evaluacione.entity';
import { AlumnoService } from '../alumno/alumno.service';


@Injectable()
export class PracticaService {
  constructor(
    @InjectRepository(Practica) private practicaRepository: Repository<Practica>,
    @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
    @InjectRepository(Evaluacione) private evaluacionesRepository: Repository<Evaluacione>,
    private alumnoService: AlumnoService,

  ) { }

    /*
    
  public function ctn_formulario_estado_xestudiante_sin_evaluar($estudiante_id, $ocasion, $estado)
  {
    $this->db->select();
    $this->db->from('practica');
    $this->db->where('practica.alumnoId', $estudiante_id);
    $this->db->where('practica.ocasion', $ocasion);
    $this->db->where('practica.estado', $estado);
    $this->db->where('practica.evaluacionId', null);
    return $this->db->count_all_results();
  }

   $cnt_PASa = $this->Formulario_Model->ctn_formulario_estado_xestudiante_sin_evaluar($this->session->userdata('id'), "Primera", "Aceptada");
   $cnt_PSa = $this->Formulario_Model->ctn_formulario_estado_xestudiante_sin_evaluar($this->session->userdata('id'), "Primera", "Sin Acción");
  
   $cnt_PAA = $this->Evaluacion_Model->ctn_evaluaciones_evaluacion_xestudiante($this->session->userdata('id'), "Primera", "Aceptada", "Aprobada");

     public function ctn_evaluaciones_evaluacion_xestudiante($estudiante_id, $ocasion, $estado, $evaluacion)
  {
    $this->db->select();
    $this->db->from('practica');
    $this->db->join('evaluaciones', ' practica.evaluacionId = evaluaciones.id');
    $this->db->where('practica.alumnoId', $estudiante_id);
    $this->db->where('practica.ocasion', $ocasion);
    $this->db->where('practica.estado', $estado);
    $this->db->where('evaluaciones.evaluacion', $evaluacion);
    return $this->db->count_all_results();
  }

    */


  async verifyByMail(mail: string){
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
    if(count_snevaluar > 0 || count_evaluadas > 0 || count_snaccion > 0){
      //Aquí ya se retorna la verificación actualmente posee un documento en procesamiento
      return false;
    }
    return true;
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

import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) { }

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  obtainSedeByMail(mail: string){
    console.log(mail)
    return this.usuarioRepository.find({select: ["sede"], where: {correo :mail}});
  }


  async findAllSede(sede_i: string) {
    if (sede_i !== "Valparaíso" && sede_i !== "Santiago") {
      throw new Error("Invalid sede value");
    }
    return await this.usuarioRepository.find({ select: ["correo"], where: { sede: sede_i } });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}

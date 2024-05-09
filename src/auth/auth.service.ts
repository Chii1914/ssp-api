// src/auth/auth.service.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Alumno } from '../alumno/entities/alumno.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import Mail from 'nodemailer/lib/mailer';
@Injectable()
export class AuthService {
  constructor(
  @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
  private jwtService: JwtService) { }

  async validateOAuthLogin(thirdPartyId: string, provider: string, email: string, rol: string, sede: string): Promise<string> {
    const payload = {
      sub: thirdPartyId,
      provider,
      email,
      rol: rol,
      sede: sede || null
    };
    const jwt = this.jwtService.sign(payload);
    return jwt;
  }

  async findOrCreateUser(email: string) {
    //is google || is sso -> con google o con google o con duro  
    const admin = await this.usuarioRepository.find({ where: { correo: email } });
    if (admin.length > 0) {
      //Si es admin
      return { email: email, rol: "admin", sede: admin[0].sede };
    }else{
      //Si el loco es alumno
      const alumno = await this.alumnoRepository.findOne({ where: { correoInstitucional: email } });
      if (alumno==null) {
        //Si no existe
        if(!(/@alumnos\.uv\.cl$/.test(email))){
          return 0;
        }
        const newAlumno = await this.alumnoRepository.create({ correoInstitucional: email });
        await this.alumnoRepository.save(newAlumno);
        return { email: email, rol: "alumno" };        
      }else{
        //Si ya existe
        return { email: email, rol: "alumno", sede: alumno.sede || null };
      }
    }    
  }
}

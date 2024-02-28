// src/auth/auth.service.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Alumno } from '../alumno/entities/alumno.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
@Injectable()
export class AuthService {
  constructor(
  @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  @InjectRepository(Alumno) private alumnoRepository: Repository<Alumno>,
  private jwtService: JwtService) { }

  async validateOAuthLogin(thirdPartyId: string, provider: string, email: string, rol: string): Promise<string> {
    const payload = {
      sub: thirdPartyId,
      provider,
      email,
      rol: rol
    };
    const jwt = this.jwtService.sign(payload);
    return jwt;
  }

  async findOrCreateUser(email: string) {
    const admin = await this.usuarioRepository.findOne({ where: { correo: email } });
    if (admin) {
      return { email: email, rol: "admin" };
    }
    const alumno = await this.alumnoRepository.findOne({ where: { correoInstitucional: email } });

  }
}

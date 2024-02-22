import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './entities/alumno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alumno])],
  controllers: [AlumnoController],
  providers: [AlumnoService],
  exports: [AlumnoService, TypeOrmModule.forFeature([Alumno])],
})
export class AlumnoModule {}

import { Module } from '@nestjs/common';
import { CartasGenModule } from './cartas-gen/cartas-gen.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnoModule } from './alumno/alumno.module';
import { CartasPerModule } from './cartas-per/cartas-per.module';
import { PracticaModule } from './practica/practica.module';
import { HorarioModule } from './horario/horario.module';
import { OrganismoModule } from './organismo/organismo.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { EvaluacionesModule } from './evaluaciones/evaluaciones.module';
import { NotasModule } from './notas/notas.module';
import { FirmasModule } from './firmas/firmas.module';
import { RegionModule } from './region/region.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MailerModule } from './mailer/mailer.module';
import { DockGeneratorModule } from './dock_generator/dock_generator.module';

@Module({
  imports: [
    CartasGenModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'practica',
      autoLoadEntities: true, // Automatically loads entities
      synchronize: false, // BE CAREFUL WITH THIS WEA IN PRODUCTION
    }),
    AlumnoModule,
    CartasPerModule,
    PracticaModule,
    HorarioModule,
    OrganismoModule,
    SupervisorModule,
    EvaluacionesModule,
    NotasModule,
    FirmasModule,
    RegionModule,
    UsuariosModule,
    MailerModule,
    DockGeneratorModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}

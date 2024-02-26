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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getDatabaseType } from './config/config.utils';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: parseInt(configService.get<string>('DB_PORT')) || 3306,
        username: configService.get<string>('DB_USERNAME') || 'root',
        password: configService.get<string>('DB_PASSWORD') || '',
        database: configService.get<string>('DB_NAME') || 'practica',
        autoLoadEntities: true,
        synchronize: configService.get<string>('TYPEORM_SYNC') === 'true',
      }),
      inject: [ConfigService], 
    }),
    CartasGenModule,
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
    DockGeneratorModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

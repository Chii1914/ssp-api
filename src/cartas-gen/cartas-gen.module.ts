import { Global, Module } from '@nestjs/common';
import { CartasGenService } from './cartas-gen.service';
import { CartasGenController } from './cartas-gen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartasGen } from './entities/cartas-gen.entity';
import { AlumnoModule } from 'src/alumno/alumno.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CartasGen]), AlumnoModule],
  controllers: [CartasGenController],
  providers: [CartasGenService],
  exports: [CartasGenService, TypeOrmModule.forFeature([CartasGen])],
})
export class CartasGenModule {}

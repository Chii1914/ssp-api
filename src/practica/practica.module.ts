import { Module, Global } from '@nestjs/common';
import { PracticaService } from './practica.service';
import { PracticaController } from './practica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Practica } from './entities/practica.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Practica])],
  controllers: [PracticaController],
  providers: [PracticaService],
  exports: [PracticaService, TypeOrmModule.forFeature([Practica])],
})
export class PracticaModule {}

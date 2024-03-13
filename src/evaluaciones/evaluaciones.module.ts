import { Global, Module } from '@nestjs/common';
import { EvaluacionesService } from './evaluaciones.service';
import { EvaluacionesController } from './evaluaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacione } from './entities/evaluacione.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Evaluacione])],
  controllers: [EvaluacionesController],
  providers: [EvaluacionesService],
  exports: [EvaluacionesService, TypeOrmModule.forFeature([Evaluacione])],
})
export class EvaluacionesModule {}

import { Module } from '@nestjs/common';
import { EvaluacionesService } from './evaluaciones.service';
import { EvaluacionesController } from './evaluaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacione } from './entities/evaluacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluacione])],
  controllers: [EvaluacionesController],
  providers: [EvaluacionesService],
})
export class EvaluacionesModule {}

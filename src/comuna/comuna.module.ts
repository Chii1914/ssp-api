import { Module } from '@nestjs/common';
import { ComunaService } from './comuna.service';
import { ComunaController } from './comuna.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comuna } from './entities/comuna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comuna])],
  controllers: [ComunaController],
  providers: [ComunaService],
})
export class ComunaModule {}

import { Module } from '@nestjs/common';
import { ComunaService } from './comuna.service';
import { ComunaController } from './comuna.controller';

@Module({
  controllers: [ComunaController],
  providers: [ComunaService],
})
export class ComunaModule {}

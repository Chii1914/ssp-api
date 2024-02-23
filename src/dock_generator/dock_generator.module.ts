import { Global, Module } from '@nestjs/common';
import { DockGeneratorService } from './dock_generator.service';
import { DockGeneratorController } from './dock_generator.controller';

@Global()
@Module({
  controllers: [DockGeneratorController],
  providers: [DockGeneratorService],
  exports: [DockGeneratorService],
})
export class DockGeneratorModule {}

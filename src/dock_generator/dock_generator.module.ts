import { Module } from '@nestjs/common';
import { DockGeneratorService } from './dock_generator.service';
import { DockGeneratorController } from './dock_generator.controller';

@Module({
  controllers: [DockGeneratorController],
  providers: [DockGeneratorService],
})
export class DockGeneratorModule {}

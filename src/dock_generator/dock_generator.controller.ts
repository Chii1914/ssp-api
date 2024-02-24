import { Controller, Get } from '@nestjs/common';
import { DockGeneratorService } from './dock_generator.service';

@Controller('dock-generator')
export class DockGeneratorController {
  constructor(private readonly dockGeneratorService: DockGeneratorService) {}

}

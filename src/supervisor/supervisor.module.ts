import { Module } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { SupervisorController } from './supervisor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supervisor } from './entities/supervisor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supervisor])],
  controllers: [SupervisorController],
  providers: [SupervisorService],
})
export class SupervisorModule {}

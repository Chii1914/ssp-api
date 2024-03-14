import { Global, Module } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { SupervisorController } from './supervisor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supervisor } from './entities/supervisor.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Supervisor])],
  controllers: [SupervisorController],
  providers: [SupervisorService],
  exports: [SupervisorService, TypeOrmModule.forFeature([Supervisor])]
})
export class SupervisorModule {}

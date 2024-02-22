import { Module } from '@nestjs/common';
import { OrganismoService } from './organismo.service';
import { OrganismoController } from './organismo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organismo } from './entities/organismo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organismo])],
  controllers: [OrganismoController],
  providers: [OrganismoService],
})
export class OrganismoModule {}

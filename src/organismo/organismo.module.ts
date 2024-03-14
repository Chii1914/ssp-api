import { Global, Module } from '@nestjs/common';
import { OrganismoService } from './organismo.service';
import { OrganismoController } from './organismo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organismo } from './entities/organismo.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Organismo])],
  controllers: [OrganismoController],
  providers: [OrganismoService],
  exports: [OrganismoService, TypeOrmModule.forFeature([Organismo])]
})
export class OrganismoModule {}

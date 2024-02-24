import { Global, Module } from '@nestjs/common';
import { FirmasService } from './firmas.service';
import { FirmasController } from './firmas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Firma } from './entities/firma.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Firma])],
  controllers: [FirmasController],
  providers: [FirmasService],
  exports: [FirmasService, TypeOrmModule.forFeature([Firma])],
})
export class FirmasModule {}

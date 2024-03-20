import { Global, Module } from '@nestjs/common';
import { CartasPerService } from './cartas-per.service';
import { CartasPerController } from './cartas-per.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartasPer } from './entities/cartas-per.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CartasPer])],
  controllers: [CartasPerController],
  providers: [CartasPerService],
  exports: [CartasPerService, TypeOrmModule.forFeature([CartasPer])]
})
export class CartasPerModule {}

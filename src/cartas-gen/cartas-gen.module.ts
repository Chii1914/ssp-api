import { Module } from '@nestjs/common';
import { CartasGenService } from './cartas-gen.service';
import { CartasGenController } from './cartas-gen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartasGen } from './entities/cartas-gen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartasGen])],
  controllers: [CartasGenController],
  providers: [CartasGenService],
})
export class CartasGenModule {}

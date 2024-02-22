import { PartialType } from '@nestjs/mapped-types';
import { CreateCartasGenDto } from './create-cartas-gen.dto';

export class UpdateCartasGenDto extends PartialType(CreateCartasGenDto) {}

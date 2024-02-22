import { PartialType } from '@nestjs/mapped-types';
import { CreateCartasPerDto } from './create-cartas-per.dto';

export class UpdateCartasPerDto extends PartialType(CreateCartasPerDto) {}
